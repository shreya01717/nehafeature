import { useState } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "leaflet/dist/leaflet.css"
import { ProgressProvider } from "@/modules/ProgressContext"

// Pages
import Index from "./pages/Index"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
import RiskMapPage from "./pages/RiskMapPage"
import AdminDashboard from "./pages/AdminDashboard"
import MassAlerts from "./pages/MassAlerts"
import MassAlertHistory from "./pages/MassAlertHistory"
import Compliance from "./pages/Compliance"

// Learning Modules Pages
import ModulesPage from "@/modules/ModulesPage"
import ModuleDetail from "@/modules/ModuleDetail"

// Components
import { AppSidebar } from "@/components/sidebar"
import MultiDisasterDrill from "@/components/MultiDisasterDrill"

import { SidebarProvider } from "@/components/ui/sidebar"

const queryClient = new QueryClient()

const App = () => {
  // ✅ State to track selected disaster
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null)

  return (
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
            <ProgressProvider>
              <SidebarProvider>
                <div className="flex h-screen">
                  {/* Sidebar */}
                  <AppSidebar onSelectDisaster={(disaster) => setSelectedDisaster(disaster)} />

                  {/* Main content */}
                  <div className="flex-1 overflow-auto p-4">
                   {selectedDisaster && (
  <MultiDisasterDrill
    initialDisaster={selectedDisaster as "fire" | "flood" | "earthquake" | "gas"}
    onDrillEnd={() => setSelectedDisaster(null)}
  />
)}

                     : (
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
                    )
                  </div>
                </div>
              </SidebarProvider>
            </ProgressProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
