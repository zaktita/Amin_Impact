import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Quote, Users, Building, Palette, Code, Eye } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-purple-600 border-purple-200">
            <Users className="h-3 w-3 mr-1" />
            Use Cases
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Who Benefits from
            <span className="text-purple-600 block">Color Accessibility Testing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Color-Sight helps various professionals ensure their designs are accessible 
            to users with color vision deficiencies.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Palette className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">UX/UI Designers</h3>
              <p className="text-gray-700">
                Test mockups, wireframes, and design systems to ensure color choices work 
                for all users. Validate designs before development begins.
              </p>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-900">Common Use Cases:</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Dashboard and chart design validation</li>
                  <li>• Button and link color testing</li>
                  <li>• Status indicator accessibility</li>
                  <li>• Color palette development</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Code className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Frontend Developers</h3>
              <p className="text-gray-700">
                Validate implemented designs and ensure CSS color choices meet accessibility 
                standards. Test before deployment to catch issues early.
              </p>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-900">Common Use Cases:</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Live website accessibility audits</li>
                  <li>• Form validation color testing</li>
                  <li>• Component library validation</li>
                  <li>• WCAG compliance verification</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Product Teams</h3>
              <p className="text-gray-700">
                Ensure product features are accessible to all users. Conduct accessibility 
                reviews and meet compliance requirements for enterprise products.
              </p>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-900">Common Use Cases:</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Accessibility audits and reviews</li>
                  <li>• Compliance documentation</li>
                  <li>• User testing preparation</li>
                  <li>• Design system governance</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Industry Applications */}
        <div className="space-y-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            Critical for Key Industries
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-2 border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Healthcare & Medical</h4>
                  <p className="text-gray-600 mb-4">
                    Medical interfaces often use color coding for critical information. Ensuring 
                    accessibility can be a matter of patient safety.
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Critical Elements:</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">Vital Signs</Badge>
                      <Badge variant="outline" className="text-xs">Alert Systems</Badge>
                      <Badge variant="outline" className="text-xs">Drug Interactions</Badge>
                      <Badge variant="outline" className="text-xs">Status Indicators</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Financial Services</h4>
                  <p className="text-gray-600 mb-4">
                    Banking and trading platforms rely heavily on color coding for financial data, 
                    requiring accessibility for all users.
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Critical Elements:</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">Stock Charts</Badge>
                      <Badge variant="outline" className="text-xs">Account Status</Badge>
                      <Badge variant="outline" className="text-xs">Risk Indicators</Badge>
                      <Badge variant="outline" className="text-xs">Transaction Types</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Education & E-Learning</h4>
                  <p className="text-gray-600 mb-4">
                    Educational platforms must be accessible to all learners, including those 
                    with color vision deficiencies.
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Critical Elements:</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">Progress Tracking</Badge>
                      <Badge variant="outline" className="text-xs">Quiz Results</Badge>
                      <Badge variant="outline" className="text-xs">Course Status</Badge>
                      <Badge variant="outline" className="text-xs">Interactive Content</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Quote className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Government & Public Services</h4>
                  <p className="text-gray-600 mb-4">
                    Government websites must comply with accessibility standards and serve 
                    all citizens effectively.
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Critical Elements:</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">Form Validation</Badge>
                      <Badge variant="outline" className="text-xs">Service Status</Badge>
                      <Badge variant="outline" className="text-xs">Navigation Systems</Badge>
                      <Badge variant="outline" className="text-xs">Alert Messages</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Impact Statement */}
        <Card className="mt-16 p-8 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Eye className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Real Impact on User Experience
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              By testing your designs with Color-Sight, you ensure that critical information remains 
              accessible to users with color vision deficiencies. This improves usability, reduces 
              support requests, and helps meet legal accessibility requirements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-teal-600">8%</div>
                <div className="text-sm text-gray-600">of your male users may be affected</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-600">WCAG</div>
                <div className="text-sm text-gray-600">compliance requirements</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-600">Better</div>
                <div className="text-sm text-gray-600">user experience for everyone</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}