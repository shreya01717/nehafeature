import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  Home,
  Map,
  BookOpen,
  Shield,
  UserCog,
  Settings,
  AlertTriangle,
  BarChart3,
  Phone,
  AlertCircle,
  Droplet,
  Zap,
  Cloud
} from "lucide-react"

const learningItems = [
  { title: "Overview", url: "/dashboard", icon: Home },
  { title: "Risk Maps", url: "/dashboard/maps", icon: Map },
  { title: "Learning Modules", url: "/dashboard/modules", icon: BookOpen },
  { title: "Virtual Drills", url: "/dashboard/drills", icon: Shield },
  { title: "Admin Dashboard", url: "/dashboard/admin", icon: UserCog },
]

export function AppSidebar({ onSelectDisaster }: { onSelectDisaster: (disaster: string) => void }) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-to-r from-primary/10 to-secondary-brand/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50 hover:text-primary transition-all duration-200"

  return (
    <Sidebar className={cn("transition-all duration-300", isCollapsed ? "w-16" : "w-64")} collapsible="icon">
      <SidebarContent className="bg-card/50 backdrop-blur-xl">
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Learning
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {learningItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="ml-3 text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>

                  {/* Submenu for Virtual Drills */}
                  {item.title === "Virtual Drills" && !isCollapsed && (
                    <div className="ml-8 mt-2 flex flex-col space-y-1">
                      <button
                        className="text-sm hover:text-primary flex items-center gap-2"
                        onClick={() => onSelectDisaster("fire")}
                      >
                        <AlertCircle className="w-4 h-4" /> Fire Drill
                      </button>
                      <button
                        className="text-sm hover:text-primary flex items-center gap-2"
                        onClick={() => onSelectDisaster("flood")}
                      >
                        <Droplet className="w-4 h-4" /> Flood Drill
                      </button>
                      <button
                        className="text-sm hover:text-primary flex items-center gap-2"
                        onClick={() => onSelectDisaster("earthquake")}
                      >
                        <Zap className="w-4 h-4" /> Earthquake Drill
                      </button>
                      <button
                        className="text-sm hover:text-primary flex items-center gap-2"
                        onClick={() => onSelectDisaster("gas")}
                      >
                        <Cloud className="w-4 h-4" /> Gas Leak Drill
                      </button>
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
