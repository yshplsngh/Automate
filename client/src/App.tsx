import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/AppSidebar";
import Home from "@/screens/Home";

import { Canvas } from "./components/Canvas";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import LoginPage from "./screens/Login";
import SignupPage from "./screens/Signup";
import ZapsInterface from "./screens/Workflows";

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Toaster />
      {/* Main content area: takes up the remaining space */}
      <main className="flex-1 dark:bg-gray-600 relative">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/work" element={<Layout />}>
          <Route index element={<ZapsInterface />} />
        </Route>
        <Route path="/workflow/:workflowId" element={<Layout />}>
          <Route index element={<Canvas />} />
        </Route>
      </Routes>
    </Router>
  );
}
