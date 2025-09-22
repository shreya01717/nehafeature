import { useState } from "react"
import { ArrowLeft, Shield, Mail, Lock, User, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTranslation } from "react-i18next"   // 👈 added

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  const { t } = useTranslation()   // 👈 translation hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary-brand/10 rounded-full blur-2xl float-animation-delayed" />
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
          <div className="p-2 bg-gradient-ocean rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold bg-gradient-to-r from-primary to-secondary-brand bg-clip-text text-transparent">
            RakshakApp
          </span>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      {/* Auth Form */}
      <Card className="w-full max-w-md glass-card animate-slide-up relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-4 p-3 bg-gradient-ocean rounded-2xl w-fit">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? t("auth.welcomeBack") : t("auth.joinTitle")}
          </CardTitle>
          <p className="text-muted-foreground">
            {isLogin ? t("auth.loginSubtitle") : t("auth.registerSubtitle")}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">{t("auth.fullName")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder={t("auth.fullNamePlaceholder") as string}
                    className="pl-10 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="school">{t("auth.school")}</Label>
                <div className="relative">
                  <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="school"
                    placeholder={t("auth.schoolPlaceholder") as string}
                    className="pl-10 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t("auth.emailPlaceholder") as string}
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t("auth.passwordPlaceholder") as string}
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
              {isLogin ? t("auth.signIn") : t("auth.createAccount")}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-muted-foreground hover:text-primary"
              >
                {isLogin ? t("auth.noAccount") : t("auth.haveAccount")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
