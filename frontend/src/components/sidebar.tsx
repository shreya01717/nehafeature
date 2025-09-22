import { useState } from "react"
import { 
  Home, 
  Map, 
  BookOpen, 
  Shield, 
  UserCog,
  Settings,
  AlertTriangle,
  BarChart3,
  Phone
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
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

// ✅ Corrected URLs to match App.tsx routes
const learningItems = [
  { title: "Overview", url: "/dashboard", icon: Home },
  { title: "Risk Maps", url: "/dashboard/maps", icon: Map },
  { title: "Learning Modules", url: "/dashboard/modules", icon: BookOpen },
  { title: "Virtual Drills", url: "/dashboard/drills", icon: Shield },
  { title: "Admin Dashboard", url: "/dashboard/admin", icon: UserCog },
]

const emergencyItems = [
  { title: "Emergency Tools", url: "/dashboard/emergency", icon: AlertTriangle },
  { title: "Emergency Contacts", url: "/dashboard/contacts", icon: Phone },
]

const adminItems = [
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-to-r from-primary/10 to-secondary-brand/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50 hover:text-primary transition-all duration-200"

  return (
    <Sidebar
      className={cn(
        "transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarContent className="bg-card/50 backdrop-blur-xl">
        {/* Learning Section */}
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
                      {!isCollapsed && (
                        <span className="ml-3 text-sm font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
