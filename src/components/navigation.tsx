import { Shield, Menu, BookOpen, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useNavigate } from "react-router-dom"

export function Navigation() {
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="p-2 bg-gradient-ocean rounded-xl shadow-elegant">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary-brand bg-clip-text text-transparent">
                RakshakApp
              </span>
            </div>

            {/* Left-aligned navigation items like educational platforms */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="flex items-center space-x-2 text-foreground/80 hover:text-primary transition-colors hover-lift">
                <BookOpen className="h-4 w-4" />
                <span>Features</span>
              </a>
              <a href="#about" className="flex items-center space-x-2 text-foreground/80 hover:text-secondary-brand transition-colors hover-lift">
                <Users className="h-4 w-4" />
                <span>About</span>
              </a>
              <a href="#achievements" className="flex items-center space-x-2 text-foreground/80 hover:text-success transition-colors hover-lift">
                <Award className="h-4 w-4" />
                <span>Achievements</span>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={() => navigate("/auth")}
              variant="hero"
              className="px-6 py-2 rounded-xl font-semibold"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}