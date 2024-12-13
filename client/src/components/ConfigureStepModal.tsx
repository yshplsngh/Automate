import { useState, useEffect } from "react";
import { Check, ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { jobConfig, JobData } from "@/jobs/job-config";
import { AppDropdownWithDescription } from "./AppDropdown";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface ConfigureStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  trigger: boolean;
}

export function ConfigureStepModal({
  isOpen,
  onClose,
  title,
  trigger,
}: ConfigureStepModalProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [jobData, setJobData] = useState<JobData>();
  const [activeTab, setActiveTab] = useState<"setup" | "configure" | "test">(
    "setup"
  );
  const [enabledTabs, setEnabledTabs] = useState<string[]>(["setup"]);
  const [selectedApp, setSelectedApp] = React.useState<
    (typeof jobConfig)[0] | null
  >(null);

  useEffect(() => {
    console.log(jobData);
  }, [jobData]);

  const handleContinue = () => {
    if (activeTab === "setup") {
      setEnabledTabs((prev) => [...prev, "configure"]);
      setActiveTab("configure");
    } else if (activeTab === "configure") {
      setEnabledTabs((prev) => [...prev, "test"]);
      setActiveTab("test");
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setDescription(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] min-h-96 p-0 gap-0 border border-indigo-100 flex flex-col">
        <DialogHeader className="p-4 space-y-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded">
                <Mail className="h-5 w-5 text-orange-600" />
              </div>
              <DialogTitle className="text-lg font-semibold">
                {title}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "setup" | "configure" | "test")
          }
          className="w-full h-full"
        >
          <TabsList className="flex flex-row justify-start w-full bg-inherit">
            {["Setup", "Configure", "Test"].map((step, index) => {
              return (
                <TabsTrigger
                  key={step}
                  value={step.toLowerCase()}
                  disabled={!enabledTabs.includes(step.toLowerCase())}
                  className={`h-10 w-auto ${
                    activeTab === step.toLowerCase()
                      ? "border-b-2 border-indigo-600"
                      : ""
                  }`}
                >
                  <div
                    key={step}
                    className={`flex items-center gap-2 px-4 py-2 border-b-2`}
                  >
                    <span className="text-sm font-medium">{step}</span>
                    <div className="rounded-full bg-neutral-300 p-0.5">
                      <Check className="h-3 w-3 text-neutral-500" />
                    </div>

                    {index !== 2 && (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>
          <TabsContent
            value="setup"
            className="p-4 space-y-4 focus:outline-none"
          >
            <div className="space-y-2">
              <AppDropdownWithDescription
                selectedApp={selectedApp}
                setSelectedApp={setSelectedApp}
                trigger={trigger}
              />
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a name for your configuration"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter a description (max 200 characters)"
                  maxLength={200}
                />
                <p className="text-sm text-gray-500">
                  {description.length}/200 characters
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="configure" className="p-4">
            {selectedApp &&
              selectedApp.configForm &&
              React.createElement(
                selectedApp.configForm as unknown as React.ComponentType<{
                  jobData: JobData;
                  onSubmit: (data: JobData) => void;
                }>,
                {
                  jobData: jobData as JobData,
                  onSubmit: (data: JobData) => {
                    console.log("configdata::", data);
                    setJobData(data);
                  },
                }
              )}
          </TabsContent>
          <TabsContent value="test" className="p-4">
            <h3 className="text-lg font-semibold mb-4">
              Test your configuration
            </h3>
            <p className="mb-4">
              Send a test email to verify your setup is working correctly.
            </p>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Send Test Email
            </Button>
          </TabsContent>
        </Tabs>

        <div className="p-4 mt-auto">
          <Button
            onClick={handleContinue}
            disabled={activeTab === "test"} // Disable "Continue" on the last tab
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {activeTab === "test" ? "Finish" : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
