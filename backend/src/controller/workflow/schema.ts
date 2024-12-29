import { z } from "zod";
import { Apps, JobDataSchema, JobType } from "../../schema";

export const NewWorkflowCreateSchema = z.object({});

export const JobCreateSchema = z.object({
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
  description: z.string().optional(),
  jobs: z.array(JobCreateSchema),
});
