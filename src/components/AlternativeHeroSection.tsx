import { Button } from "./ui/button";
import { ArrowRight, Globe, Target, Users, Leaf } from "lucide-react";

export function AlternativeHeroSection() {
  return (
    <section className="section bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background-secondary)] to-[var(--color-background-tertiary)]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="badge">
              <Globe className="w-4 h-4 mr-2" />
              AMIN ImPact Resource Hub
            </div>
            
            <h1 className="text-hero">
              Empowering <span className="gradient-text">Sustainable Change</span> Through Creative Leadership
            </h1>
            
            <p className="text-large text-[var(--color-foreground-muted)] leading-relaxed">
              As an alliance of independent agencies and creative thinkers built on trust, we're committed to creating impactful initiatives that regenerate the planet with equality and transparency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary">
                <Target className="w-5 h-5 mr-2" />
                Explore Our Impact
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-[var(--color-border-muted)]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[var(--color-brand-primary)] rounded-full"></div>
                <span className="text-sm text-[var(--color-foreground-subtle)]">Global Alliance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[var(--color-brand-secondary)] rounded-full"></div>
                <span className="text-sm text-[var(--color-foreground-subtle)]">ESG Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[var(--color-brand-primary-light)] rounded-full"></div>
                <span className="text-sm text-[var(--color-foreground-subtle)]">Impact Driven</span>
              </div>
            </div>
          </div>
          
          {/* Right Visual - Fixed Grid with Round Icons */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Climate Action Card */}
              <div className="hero-card">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center mb-4">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-[var(--color-foreground)] mb-2 text-sm">
                  Climate Action
                </h3>
                <p className="text-xs text-[var(--color-foreground-muted)] mb-4 leading-relaxed">
                  Driving environmental regeneration through sustainable practices
                </p>
                <div className="mt-auto">
                  <div className="text-xl font-bold text-green-600 mb-1">5+</div>
                  <span className="text-xs text-[var(--color-foreground-subtle)]">Green Initiatives</span>
                </div>
              </div>
              
              {/* Community Impact Card */}
              <div className="hero-card">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-[var(--color-foreground)] mb-2 text-sm">
                  Community Impact
                </h3>
                <p className="text-xs text-[var(--color-foreground-muted)] mb-4 leading-relaxed">
                  Empowering communities for meaningful change
                </p>
                <div className="mt-auto">
                  <div className="text-xl font-bold text-blue-600 mb-1">25+</div>
                  <span className="text-xs text-[var(--color-foreground-subtle)]">Communities Reached</span>
                </div>
              </div>
              
              {/* Governance Card */}
              <div className="hero-card">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-[var(--color-foreground)] mb-2 text-sm">
                  Transparent Governance
                </h3>
                <p className="text-xs text-[var(--color-foreground-muted)] mb-4 leading-relaxed">
                  Leading with accountability and ethical standards
                </p>
                <div className="mt-auto">
                  <div className="text-xl font-bold text-purple-600 mb-1">100%</div>
                  <span className="text-xs text-[var(--color-foreground-subtle)]">Transparency</span>
                </div>
              </div>
              
              {/* Global Reach Card */}
              <div className="hero-card">
                <div className="w-10 h-10 bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-primary-light)] text-white rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-[var(--color-foreground)] mb-2 text-sm">
                  Global Reach
                </h3>
                <p className="text-xs text-[var(--color-foreground-muted)] mb-4 leading-relaxed">
                  Worldwide network of creative agencies
                </p>
                <div className="mt-auto">
                  <div className="stat-small">15+</div>
                  <span className="text-xs text-[var(--color-foreground-subtle)]">Countries</span>
                </div>
              </div>
            </div>
            
            {/* Background Elements */}
            <div className="absolute -z-10 top-10 right-10 w-64 h-64 bg-gradient-to-br from-[var(--color-brand-primary)]/10 to-[var(--color-brand-secondary)]/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-[var(--color-brand-secondary)]/10 to-[var(--color-brand-primary-light)]/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}