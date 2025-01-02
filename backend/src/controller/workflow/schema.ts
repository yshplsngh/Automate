import { z } from "zod";
import { Apps, JobDataSchema, JobType } from "../../schema";

export const NewWorkflowCreateSchema = z.object({});

export const JobCreateSchema = z.object({
  id: z.string(),
  workflow_id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  app: Apps,
  step_no: z.number(),
  type: JobType,
  data: JobDataSchema,
});

export type JobCreateDataType = z.infer<typeof JobCreateSchema>;

export const WorkflowCreateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  jobs: z.array(JobCreateSchema),
});

export const WorkflowResponseSchema = z.object({
  id: z.string(),
  owner_id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  apps: z.array(Apps),
  job_count: z.number(),
  active: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
  jobs: z.array(JobCreateSchema),
});
