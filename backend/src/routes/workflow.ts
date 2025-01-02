import { Router, Request, Response } from "express";
import {
  createNewWorkflowController,
  createWorkflowController,
  getAllWorkflowDataController,
  getWorkflowDataController,
  updateWorkflowController,
} from "../controller/workflow/workflow";

const workflowRouter = Router();

workflowRouter.post("/new", createNewWorkflowController);

workflowRouter.get("/all", getAllWorkflowDataController);

workflowRouter.get("/:id", getWorkflowDataController);

workflowRouter.post("/:id", createWorkflowController);

workflowRouter.put("/:id", updateWorkflowController);

export default workflowRouter;
