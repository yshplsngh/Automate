"use client";

import { Mail, X, Maximize2, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConfigureStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
}

export function ConfigureStepModal({
  isOpen,
  onClose,
  title,
  subtitle,
}: ConfigureStepModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 border border-indigo-100">
        <DialogHeader className="p-4 space-y-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded">
                <Mail className="h-5 w-5 text-orange-600" />
              </div>
              <DialogTitle className="text-lg font-semibold">
                1. New Inbound Email
              </DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              {/* <Button variant="ghost" size="icon" className="h-8 w-8">
                <Maximize2 className="h-4 w-4" />
              </Button> */}
              {/* <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button> */}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 border-b">
            {["Setup", "Configure", "Test"].map((step, index) => (
              <div
                key={step}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
                  index === 0 ? "border-indigo-600" : "border-transparent"
                }`}
              >
                <span className="text-sm font-medium">{step}</span>
                <div className="rounded-full bg-neutral-300 p-0.5">
                  <Check className="h-3 w-3 text-neutral-500" />
                </div>
                {index < 2 && (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              App
              <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md">
                <Mail className="h-5 w-5 text-orange-600" />
                <span className="text-sm">Email by Zapier</span>
              </div>
              <Button variant="outline" size="sm" className="text-indigo-600">
                Change
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              Trigger event
              <span className="text-red-500">*</span>
            </label>
            <Select defaultValue="new-inbound">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select trigger event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-inbound">New Inbound Email</SelectItem>
                <SelectItem value="new-outbound">New Outbound Email</SelectItem>
                <SelectItem value="new-draft">New Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-4 mt-auto">
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
