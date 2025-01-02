import {
  WorkflowResponseType as BackendWorkflowResponseType,
  JobResponseType as BackendJobResponseType,
  JobDataType as BackendJobDataType,
} from "../../../backend/src/types"; // I think this is bad code.

export type WorkflowType = BackendWorkflowResponseType;
export type JobType = BackendJobResponseType;
export type JobDataType = BackendJobDataType;