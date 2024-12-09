import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/components/theme-provider";

import { Canvas } from "./components/Canvas";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

function Layout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        {/* Main content area: takes up the remaining space */}
        <main className="flex-1 dark:bg-gray-600">
          <Outlet />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Canvas />} />
        </Route>
      </Routes>
    </Router>
  );
}
