import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ToolInterface } from './ToolInterface';
import { Eye, Zap, Users, Target } from 'lucide-react';

interface LandingHeroProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
}

export function LandingHero({ onGetStarted, onTryDemo }: LandingHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-teal-50 via-white to-blue-50 min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-gray-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="relative">
        {/* Header */}
        <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Color-Sight</h1>
                  <p className="text-xs text-gray-500 -mt-0.5">Free CVD Testing</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  100% Free
                </Badge>
                <Button onClick={onGetStarted} size="sm">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center space-y-8 mb-16">
            {/* Badge */}
            <div className="flex justify-center">
              <Badge variant="outline" className="px-4 py-2 text-sm bg-white/50 border-teal-200">
                <Users className="h-4 w-4 mr-2 text-teal-600" />
                8% of men • 0.5% of women have color vision deficiency
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Test Your Designs for{' '}
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Color Accessibility
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Free tool to simulate how your designs appear to users with color vision deficiency.
                Upload images or test websites for protanopia, deuteranopia, tritanopia, and achromatopsia.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={onTryDemo}
                className="text-base px-8 py-3 bg-teal-600 hover:bg-teal-700"
              >
                <Eye className="h-5 w-5 mr-2" />
                Start Testing Free
              </Button>
              
              
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Scientifically accurate
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                WCAG compliant
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Always free
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                No account needed
              </div>
            </div>
          </div>

          {/* Integrated Tool */}
          <div id="tool" className="scroll-mt-24">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-gray-200/50 shadow-xl p-6 lg:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Your Design Now</h2>
                <p className="text-gray-600">
                  Upload an image or enter a website URL to see how it appears to users with color vision deficiency
                </p>
              </div>
              
              <ToolInterface />
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        
      </div>
    </div>
  );
}