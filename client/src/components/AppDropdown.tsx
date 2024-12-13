import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { jobConfig } from "@/jobs/job-config";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

export function AppDropdownWithDescription({
  selectedApp,
  setSelectedApp,
  trigger,
}: {
  selectedApp: (typeof jobConfig)[0] | null;
  setSelectedApp: React.Dispatch<
    React.SetStateAction<(typeof jobConfig)[0] | null>
  >;
  trigger: boolean;
}): JSX.Element {
  return (
    <div className="w-full max-w-[450px] space-y-1">
      <label
        htmlFor="app-select"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        App <span className="text-red-500">*</span>
      </label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            id="app-select"
            variant="outline"
            className="w-full justify-between"
            aria-label="Select an app"
          >
            {selectedApp ? (
              <div className="flex items-center gap-2">
                {selectedApp.icon("h-5 w-5 shrink-0")}
                {selectedApp.name}
              </div>
            ) : (
              <span className="text-muted-foreground">Select app...</span>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[450px] bg-gray-50">
          {jobConfig
            .filter((app) => !(trigger && app.trigger !== trigger))
            .map((app) => (
              <DropdownMenuItem
                key={app.id}
                onSelect={() => setSelectedApp(app)}
                className="flex items-start gap-3 p-2 cursor-pointer hover:bg-slate-200"
              >
                {app.icon("h-5 w-5 shrink-0 mt-0.5 text-muted-foreground")}
                <div className="flex flex-col">
                  <span className="font-medium">{app.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {app.description}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
