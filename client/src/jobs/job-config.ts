import {
  ChevronsLeftRightEllipsis,
  Webhook,
  CalendarCheck,
} from "lucide-react";
import { HttpForm } from "@/jobs/http/HttpConfigForm";
import { ScheduleConfig } from "@/jobs/schedule/scheduleConfig";
import { WebhookJobConfiguration } from "./webhook/WebHookConfig";

export const jobConfig = [
  {
    id: 1,
    key: "http",
    name: "Http",
    description: "Send an HTTP request to a URL",
    icon: ChevronsLeftRightEllipsis,
    configForm: HttpForm,
    setupForm: ScheduleConfig,
    validateData: (
      trigger: boolean,
      configData?: HttpJob,
      setupdata?: Schedule
    ) => {
      if (trigger && !setupdata) {
        return "Schedule is required for event-triggered jobs";
      }
      let t = trigger ? "trigger" : "action";
      return {
        trigger: trigger,
        data: configData,
        type: t,
        schedule: setupdata,
      } as Job;
    },
  },
  {
    id: 2,
    key: "webhook",
    name: "Webhook",
    description: "Send a webhook to a URL",
    icon: Webhook,
    configForm: WebhookJobConfiguration,
    setupForm: undefined,
    validateData: (trigger: boolean, configData?: WebhookJob): Job | string => {
      if (!trigger) {
        return "Webhook jobs must be triggered";
      }
      if (!configData || !configData.webhoookUrl) {
        return "Webhook URL is required.";
      }

      return {
        trigger: trigger,
        data: configData,
        type: "trigger",
      } as Job;
    },
  },
  {
    id: 3,
    key: "schedule",
    name: "Schedule",
    description: "Schedule a job to run at a specific time",
    icon: CalendarCheck,
    configForm: ScheduleConfig,
    setupForm: undefined,
    validateData: (trigger: boolean, configData?: Schedule) => {
      if (!trigger) {
        return "Schedule jobs must be triggered";
      }
      if (!configData) {
        return "A valid schedule is required for Schedule jobs.";
      }

      return {
        trigger: trigger,
        data: null,
        type: "trigger",
        schedule: configData,
      } as Job;
    },
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
  trigger: true;
};

export type ScheduleJob = {
  key: "schedule";
  schedule: Schedule;
  trigger: true;
};

export type Job = {
  type: "trigger" | "action";
  data: HttpJob | WebhookJob | ScheduleJob | null;
  schedule?: Schedule;
  trigger?: boolean;
};
