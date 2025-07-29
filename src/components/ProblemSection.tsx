import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AlertTriangle, Eye, Users, Lightbulb, CheckCircle } from 'lucide-react';

export function ProblemSection() {
  const problemStats = [
    {
      icon: Users,
      stat: '300M+',
      label: 'People with color vision deficiency worldwide',
      description: 'Affecting 1 in 12 men and 1 in 200 women globally'
    },
    {
      icon: AlertTriangle,
      stat: '8%',
      label: 'Of men have some form of color blindness',
      description: 'The most common being red-green color blindness'
    },
    {
      icon: Eye,
      stat: '4 Types',
      label: 'Main types of color vision deficiency',
      description: 'Protanopia, Deuteranopia, Tritanopia, and Achromatopsia'
    }
  ];

  const solutions = [
    {
      title: 'Test Before Launch',
      description: 'Upload your designs or enter website URLs to see exactly how they appear to users with CVD',
      icon: Eye,
      color: 'text-teal-600 bg-teal-100'
    },
    {
      title: 'Scientific Accuracy',
      description: 'Our tool uses research-based color transformation matrices for authentic simulation',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Easy Implementation',
      description: 'Get instant feedback and actionable insights to improve your design accessibility',
      icon: Lightbulb,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem Statement */}
        <div className="text-center space-y-6 mb-20">
          <Badge variant="outline" className="px-4 py-2">
            <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
            The Color Accessibility Problem
          </Badge>
          <h2 id="problem-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">
            Is Your Design Invisible to 8% of Your Users?
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Color vision deficiency affects millions worldwide, yet most designers never test their work 
            for accessibility. Don't let poor color choices exclude users from your digital experiences.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {problemStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.stat}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Solutions */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How Color-Sight Helps</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our free tool makes it easy to test and improve your designs for color accessibility compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${solution.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{solution.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{solution.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <Card className="p-8 bg-gradient-to-r from-teal-600 to-blue-600 text-white border-0">
            <h3 className="text-2xl font-bold mb-4">Ready to Make Your Designs Accessible?</h3>
            <p className="text-lg mb-6 opacity-90">
              Start testing your designs now — it's completely free and takes just seconds.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-base px-8 py-3"
            >
              <Eye className="h-5 w-5 mr-2" />
              Test Your Design Free
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}