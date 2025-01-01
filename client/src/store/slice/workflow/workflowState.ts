import { WorkflowType, JobType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkflowState {
  workflows: WorkflowType[];
}

const initialState: WorkflowState = {
  workflows: [],
};

export const workflowState = createSlice({
  name: "workflowState",
  initialState: initialState,
  reducers: {
    getWorkflowsById: (state, action: PayloadAction<string>) => {
      state.workflows = state.workflows.filter(
        (workflow) => workflow.id === action.payload
      );
    },
    addWorkflow: (state, action: PayloadAction<WorkflowType>) => {
      state.workflows.push(action.payload);
    },
    updateWorkflow: (state, action: PayloadAction<WorkflowType>) => {
      const index = state.workflows.findIndex(
        (workflow) => workflow.id === action.payload.id
      );
      state.workflows[index] = action.payload;
    },
    deleteWorkflow: (state, action: PayloadAction<string>) => {
      state.workflows = state.workflows.filter(
        (workflow) => workflow.id !== action.payload
      );
    },
    updateJob: (state, action: PayloadAction<JobType>) => {
      const index = state.workflows.findIndex(
        (workflow) => workflow.id === action.payload.id
      );
      state.workflows[index].jobs[action.payload.step_no - 1] = action.payload;
    },
    deleteJob: (state, action: PayloadAction<JobType>) => {
      const index = state.workflows.findIndex(
        (workflow) => workflow.id === action.payload.id
      );
      state.workflows[index].jobs = state.workflows[index].jobs.filter(
        (job) => job.step_no !== action.payload.step_no
      );
    },
  },
});

export const {
  addWorkflow,
  updateWorkflow,
  deleteWorkflow,
  updateJob,
  deleteJob,
  getWorkflowsById,
} = workflowState.actions;
export default workflowState.reducer;
