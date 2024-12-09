export const WebhookJob = {
  name: "Webhook",
  key: "webhook",
  description:
    "Triggers (immediately if configured) when the webhook receives a request.",
  input: [{}],
  output: [
    {
      key: "req.body",
      type: "json",
    },
  ],
  configuration: [
    {
      text: "url",
    },
  ],
};
