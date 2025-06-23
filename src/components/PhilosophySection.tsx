import { Globe, Target, Users, Lightbulb, ArrowRight } from "lucide-react";

export function PhilosophySection() {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="badge">
              Our Philosophy
            </div>
            
            <h2 className="text-section-title">
              Shaping a <span className="gradient-text">Sustainable</span> and Equitable Future
            </h2>
            
            <div className="space-y-6">
              <p className="text-large text-[var(--foreground-muted)] leading-relaxed">
                The <strong>AMIN EMEA ESG Program</strong> represents our commitment to environmental stewardship, social responsibility, and transparent governance across our global network.
              </p>
              
              <p className="text-[var(--foreground-secondary)] leading-relaxed">
                We believe that creative agencies have a unique opportunity to drive meaningful change. Through our collective expertise and global reach, we're pioneering new approaches to sustainability that benefit both business and society.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-[var(--background-tertiary)] rounded-lg">
                  <Globe className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span className="text-sm font-medium text-[var(--foreground)]">Global Impact</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[var(--background-tertiary)] rounded-lg">
                  <Target className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span className="text-sm font-medium text-[var(--foreground)]">Measurable Results</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[var(--background-tertiary)] rounded-lg">
                  <Users className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span className="text-sm font-medium text-[var(--foreground)]">Community Focus</span>
                </div>
              </div>
            </div>
            
            <a className="btn-primary"
            href="https://www.aminworldwide.com/our-story/"

            
            >
              Learn More About Our Mission
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
          
          {/* Right Content - Feature Cards */}
          <div className="space-y-6">
            <div className="philosophy-feature-card">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Environmental Stewardship
              </h3>
              <p className="text-[var(--foreground-muted)] mb-6">
                Leading initiatives that regenerate our planet through sustainable practices and innovative green solutions.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Carbon Neutral Operations</span>
              </div>
            </div>
            
            <div className="philosophy-feature-card">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Social Responsibility
              </h3>
              <p className="text-[var(--foreground-muted)] mb-6">
                Empowering communities and promoting equality through education, empowerment, and inclusive practices.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Community Empowerment</span>
              </div>
            </div>
            
            <div className="philosophy-feature-card">
              <div className="w-12 h-12 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-light)] text-white rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Innovation &amp; Transparency
              </h3>
              <p className="text-[var(--foreground-muted)] mb-6">
                Driving creative solutions with transparent governance and ethical business practices at every level.
              </p>
              <div className="flex items-center gap-2 text-sm text-[var(--brand-primary)]">
                <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full"></div>
                <span>Transparent Leadership</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}