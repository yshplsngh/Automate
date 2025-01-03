import { WorkflowType, JobType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkflowState {
  workflows: WorkflowType[];
  activeWorkflow: WorkflowType | undefined;
}

const initialState: WorkflowState = {
  workflows: [],
  activeWorkflow: undefined,
};

export const workflowState = createSlice({
  name: "workflowState",
  initialState: initialState,
  reducers: {
    addWorkflows: (state, action: PayloadAction<WorkflowType[]>) => {
      state.workflows = action.payload;
    },
    getWorkflowsById: (state, action: PayloadAction<string>) => {
      state.workflows = state.workflows.filter(
        (workflow) => workflow.id === action.payload
      );
    },
    updateActiveWorkflow: (state, action: PayloadAction<WorkflowType>) => {
      state.activeWorkflow = action.payload;
    },
    updateWorkflowActiveStatus: (
      state,
      action: PayloadAction<{ id: string; active: boolean }>
    ) => {
      const index = state.workflows.findIndex(
        (w) => w.id === action.payload.id
      );
      if (state.workflows[index]) {
        state.workflows[index].active = action.payload.active;
      }
    },
    deleteWorkflow: (state, action: PayloadAction<string>) => {
      state.workflows = state.workflows.filter(
        (workflow) => workflow.id !== action.payload
      );
    },
    updateJob: (state, action: PayloadAction<JobType>) => {
      if (state.activeWorkflow) {
        state.activeWorkflow.jobs[action.payload.step_no - 1] = action.payload;
      }
    },
    deleteJob: (state, action: PayloadAction<JobType>) => {
      const index = state.workflows.findIndex(
        (workflow) => workflow.id === action.payload.id
      );
      if (state.workflows[index] && state.workflows[index].jobs) {
        state.workflows[index].jobs = state.workflows[index].jobs.filter(
          (job) => job.step_no !== action.payload.step_no
        );
      }
    },
  },
});

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
