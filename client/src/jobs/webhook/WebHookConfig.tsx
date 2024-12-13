import { ReadOnlyInput } from "@/components/readonly-input";
import { JobData, WebhookJob } from "../job-config";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface WebhookJobConfigurationProps {
  jobData?: JobData;
  onSubmit: (value: JobData) => void;
}

export const WebhookJobConfiguration: React.FC<
  WebhookJobConfigurationProps
> = ({ jobData, onSubmit }: WebhookJobConfigurationProps) => {
  const [url, setUrl] = useState<string>("https://example.com");

  useEffect(() => {
    if (!jobData) return;
    const data = jobData as WebhookJob;
    setUrl(data.webhoookUrl);
  }, [jobData]);

  const onSubmitHandler = () => {
    const WebhookJob = {
      key: "webhook",
      webhoookUrl: url,
    } as WebhookJob;
    onSubmit(WebhookJob);
  };
  return (
    <div className="w-full h-24">
      <ReadOnlyInput value={url} />
      <Button onClick={onSubmitHandler}>Submit</Button>
    </div>
  );
};
