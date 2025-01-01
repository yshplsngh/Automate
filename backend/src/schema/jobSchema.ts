import { z } from "zod";

export const Apps = z.enum(["http", "webhook", "schedule"]);

export const JobType = z.enum(["trigger", "action"]);

export const HttpJobSchema = z.object({
  key: z.literal("http"),
  input: z.object({
    url: z.string().url(),
    method: z.enum([
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
      "HEAD",
    ]),
    headers: z.record(z.string()),
    parameters: z.record(z.string()),
    body: z.string(),
  }),
  output: z
    .object({
      statusCode: z.number(),
      headers: z.record(z.string()),
      body: z.string(),
    })
    .optional(),
});

export const WebhookJobSchema = z.object({
  key: z.literal("webhook"),
  webhookUrl: z.string().url(),
  output: z
    .array(
      z.object({
        data: z.string(),
        type: z.enum(["json", "string", "number", "boolean"]),
      })
    )
    .optional(),
});

const FixedTimeSchema = z.object({
  dateTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date-time format",
  }),
});

const IntervalSchema = z.object({
  unit: z.enum(["minute", "hour", "day", "week", "month"]),
  value: z.number().int().positive(),
});

export const ScheduleSchema = z
  .object({
    type: z.enum(["fixed", "interval"]),
    fixedTime: FixedTimeSchema.optional(),
    interval: IntervalSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.type === "fixed" && !data.fixedTime) {
        return false;
      }
      if (data.type === "interval" && !data.interval) {
        return false;
      }
      return true;
    },
    {
      message:
        "Either 'fixedTime' or 'interval' must be provided based on the 'type'.",
      path: ["fixedTime", "interval"],
    }
  );

export const JobDataSchema = z.union([
  HttpJobSchema,
  WebhookJobSchema,
  ScheduleSchema,
]);