import { ZapCard } from "./JobCard";
import { TopBar } from "./Topbar";

export const Canvas = () => {
  return (
    <>
      <TopBar />
      <div className="flex flex-col items-center justify-center w-full h-full bg-slate-300 dark:bg-zinc-800">
        <ZapCard />
      </div>
    </>
  );
};
