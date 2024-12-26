"use client";

import * as React from "react";
import {
  Code,
  FileText,
  Filter,
  Folder,
  CloudLightningIcon as Lightning,
  Mail,
  MoreVertical,
  Plus,
  Rss,
  Search,
  Share2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Custom purple theme
const purpleTheme = {
  primary: "bg-purple-600 text-white hover:bg-purple-700",
  secondary: "bg-purple-100 text-purple-900 hover:bg-purple-200",
  muted: "text-purple-600",
  border: "border-purple-200",
};

interface Zap {
  id: string;
  name: string;
  apps: string[];
  location: string;
  lastModified: string;
  status: boolean;
  owner: string;
}

const zaps: Zap[] = [
  {
    id: "1",
    name: "Untitled Zap",
    apps: ["gmail"],
    location: "Testing (Personal)",
    lastModified: "2 days ago",
    status: false,
    owner: "T",
  },
  {
    id: "2",
    name: "Untitled Zap",
    apps: ["gmail"],
    location: "Testing (Personal)",
    lastModified: "7 days ago",
    status: false,
    owner: "T",
  },
  {
    id: "3",
    name: "Untitled Zap",
    apps: ["gmail"],
    location: "Testing (Personal)",
    lastModified: "Dec 2, 2024",
    status: false,
    owner: "T",
  },
  {
    id: "4",
    name: "Untitled Zap",
    apps: ["share2", "filter"],
    location: "Testing (Personal)",
    lastModified: "Nov 30, 2024",
    status: false,
    owner: "T",
  },
  {
    id: "5",
    name: "Untitled Zap",
    apps: ["file", "drive"],
    location: "Testing (Personal)",
    lastModified: "Nov 26, 2024",
    status: false,
    owner: "T",
  },
];

export default function ZapsInterface() {
  return (
    <div className="p-6 dark:bg-neutral-800 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Zaps</h1>
          <Tabs defaultValue="zaps">
            <TabsList className={purpleTheme.border}>
              <TabsTrigger
                value="zaps"
                className={cn("flex items-center gap-2", purpleTheme.secondary)}
              >
                <Lightning className="h-4 w-4" />
                Zaps
              </TabsTrigger>
              <TabsTrigger
                value="folders"
                className={cn("flex items-center gap-2", purpleTheme.secondary)}
              >
                <Folder className="h-4 w-4" />
                Folders
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={purpleTheme.secondary}>
                All
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Zaps</DropdownMenuItem>
              <DropdownMenuItem>My Zaps</DropdownMenuItem>
              <DropdownMenuItem>Shared Zaps</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            className={cn("flex items-center gap-2", purpleTheme.secondary)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className={purpleTheme.muted}>
            <Trash2 className="h-5 w-5" />
          </Button>
          <Button
            className={cn("flex items-center gap-2", purpleTheme.primary)}
          >
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or webhook" className="pl-8" />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Apps</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Last modified</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {zaps.map((zap) => (
            <TableRow key={zap.id}>
              <TableCell className="flex items-center gap-2">
                <Lightning className="h-4 w-4 text-muted-foreground" />
                {zap.name}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {zap.apps.map((app, index) => {
                    const Icon =
                      {
                        gmail: Mail,
                        share2: Share2,
                        filter: Filter,
                        file: FileText,
                        drive: Code,
                        rss: Rss,
                      }[app] || Mail;
                    return (
                      <div
                        key={index}
                        className="flex h-6 w-6 items-center justify-center rounded border bg-purple-100 dark:bg-gray-100 dark:text-purple-700"
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                    );
                  })}
                </div>
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-muted-foreground" />
                {zap.location}
              </TableCell>
              <TableCell>{zap.lastModified}</TableCell>
              <TableCell>
                <Switch
                  onCheckedChange={() => {
                    console.log("toggle swith");
                  }}
                  className="data-[state=checked]:bg-purple-400 data-[state=unchecked]:bg-gray-200"
                />
              </TableCell>
              <TableCell>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  {zap.owner}
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
