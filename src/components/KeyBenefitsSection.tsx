import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, Target, ScanLine, Share, Download } from 'lucide-react';

export function KeyBenefitsSection() {
  const benefits = [
    {
      icon: Shield,
      title: 'Zero Setup',
      description: 'No account required and no image uploads—everything runs in your browser.',
      badge: 'Privacy First',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Target,
      title: 'True Accuracy',
      description: 'LMS‑based algorithms (Machado et al.) give you real color‑vision deficiency simulation, not just a hue filter.',
      badge: 'Scientific',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: ScanLine,
      title: 'Side‑by‑Side View',
      description: 'Compare original and simulated versions instantly with our split‑view slider.',
      badge: 'Interactive',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Share,
      title: 'Embed & Share',
      description: 'Copy an iframe snippet or share a unique URL to preserve your exact preview settings.',
      badge: 'Shareable',
      color: 'text-orange-600 bg-orange-100'
    },
    {
      icon: Download,
      title: 'High‑Res Download',
      description: 'Export both original and simulated PNGs at full quality for presentations or reviews.',
      badge: 'Professional',
      color: 'text-indigo-600 bg-indigo-100'
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="px-4 py-2">
            Key Benefits
          </Badge>
          <h2 id="benefits-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">
            Why Choose ColorSight Preview?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Built for designers, developers, and accessibility professionals who need accurate, 
            fast, and private color vision testing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-gray-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl ${benefit.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {benefit.badge}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Trust Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Client-Side Processing</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4 Types</div>
                <div className="text-sm text-gray-600">Color Vision Deficiencies</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">LMS</div>
                <div className="text-sm text-gray-600">Scientific Accuracy</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10MB</div>
                <div className="text-sm text-gray-600">Max File Size</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}