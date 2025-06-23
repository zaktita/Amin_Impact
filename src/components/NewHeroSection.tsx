import { ArrowRight, Globe, Target, Users, Leaf, Sparkles } from "lucide-react";

export function NewHeroSection() {
  return (
    <section className="hero-modern">
      <div className="hero-container">
        {/* Background Elements */}
        <div className="hero-bg-elements">
          <div className="hero-bg-circle hero-bg-circle-1"></div>
          <div className="hero-bg-circle hero-bg-circle-2"></div>
          <div className="hero-bg-circle hero-bg-circle-3"></div>
        </div>
        
        {/* Main Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles className="w-4 h-4 mr-2" />
            AMIN ImPact Resource Hub
            <div className="hero-badge-pulse"></div>
          </div>
          
          <h1 className="hero-title">
            Empowering
            <span className="hero-title-gradient">Sustainable Change</span>
            Through Creative Leadership
          </h1>
          
          <p className="hero-description">
            As an alliance of independent agencies and creative thinkers built on trust, we're committed to creating impactful initiatives that regenerate the planet with equality and transparency.
          </p>
          
          <div className="hero-cta">
            <a
              href="#caseStudy"
              className="btn-hero-primary"
              style={{ scrollBehavior: 'smooth' }}
            >
              <Target className="w-5 h-5 mr-2" />
              Explore Our Impact
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className="hero-indicators">
            <div className="hero-indicator">
              <div className="hero-indicator-dot bg-green-500"></div>
              <span>Global Alliance</span>
            </div>
            <div className="hero-indicator">
              <div className="hero-indicator-dot bg-blue-500"></div>
              <span>ESG Focused</span>
            </div>
            <div className="hero-indicator">
              <div className="hero-indicator-dot bg-purple-500"></div>
              <span>Impact Driven</span>
            </div>
          </div>
        </div>
        
        {/* Floating Impact Cards */}
        <div className="hero-floating-cards">
          <div className="hero-floating-card hero-floating-card-1">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1 text-sm">
                  Climate Action
                </h3>
                <p className="text-xs text-[var(--color-foreground-muted)] mb-2 leading-relaxed">
                  Driving environmental regeneration
                </p>
                
              </div>
            </div>
          </div>
          
          <div className="hero-floating-card hero-floating-card-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1 text-sm">
                  Community Impact
                </h3>
                <p className="text-xs text-[var(--color-foreground-muted)] mb-2 leading-relaxed">
                  Empowering meaningful change
                </p>
                
              </div>
            </div>
          </div>
          
          <div className="hero-floating-card hero-floating-card-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1 text-sm">
                  Transparent Governance
                </h3>
                <p className="text-xs text-[var(--color-foreground-muted)] mb-2 leading-relaxed">
                  Ethical business practices
                </p>
               
              </div>
            </div>
          </div>
          
          <div className="hero-floating-card hero-floating-card-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[var(--color-violet-600)] to-[var(--color-blue-500)] text-white rounded-xl flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1 text-sm">
                  Global Reach
                </h3>
                <p className="text-xs text-[var(--color-foreground-muted)] mb-2 leading-relaxed">
                  Worldwide creative network
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}