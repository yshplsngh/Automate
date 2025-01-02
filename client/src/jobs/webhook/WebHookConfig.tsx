import { ReadOnlyInput } from "@/components/readonly-input";
import { JobDataType } from "@/types";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export type WebhookJobDataType = Extract<JobDataType, { key: "webhook" }>;

interface WebhookJobConfigurationProps {
  jobData?: JobDataType;
}

export const WebhookJobConfiguration = forwardRef(
  ({ jobData }: WebhookJobConfigurationProps, ref) => {
    const [url, setUrl] = useState<string>("https://example.com");

    useEffect(() => {
      if (!jobData) return;
      const data = jobData as WebhookJobDataType;
      setUrl(data.input.webhookUrl);
    }, [jobData]);

    useImperativeHandle(ref, () => ({
      submitHandler: () => {
        return handleSubmit();
      },
    }));

    const handleSubmit = () => {
      const WebhookJob = {
        key: "webhook",
        input: {
          webhookUrl: url,
        },
      } as WebhookJobDataType;
      return WebhookJob;
    };
    return (
      <div className="w-full h-24">
        <ReadOnlyInput value={url} />
      </div>
    );
  }
);
