import { useRef } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ReadOnlyInputProps {
  value: string;
  label?: string;
}

export function ReadOnlyInput({ value, label }: ReadOnlyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(inputRef.current.value);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor="readonly-input"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <div className="flex">
        <Input
          id="readonly-input"
          type="text"
          value={value}
          readOnly
          className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
          ref={inputRef}
        />
        <Button
          type="button"
          variant="outline"
          className="rounded-l-none border-l-0"
          onClick={handleCopy}
          aria-label="Copy to clipboard"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
