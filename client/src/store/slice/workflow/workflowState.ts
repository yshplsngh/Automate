import { Job, TypeWorkFlow } from "@/jobs/job-config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkflowState {
  workflows: TypeWorkFlow[];
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
        (workflow) => workflow.workflowId === action.payload
      );
    },
    addWorkflow: (state, action: PayloadAction<TypeWorkFlow>) => {
      state.workflows.push(action.payload);
    },
    updateWorkflow: (state, action: PayloadAction<TypeWorkFlow>) => {
      const index = state.workflows.findIndex(
        (workflow) => workflow.workflowId === action.payload.workflowId
      );
      state.workflows[index] = action.payload;
    },
    deleteWorkflow: (state, action: PayloadAction<string>) => {
      state.workflows = state.workflows.filter(
        (workflow) => workflow.workflowId !== action.payload
      );
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.workflows.findIndex(
        (workflow) => workflow.workflowId === action.payload.workflowId
      );
      state.workflows[index].jobs[action.payload.step] = action.payload;
    },
    deleteJob: (state, action: PayloadAction<Job>) => {
      const index = state.workflows.findIndex(
        (workflow) => workflow.workflowId === action.payload.workflowId
      );
      state.workflows[index].jobs = state.workflows[index].jobs.filter(
        (job) => job.step !== action.payload.step
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
