// export type Apps = "http" | "webhook" | "schedule";

// export type JobType = "action" | "trigger";

// export interface Schedule {
//   type: "fixed" | "interval";
//   fixedTime?: {
//     dateTime: string; // ISO 8601 format: YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss±hh:mm
//   };
//   interval?: {
//     unit: "minute" | "hour" | "day" | "week" | "month";
//     value: number;
//   };
// }

// type HttpMethods =
//   | "GET"
//   | "POST"
//   | "PUT"
//   | "PATCH"
//   | "DELETE"
//   | "OPTIONS"
//   | "HEAD";

// export interface HttpJob {
//   key: "http";
//   input: {
//     url: string;
//     method: HttpMethods;
//     headers: Record<string, string>;
//     parameters: Record<string, string>;
//     body: string;
//   };
//   output?: {
//     statusCode: number;
//     headers: Record<string, string>;
//     body: string;
//   };
// }

// export interface WebhookJob {
//   key: "webhook";
//   webhoookUrl: string;
//   output?: Array<{
//     data: string;
//     type: "json" | "string" | "number" | "boolean";
//   }>;
// }

// export interface ScheduleJob {
//   key: "schedule";
//   schedule: Schedule;
// }

// export type JobData = HttpJob | WebhookJob | ScheduleJob;

// export interface Job {
//   id: string;
//   workflow_id: string;
//   type: JobType;
//   step_no: number;
//   name: string;
//   description?: string | null;
//   app: Apps;
//   data: JobData;
// }

// export type Workflow = {
//   id: string;
//   name: string;
//   description?: string | null;
//   owner_id: string;
//   job_count: number;
//   active: boolean;
//   apps: Apps[];
//   created_at: Date;
//   updated_at: Date;
//   jobs: Job[];
// };

import { Job, Workflow } from "@prisma/client";

export type WorkflowType = Workflow & {
  jobs: Job[];
};

export type JobType = Job;
