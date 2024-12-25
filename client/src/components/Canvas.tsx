import { useEffect, useState } from "react";
import { ZapCard } from "./JobCard";
import { TopBar } from "./Topbar";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { TypeWorkFlow } from "@/jobs/job-config";
import { v4 } from "uuid";
import { addWorkflow } from "@/store/slice/workflow";
import { toast } from "sonner";
import { useUser } from "@/providers/user-provider";

export function Canvas() {
  const { user } = useUser();
  const { workflowId } = useParams();
  const workflows = useAppSelector((state) => state.workflow.workflows);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [workflow, setWorkflow] = useState<TypeWorkFlow | null>(null);
  const [workflowTitle, setWorkflowTitle] =
    useState<string>("Untitled Workflow");

  useEffect(() => {
    if (workflowId) {
      const workflow = workflows.find(
        (workflow) => workflow.workflowId === workflowId
      );
      if (workflow) {
        setWorkflow(workflow);
      } else {
        const udid = v4();
        dispatch(
          addWorkflow({ jobs: [], workflowId: udid, name: workflowTitle })
        );
        setWorkflow({ jobs: [], workflowId: udid, name: workflowTitle });
        navigate(`/workflow/${udid}`);
      }
    } else {
      navigate("/workflows");
    }
  }, [workflowId]);

  const saveWorkflow = async () => {
    if (!user) {
      toast("This action requires an account.");
      return;
    }
    console.log(workflows);
    const currentWrokflow = workflows.find((wf) => {
      return wf.workflowId === workflowId;
    });
    console.log(currentWrokflow);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/workflow/create`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(currentWrokflow),
        }
      );
      const data = await res.json();
      console.log("recieved data workflow::", data);
      if (!data.success) {
        toast(data.message ? data.message : "An unexpected error occurred");
        return;
      }
      toast("Your workflow has been saved successfully.");
    } catch (err: any) {
      console.log(err.message ? err.message : err);
      toast("An unexpected error occurred");
    }
  };

  useEffect(() => {
    const workflow = workflows.find(
      (workflow) => workflow.workflowId === workflowId
    );
    if (workflow) {
      setWorkflow(workflow);
    }
  }, [workflows]);

  return (
    <>
      <TopBar
        workflowTitle={workflowTitle}
        setWorkflowTitle={setWorkflowTitle}
        saveWorkflowFn={saveWorkflow}
      />
      <div className="flex flex-col items-center justify-center w-full h-full bg-slate-300 dark:bg-zinc-800">
        {workflow && <ZapCard workflow={workflow} />}
      </div>
    </>
  );
}
