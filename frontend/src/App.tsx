import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'leaflet/dist/leaflet.css';

import Index from "./pages/Index"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
import RiskMapPage from "./pages/RiskMapPage"
import AdminDashboard from "./pages/AdminDashboard"
import MassAlerts from "./pages/MassAlerts"
import MassAlertHistory from "./pages/MassAlertHistory";
import Compliance from "./pages/Compliance";

const queryClient = new QueryClient()

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
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/maps" element={<RiskMapPage />} />

            {/* Admin Dashboard with nested routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard alerts={[]} />}>
              {/* Default landing page for admin */}
              <Route index element={<div></div>} />
              {/* Mass Alerts page */}
              <Route path="alerts" element={<MassAlerts />} />
              {/* Mass Alert History page */}
              <Route path="alerts/history" element={<MassAlertHistory />} />
              {/* Compliance page - FIXED PATH */}
              <Route path="compliance" element={<Compliance />} />
            </Route>

            {/* Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default App