
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "./components/mode-toggle"
import { Canvas } from "./components/Canvas"
 
export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-screen dark:bg-gray-600">
          <SidebarTrigger/>
          <ModeToggle />
          <Canvas />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}


