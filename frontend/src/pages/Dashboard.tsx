import { useState } from "react"
import { useTranslation } from "react-i18next"

import { 
  Map, 
  Award, 
  Users, 
  AlertTriangle, 
  BookOpen, 
  Shield, 
  Bell,
  LogOut,
  Target,
  Zap,
  Trophy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { AppSidebar } from "@/components/sidebar"
import { useNavigate } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("overview")
  const { t } = useTranslation()

  const userStats = {
    name: "Priya Sharma",
    school: "Government Senior Secondary School, Ludhiana",
    level: t("dashboard.level"), // translated
    points: 2850,
    badges: 12,
    completedDrills: 8,
    learningProgress: 75
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-surface">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="hover:bg-muted/50 hover:text-primary" />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary-brand bg-clip-text text-transparent">
                    {t("dashboard.title")}
                  </h1>
                  <p className="text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="hover-lift relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-emergency rounded-full" />
                </Button>
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/")}
                  className="hover-lift"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-8">
            {/* Welcome Section */}
            <div className="animate-slide-up-1">
              <Card className="glass-card hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        {t("dashboard.welcomeBack", { name: userStats.name })} 👋
                      </h2>
                      <p className="text-muted-foreground mb-4">{userStats.school}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{userStats.level}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-secondary-brand" />
                          <span className="text-sm">{userStats.points} {t("dashboard.points")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold gradient-text mb-2">{userStats.learningProgress}%</div>
                      <p className="text-sm text-muted-foreground mb-2">{t("dashboard.learningProgress")}</p>
                      <Progress value={userStats.learningProgress} className="w-32" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="glass-card hover-glow animate-slide-up-1">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{userStats.badges}</div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.badgesEarned")}</p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow animate-slide-up-2">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-secondary rounded-xl mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{userStats.completedDrills}</div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.drillsCompleted")}</p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow animate-slide-up-3">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-success rounded-xl mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-1">156</div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.leaderboardRank")}</p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow animate-slide-up-1">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-emergency rounded-xl mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-1">5</div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.emergencyTrainings")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Learning Modules */}
              <div className="lg:col-span-2">
                <Card className="glass-card animate-slide-up-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      {t("dashboard.activeModules")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover-lift cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Map className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{t("dashboard.moduleFloodSafety")}</h3>
                          <p className="text-sm text-muted-foreground">{t("dashboard.moduleFloodSafetyDesc")}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-success">85%</div>
                        <div className="text-xs text-muted-foreground">{t("dashboard.complete")}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover-lift cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{t("dashboard.moduleIndustrialSafety")}</h3>
                          <p className="text-sm text-muted-foreground">{t("dashboard.moduleIndustrialSafetyDesc")}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-secondary-brand">45%</div>
                        <div className="text-xs text-muted-foreground">{t("dashboard.inProgress")}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover-lift cursor-pointer opacity-60">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{t("dashboard.moduleEarthquake")}</h3>
                          <p className="text-sm text-muted-foreground">{t("dashboard.moduleEarthquakeDesc")}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-muted-foreground">{t("dashboard.locked")}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Recent Achievements */}
                <Card className="glass-card animate-slide-up-3">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="h-5 w-5 mr-2" />
                      {t("dashboard.recentAchievements")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-success/10 to-success/5 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-success rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{t("dashboard.achievementFloodSafety")}</div>
                        <div className="text-xs text-muted-foreground">2 {t("dashboard.daysAgo")}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{t("dashboard.achievementDrillMaster")}</div>
                        <div className="text-xs text-muted-foreground">1 {t("dashboard.weekAgo")}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Tools */}
                <Card className="glass-card animate-slide-up-1">
                  <CardHeader>
                    <CardTitle className="flex items-center text-emergency">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      {t("dashboard.quickEmergencyAccess")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="emergency" className="w-full text-left justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {t("dashboard.emergencySOS")}
                    </Button>
                    <Button variant="outline" className="w-full text-left justify-start hover-lift">
                      {t("dashboard.emergencyContacts")}
                    </Button>
                    <Button variant="outline" className="w-full text-left justify-start hover-lift">
                      {t("dashboard.safetyGuidelines")}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
