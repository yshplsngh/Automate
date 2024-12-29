import { useEffect, useState } from "react";
import { JobCard } from "../components/JobCard";
import { TopBar } from "../components/Topbar";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { TypeWorkFlow } from "@/jobs/job-config";
import { addWorkflow, updateWorkflow } from "@/store/slice/workflow";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/providers/user-provider";

export function WorkflowCanvas() {
  const { user, userStateLoading } = useUser();
  const { toast } = useToast();
  const { workflowId } = useParams();
  const [searchParams, _setSearchParams] = useSearchParams();
  const [mode, setMode] = useState<string>("edit");
  const workflows = useAppSelector((state) => state.workflow.workflows);
  const dispatch = useAppDispatch();
  const [workflow, setWorkflow] = useState<TypeWorkFlow | null>(null);
  const [workflowTitle, setWorkflowTitle] =
    useState<string>("Untitled Workflow");
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userStateLoading) {
      return;
    }
    if (!user) {
      return;
    }
    const fetchWorkflow = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/workflow/${workflowId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "content-type": "application/json",
            },
          }
        );
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        if (!data.success) {
          return;
        }
        console.log(data);
        setWorkflow(data.data);
        dispatch(addWorkflow(data.data));
      } catch (e: any) {
        console.log(e);
      }
    };
    fetchWorkflow();
  }, [workflowId, userStateLoading, user]);

  useEffect(() => {
    setMode(searchParams.get("mode") ?? "edit");
  }, [searchParams]);

  const saveWorkflowAction = async () => {
    if (mode === "create") {
      await saveWorkflow();
    } else if (mode === "edit") {
      await updateWorkflowData();
    } else {
      toast({
        title: "Error",
        description: "Invalid Request.",
      });
    }
  };

  const saveWorkflow = async () => {
    if (!user) {
      toast({
        title: "Unauthorized",
        description: "Please signin in order to save workflow.",
      });
      return;
    }
    console.log(workflows);
    const currentWrokflow = workflows.find((wf) => {
      return wf.workflowId === workflowId;
    });
    console.log(currentWrokflow);
    try {
      setSaveLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/workflow/create`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(currentWrokflow),
        }
      );
      const data = await res.json();
      console.log("recieved data workflow::", data);
      if (!data.success) {
        toast({
          title: "Error",
          description: data.message
            ? (data.message as string)
            : "An unexpected error occurred",
        });
        return;
      }
      toast({
        title: "Success",
        description: "Your workflow has been saved successfully.",
      });
    } catch (err: any) {
      console.log(err.message ? err.message : err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const updateWorkflowData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/workflow/${workflowId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(workflow),
        }
      );
      if (!res.ok) {
        throw new Error("Workflow Could not be saved.");
      }
      const data = await res.json();
      if (!data.success) {
        return;
      }
      setWorkflow(data.data);
      dispatch(updateWorkflow(data.data));
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    const workflow = workflows.find(
      (workflow) => workflow.workflowId === workflowId
    );
    if (workflow) {
      console.log("workflow::", workflow);
      setWorkflow(workflow);
    } else {
      console.error("workflow not found");
    }
  }, [workflows]);

  return (
    <>
      <TopBar
        workflowTitle={workflowTitle}
        setWorkflowTitle={setWorkflowTitle}
        saveWorkflowFn={saveWorkflowAction}
        saveLoading={saveLoading}
      />
      <div className="flex flex-col items-center justify-center w-full h-full bg-slate-300 dark:bg-zinc-800">
        {workflow && <JobCard workflow={workflow} />}
      </div>
    </>
  );
}
