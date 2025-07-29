import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Upload, Eye, Sliders, ArrowRight, Download, Share } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Upload,
      title: 'Upload Your Image',
      description: 'Drag & drop or click to select any JPG, PNG, GIF, or SVG file.',
      details: ['Supports up to 10MB files', 'All processing stays local', 'No server uploads']
    },
    {
      number: '02', 
      icon: Eye,
      title: 'Select a Vision Type',
      description: 'Choose protanopia (red‑blind), deuteranopia (green‑blind), tritanopia (blue‑blind), or achromatopsia (complete color‑blind).',
      details: ['Based on Machado et al. research', 'LMS color space algorithms', 'Scientifically accurate simulation']
    },
    {
      number: '03',
      icon: Sliders,
      title: 'Adjust Severity',
      description: 'Use the slider to preview mild to complete deficiency.',
      details: ['Fine-tune intensity levels', 'Real-time preview updates', 'Compare different severities']
    },
    {
      number: '04',
      icon: Download,
      title: 'Compare & Export',
      description: 'View side‑by‑side, copy embed code, share a link, or download high‑res results with one click.',
      details: ['Split-view slider comparison', 'High-resolution PNG exports', 'Shareable URLs and embed codes']
    }
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="px-4 py-2">
            How It Works
          </Badge>
          <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">
            Simple 4-Step Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get accurate color vision deficiency simulations in seconds—no technical expertise required.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={index} className="relative">
                <Card className="p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Step Number & Icon */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-4xl font-bold text-gray-300">{step.number}</div>
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap gap-2">
                        {step.details.map((detail, detailIndex) => (
                          <Badge key={detailIndex} variant="secondary" className="text-xs px-3 py-1">
                            {detail}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Arrow connector */}
                {!isLast && (
                  <div className="flex justify-center my-6">
                    <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Test Your Designs?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of designers and developers using ColorSight Preview to create more accessible experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm opacity-90">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                No registration required
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Start testing immediately
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                100% private and secure
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}