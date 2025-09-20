import { 
  Map, 
  Gamepad2, 
  Shield, 
  Zap, 
  Globe, 
  Award,
  Users,
  Brain,
  Phone,
  BookOpen 
} from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gradient-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up-1">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Complete Disaster</span>{" "}
            <span className="text-foreground">Preparedness Ecosystem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From interactive learning to real emergency response - everything Punjab's students need for comprehensive disaster readiness.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-8 rounded-3xl hover-glow animate-slide-up-1">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
              <Map className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Interactive Disaster Maps</h3>
            <p className="text-muted-foreground mb-4">
              Explore Punjab-specific flood zones, industrial hotspots, and fire-sensitive areas with real-time data visualization.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Region-specific risk assessment</li>
              <li>• Real-time weather integration</li>
              <li>• Historical disaster data</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-3xl hover-glow animate-slide-up-2">
            <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-6">
              <Gamepad2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Gamified Learning</h3>
            <p className="text-muted-foreground mb-4">
              Master disaster safety through engaging games, quizzes, and dynamic leaderboards with rewards and badges.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Progressive learning modules</li>
              <li>• Achievement system</li>
              <li>• Competitive leaderboards</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-3xl hover-glow animate-slide-up-3">
            <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Virtual Drill Engine</h3>
            <p className="text-muted-foreground mb-4">
              Practice earthquake, flood, and fire responses with teacher-triggered real-time drills for structured readiness.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Multi-scenario simulations</li>
              <li>• Performance tracking</li>
              <li>• Group coordination practice</li>
            </ul>
          </div>
        </div>

        {/* Emergency Tools Section */}
        <div className="glass-card p-8 rounded-3xl hover-glow mb-16 animate-slide-up-1">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-emergency rounded-3xl flex items-center justify-center">
              <Zap className="h-10 w-10 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-center mb-6">Life-Saving Emergency Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <Phone className="h-8 w-8 text-emergency mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Voice-First Assistant</h4>
              <p className="text-sm text-muted-foreground">Offline safety guidance</p>
            </div>
            <div className="text-center p-4">
              <Zap className="h-8 w-8 text-emergency mx-auto mb-3" />
              <h4 className="font-semibold mb-2">SOS Emergency Mode</h4>
              <p className="text-sm text-muted-foreground">Flashlight, siren & alerts</p>
            </div>
            <div className="text-center p-4">
              <Phone className="h-8 w-8 text-emergency mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Quick-Call Directory</h4>
              <p className="text-sm text-muted-foreground">NDMA, SDMA, Fire, Police</p>
            </div>
            <div className="text-center p-4">
              <Globe className="h-8 w-8 text-emergency mx-auto mb-3" />
              <h4 className="font-semibold mb-2">AR Simulations</h4>
              <p className="text-sm text-muted-foreground">Chemical leakage response</p>
            </div>
          </div>
        </div>

        {/* Innovation Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-3xl hover-glow animate-slide-up-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">AI-Powered Learning</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Adaptive learning paths that adjust to individual progress and learning styles for maximum retention.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">Multilingual</span>
              <span className="px-3 py-1 bg-secondary-brand/10 text-secondary-brand rounded-full">Adaptive</span>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl hover-glow animate-slide-up-3">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Admin Dashboard</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Real-time analytics, student progress tracking, and institutional disaster readiness metrics.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="px-3 py-1 bg-success/10 text-success rounded-full">Analytics</span>
              <span className="px-3 py-1 bg-emergency/10 text-emergency rounded-full">Reporting</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}