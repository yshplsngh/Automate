import { JobCreateSchema, WorkflowCreateSchema } from "./controller/workflow/schema";
import {JobDataSchema} from "./schema/jobSchema"
import {z} from "zod"

export type WorkflowResponseType = z.infer<typeof WorkflowCreateSchema>
export type JobResponseType = z.infer<typeof JobCreateSchema>
export type JobDataType = z.infer<typeof JobDataSchema>