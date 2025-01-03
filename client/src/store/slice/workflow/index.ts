import { workflowState } from "./workflowState";

export const {
  addWorkflows,
  updateActiveWorkflow,
  deleteWorkflow,
  updateJob,
  deleteJob,
  getWorkflowsById,
  updateWorkflowActiveStatus,
} = workflowState.actions;

export default workflowState.reducer;
