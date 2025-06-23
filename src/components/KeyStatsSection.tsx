import { BarChart, TrendingUp, Users, ShoppingCart, Heart } from "lucide-react";
import { Button } from "./ui/button";

export function KeyStatsSection() {
  const stats = [
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      percentage: "76%",
      label: "of consumers say they'll stop buying from companies that mistreat the environment, workers, or their communities",
      source: "PwC Consumer Survey, 2024"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      percentage: "60%",
      label: "potential influence of ESG strategies on operating profits",
      source: "McKinsey Global Institute, 2024"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      percentage: "88%",
      label: "of consumers are more loyal to companies that support social and environmental causes",
      source: "Cone Communications Study, 2024"
    },
    {
      icon: <Users className="w-6 h-6" />,
      percentage: "38%",
      label: "of talent want to work for employers committed to ESG principles",
      source: "Universum Talent Survey, 2024"
    }
  ];

  return (
    <section className="section-alt">
      <div className="container-custom">
        <div className="text-center mb-20">
          <div className="badge mb-6">
            <BarChart className="w-4 h-4 mr-2" />
            Market Intelligence
          </div>
          <h2 className="text-section-title mb-6">
            The Business Case for <span className="gradient-text">ESG Excellence</span>
          </h2>
          <p className="text-large text-[var(--color-foreground-muted)] max-w-3xl mx-auto">
            Compelling data demonstrating how ESG leadership drives consumer loyalty, operational excellence, and talent attraction in today's marketplace.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="card p-8 text-center group">
              {/* Icon */}
              <div className="icon-container-outline mx-auto mb-6">
                {stat.icon}
              </div>
              
              {/* Percentage */}
              <div className="stat-number mb-4">
                {stat.percentage}
              </div>
              
              {/* Label */}
              <div className="text-[var(--color-foreground-secondary)] mb-6 leading-relaxed">
                {stat.label}
              </div>
              
              {/* Source */}
              <div className="text-xs text-[var(--color-foreground-subtle)] pt-4 border-t border-[var(--color-border-muted)]">
                Source: {stat.source}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="card-elevated p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-[var(--color-foreground)] mb-4">
              Ready to Lead with <span className="gradient-text">ESG Excellence</span>?
            </h3>
            <p className="text-[var(--color-foreground-muted)] mb-6">
              Join the growing number of organizations leveraging ESG strategies for competitive advantage and meaningful impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary">
                Start Your ESG Journey
              </Button>
              <Button className="btn-outline">
                Request Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}