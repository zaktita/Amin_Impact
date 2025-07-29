import React from 'react';
import { Button } from './ui/button';
import { Eye, Heart, Mail, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTool = () => {
    document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Color-Sight</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Free color vision deficiency testing tool helping designers and developers 
              create more accessible digital experiences. Test your designs for protanopia, 
              deuteranopia, tritanopia, and achromatopsia with scientific accuracy.
            </p>
            <Button onClick={scrollToTool} className="mb-6 bg-teal-600 hover:bg-teal-700">
              Start Testing Free
            </Button>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-lg">Quick Access</h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={scrollToTool}
                      className="text-gray-300 hover:text-white transition-colors text-left"
                    >
                      Try the Tool
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('problem')}
                      className="text-gray-300 hover:text-white transition-colors text-left"
                    >
                      Why It Matters
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('faq')}
                      className="text-gray-300 hover:text-white transition-colors text-left"
                    >
                      FAQ
                    </button>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-lg">Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://www.w3.org/WAI/WCAG21/quickref/" 
                      className="text-gray-300 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WCAG Guidelines
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness" 
                      className="text-gray-300 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      About Color Blindness
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://webaim.org/articles/visual/colorblind" 
                      className="text-gray-300 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Accessibility Guide
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact & Social */}
            <div className="mt-8">
              <h3 className="font-semibold mb-4 text-lg">Get in Touch</h3>
              <div className="flex items-center space-x-4">
                <a 
                  href="mailto:hello@color-sight.com" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-sm">hello@color-sight.com</span>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} Color-Sight.</span>
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for accessibility.</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                Using scientifically accurate Machado et al. (2009) algorithms
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}