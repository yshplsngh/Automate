import * as React from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"];

const sampleJson = JSON.stringify(
  {
    key: "value",
    number: 42,
    nested: {
      array: [1, 2, 3],
    },
  },
  null,
  2
);

interface KeyValuePair {
  key: string;
  value: string;
}

export function HttpForm() {
  const [jsonBody, setJsonBody] = React.useState(sampleJson);
  const [parameters, setParameters] = React.useState<KeyValuePair[]>([
    { key: "", value: "" },
  ]);
  const [headers, setHeaders] = React.useState<KeyValuePair[]>([
    { key: "", value: "" },
  ]);

  const addKeyValuePair = (
    setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>
  ) => {
    setter((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeKeyValuePair = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const updateKeyValuePair = (
    index: number,
    field: "key" | "value",
    value: string,
    setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>
  ) => {
    setter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="w-full space-y-4 bg-zinc-950 p-4 text-zinc-100">
      <div className="flex gap-2">
        <Select defaultValue="GET">
          <SelectTrigger className="w-[110px] bg-zinc-900 border-zinc-800 focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {methods.map((method) => (
              <SelectItem key={method} value={method} className="text-zinc-100">
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Enter URL"
          defaultValue="https://usebasin.com/f/8ffbfb3a8619"
          className="flex-1 bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-0"
        />
        <Button variant="ghost" size="icon" className="text-zinc-400">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="parameters" className="w-full">
        <TabsList className="bg-transparent border-b border-zinc-800 w-full justify-start h-auto gap-4">
          <TabsTrigger
            value="parameters"
            className="text-sm data-[state=active]:text-indigo-400 data-[state=active]:border-indigo-400 border-b-2 border-transparent data-[state=active]:bg-transparent rounded-none h-9"
          >
            Parameters
          </TabsTrigger>
          <TabsTrigger
            value="body"
            className="text-sm data-[state=active]:text-indigo-400 data-[state=active]:border-indigo-400 border-b-2 border-transparent data-[state=active]:bg-transparent rounded-none h-9"
          >
            Body
          </TabsTrigger>
          <TabsTrigger
            value="headers"
            className="text-sm data-[state=active]:text-indigo-400 data-[state=active]:border-indigo-400 border-b-2 border-transparent data-[state=active]:bg-transparent rounded-none h-9"
          >
            Headers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="parameters" className="mt-4">
          <div className="text-sm text-zinc-400 mb-2">Query Parameters</div>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="w-[200px] text-zinc-400 font-medium">
                  Key
                </TableHead>
                <TableHead className="text-zinc-400 font-medium">
                  Value
                </TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parameters.map((param, index) => (
                <TableRow
                  key={index}
                  className="border-zinc-800 hover:bg-transparent"
                >
                  <TableCell className="font-mono">
                    <Input
                      value={param.key}
                      onChange={(e) =>
                        updateKeyValuePair(
                          index,
                          "key",
                          e.target.value,
                          setParameters
                        )
                      }
                      placeholder="key"
                      className="bg-transparent border-0 h-8 p-0 placeholder:text-zinc-600 focus-visible:ring-0"
                    />
                  </TableCell>
                  <TableCell className="font-mono">
                    <Input
                      value={param.value}
                      onChange={(e) =>
                        updateKeyValuePair(
                          index,
                          "value",
                          e.target.value,
                          setParameters
                        )
                      }
                      placeholder="value"
                      className="bg-transparent border-0 h-8 p-0 placeholder:text-zinc-600 focus-visible:ring-0"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKeyValuePair(index, setParameters)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => addKeyValuePair(setParameters)}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add parameter
          </Button>
        </TabsContent>
        <TabsContent value="body" className="mt-4">
          <div className="text-sm text-zinc-400 mb-2">JSON Body</div>
          <Textarea
            value={jsonBody}
            onChange={(e) => setJsonBody(e.target.value)}
            placeholder="Enter JSON body"
            className="min-h-[300px] font-mono text-sm bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-1 focus-visible:ring-indigo-500"
          />
        </TabsContent>
        <TabsContent value="headers" className="mt-4">
          <div className="text-sm text-zinc-400 mb-2">Headers</div>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="w-[200px] text-zinc-400 font-medium">
                  Key
                </TableHead>
                <TableHead className="text-zinc-400 font-medium">
                  Value
                </TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {headers.map((header, index) => (
                <TableRow
                  key={index}
                  className="border-zinc-800 hover:bg-transparent"
                >
                  <TableCell className="font-mono">
                    <Input
                      value={header.key}
                      onChange={(e) =>
                        updateKeyValuePair(
                          index,
                          "key",
                          e.target.value,
                          setHeaders
                        )
                      }
                      placeholder="key"
                      className="bg-transparent border-0 h-8 p-0 placeholder:text-zinc-600 focus-visible:ring-0"
                    />
                  </TableCell>
                  <TableCell className="font-mono">
                    <Input
                      value={header.value}
                      onChange={(e) =>
                        updateKeyValuePair(
                          index,
                          "value",
                          e.target.value,
                          setHeaders
                        )
                      }
                      placeholder="value"
                      className="bg-transparent border-0 h-8 p-0 placeholder:text-zinc-600 focus-visible:ring-0"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKeyValuePair(index, setHeaders)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => addKeyValuePair(setHeaders)}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add header
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
