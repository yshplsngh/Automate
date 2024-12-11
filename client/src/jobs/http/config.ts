type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD";

export type HttpJob = {
  type: "http";
  key: "http";
  name: "HTTP";
  description: "Send an HTTP request to a specified URL.";
  input: [
    {
      url: string;
    },
    {
      method: HttpMethod;
    },
    {
      headers: Record<string, string>;
    },
    {
      body: string;
    }
  ];
  output: [
    {
      statusCode: number;
    },
    {
      headers: Record<string, string>;
    },
    {
      body: string;
    }
  ];
  trigger: boolean;
  interval?: {
    unit: "minute" | "hour" | "day" | "week" | "month";
    value: number; // Example: every `value` units
  };
  specificTime?: {
    date: string; // YYYY-MM-DD format
    time: string; // HH:mm:ss format
    timeZone: string; // e.g., "America/New_York"
  };
  setupComponent: React.FC;
  configureComponent: React.FC;
};
