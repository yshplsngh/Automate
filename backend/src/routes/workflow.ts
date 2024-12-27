import { Router, Request, Response } from "express";
import { Job, TypeWorkFlow } from "../types";
import db from "../db";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { runInNewContext } from "vm";

const workflowRouter = Router();

workflowRouter.post(
  "/create",
  async (req: Request, res: Response): Promise<void> => {
    const workflow = req.body as unknown as TypeWorkFlow;
    // console.log(workflow);
    // console.log(
    //   workflow.jobs.map((job) => {
    //     console.log(job);
    //   })
    // );
    // res.status(200);
    // return;
    let data;
    try {
      data = await db.workflow.create({
        data: {
          name: workflow.name,
          owner_id: req.user?.userid as string,
          job_count: workflow.jobs.length,
          jobs: {
            create: workflow.jobs.map((job) => ({
              type: job.type,
              step_no: job.step,
              name: job.name,
              description: job.description,
              app: job.app,
              data: job.data as unknown as InputJsonValue,
            })),
          },
        },
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Failed to create workflow",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Workflow created",
      workflowData: data,
    });
    return;
  }
);

workflowRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
    const userid = req.user?.userid;
    const workflowId = req.params.id;
    try {
      const data = await db.workflow.findFirst({
        where: {
          owner_id: userid,
          workflowId: workflowId,
        },
        include: {
          jobs: true,
        },
      });
      if (!data) {
        res.status(304).json({
          success: false,
          message: "Resources not found.",
        });
      }
      res.status(200).json({
        success: true,
        data: data,
      });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "An unexpected error has occured.",
      });
    }
  }
);

workflowRouter.get("/all", async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userid;
  const query = req.query;

  if (!userId) {
    res.status(403).json({ message: "Unauthorized request", success: false });
    return;
  }

  try {
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

    if (data.length > 0) {
      res.status(200).json({
        success: true,
        data,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "No results found.",
      });
    }
  } catch (e: any) {
    console.error("Error fetching workflows:", e);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching workflows.",
    });
  }
});

workflowRouter.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const { name, description, jobs } = req.body;
  const userId = req.user?.userid;

  if (!userId) {
    res.status(403).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    const data = await db.$transaction(async (prisma: any) => {
      // Update Workflow
      const workflow = await prisma.workflow.update({
        where: {
          id: id,
          owner_id: userId,  
        },
        data: {
          name: name,
          description: description,
          updated_at: new Date(),
        },
      });

      // Handle job upsert and deletion
      let updatedJobs: Job[] = [];

      if (Array.isArray(jobs)) {
        for (const job of jobs) {
          const jobData = await prisma.job.upsert({
            where: {
              id: job.id || "non-existent-id",  // Assuming job.id can be absent for new jobs
            },
            create: {
              workspace_id: id,  // Assuming you are referring to the `workspace_id`
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
      const incomingJobIds = updatedJobs.map((job: Job) => job.id).filter(Boolean);
      await prisma.job.deleteMany({
        where: {
          workspace_id: id,
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

  } catch (err: any) {
    console.error("Error updating workflow:", err);
    res.status(500).json({ success: false, message: "Error updating workflow." });
  }
});


export default workflowRouter;
