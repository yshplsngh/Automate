import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Plus, Trash2 } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/components/theme-provider";
import { HttpJob, JobData } from "../job-config";

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

type KeyValuePair = { key: string; value: string };

interface HttpFormProps {
  onSubmit: (data: JobData) => void;
  jobData: JobData | null;
}

export const HttpForm = forwardRef(({ jobData }: HttpFormProps, ref) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [httpMethod, setHttpMethod] =
    useState<HttpJob["input"]["method"]>("GET");
  const [url, setUrl] = useState<string>("https://api.example.com/endpoint");
  const [jsonBody, setJsonBody] = useState(sampleJson);
  const [parameters, setParameters] = useState<KeyValuePair[]>([
    { key: "", value: "" },
  ]);
  const [headers, setHeaders] = useState<KeyValuePair[]>([
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

  useEffect(() => {
    if (!jobData) return;
    const data = jobData as HttpJob;
    if (data) {
      setHttpMethod(data.input.method);
      setUrl(data.input.url);
      setJsonBody(data.input.body);
      setParameters(
        Object.entries(data.input.parameters).map(([key, value]) => ({
          key,
          value,
        }))
      );
      setHeaders(
        Object.entries(data.input.headers).map(([key, value]) => ({
          key,
          value,
        }))
      );
    }
  }, [jobData]);

  useImperativeHandle(ref, () => {
    submitHandler: () => {
      const parametersObj = parameters.reduce((acc, { key, value }) => {
        if (key) {
          acc[key] = value;
        }
        return acc;
      }, {} as HttpJob["input"]["parameters"]);
  
      const headersObj = headers.reduce((acc, { key, value }) => {
        if (key) {
          acc[key] = value;
        }
        return acc;
      }, {} as HttpJob["input"]["headers"]);
      const httpJob = {
        key: "http",
        input: {
          url,
          method: httpMethod,
          parameters: parametersObj,
          headers: headersObj,
          body: jsonBody,
        },
      } as HttpJob;
  
      console.log("httpform job::", jobData);
      return httpJob;
    }
  })


  return (
    <div
      className={`w-full space-y-4 border p-4 ${
        isDarkTheme ? "bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900"
      }`}
    >
      <div className="flex gap-2 items-center justify-between mb-4">
        <div className="flex gap-2 flex-1">
          <Select
            defaultValue={httpMethod}
            onValueChange={(value) => {
              setHttpMethod(value as HttpJob["input"]["method"]);
            }}
          >
            <SelectTrigger
              className={`w-[110px] ${
                isDarkTheme
                  ? "bg-zinc-900 border-zinc-800"
                  : "bg-white border-zinc-300"
              } focus:ring-0`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              className={
                isDarkTheme
                  ? "bg-zinc-900 border-zinc-800"
                  : "bg-white border-zinc-300"
              }
            >
              {methods.map((method) => (
                <SelectItem
                  key={method}
                  value={method}
                  className={isDarkTheme ? "text-zinc-100" : "text-zinc-900"}
                >
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`flex-1 ${
              isDarkTheme
                ? "bg-zinc-900 border-zinc-800 text-zinc-100"
                : "bg-white border-zinc-300 text-zinc-900"
            } focus-visible:ring-0`}
          />
        </div>
      </div>

      <Tabs defaultValue="parameters" className="w-full">
        <TabsList
          className={`bg-transparent border-b ${
            isDarkTheme ? "border-zinc-800" : "border-zinc-300"
          } w-full justify-start h-auto gap-4`}
        >
          <TabsTrigger
            value="parameters"
            className={`text-sm data-[state=active]:text-indigo-600 data-[state=active]:border-indigo-600 border-b-2 border-transparent data-[state=active]:bg-transparent rounded-none h-9 ${
              isDarkTheme ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Parameters
          </TabsTrigger>
          <TabsTrigger
            value="body"
            className={`text-sm data-[state=active]:text-indigo-600 data-[state=active]:border-indigo-600 border-b-2 border-transparent data-[state=active]:bg-transparent rounded-none h-9 ${
              isDarkTheme ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Body
          </TabsTrigger>
          <TabsTrigger
            value="headers"
            className={`text-sm data-[state=active]:text-indigo-600 data-[state=active]:border-indigo-600 border-b-2 border-transparent data-[state=active]:bg-transparent rounded-none h-9 ${
              isDarkTheme ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Headers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="parameters" className="mt-4">
          <div
            className={`text-sm ${
              isDarkTheme ? "text-zinc-400" : "text-zinc-600"
            } mb-2`}
          >
            Query Parameters
          </div>
          <ScrollArea className="h-[200px]">
            <Table>
              <TableHeader>
                <TableRow
                  className={`${
                    isDarkTheme ? "border-zinc-800" : "border-zinc-300"
                  } hover:bg-transparent`}
                >
                  <TableHead
                    className={`w-[200px] ${
                      isDarkTheme ? "text-zinc-400" : "text-zinc-600"
                    } font-medium`}
                  >
                    Key
                  </TableHead>
                  <TableHead
                    className={`${
                      isDarkTheme ? "text-zinc-400" : "text-zinc-600"
                    } font-medium`}
                  >
                    Value
                  </TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parameters.map((param, index) => (
                  <TableRow
                    key={index}
                    className={`${
                      isDarkTheme ? "border-zinc-800" : "border-zinc-300"
                    } hover:bg-transparent`}
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
                        className={`bg-transparent border-0 h-8 p-0 ${
                          isDarkTheme
                            ? "placeholder:text-zinc-600"
                            : "placeholder:text-zinc-400"
                        } focus-visible:ring-0`}
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
                        className={`bg-transparent border-0 h-8 p-0 ${
                          isDarkTheme
                            ? "placeholder:text-zinc-600"
                            : "placeholder:text-zinc-400"
                        } focus-visible:ring-0`}
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
          </ScrollArea>
        </TabsContent>
        <TabsContent value="body" className="mt-4">
          <div
            className={`text-sm ${
              isDarkTheme ? "text-zinc-400" : "text-zinc-600"
            } mb-2`}
          >
            JSON Body
          </div>
          <Textarea
            value={jsonBody}
            onChange={(e) => setJsonBody(e.target.value)}
            placeholder="Enter JSON body"
            className={`min-h-[200px] font-mono text-sm ${
              isDarkTheme
                ? "bg-zinc-900 border-zinc-800 text-zinc-100"
                : "bg-white border-zinc-300 text-zinc-900"
            } focus-visible:ring-1 focus-visible:ring-indigo-500`}
          />
        </TabsContent>
        <TabsContent value="headers" className="mt-4">
          <div
            className={`text-sm ${
              isDarkTheme ? "text-zinc-400" : "text-zinc-600"
            } mb-2`}
          >
            Headers
          </div>
          <ScrollArea className="h-[200px]">
            <Table>
              <TableHeader>
                <TableRow
                  className={`${
                    isDarkTheme ? "border-zinc-800" : "border-zinc-300"
                  } hover:bg-transparent`}
                >
                  <TableHead
                    className={`w-[200px] ${
                      isDarkTheme ? "text-zinc-400" : "text-zinc-600"
                    } font-medium`}
                  >
                    Key
                  </TableHead>
                  <TableHead
                    className={`${
                      isDarkTheme ? "text-zinc-400" : "text-zinc-600"
                    } font-medium`}
                  >
                    Value
                  </TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {headers.map((header, index) => (
                  <TableRow
                    key={index}
                    className={`${
                      isDarkTheme ? "border-zinc-800" : "border-zinc-300"
                    } hover:bg-transparent`}
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
                        className={`bg-transparent border-0 h-8 p-0 ${
                          isDarkTheme
                            ? "placeholder:text-zinc-600"
                            : "placeholder:text-zinc-400"
                        } focus-visible:ring-0`}
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
                        className={`bg-transparent border-0 h-8 p-0 ${
                          isDarkTheme
                            ? "placeholder:text-zinc-600"
                            : "placeholder:text-zinc-400"
                        } focus-visible:ring-0`}
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
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
})
