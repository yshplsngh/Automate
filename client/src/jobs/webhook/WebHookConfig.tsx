import { ReadOnlyInput } from "@/components/readonly-input";
import { JobData, WebhookJob } from "../job-config";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface WebhookJobConfigurationProps {
  jobData?: JobData;
}

export const WebhookJobConfiguration = forwardRef(
  ({ jobData }: WebhookJobConfigurationProps, ref) => {
    const [url, setUrl] = useState<string>("https://example.com");

    useEffect(() => {
      if (!jobData) return;
      const data = jobData as WebhookJob;
      setUrl(data.webhoookUrl);
    }, [jobData]);

    useImperativeHandle(ref, () => ({
      submitHandler: () => {
        return handleSubmit();
      },
    }));

    const handleSubmit = () => {
      const WebhookJob = {
        key: "webhook",
        webhoookUrl: url,
      } as WebhookJob;
      return WebhookJob;
    };
    return (
      <div className="w-full h-24">
        <ReadOnlyInput value={url} />
      </div>
    );
  }
);
