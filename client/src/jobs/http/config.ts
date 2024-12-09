type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type HttpJob = {
  type: "http";
  key: "http";
  name: "HTTP";
  description: "Send a Http Request to a specified URL";
  input: [
    {
      url: string;
    },
    {
      method: HttpMethod;
    },
    {
      headers: { [key: string]: string };
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
      headers: string;
    },
    {
      body: string;
    }
  ];
  trigger: boolean;
  interval?: number; // in minutes, should be set if the trigger is true
};
