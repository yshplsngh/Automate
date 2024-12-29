import { z } from "zod";
import { JobDataSchema } from "./jobSchema";

export const WorkflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  owner_id: z.string(),
  job_count: z.number().default(0),
  active: z.boolean().default(false),
  apps: z.array(z.enum(["http", "webhook", "schedule"])),
  created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  jobs: z.array(JobDataSchema),
});
