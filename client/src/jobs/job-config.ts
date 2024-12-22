import {
  ChevronsLeftRightEllipsis,
  Webhook,
  CalendarCheck,
} from "lucide-react";
import { HttpForm } from "@/jobs/http/HttpConfigForm";
import { ScheduleConfig } from "@/jobs/schedule/scheduleConfig";
import { WebhookJobConfiguration } from "./webhook/WebHookConfig";
import { createElement } from "react";

interface JobConfig {
  id: number;
  key: string;
  name: string;
  description: string;
  icon: (className?: string) => JSX.Element;
  configForm: React.ComponentType<any>;
  trigger: boolean;
}

export const jobConfig: JobConfig[] = [
  {
    id: 1,
    key: "http",
    name: "HTTP",
    description: "Send an HTTP request to a URL",
    icon: (className?: string) =>
      createElement(ChevronsLeftRightEllipsis, { className: className }),
    configForm: HttpForm,
    trigger: false,
  },
  {
    id: 2,
    key: "webhook",
    name: "Webhook",
    description: "Create a webhook as a trigger",
    icon: (className?: string) =>
      createElement(Webhook, { className: className }),
    configForm: WebhookJobConfiguration,
    trigger: true,
  },
  {
    id: 3,
    key: "schedule",
    name: "Schedule",
    description: "Schedule a job to run at a specific time",
    icon: (className?: string) =>
      createElement(CalendarCheck, { className: className }),
    configForm: ScheduleConfig,
    trigger: true,
  },
];

export type Schedule = {
  type: "fixed" | "interval";
  fixedTime?: {
    dateTime: string; // ISO 8601 format: YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss±hh:mm
  };
  interval?: {
    unit: "minute" | "hour" | "day" | "week" | "month";
    value: number;
  };
};

type HttpMethods =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD";

export type HttpJob = {
  key: "http";
  input: {
    url: string;
    method: HttpMethods;
    headers: Record<string, string>;
    parameters: Record<string, string>;
    body: string;
  };
  output?: {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
  };
};

export type WebhookJob = {
  key: "webhook";
  webhoookUrl: string;
  output?: Array<{
    data: string;
    type: "json" | "string" | "number" | "boolean";
  }>;
};

export type ScheduleJob = {
  key: "schedule";
  schedule: Schedule;
};

export type JobData = HttpJob | WebhookJob | ScheduleJob;

export type Job = {
  type: "trigger" | "action";
  step: number;
  name: string;
  descripton?: string;
  app: "http" | "webhook" | "schedule";
  data: JobData;
};
