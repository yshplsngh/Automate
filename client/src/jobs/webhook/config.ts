export type WebhookJob = {
  type: "webhook";
  key: "webhook";
  name: string;
  description: string;
  input: Record<string, unknown>[];
  output: Array<{
    key: string;
    type: "json" | "string" | "number" | "boolean";
  }>;
  trigger: boolean;
  configureComponent: React.FC;
};
