import React, { createElement, useEffect, useState } from "react";
import { Plus, MoreVertical, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ConfigureStepModal } from "./ConfigureStepModal";
import { Job, jobConfig } from "@/jobs/job-config";

const Tail = ({
  onClick,
  showPlus = false,
}: {
  onClick: () => void;
  showPlus?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center my-1">
      <div className="w-0.5 h-6 bg-slate-500 dark:bg-blue-200"></div>
      {showPlus && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-2 border-blue-500 bg-white hover:bg-blue-50"
          onClick={onClick}
        >
          <Plus className="h-4 w-4 text-blue-500" />
        </Button>
      )}
    </div>
  );
};

interface StepCardProps {
  data: Steps;
  showPlus?: boolean;
  addStep: () => void;
  stepNumber: number;
}

const StepCard: React.FC<StepCardProps> = ({ data, showPlus, addStep, stepNumber }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card
        className="w-full mb-2 border-none shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        onClick={handleCardClick}
      >
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-full shadow-sm dark:text-black">
              {data.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {data.title}
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {data.isConfigured && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 dark:hover:bg-zinc-300"
              onClick={(e) => {
                e.stopPropagation();
                console.log("More options clicked");
              }}
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
      </Card>
      <Tail onClick={addStep} showPlus={showPlus} />
      <ConfigureStepModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${data.title}`}
        trigger={data.type === "trigger"}
        stepNumber={stepNumber}
      />
    </>
  );
};

interface Steps {
  title: string;
  type: "trigger" | "action";
  icon: any;
  stepNumber: number;
  job?: Job;
  isConfigured: boolean;
}

interface ZapCardProps {
  jobs?: Job[];
}

export function ZapCard({ jobs }: ZapCardProps) {
  const [steps, setSteps] = useState<Steps[]>([]); // Fix type annotation here

  const addStep = () => {
    console.log("Adding a new step");
    setSteps((prev) => [
      ...prev,
      {
        title: "Add a new step",
        type: "action",
        stepNumber: prev.length + 1, 
        icon: createElement(Zap),
        job: {} as Job,
        isConfigured: false,
      },
    ]);
  };

  useEffect(() => {
    if (!jobs || jobs.length === 0) {
      setSteps([
        {
          title: "Add a new trigger",
          type: "trigger",
          stepNumber: 1,
          icon: createElement(Zap),
          job: {} as Job,
          isConfigured: false,
        },
        {
          title: "Add a new action",
          type: "action",
          stepNumber: 2,
          icon: createElement(Zap),
          job: {} as Job,
          isConfigured: false,
        },
      ]);
      return;
    }

    const mappedSteps: Steps[] = jobs.map((job, index) => ({
      title: job.name,
      type: job.type,
      stepNumber: index + 1, 
      icon:
        jobConfig.find((j) => j.key === job.app)?.icon || createElement(Zap),
      job,
      isConfigured: true,
    }));

    if (jobs.length === 1) {
      mappedSteps.push({
        title: "Add a new step",
        type: "action",
        stepNumber: jobs.length + 1,
        icon: createElement(Zap),
        job: {} as Job,
        isConfigured: false,
      });
    }

    setSteps(mappedSteps); 
  }, [jobs]);

  return (
    <div className="w-[400px] p-4 rounded-xl">
      {steps.map((step, index) => (
        <StepCard
          key={index}
          data={step}
          showPlus={index === steps.length - 1}
          addStep={addStep}
          stepNumber={step.stepNumber}
        />
      ))}
    </div>
  );
}
