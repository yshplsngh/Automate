import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/components/theme-provider";

import { Canvas } from "./components/Canvas";
import { TopBar } from "./components/Topbar";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-screen dark:bg-gray-600">
          <TopBar />
          <Canvas />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
