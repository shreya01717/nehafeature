import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { ProgressProvider } from "@/modules/ProgressContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RiskMapPage from "./pages/RiskMapPage";
import AdminDashboard from "./pages/AdminDashboard";
import MassAlerts from "./pages/MassAlerts";
import MassAlertHistory from "./pages/MassAlertHistory";
import Compliance from "./pages/Compliance";

// Learning Modules Pages
import ModulesPage from "@/modules/ModulesPage";
import ModuleDetail from "@/modules/ModuleDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Wrap routes that need progress context inside ProgressProvider */}
          <ProgressProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />

              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/maps" element={<RiskMapPage />} />

              {/* Learning Modules Routes */}
              <Route path="/dashboard/modules" element={<ModulesPage />} />
              <Route path="/dashboard/modules/:id" element={<ModuleDetail />} />

              {/* Admin Dashboard with nested routes */}
              <Route path="/dashboard/admin" element={<AdminDashboard alerts={[]} />}>
                <Route index element={<div></div>} />
                <Route path="alerts" element={<MassAlerts />} />
                <Route path="alerts/history" element={<MassAlertHistory />} />
                <Route path="compliance" element={<Compliance />} />
              </Route>

              {/* Catch-All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProgressProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
