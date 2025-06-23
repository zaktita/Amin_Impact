import { Button } from "./ui/button";
import { ArrowRight, Download, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="section relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-background-secondary)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(155,81,224,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(155,81,224,0.03)_0%,transparent_50%)] opacity-60"></div>
      </div>
      
      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="badge">
              🌟 ESG Leadership Excellence
            </div>
            
            <div className="space-y-6">
              <h1 className="text-hero">
                Shaping a{' '}
                <span className="gradient-text">Sustainable</span>
                {' '}&amp;{' '}
                <span className="gradient-text">Equitable</span>
                {' '}Future
              </h1>
              
              <p className="text-large text-[var(--color-foreground-muted)] max-w-2xl">
                AMIN's comprehensive ESG commitment and ImPact program driving meaningful change across communities, environment, and governance through innovative solutions and measurable impact.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary group">
                <Download className="w-5 h-5 mr-2" />
                Download ImPact Report
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button className="btn-secondary group">
                <Play className="w-5 h-5 mr-2" />
                Watch Overview
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[var(--color-border)]">
              <div className="text-center">
                <div className="stat-number">75%</div>
                <div className="text-sm text-[var(--color-foreground-subtle)] mt-1">Carbon Reduction</div>
              </div>
              <div className="text-center">
                <div className="stat-number">500+</div>
                <div className="text-sm text-[var(--color-foreground-subtle)] mt-1">Lives Impacted</div>
              </div>
              <div className="text-center">
                <div className="stat-number">100%</div>
                <div className="text-sm text-[var(--color-foreground-subtle)] mt-1">Renewable Energy</div>
              </div>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="relative">
            <div className="card-elevated p-8 animate-pulse-gentle">
              <div className="aspect-video bg-gradient-to-br from-[var(--color-brand-primary)]/10 to-[var(--color-brand-secondary)]/5 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-brand-primary) 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                  }}></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4 animate-pulse-gentle">🌍</div>
                  <div className="text-sm text-[var(--color-foreground-muted)] font-medium">Global Impact Visualization</div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 card p-3">
              <div className="text-2xl">♻️</div>
            </div>
            <div className="absolute -bottom-4 -left-4 card p-3">
              <div className="text-2xl">🤝</div>
            </div>
            <div className="absolute top-1/2 -left-8 card p-3">
              <div className="text-2xl">⚖️</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}