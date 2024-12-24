import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
import { ModeToggle } from "./components/mode-toggle";

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* Main content area: takes up the remaining space */}
      <main className="flex-1 dark:bg-gray-600 relative">
        <SidebarTrigger className="absolute top-0 left-0 h-10 w-10" />
        <div className="absolute top-0 left-10">
          <ModeToggle />
        </div>
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/workflow/:workflowId" element={<Layout />}>
          <Route index element={<Canvas />} />
        </Route>
      </Routes>
    </Router>
  );
}
