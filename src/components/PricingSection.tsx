import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, Star, Zap, ArrowRight, Gift } from 'lucide-react';

interface PricingSectionProps {
  onGetStarted: () => void;
}

export function PricingSection({ onGetStarted }: PricingSectionProps) {
  const features = [
    "Unlimited image uploads",
    "All 4 color vision deficiency types",
    "Website URL testing",
    "High-quality downloads",
    "Shareable links & reports",
    "Embed codes for presentations",
    "Mobile & desktop access",
    "No watermarks or limits",
    "WCAG 2.1 compliance checks",
    "Team collaboration features"
  ];

  const comparison = [
    {
      feature: "Basic color accessibility testing",
      colorSight: true,
      competitors: "Limited"
    },
    {
      feature: "Multiple CVD type support",
      colorSight: "4 types",
      competitors: "1-2 types"
    },
    {
      feature: "Website URL testing",
      colorSight: true,
      competitors: false
    },
    {
      feature: "No signup required",
      colorSight: true,
      competitors: false
    },
    {
      feature: "Unlimited usage",
      colorSight: true,
      competitors: "Paid plans"
    },
    {
      feature: "Team sharing",
      colorSight: true,
      competitors: "Premium only"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-green-600 border-green-200">
            <Gift className="h-3 w-3 mr-1" />
            Always Free
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Professional Accessibility Testing
            <span className="text-green-600 block">Completely Free Forever</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe accessibility should be accessible to everyone. That's why Color-Sight 
            is free for all users, with no hidden costs or feature limitations.
          </p>
        </div>

        {/* Main Pricing Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="p-8 border-2 border-green-200 shadow-2xl relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-green-600 text-white px-6 py-2">
                <Star className="h-4 w-4 mr-1" />
                Most Popular Plan
              </Badge>
            </div>

            {/* Pricing Header */}
            <div className="text-center mb-8 pt-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Color-Sight Free</h3>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-5xl font-bold text-green-600">$0</span>
                <div className="text-left">
                  <div className="text-gray-600">/month</div>
                  <div className="text-sm text-gray-500">forever</div>
                </div>
              </div>
              <p className="text-gray-600">
                Everything you need for professional color accessibility testing
              </p>
            </div>

            {/* Features List */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              size="lg" 
              className="w-full text-lg py-4"
              onClick={onGetStarted}
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Testing Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              No credit card required • No signup needed • No limits
            </p>
          </Card>
        </div>

        {/* How We Stay Free */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            How Do We Keep This Free?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="text-sm font-bold text-blue-600">AD</div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Non-Intrusive Ads</h4>
              <p className="text-gray-600 text-sm">
                We show minimal, relevant ads that don't interfere with your workflow. 
                No popups or interruptions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Community Support</h4>
              <p className="text-gray-600 text-sm">
                Supported by designers and accessibility advocates who believe 
                in making the web inclusive.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Premium Services</h4>
              <p className="text-gray-600 text-sm">
                We offer optional premium consulting and custom integrations 
                for enterprise teams.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h3 className="text-xl font-bold text-gray-900 text-center">
              How Color-Sight Compares
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6">Feature</th>
                  <th className="text-center py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">CS</span>
                      </div>
                      <span>Color-Sight</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-6 text-gray-600">Other Tools</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.colorSight === 'boolean' ? (
                        row.colorSight ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <div className="w-5 h-5 bg-gray-300 rounded-full mx-auto"></div>
                        )
                      ) : (
                        <span className="text-green-600 font-medium">{row.colorSight}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-600">
                      {typeof row.competitors === 'boolean' ? (
                        row.competitors ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <div className="w-5 h-5 bg-gray-300 rounded-full mx-auto"></div>
                        )
                      ) : (
                        row.competitors
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}