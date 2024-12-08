import { Plus, MoreVertical, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

const Tail = ({ onClick, showPlus = false }: { onClick: () => void, showPlus?: boolean }) => {
  return (
    <div className="flex flex-col items-center my-1">
      <div className="w-0.5 h-6 bg-blue-200"></div>
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
  )
}

const StepCard = ({ title, subtitle, icon, isConfigured = true }: { title: string, subtitle: string, icon: React.ReactNode, isConfigured?: boolean }) => {
  return (
    <>
      <Card className="w-full mb-2 border-none shadow-md hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-full shadow-sm">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isConfigured && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
      </Card>
      <Tail onClick={() => console.log("Adding new step")} showPlus={false} />
    </>
  )
}

export function ZapCard() {
  const steps = [
    { title: "New Email", subtitle: "Gmail", icon: "/placeholder.svg?height=24&width=24", isConfigured: true },
    { title: "Send Outbound Email", subtitle: "Email by Zapier", icon: "/placeholder.svg?height=24&width=24", isConfigured: true },
  ];

  return (
    <div className="w-[400px] p-4 rounded-xl">
      {steps.map((step, index) => (
        <StepCard
          key={index}
          title={step.title}
          subtitle={step.subtitle}
          icon={<img src={step.icon} alt={`${step.title} icon`} className="h-6 w-6" />}
          isConfigured={step.isConfigured}
        />
      ))}
      <Card className="w-full mb-2 border-none shadow-md hover:shadow-lg transition-shadow duration-200 dark:bg-slate-100">
        <CardContent className="p-4">
          <Button 
            variant="outline" 
            className="w-full text-gray-600 hover:text-gray-800 justify-between"
          >
            <span>Select an Action</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
      <Tail onClick={() => console.log("Adding new step")} showPlus={true} />
    </div>
  )
}

