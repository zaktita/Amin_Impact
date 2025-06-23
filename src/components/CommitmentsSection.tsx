import { Leaf, Users, Shield, TrendingUp } from "lucide-react";

export function CommitmentsSection() {
  const commitments = [
    {
      icon: <Leaf className="w-6 h-6 text-white" />,
      title: "Climate & Resources",
      description: "Pioneering sustainable practices and environmental stewardship through innovative green technologies, renewable energy adoption, and comprehensive carbon reduction strategies.",
      metric: "60%",
      metricLabel: "Carbon Footprint Reduction",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Community & Equity",
      description: "Building inclusive communities and promoting social justice through education, empowerment, and equal opportunity initiatives that create lasting positive change.",
      metric: "500+",
      metricLabel: "Lives Directly Impacted",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "Governance & Integrity",
      description: "Maintaining transparent leadership and ethical business practices with comprehensive accountability frameworks at every organizational level.",
      metric: "100%",
      metricLabel: "Compliance Standards Met",
      color: "from-purple-500 to-violet-600"
    }
  ];

  return (
    <section className="section-alt">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="badge mb-6">
            Our Foundation
          </div>
          <h2 className="text-section-title mb-6">
            Our <span className="gradient-text">ESG Commitments</span>
          </h2>
          <p className="text-large text-[var(--foreground-muted)] max-w-3xl mx-auto">
            Three foundational pillars that drive our environmental, social, and governance strategy, creating measurable impact across communities worldwide.
          </p>
        </div>
        
        <div className="grid-responsive">
          {commitments.map((commitment, index) => (
            <div key={index} className="card p-8 group h-[420px] flex flex-col">
              {/* Icon */}
              <div className={`icon-container mb-6 bg-gradient-to-r ${commitment.color}`}>
                {commitment.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
                {commitment.title}
              </h3>
              <p className="text-[var(--foreground-muted)] mb-8 leading-relaxed flex-grow">
                {commitment.description}
              </p>
              
              {/* Metric Card */}
              <div className="bg-[var(--background-tertiary)] rounded-lg p-4 border border-[var(--border-muted)] mt-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-[var(--brand-primary)] mb-1">
                      {commitment.metric}
                    </div>
                    <div className="text-sm text-[var(--foreground-subtle)]">
                      {commitment.metricLabel}
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-[var(--brand-primary)] opacity-60" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}