import { useState } from "react"
import { 
  Map, 
  Award, 
  Users, 
  AlertTriangle, 
  BookOpen, 
  Shield, 
  Bell,
  Settings,
  LogOut,
  User,
  Target,
  Zap,
  Trophy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("overview")

  const userStats = {
    name: "Priya Sharma",
    school: "Government Senior Secondary School, Ludhiana",
    level: "Emergency Responder",
    points: 2850,
    badges: 12,
    completedDrills: 8,
    learningProgress: 75
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-primary rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">RakshakApp</h1>
                <p className="text-sm text-muted-foreground">Student Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hover-lift">
                <Bell className="h-5 w-5" />
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-up-1">
          <Card className="glass-card hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back, {userStats.name}! 👋</h2>
                  <p className="text-muted-foreground mb-4">{userStats.school}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{userStats.level}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-success" />
                      <span className="text-sm">{userStats.points} points</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold gradient-text mb-2">{userStats.learningProgress}%</div>
                  <p className="text-sm text-muted-foreground mb-2">Learning Progress</p>
                  <Progress value={userStats.learningProgress} className="w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card hover-glow animate-slide-up-1">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold mb-1">{userStats.badges}</div>
              <p className="text-sm text-muted-foreground">Badges Earned</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow animate-slide-up-2">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-emergency rounded-xl mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold mb-1">{userStats.completedDrills}</div>
              <p className="text-sm text-muted-foreground">Drills Completed</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow animate-slide-up-3">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-success rounded-xl mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold mb-1">156</div>
              <p className="text-sm text-muted-foreground">Leaderboard Rank</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow animate-slide-up-1">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold mb-1">5</div>
              <p className="text-sm text-muted-foreground">Emergency Calls</p>
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
                  Learning Modules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover-lift cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Map className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Flood Safety in Punjab</h3>
                      <p className="text-sm text-muted-foreground">Interactive disaster mapping</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">85%</div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover-lift cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-emergency rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Industrial Safety Protocols</h3>
                      <p className="text-sm text-muted-foreground">Chemical leakage response</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">45%</div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover-lift cursor-pointer opacity-60">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Earthquake Preparedness</h3>
                      <p className="text-sm text-muted-foreground">Building safety & evacuation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-muted-foreground">Locked</div>
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
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-success rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Flood Expert</div>
                    <div className="text-xs text-muted-foreground">2 days ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Drill Master</div>
                    <div className="text-xs text-muted-foreground">1 week ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Tools */}
            <Card className="glass-card animate-slide-up-1">
              <CardHeader>
                <CardTitle className="flex items-center text-emergency">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Emergency Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="emergency"
                  className="w-full text-left justify-start"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  SOS Alert
                </Button>
                <Button variant="outline" className="w-full text-left justify-start hover-lift">
                  Emergency Contacts
                </Button>
                <Button variant="outline" className="w-full text-left justify-start hover-lift">
                  Safety Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}