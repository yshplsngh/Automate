import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function DateTimeIntervalSelector() {
  const [isDateTimeMode, setIsDateTimeMode] = useState(true);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("12:00");
  const [timezone, setTimezone] = useState<string>("UTC");
  const [intervalType, setIntervalType] = useState<string>("minute");
  const [intervalAmount, setIntervalAmount] = useState<number>(1);

  return (
    <div className="space-y-4 w-full  p-4 bg-inherit rounded-lg shadow">
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
                    selected={date}
                    onSelect={setDate}
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
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                <SelectItem value="America/Chicago">Central Time</SelectItem>
                <SelectItem value="America/Denver">Mountain Time</SelectItem>
                <SelectItem value="America/Los_Angeles">
                  Pacific Time
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="interval-type">Interval Type</Label>
            <Select value={intervalType} onValueChange={setIntervalType}>
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
}
