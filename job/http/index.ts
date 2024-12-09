export const HttpJob = {
  name: "Http Request",
  key: "http",
  description: "Send a http request to a URL.",
  input: [
    {
      type: "string",
      key: "http-method",
      values: ["GET", "POST", "UPDATE", "DELETE"],
    },
    {
      type: "string",
      key: "http-url",
    },
    {
      type: "json",
      key: "http-body",
    },
    {
      type: "json",
      key: "http-header",
    },
  ],
  output: [
    {
      type: "number",
    },
  ],
};
