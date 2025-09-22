import { Shield, Menu, BookOpen, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useNavigate } from "react-router-dom"

// NEW
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

export function Navigation() {
  const navigate = useNavigate()

  // NEW
  const { t, i18n } = useTranslation()
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    document.documentElement.lang = lng
  }

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4 relative">
          {/* Logo - Left side */}
          <div
            className="flex items-center space-x-2 cursor-pointer absolute left-0"
            onClick={() => navigate("/")}
          >
            <div className="p-2 bg-gradient-ocean rounded-xl shadow-elegant">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary-brand bg-clip-text text-transparent">
              RakshakApp
            </span>
          </div>

          {/* Center-aligned navigation items */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#features"
              onClick={(e) => handleNavClick(e, "features")}
              className="flex items-center space-x-2 text-foreground/80 hover:text-primary transition-colors hover-lift"
            >
              <BookOpen className="h-4 w-4" />
              <span>{t("nav.features")}</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#about"
              onClick={(e) => handleNavClick(e, "about")}
              className="flex items-center space-x-2 text-foreground/80 hover:text-secondary-brand transition-colors hover-lift"
            >
              <Users className="h-4 w-4" />
              <span>{t("nav.about")}</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#achievements"
              onClick={(e) => handleNavClick(e, "achievements")}
              className="flex items-center space-x-2 text-foreground/80 hover:text-success transition-colors hover-lift"
            >
              <Award className="h-4 w-4" />
              <span>{t("nav.achievements")}</span>
            </motion.a>
          </div>

          {/* Right side - Theme toggle, Language switch, CTA */}
          <div className="flex items-center space-x-4 absolute right-0">
            {/* Language Selector */}
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="rounded-md border px-2 py-1 text-sm bg-background text-foreground"
            >
              <option value="en">EN</option>
              <option value="hi">हिंदी</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
            </select>

            <ThemeToggle />
            <Button
              onClick={() => navigate("/auth")}
              variant="hero"
              className="px-6 py-2 rounded-xl font-semibold"
            >
              {t("hero.cta")}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
