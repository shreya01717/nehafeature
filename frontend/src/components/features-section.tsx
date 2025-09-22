import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { 
  Map, 
  Gamepad2, 
  Shield, 
  Zap, 
  Globe, 
  Users,
  Brain,
  Phone
} from "lucide-react"

export function FeaturesSection() {
  const { t } = useTranslation()

  return (
    <section id="features" className="py-24 bg-gradient-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t("features.heading1")}</span>{" "}
            <span className="text-foreground">{t("features.heading2")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Feature 1 */}
          <motion.div 
            className="glass-card p-8 rounded-3xl hover-glow"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
              <Map className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("features.feature1.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("features.feature1.desc")}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {t("features.feature1.bullet1")}</li>
              <li>• {t("features.feature1.bullet2")}</li>
              <li>• {t("features.feature1.bullet3")}</li>
            </ul>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            className="glass-card p-8 rounded-3xl hover-glow"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-6">
              <Gamepad2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("features.feature2.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("features.feature2.desc")}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {t("features.feature2.bullet1")}</li>
              <li>• {t("features.feature2.bullet2")}</li>
              <li>• {t("features.feature2.bullet3")}</li>
            </ul>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            className="glass-card p-8 rounded-3xl hover-glow"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("features.feature3.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("features.feature3.desc")}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {t("features.feature3.bullet1")}</li>
              <li>• {t("features.feature3.bullet2")}</li>
              <li>• {t("features.feature3.bullet3")}</li>
            </ul>
          </motion.div>
        </div>

        {/* Emergency Tools */}
        <motion.div 
          className="glass-card p-8 rounded-3xl hover-glow mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-emergency rounded-3xl flex items-center justify-center">
              <Zap className="h-10 w-10 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-center mb-6">{t("features.emergency.title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <Phone className="h-8 w-8 text-emergency mx-auto mb-3" />
              <h4 className="font-semibold mb-2">{t("features.emergency.tool1.title")}</h4>
              <p className="text-sm text-muted-foreground">{t("features.emergency.tool1.desc")}</p>
            </div>
            <div className="text-center p-4">
              <Zap className="h-8 w-8 text-emergency mx-auto mb-3" />
              <h4 className="font-semibold mb-2">{t("features.emergency.tool2.title")}</h4>
              <p className="text-sm text-muted-foreground">{t("features.emergency.tool2.desc")}</p>
            </div>
            <div className="text-center p-4">
              <Phone className="h-8 w-8 text-emergency mx-auto mb-3" />
              <h4 className="font-semibold mb-2">{t("features.emergency.tool3.title")}</h4>
              <p className="text-sm text-muted-foreground">{t("features.emergency.tool3.desc")}</p>
            </div>
            <div className="text-center p-4">
              <Globe className="h-8 w-8 text-emergency mx-auto mb-3" />
              <h4 className="font-semibold mb-2">{t("features.emergency.tool4.title")}</h4>
              <p className="text-sm text-muted-foreground">{t("features.emergency.tool4.desc")}</p>
            </div>
          </div>
        </motion.div>

        {/* Innovation Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="glass-card p-8 rounded-3xl hover-glow"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">{t("features.innovation1.title")}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{t("features.innovation1.desc")}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">{t("features.innovation1.tag1")}</span>
              <span className="px-3 py-1 bg-secondary-brand/10 text-secondary-brand rounded-full">{t("features.innovation1.tag2")}</span>
            </div>
          </motion.div>

          <motion.div 
            className="glass-card p-8 rounded-3xl hover-glow"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">{t("features.innovation2.title")}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{t("features.innovation2.desc")}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="px-3 py-1 bg-success/10 text-success rounded-full">{t("features.innovation2.tag1")}</span>
              <span className="px-3 py-1 bg-emergency/10 text-emergency rounded-full">{t("features.innovation2.tag2")}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
