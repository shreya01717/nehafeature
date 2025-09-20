import { useState } from "react"
import { ArrowLeft, Shield, Mail, Lock, User, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate auth success and navigate to dashboard
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-emergency/10 rounded-full blur-2xl float-animation-delayed" />
      </div>

      {/* Navigation */}
      <div className="absolute top-6 left-6 flex items-center space-x-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="hover-lift"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold gradient-text">RakshakApp</span>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      {/* Auth Form */}
      <Card className="w-full max-w-md glass-card animate-slide-up relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-4 p-3 bg-gradient-primary rounded-2xl w-fit">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? "Welcome Back" : "Join RakshakApp"}
          </CardTitle>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Sign in to continue your disaster preparedness journey" 
              : "Start your journey towards disaster preparedness"
            }
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="pl-10 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="school">School/College</Label>
                <div className="relative">
                  <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="school"
                    placeholder="Enter your institution name"
                    className="pl-10 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full h-12 text-lg rounded-xl"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-muted-foreground hover:text-primary"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}