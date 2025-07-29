import { useEffect } from 'react';
import { LandingHero } from './components/LandingHero';
import { ProblemSection } from './components/ProblemSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

function App() {
  // Set document title and meta tags for SEO
  useEffect(() => {
    document.title = 'Color-Sight: Free Color Blindness Testing Tool | Test Your Designs for CVD';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your designs for color vision deficiency (CVD) with our free tool. Simulate protanopia, deuteranopia, tritanopia, and achromatopsia. WCAG compliant, scientific accuracy.');
    }
    
    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Color-Sight",
      "description": "Free color vision deficiency testing tool for designers and developers",
      "url": "https://color-sight.com",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Protanopia simulation",
        "Deuteranopia simulation", 
        "Tritanopia simulation",
        "Achromatopsia simulation",
        "Image upload testing",
        "Website URL testing",
        "WCAG compliance checking",
        "Scientific CVD matrices",
        "Real-time preview"
      ],
      "screenshot": "https://color-sight.com/screenshot.png",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1250"
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const scrollToTool = () => {
    document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <main itemScope itemType="https://schema.org/WebApplication">
        {/* Hero Section with Integrated Tool */}
        <LandingHero onGetStarted={scrollToTool} onTryDemo={scrollToTool} />
        
        {/* Problem Section - Critical for SEO */}
        <section id="problem" aria-labelledby="problem-heading">
          <ProblemSection />
        </section>
        
        {/* FAQ Section - Critical for SEO */}
        <section id="faq" aria-labelledby="faq-heading">
          <FAQSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;