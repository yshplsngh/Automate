import { Router, Request, Response } from "express";
import { Job } from "../types";
import db from "../db";
import {
  createNewWorkflowController,
  createWorkflowController,
  getAllWorkflowDataController,
  getWorkflowDataController,
} from "../controller/workflow/workflow";

const workflowRouter = Router();

workflowRouter.post("/new", createNewWorkflowController);

workflowRouter.post("/create", createWorkflowController);

workflowRouter.get("/all", getAllWorkflowDataController);

workflowRouter.get("/:id", getWorkflowDataController);

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
