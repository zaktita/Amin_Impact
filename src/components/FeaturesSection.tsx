import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Sliders, Code, Shield, Download, Zap, Eye } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Sliders,
      title: 'Severity Slider',
      description: 'Fine‑tune the intensity of any color‑blindness simulation.',
      highlight: 'Real-time adjustment'
    },
    {
      icon: Code,
      title: 'Embed Anywhere',
      description: 'One‑click iframe snippet to add previews to blogs, docs, or design systems.',
      highlight: 'Copy & paste ready'
    },
    {
      icon: Shield,
      title: 'Client‑Side Privacy',
      description: 'All processing stays in your browser—your images never leave your device.',
      highlight: '100% secure'
    },
    {
      icon: Download,
      title: 'Download Results',
      description: 'Export original vs. simulated images for stakeholder presentations or design handoffs.',
      highlight: 'High-resolution PNG'
    }
  ];

  const visionTypes = [
    {
      name: 'Protanopia',
      description: 'Red-blind',
      prevalence: '~1% of men',
      color: 'bg-red-100 text-red-700 border-red-200'
    },
    {
      name: 'Deuteranopia', 
      description: 'Green-blind',
      prevalence: '~1% of men',
      color: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      name: 'Tritanopia',
      description: 'Blue-blind',
      prevalence: 'Very rare',
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    {
      name: 'Achromatopsia',
      description: 'Complete color-blind',
      prevalence: 'Extremely rare',
      color: 'bg-gray-100 text-gray-700 border-gray-200'
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="px-4 py-2">
            Features at a Glance
          </Badge>
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything You Need to Test Color Accessibility
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional-grade features built for designers, developers, and accessibility experts.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {feature.highlight}
                      </Badge>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Vision Types Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Supported Vision Types</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simulate all major types of color vision deficiencies with scientifically accurate LMS-based algorithms.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionTypes.map((type, index) => (
              <Card key={index} className={`p-6 border-2 ${type.color} hover:shadow-lg transition-all duration-300`}>
                <div className="text-center space-y-3">
                  <Eye className="h-8 w-8 mx-auto opacity-70" />
                  <div>
                    <h4 className="font-bold text-lg">{type.name}</h4>
                    <p className="text-sm opacity-80">{type.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {type.prevalence}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Specs */}
        <div className="mt-20">
          <Card className="p-8 bg-gradient-to-r from-gray-50 to-blue-50 border-2">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Technical Specifications</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">LMS</div>
                  <div className="text-sm text-gray-600">Color Space Model</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">Machado</div>
                  <div className="text-sm text-gray-600">2009 Research</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">10MB</div>
                  <div className="text-sm text-gray-600">Max File Size</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">4 Formats</div>
                  <div className="text-sm text-gray-600">JPG, PNG, GIF, SVG</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Based on peer-reviewed research by Machado, Oliveira, and Fernandes (2009) 
                  for the most accurate color vision deficiency simulation available.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}