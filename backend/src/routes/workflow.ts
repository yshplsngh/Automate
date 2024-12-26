import { Router, Request, Response } from "express";
import { TypeWorkFlow } from "../types";
import db from "../db";
import { InputJsonValue } from "@prisma/client/runtime/library";

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

export default workflowRouter;
