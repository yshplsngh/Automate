import { ReadOnlyInput } from "@/components/readonly-input";

export const WebhookJobConfiguration: React.FC = () => {
  const url = "https://example.com/";
  return (
    <div className="w-full h-24">
      <ReadOnlyInput value={url} />
    </div>
  );
};
