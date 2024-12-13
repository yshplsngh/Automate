import React from "react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScheduleComponentProps {
  isDateTimeMode: boolean;
  setIsDateTimeMode: (value: boolean) => void;
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
  time: string;
  setTime: (value: string) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  intervalType: "minute" | "hour" | "day" | "week" | "month";
  setIntervalType: (
    value: "minute" | "hour" | "day" | "week" | "month"
  ) => void;
  intervalAmount: number;
  setIntervalAmount: (value: number) => void;
  handleSubmit?: () => void;
}

const ScheduleComponent: React.FC<ScheduleComponentProps> = ({
  isDateTimeMode,
  setIsDateTimeMode,
  date,
  setDate,
  time,
  setTime,
  timezone,
  setTimezone,
  intervalType,
  setIntervalType,
  intervalAmount,
  setIntervalAmount,
}) => {
  return (
    <div className="space-y-4 w-full p-4 bg-inherit rounded-lg shadow">
      <div className="flex items-center justify-between w-full">
        <Label htmlFor="mode-toggle">Date/Time Mode</Label>
        <Switch
          id="mode-toggle"
          checked={isDateTimeMode}
          onCheckedChange={setIsDateTimeMode}
        />
      </div>

      {isDateTimeMode ? (
        <>
          <div className="flex flex-row gap-6">
            <div className="space-y-2 flex-1">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date || undefined}
                    onSelect={(value) => setDate(value ?? undefined)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Z">UTC (+00:00)</SelectItem>
                <SelectItem value="+05:30">
                  Indian Standard Time (IST) (+05:30)
                </SelectItem>
                <SelectItem value="-05:00">
                  Eastern Time (ET) (-05:00)
                </SelectItem>
                <SelectItem value="-06:00">
                  Central Time (CT) (-06:00)
                </SelectItem>
                <SelectItem value="-07:00">
                  Mountain Time (MT)(-07:00)
                </SelectItem>
                <SelectItem value="-08:00">
                  Pacific Time (PT)(-08:00)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="interval-type">Interval Type</Label>
            <Select
              value={intervalType}
              onValueChange={(value) =>
                setIntervalType(
                  value as "minute" | "hour" | "day" | "week" | "month"
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select interval type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minute">Minute</SelectItem>
                <SelectItem value="hour">Hour</SelectItem>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interval-amount">Interval Amount</Label>
            <Input
              id="interval-amount"
              type="number"
              min={10}
              max={1000}
              value={intervalAmount}
              onChange={(e) => setIntervalAmount(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ScheduleComponent;
