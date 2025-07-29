import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Palette, Users, Zap } from 'lucide-react';

export function AdSidebar() {
  return (
    <aside className="hidden lg:block w-80 space-y-6">
      {/* Sponsor Ad */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="text-xs">Sponsored</Badge>
          <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-purple-600">AD</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Palette className="h-6 w-6 text-purple-600" />
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Professional Color Tools
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Advanced color accessibility testing suite for enterprise teams. WCAG compliance made easy.
            </p>
          </div>

          <Button className="w-full" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Try Free Trial
          </Button>
        </div>
      </Card>

      {/* Resource Links */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Accessibility Resources</h3>
        <div className="space-y-3">
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">WCAG Guidelines</p>
              <p className="text-xs text-gray-500">Complete accessibility standards</p>
            </div>
          </a>
          
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Design Tips</p>
              <p className="text-xs text-gray-500">Color-blind friendly design patterns</p>
            </div>
          </a>
        </div>
      </Card>

      {/* Newsletter Signup */}
      <Card className="p-6 bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-sm text-gray-600 mb-4">
          Get accessibility tips and new features delivered to your inbox.
        </p>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <Button size="sm" className="w-full">
            Subscribe
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          No spam, unsubscribe anytime.
        </p>
      </Card>
    </aside>
  );
}