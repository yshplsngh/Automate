export type WebhookJob = {
  type: "webhook";
  key: "webhook";
  name: "Webhook";
  description: "Triggers (immediately if configured) when the webhook receives a request.";
  input: [{}];
  output: [
    {
      key: "req.body";
      type: "json";
    }
  ];
  configuration: [
    {
      text: "url";
    }
  ];
  trigger: true;
};
