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
    <div className="flex h-12 items-center justify-between border-b border-border bg-backgroud dark:bg-zinc-900 px-4">
      <SidebarTrigger className="w-8 h-8" />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-foreground dark:text-gray-200">
          <div className="flex items-center gap-2">
            <div className="sm:flex hidden h-5 w-5 items-center justify-center rounded bg-emerald-600 text-white text-xs font-medium">
              {workflowTitle.slice(0, 1).toUpperCase()}
            </div>
            <Input
              value={workflowTitle}
              onChange={(e) => setWorkflowTitle(e.target.value)}
              className="focus-visible:ring-transparent border-neutral-600 bg-background text-foreground dark:bg-neutral-700 dark:text-gray-200 dark:border-gray-600"
            />
          </div>
        </div>
      </div>
      <Button
        variant="default"
        disabled={saveLoading}
        onClick={saveWorkflowFn}
        className="bg-primary text-primary-foreground hover:bg-primary/90 bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-900"
      >
        Save
      </Button>
    </div>
  );
}
