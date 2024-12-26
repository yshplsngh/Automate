import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";

interface TopBarProps {
  workflowTitle: string;
  setWorkflowTitle: (title: string) => void;
  saveWorkflowFn: () => void;
  saveLoading: boolean;
}

export function TopBar({
  workflowTitle,
  setWorkflowTitle,
  saveWorkflowFn,
  saveLoading,
}: TopBarProps) {
  return (
    <div className="flex h-12 items-center justify-between border-b bg-background px-4">
      <SidebarTrigger className="w-8 h-8" />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-foreground">
          <div className="flex items-center gap-2">
            <div className="sm:flex hidden h-5 w-5 items-center justify-center rounded bg-emerald-600 text-xs font-medium">
              {workflowTitle.slice(0, 1).toUpperCase()}
            </div>
            <Input
              value={workflowTitle}
              onChange={(e) => setWorkflowTitle(e.target.value)}
              className="focus-visible:ring-transparent border-neutral-600"
            />
          </div>
        </div>
      </div>
      <Button
        variant="default"
        disabled={saveLoading}
        onClick={saveWorkflowFn}
        className="bg-neutral-800 dark:bg-slate-100"
      >
        Save
      </Button>
    </div>
  );
}
