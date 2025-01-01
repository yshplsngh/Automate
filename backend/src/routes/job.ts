// import { Router, Request, Response } from "express";
// import db from "../db";
// import { Job } from "../types";
// import { InputJsonValue } from "@prisma/client/runtime/library";

// const jobRouter = Router();

// jobRouter.post(
//   "/create",
//   async (req: Request, res: Response): Promise<void> => {
//     const jobData = req.body as Job;
//     try {
//       const job = await db.job.create({
//         data: {
//           name: jobData.name,
//           description: jobData.description,
//           type: jobData.type,
//           workflow_id: jobData.workflowId,
//           app: jobData.app,
//           step_no: jobData.step,
//           data: jobData.data as unknown as InputJsonValue,
//         },
//       });
//       res.status(200).json({
//         success: true,
//         message: "Job successfully created.",
//         data: job,
//       });
//       return;
//     } catch (err: any) {
//       console.log("Error api/job/create;", err);
//       res.status(500).json({
//         success: false,
//         message: "An unexpected error has happened.",
//       });
//       return;
//     }
//   }
// );

// export default jobRouter;
