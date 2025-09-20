import { Shield, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useNavigate } from "react-router-dom"

export function Navigation() {
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="p-2 bg-gradient-primary rounded-xl shadow-elegant">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">RakshakApp</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors hover-lift">
              Features
            </a>
            <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors hover-lift">
              About
            </a>
            <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors hover-lift">
              Contact
            </a>
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