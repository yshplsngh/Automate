import { Request, Response } from "express";
import db from "../../db";
import { Job } from "@prisma/client";
import { JobCreateDataType, WorkflowCreateSchema } from "./schema";
import { z } from "zod";

// Controller function for creating a new workflow
export const createNewWorkflowController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Invalid request.",
    });
  }
  try {
    const data = await db.workflow.create({
      data: {
        owner_id: userId as string,
        name: "Untitled Workflow",
      },
      include: {
        jobs: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Workflow created",
      workflowData: data,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Failed to create workflow",
    });
  }
};

/*
* create new jobs inside a workflow.
*/
export const createWorkflowController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedBody = WorkflowCreateSchema.parse(req.body);

    const userId = req.user?.id;
    const id = req.params.id;
    const { name, description, jobs } = parsedBody;

    const result = await db.$transaction(async (prisma) => {
      const dbWorkflow = await prisma.workflow.findFirst({
        where: {
          id: id,
          owner_id: userId,
        },
      });

      if (!dbWorkflow) {
        throw new Error("Workflow does not exist.");
      }

      let updatedWorkflow = dbWorkflow;

      if (name !== dbWorkflow.name || description !== dbWorkflow.description) {
        updatedWorkflow = await prisma.workflow.update({
          where: { id: id },
          data: {
            name: name,
            description: description,
          },
        });
      }

      // Create new jobs associated with the workflow
      await prisma.job.createMany({
        data: jobs.map((job: JobCreateDataType) => ({
          ...job,
          workflow_id: dbWorkflow.id,
        })),
      });

      // Return the updated workflow with jobs
      return prisma.workflow.findFirst({
        where: { id: id },
        include: { jobs: true },
      });
    });

    res.status(201).json({
      success: true,
      message: "Workflow and jobs created successfully.",
      data: result,
    });
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      // Zod validation error
      res.status(400).json({
        success: false,
        message: "Invalid request data",
        errors: e.errors,
      });
    } else if (e.message === "Workflow does not exist.") {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    } else {
      console.error(e);
      res.status(500).json({
        success: false,
        message: "An error occurred.",
      });
    }
  }
};

export const getAllWorkflowDataController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const query = req.query;
    console.log("/all");
    console.log("userId::all", userId);
    if (!userId) {
      res.status(403).json({ message: "Unauthorized request", success: false });
      return;
    }
    const skip = query.skip ? parseInt(query.skip as string, 10) : undefined;
    const take = query.take ? parseInt(query.take as string, 10) : undefined;

    const data = await db.workflow.findMany({
      where: {
        owner_id: userId,
      },
      ...(skip != null && { skip }),
      ...(take != null && { take }),
      orderBy: {
        updated_at: "desc",
      },
    });

    console.log(data);

    res.status(200).json({
      success: true,
      data,
    });
    return;
  } catch (err: any) {
    console.error("Error fetching workflows:", err.message || err);
    res.status(500).json({
      success: false,
      message: err.message || "An error occurred while fetching workflows.",
    });
  }
};

export const getWorkflowDataController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userid = req.user?.id;
  const workflowId = req.params.id;
  try {
    const data = await db.workflow.findFirst({
      where: {
        owner_id: userid,
        id: workflowId,
      },
      include: {
        jobs: true,
      },
    });
    if (!data) {
      res.status(404).json({
        success: false,
        message: "Resources not found.",
      });
      return;
    }
    console.log(data);
    res.status(200).json({
      success: true,
      data: data,
    });
    return;
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "An unexpected error has occured.",
    });
  }
};

export const updateWorkflowController =   async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    res.status(403).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    const parsedBody = WorkflowCreateSchema.safeParse(req.body);
    const {name, des} = parsedBody.data
    const data = await db.$transaction(async (prisma) => {
      // Update Workflow
      const workflow = await prisma.workflow.update({
        where: {
          id: id,
          owner_id: userId,
        },
        data: {
          name: parsedBody.data?.name,
          description: description,
          updated_at: new Date(),
        },
        include:{
          jobs: true,
        }
      });

      // Handle job upsert and deletion
      let updatedJobs: Job[] = [];

      if (Array.isArray(jobs)) {
        for (const job of jobs) {
          const jobData = await prisma.job.upsert({
            where: {
              id: job.id, // Assuming job.id can be absent for new jobs
            },
            create: {
              workflow_id: id, 
              name: job.name,
              description: job.description,
              app: job.app,
              type: job.type,
              step_no: job.step_no,
              data: job.data,
              created_at: new Date(),
              updated_at: new Date(),
            },
            update: {
              name: job.name,
              description: job.description,
              step_no: job.step_no,
              app: job.app,
              type: job.type,
              data: job.data,
              updated_at: new Date(),
            },
          });
          updatedJobs.push(jobData);
        }
      }

      // Delete jobs that are not included in the request
      const incomingJobIds = updatedJobs
        .map((job: Job) => job.id)
        .filter(Boolean);
      await prisma.job.deleteMany({
        where: {
          workflow_id: id,
          id: { notIn: incomingJobIds },
        },
      });

      return workflow;
    });

    res.status(200).json({
      success: true,
      message: "Workflow updated successfully.",
      data: data,
    });
    return;
  } catch (err: any) {
    console.error("Error updating workflow:", err);
    res
      .status(500)
      .json({ success: false, message: "Error updating workflow." });
    return;
  }
}
