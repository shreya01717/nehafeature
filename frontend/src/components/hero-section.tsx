import { ArrowRight, Shield, Zap, Users, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import heroImage from "@/assets/hero-image.jpg"
import { useTranslation } from "react-i18next"


export function HeroSection() {
  const { t } = useTranslation();  // 👈 hook

  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-surface">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary-brand/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-float float-animation-delayed" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-success/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-secondary-brand/30 rounded-full blur-xl float-animation-delayed" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up-1">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 mb-8 hover-glow">
            <Shield className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium">{t("hero.tagline")}</span>
          </div>
        </div>

        <div className="animate-slide-up-2">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">{t("hero.prepare")}</span>{" "}
            <span className="text-foreground">{t("hero.protect")}</span>{" "}
            <span className="gradient-text">{t("hero.prevail")}</span>
          </h1>
        </div>

        <div className="animate-slide-up-3">
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>
        </div>

        <div className="animate-slide-up-3">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={() => navigate("/auth")}
              variant="hero"
              className="px-8 py-4 text-lg rounded-2xl group"
            >
              {t("hero.startLearning")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 text-lg rounded-2xl glass-card"
            >
              {t("hero.watchDemo")}
            </Button>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in">
          <div className="glass-card p-6 rounded-2xl hover-glow">
            <Map className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">{t("hero.features.riskMaps.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("hero.features.riskMaps.desc")}</p>
          </div>
          <div className="glass-card p-6 rounded-2xl hover-glow">
            <Zap className="h-8 w-8 text-secondary-brand mx-auto mb-3" />
            <h3 className="font-semibold mb-2">{t("hero.features.response.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("hero.features.response.desc")}</p>
          </div>
          <div className="glass-card p-6 rounded-2xl hover-glow">
            <Users className="h-8 w-8 text-success mx-auto mb-3" />
            <h3 className="font-semibold mb-2">{t("hero.features.learning.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("hero.features.learning.desc")}</p>
          </div>
          <div className="glass-card p-6 rounded-2xl hover-glow">
            <Shield className="h-8 w-8 text-emergency mx-auto mb-3" />
            <h3 className="font-semibold mb-2">{t("hero.features.drills.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("hero.features.drills.desc")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
