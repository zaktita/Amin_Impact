import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { HelpCircle } from 'lucide-react';

export function FAQSection() {
  const faqs = [
    {
      question: 'What is color vision deficiency (CVD)?',
      answer: 'Color vision deficiency, commonly called color blindness, is a condition where people have difficulty distinguishing certain colors. It affects about 8% of men and 0.5% of women worldwide. The most common types are red-green color blindness (protanopia and deuteranopia), followed by blue-yellow color blindness (tritanopia), and complete color blindness (achromatopsia).'
    },
    {
      question: 'How accurate is the Color-Sight simulation?',
      answer: 'Our simulations are based on peer-reviewed research and use scientifically accurate color transformation matrices. While no digital simulation can perfectly replicate the human visual experience, our tool provides a highly accurate representation that meets industry standards for accessibility testing.'
    },
    {
      question: 'Is Color-Sight really free to use?',
      answer: 'Yes! Color-Sight is completely free to use with no hidden costs, registration requirements, or usage limits. We believe accessibility testing should be available to everyone, regardless of budget constraints.'
    },
    {
      question: 'What file formats does the image upload support?',
      answer: 'You can upload JPG, PNG, GIF, and SVG files. For best results, we recommend using high-resolution images (at least 800px wide). The tool works with both photographs and design mockups.'
    },
    {
      question: 'Can I test live websites with Color-Sight?',
      answer: 'Yes! Simply enter any website URL and our tool will capture a screenshot and apply the color vision deficiency simulations. This is perfect for testing existing websites or web applications.'
    },
    {
      question: 'Do I need to install any software?',
      answer: 'No installation required! Color-Sight runs entirely in your web browser. Just visit our website and start testing immediately.'
    },
    {
      question: 'How does Color-Sight help with WCAG compliance?',
      answer: 'Color-Sight helps you identify potential accessibility issues related to color usage, which is covered under WCAG Success Criterion 1.4.1 (Use of Color). By testing your designs, you can ensure they don\'t rely solely on color to convey important information.'
    },
    {
      question: 'Can I share my test results with my team?',
      answer: 'Yes! You can share your test results using the share feature, which generates a unique link that preserves your image and selected color vision deficiency type for easy collaboration with team members and stakeholders.'
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="px-4 py-2">
            <HelpCircle className="h-4 w-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything You Need to Know
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about color vision deficiency testing and how to use Color-Sight effectively.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-gray-50 rounded-lg border-2 hover:border-gray-300 transition-colors px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <h3 className="font-semibold text-gray-900 text-base leading-tight">
                  {faq.question}
                </h3>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Help */}
        <div className="mt-16 text-center">
          <div className="bg-teal-50 rounded-2xl p-8 border-2 border-teal-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              We're here to help you make your designs more accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Badge 
                variant="outline" 
                className="px-6 py-3 text-base bg-teal-600 text-white border-0 hover:bg-teal-700 cursor-pointer"
                onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Try Color-Sight Now
              </Badge>
              <Badge 
                variant="outline" 
                className="px-6 py-3 text-base cursor-pointer"
                onClick={() => window.open('mailto:support@color-sight.com')}
              >
                Contact Support
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}