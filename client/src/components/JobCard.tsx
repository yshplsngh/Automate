import React, { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ConfigureStepModal } from "./ConfigureStepModal";

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
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isConfigured?: boolean;
  showPlus?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({
  title,
  subtitle,
  icon,
  isConfigured = true,
  showPlus,
}) => {
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
            <div className="bg-white p-2 rounded-full shadow-sm">{icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isConfigured && (
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
      <Tail
        onClick={() => console.log("Adding new step")}
        showPlus={showPlus}
      />
      <ConfigureStepModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Configure ${title}`}
      />
    </>
  );
};

export function ZapCard() {
  const PlaceHolderSteps = [
    {
      type: "trigger",
      title: "Trigger",
      subtitle: "Set a trigger",
      icon: "/placeholder.svg?height=24&width=24",
      isConfigured: true,
      stepId: 1,
    },
    {
      type: "action",
      title: "Action",
      subtitle: "Set an action",
      icon: "/placeholder.svg?height=24&width=24",
      isConfigured: true,
      stepId: 2,
    },
  ];

  return (
    <div className="w-[400px] p-4 rounded-xl">
      {PlaceHolderSteps.map((step, index) => (
        <StepCard
          key={index}
          title={step.title}
          subtitle={step.subtitle}
          icon={
            <img
              src={step.icon}
              alt={`${step.title} icon`}
              className="h-6 w-6"
            />
          }
          isConfigured={step.isConfigured}
          showPlus={index === PlaceHolderSteps.length - 1}
        />
      ))}
    </div>
  );
}
