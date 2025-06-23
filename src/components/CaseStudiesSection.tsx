import React from "react";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { ExternalLink, TrendingUp, Award, Eye, Globe, Users, Heart, Shield, Waves } from "lucide-react";

export function CaseStudiesSection() {
  const caseStudies = [
    {
      title: "Empowering Climate Leadership",
      subtitle: "Branding Japan's Corporate Climate Movement",
      summary: "A sleek bilingual identity and digital platform elevate transparency, climate disclosure, and shareholder engagement across Japan.",
      impact: "50+ Corporations",
      category: "Climate Action",
      year: "2024",
      award: "Climate Innovation Excellence",
      icon: <Globe className="w-5 h-5" />,
      region: "Japan",
      link: "https://custom-media.com/portfolio/corporate-action-japan-caj/"
    },
    {
      title: "Waves of Change",
      subtitle: "Storytelling That Tackles Ocean Pollution",
      summary: "A powerful film campaign highlights Indonesia's marine waste crisis, driving regional awareness and global engagement.",
      impact: "2M+ Views",
      category: "Environmental",
      year: "2023",
      award: "Impact Storytelling Award",
      icon: <Waves className="w-5 h-5" />,
      region: "Indonesia",
      link:"https://www.adb.org/news/videos/partnering-tomorrow-reducing-marine-debris-indonesia"
    },
    {
      title: "Creativity in the Fast Lane",
      subtitle: "Accelerating the Race to Cure Dementia",
      summary: "A high-impact creative campaign builds urgency, awareness, and funding for groundbreaking dementia research.",
      impact: "$5M+ Raised",
      category: "Health & Research",
      year: "2024",
      award: "Healthcare Innovation Award",
      icon: <Heart className="w-5 h-5" />,
      region: "Global",
      link:"dprandco.com/dprco-contributes-to-stunningly-successful-race-against-dementia-event/"
    },
    {
      title: "Truth Under Fire",
      subtitle: "Fighting Disinformation, Defending Human Rights",
      summary: "A bold media strategy confronts misinformation and champions justice for the Rohingya community.",
      impact: "Global Awareness",
      category: "Human Rights",
      year: "2023",
      award: "Human Rights Advocacy Excellence",
      icon: <Shield className="w-5 h-5" />,
      region: "Myanmar/Global",
      link:"https://www.youtube.com/watch?v=K9ehEB3Lb24"
    },
    {
      title: "Immersive Oceans",
      subtitle: "Inspiring the Next Generation of Marine Stewards",
      summary: "An interactive 3D submarine experience sparks curiosity and environmental awareness among young explorers.",
      impact: "10K+ Students",
      category: "Education",
      year: "2024",
      award: "Educational Innovation Award",
      icon: <Users className="w-5 h-5" />,
      region: "Global",
      link:"https://www.youtube.com/watch?v=VyJGKTQdidE"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Climate Action":
        return "from-green-500 to-emerald-600";
      case "Environmental":
        return "from-blue-500 to-cyan-600";
      case "Health & Research":
        return "from-pink-500 to-rose-600";
      case "Human Rights":
        return "from-red-500 to-orange-600";
      case "Education":
        return "from-purple-500 to-violet-600";
      default:
        return "from-gray-500 to-slate-600";
    }
  };

  return (
    <section className="section" id="caseStudy">
      <div className="container-custom">
        <div className="text-center mb-20">
          <div className="badge mb-6">
            <Award className="w-4 h-4 mr-2" />
            ESG Case Studies
          </div>
          <h2 className="text-section-title mb-6">
            Real-World <span className="gradient-text">Impact Stories</span>
          </h2>
          <p className="text-large text-[var(--foreground-muted)] max-w-3xl mx-auto">
            Discover how our comprehensive ESG initiatives create measurable change across communities, environment, and society through innovative campaigns and strategic partnerships.
          </p>
        </div>
        
        <div className="relative">
          <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-4">
              {caseStudies.map((study, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="card group h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-[var(--border-muted)]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="badge">{study.category}</span>
                        <div className="flex items-center gap-2 text-sm text-[var(--foreground-subtle)]">
                          <span>{study.region}</span>
                          <span>•</span>
                          <span>{study.year}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-[var(--foreground)]">
                          {study.title}
                        </h3>
                        <p className="text-sm text-[var(--foreground-muted)] font-medium">
                          {study.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-[var(--foreground-muted)] mb-6 leading-relaxed flex-grow">
                        {study.summary}
                      </p>
                      
                      {/* Award */}
                      <div className="bg-[var(--background-tertiary)] rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getCategoryColor(study.category)} flex items-center justify-center`}>
                            {React.cloneElement(study.icon, { className: "w-4 h-4 text-white" })}
                          </div>
                          <div>
                            <div className="font-medium text-[var(--foreground)]">{study.award}</div>
                            <div className="text-sm text-[var(--foreground-subtle)]">Industry Recognition</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Impact Metric */}
                      <div className="bg-gradient-to-r from-[var(--brand-primary)]/5 to-[var(--brand-secondary)]/5 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-[var(--foreground-subtle)] mb-1">Key Impact</div>
                            <div className="text-xl font-bold text-[var(--brand-primary)]">{study.impact}</div>
                          </div>
                          <TrendingUp className="w-6 h-6 text-[var(--brand-primary)]" />
                        </div>
                      </div>
                      
                      <a className="btn-outline w-full group"
                      href={study.link}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Case Study
                        <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
        
        {/* Navigation dots for mobile */}
        <div className="flex justify-center mt-8 gap-2 md:hidden">
          {Array.from({ length: caseStudies.length }).map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-[var(--border)] hover:bg-[var(--brand-primary)] transition-colors duration-200"></div>
          ))}
        </div>
      </div>
    </section>
  );
}