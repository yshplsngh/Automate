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

workflowRouter.get("/all", getAllWorkflowDataController);

workflowRouter.get("/:id", getWorkflowDataController);

workflowRouter.post("/:id", createWorkflowController);

workflowRouter.put("/:id", );

export default workflowRouter;
