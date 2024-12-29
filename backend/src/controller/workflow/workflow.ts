import { Request, Response } from "express";
import db from "../../db";
import { JobCreateDataType, WorkflowCreateSchema } from "./schema";
import { z } from "zod";

// Controller function for creating a new workflow
export const createWorkflowController = async (
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

export const createWorkflow = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedBody = WorkflowCreateSchema.parse(req.body);

    const userId = req.user?.id;
    const { id, name, description, jobs } = parsedBody;

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
