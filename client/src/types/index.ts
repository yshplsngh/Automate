import {
  WorkflowType as BackendWorkflowResponseType,
  JobType as BackendJobResponseType,
} from "../../../backend/src/types"; // I think this is bad code.

export type WorkflowType = BackendWorkflowResponseType;
export type JobType = BackendJobResponseType;
