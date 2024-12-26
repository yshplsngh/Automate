import { Router, Request, Response } from "express";
import { TypeWorkFlow } from "../types";
import db from "../db";
import { InputJsonValue } from "@prisma/client/runtime/library";

const workflowRouter = Router();

workflowRouter.post(
  "/create",
  async (req: Request, res: Response): Promise<void> => {
    const workflow = req.body as unknown as TypeWorkFlow;
    console.log(workflow);
    try{
      const data = await db.workflow.create({
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
    }catch(e){
      
    }


    res.status(200).json({
      success: true,
      message: "Workflow created",
      workflowData: data,
    });
    return;
  }
);

workflowRouter.get("/", async (req: Request, res: Response): Promise<void> {
  const userid = req.user?.userid;
  const data = await db.workflow.findMany({
    where: {
      owner_id: userid,
    }
  })
  res.status(200).json({
    success: true,
    data: data,
  })
})

export default workflowRouter;
