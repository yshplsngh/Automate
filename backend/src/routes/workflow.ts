import { Router, Request, Response } from "express";
import { Job, TypeWorkFlow } from "../types";
import db from "../db";

const workflowRouter = Router();

workflowRouter.post(
  "/new",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await db.workflow.create({
        data: {
          name: "Untitled Workflow",
          owner_id: req.user?.id as string,
          job_count: 0,
        },
      });
      res.status(200).json({
        success: true,
        message: "Workflow created",
        workflowData: data,
      });
      return;
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Failed to create workflow",
      });
      return;
    }
  }
);

workflowRouter.post(
  "/create",
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { workflowId, workflowName, workflowDescription, jobs } = req.body;

    try {
      const result = await db.$transaction(async (prisma) => {
        const dbWorkflow = await prisma.workflow.findFirst({
          where: {
            id: workflowId,
            owner_id: userId,
          },
        });

        if (!dbWorkflow) {
          throw new Error("Workflow does not exist.");
        }

        let updatedWorkflow = dbWorkflow;

        if (
          workflowName !== dbWorkflow.name ||
          workflowDescription !== dbWorkflow.description
        ) {
          updatedWorkflow = await prisma.workflow.update({
            where: { id: workflowId },
            data: {
              name: workflowName,
              description: workflowDescription,
            },
          });
        }

        await prisma.job.createMany({
          data: jobs.map((job: Job) => ({
            ...job,
            workflow_id: dbWorkflow.id,
          })),
        });

        return prisma.workflow.findFirst({
          where: { id: workflowId },
          include: { jobs: true },
        });
      });

      res.status(201).json({
        success: true,
        message: "Workflow and jobs created successfully.",
        data: result,
      });
      return;
    } catch (e: any) {
      if (e.message === "Workflow does not exist.") {
        res.status(400).json({
          success: false,
          message: e.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred.",
        });
      }
    }
  }
);

workflowRouter.get(
  "/all",
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const query = req.query;
    console.log("/all");
    console.log("userId::all", userId);
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

      console.log(data);

      res.status(200).json({
        success: true,
        data,
      });
      return;
    } catch (e: any) {
      console.error("Error fetching workflows:", e);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching workflows.",
      });
      return;
    }
  }
);

workflowRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
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
  }
);

workflowRouter.put(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { name, description, jobs } = req.body;
    const userId = req.user?.id;

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
                id: job.id || "non-existent-id", // Assuming job.id can be absent for new jobs
              },
              create: {
                workspace_id: id, // Assuming you are referring to the `workspace_id`
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
      return;
    } catch (err: any) {
      console.error("Error updating workflow:", err);
      res
        .status(500)
        .json({ success: false, message: "Error updating workflow." });
      return;
    }
  }
);

export default workflowRouter;
