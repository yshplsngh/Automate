import { workflowState } from "./workflowState";

export const {
  addWorkflow,
  updateWorkflow,
  deleteWorkflow,
  updateJob,
  deleteJob,
  getWorkflowsById,
} = workflowState.actions;

export default workflowState.reducer;
