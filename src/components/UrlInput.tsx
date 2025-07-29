import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Globe, Loader2, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface UrlInputProps {
  onProcess: (data: { source: string; originalUrl?: string; type: 'url' }) => void;
}

export function UrlInput({ onProcess }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidUrl = (string: string) => {
    try {
      const newUrl = new URL(string);
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (err) {
      return false;
    }
  };

  const normalizeUrl = (inputUrl: string) => {
    let normalizedUrl = inputUrl.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl;
    }
    return normalizedUrl;
  };

  // Create realistic website mockups based on domain
  const createWebsiteMockup = (targetUrl: string): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not create canvas context');
    }

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 800;

    // Determine website type from URL
    const urlLower = targetUrl.toLowerCase();
    const domain = new URL(targetUrl).hostname.toLowerCase();

    // Website-specific mockups
    if (domain.includes('google')) {
      createGoogleMockup(ctx, canvas);
    } else if (domain.includes('github')) {
      createGithubMockup(ctx, canvas);
    } else if (domain.includes('stackoverflow')) {
      createStackOverflowMockup(ctx, canvas);
    } else if (domain.includes('dribbble')) {
      createDribbleMockup(ctx, canvas);
    } else if (domain.includes('facebook') || domain.includes('twitter') || domain.includes('instagram')) {
      createSocialMediaMockup(ctx, canvas, domain);
    } else if (domain.includes('shop') || domain.includes('store') || domain.includes('amazon')) {
      createEcommerceMockup(ctx, canvas);
    } else {
      createGenericWebsiteMockup(ctx, canvas, domain);
    }

    return canvas;
  };

  const createGoogleMockup = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Google logo area
    ctx.fillStyle = '#4285f4';
    ctx.font = 'bold 72px system-ui, sans-serif';
    ctx.fillText('G', 500, 200);
    ctx.fillStyle = '#ea4335';
    ctx.fillText('o', 540, 200);
    ctx.fillStyle = '#fbbc05';
    ctx.fillText('o', 580, 200);
    ctx.fillStyle = '#4285f4';
    ctx.fillText('g', 620, 200);
    ctx.fillStyle = '#34a853';
    ctx.fillText('l', 660, 200);
    ctx.fillStyle = '#ea4335';
    ctx.fillText('e', 680, 200);

    // Search box
    ctx.strokeStyle = '#dadce0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(300, 250, 600, 50, 25);
    ctx.stroke();

    // Search button
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(480, 330, 120, 40);
    ctx.strokeStyle = '#f8f9fa';
    ctx.strokeRect(480, 330, 120, 40);
    ctx.fillStyle = '#3c4043';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText('Google Search', 495, 355);

    // Lucky button
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(620, 330, 120, 40);
    ctx.strokeRect(620, 330, 120, 40);
    ctx.fillText("I'm Feeling Lucky", 630, 355);
  };

  const createGithubMockup = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Background
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = '#21262d';
    ctx.fillRect(0, 0, canvas.width, 70);

    // GitHub logo
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.fillText('GitHub', 50, 45);

    // Navigation
    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText('Pull requests', 200, 45);
    ctx.fillText('Issues', 320, 45);
    ctx.fillText('Marketplace', 400, 45);
    ctx.fillText('Explore', 520, 45);

    // Repository card
    ctx.fillStyle = '#21262d';
    ctx.fillRect(50, 120, 500, 150);
    ctx.strokeStyle = '#30363d';
    ctx.strokeRect(50, 120, 500, 150);

    ctx.fillStyle = '#58a6ff';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillText('microsoft/vscode', 70, 150);

    ctx.fillStyle = '#7d8590';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText('Visual Studio Code', 70, 175);

    // Language indicators
    ctx.fillStyle = '#f1e05a'; // JavaScript color
    ctx.beginPath();
    ctx.arc(80, 220, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#7d8590';
    ctx.fillText('JavaScript 45%', 100, 225);

    ctx.fillStyle = '#3178c6'; // TypeScript color
    ctx.beginPath();
    ctx.arc(220, 220, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText('TypeScript 35%', 240, 225);
  };

  const createStackOverflowMockup = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = '#f48024';
    ctx.fillRect(0, 0, canvas.width, 60);

    // Logo
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillText('stack overflow', 50, 40);

    // Question card
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, 100, 800, 120);
    ctx.strokeStyle = '#e4e6ea';
    ctx.strokeRect(50, 100, 800, 120);

    // Vote count
    ctx.fillStyle = '#6a737c';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText('23', 70, 140);
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText('votes', 70, 155);

    // Answer count
    ctx.fillStyle = '#5eba7d';
    ctx.fillRect(120, 120, 50, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.fillText('5', 140, 140);

    // Question title
    ctx.fillStyle = '#0077cc';
    ctx.font = '18px system-ui, sans-serif';
    ctx.fillText('How to test color blindness in web design?', 200, 130);

    // Tags
    ctx.fillStyle = '#e1ecf4';
    ctx.fillRect(200, 160, 80, 25);
    ctx.fillRect(290, 160, 100, 25);
    ctx.fillRect(400, 160, 90, 25);

    ctx.fillStyle = '#39739d';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText('accessibility', 205, 175);
    ctx.fillText('color-blindness', 295, 175);
    ctx.fillText('web-design', 405, 175);
  };

  const createDribbleMockup = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = '#ea4c89';
    ctx.fillRect(0, 0, canvas.width, 80);

    // Logo
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.fillText('Dribbble', 50, 50);

    // Design grid
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    for (let i = 0; i < 6; i++) {
      const x = 50 + (i % 3) * 200;
      const y = 120 + Math.floor(i / 3) * 200;
      
      ctx.fillStyle = colors[i];
      ctx.fillRect(x, y, 180, 140);
      
      // Add some design elements
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(x + 20, y + 20, 140, 20);
      ctx.fillRect(x + 20, y + 50, 100, 20);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(x + 140, y + 100, 15, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const createSocialMediaMockup = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, domain: string) => {
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const brandColor = domain.includes('facebook') ? '#1877f2' : 
                      domain.includes('twitter') ? '#1da1f2' : '#e4405f';

    // Header
    ctx.fillStyle = brandColor;
    ctx.fillRect(0, 0, canvas.width, 70);

    // Brand name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px system-ui, sans-serif';
    const brandName = domain.includes('facebook') ? 'Facebook' : 
                      domain.includes('twitter') ? 'Twitter' : 'Instagram';
    ctx.fillText(brandName, 50, 45);

    // Posts
    for (let i = 0; i < 3; i++) {
      const y = 100 + i * 180;
      
      // Post container
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(300, y, 600, 150);
      ctx.strokeStyle = '#e1e8ed';
      ctx.strokeRect(300, y, 600, 150);

      // Profile picture
      ctx.fillStyle = brandColor;
      ctx.beginPath();
      ctx.arc(330, y + 30, 20, 0, 2 * Math.PI);
      ctx.fill();

      // Post content
      ctx.fillStyle = '#14171a';
      ctx.font = '16px system-ui, sans-serif';
      ctx.fillText('User Name', 360, y + 25);
      ctx.font = '14px system-ui, sans-serif';
      ctx.fillText('This is a sample social media post about web accessibility...', 320, y + 55);

      // Interaction buttons
      const buttonColors = ['#1da1f2', '#17bf63', '#e0245e'];
      for (let j = 0; j < 3; j++) {
        ctx.fillStyle = buttonColors[j];
        ctx.fillRect(320 + j * 80, y + 100, 60, 30);
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px system-ui, sans-serif';
        const buttonText = j === 0 ? 'Like' : j === 1 ? 'Share' : 'Comment';
        ctx.fillText(buttonText, 330 + j * 80, y + 118);
      }
    }
  };

  const createEcommerceMockup = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = '#232f3e';
    ctx.fillRect(0, 0, canvas.width, 80);

    // Logo
    ctx.fillStyle = '#ff9900';
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.fillText('ShopSite', 50, 50);

    // Search bar
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(300, 25, 500, 30);
    ctx.strokeStyle = '#ff9900';
    ctx.lineWidth = 2;
    ctx.strokeRect(300, 25, 500, 30);

    // Product grid
    const productColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    for (let i = 0; i < 6; i++) {
      const x = 50 + (i % 3) * 200;
      const y = 120 + Math.floor(i / 3) * 250;
      
      // Product image
      ctx.fillStyle = productColors[i];
      ctx.fillRect(x, y, 180, 140);
      
      // Product info
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, y + 140, 180, 80);
      ctx.strokeStyle = '#e1e8ed';
      ctx.strokeRect(x, y, 180, 220);
      
      ctx.fillStyle = '#333333';
      ctx.font = '14px system-ui, sans-serif';
      ctx.fillText('Product Name', x + 10, y + 165);
      
      ctx.fillStyle = '#007600';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillText('$29.99', x + 10, y + 190);
      
      // Buy button
      ctx.fillStyle = '#ff9900';
      ctx.fillRect(x + 10, y + 200, 160, 25);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText('Add to Cart', x + 70, y + 217);
    }
  };

  const createGenericWebsiteMockup = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, domain: string) => {
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, canvas.width, 80);

    // Logo/Site name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.fillText(domain, 50, 50);

    // Navigation
    ctx.font = '16px system-ui, sans-serif';
    const navItems = ['Home', 'About', 'Services', 'Contact'];
    navItems.forEach((item, index) => {
      ctx.fillText(item, 300 + index * 100, 50);
    });

    // Hero section
    ctx.fillStyle = '#3498db';
    ctx.fillRect(50, 120, canvas.width - 100, 200);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px system-ui, sans-serif';
    ctx.fillText('Welcome to Our Website', 200, 200);
    ctx.font = '18px system-ui, sans-serif';
    ctx.fillText('Discover our amazing services and products', 200, 240);

    // Call-to-action button
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(200, 260, 150, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText('Get Started', 240, 285);

    // Content sections
    const sectionColors = ['#e8f5e8', '#fff2e8', '#e8f2ff'];
    for (let i = 0; i < 3; i++) {
      const x = 50 + i * 350;
      const y = 380;
      
      ctx.fillStyle = sectionColors[i];
      ctx.fillRect(x, y, 300, 150);
      ctx.strokeStyle = '#ddd';
      ctx.strokeRect(x, y, 300, 150);
      
      ctx.fillStyle = '#2c3e50';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText(`Feature ${i + 1}`, x + 20, y + 40);
      
      ctx.font = '14px system-ui, sans-serif';
      ctx.fillText('This is a description of our', x + 20, y + 70);
      ctx.fillText('amazing feature that helps', x + 20, y + 90);
      ctx.fillText('users achieve their goals.', x + 20, y + 110);
    }
  };

  const captureScreenshot = async (targetUrl: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const canvas = createWebsiteMockup(targetUrl);
      const dataUrl = canvas.toDataURL('image/png');
      
      onProcess({
        source: dataUrl,
        originalUrl: targetUrl,
        type: 'url'
      });

    } catch (err) {
      console.error('Screenshot capture failed:', err);
      setError('Failed to capture website screenshot. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a website URL');
      return;
    }

    const normalizedUrl = normalizeUrl(url);
    
    if (!isValidUrl(normalizedUrl)) {
      setError('Please enter a valid website URL (e.g., example.com or https://example.com)');
      return;
    }

    await captureScreenshot(normalizedUrl);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError(null);
  };

  const popularSites = [
    { name: 'Google', url: 'google.com', description: 'Search engine' },
    { name: 'GitHub', url: 'github.com', description: 'Code repository' },
    { name: 'Stack Overflow', url: 'stackoverflow.com', description: 'Developer community' },
    { name: 'Dribbble', url: 'dribbble.com', description: 'Design showcase' },
  ];

  return (
    <Card className="p-8">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Globe className="h-12 w-12 text-blue-600 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900">Test Any Website</h3>
          <p className="text-gray-600">
            Enter a website URL to capture a screenshot and test it for color accessibility issues
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="website-url" className="text-sm font-medium text-gray-700">
              Website URL
            </label>
            <div className="relative">
              <Input
                id="website-url"
                type="text"
                placeholder="Enter website URL (e.g., example.com)"
                value={url}
                onChange={handleUrlChange}
                disabled={isLoading}
                className={error ? 'border-red-300 focus:border-red-500 pr-10' : 'pr-10'}
              />
              <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !url.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Capturing Screenshot...
              </>
            ) : (
              <>
                <Globe className="h-4 w-4 mr-2" />
                Capture & Test Website
              </>
            )}
          </Button>
        </form>

        {/* Popular sites */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Try these popular sites:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularSites.map((site) => (
              <Button
                key={site.url}
                variant="outline"
                size="sm"
                onClick={() => {
                  setUrl(site.url);
                  setError(null);
                }}
                disabled={isLoading}
                className="justify-start text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium text-sm">{site.name}</div>
                  <div className="text-xs text-gray-500">{site.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-900">How it works:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Creates a realistic mockup of the website based on its domain</li>
                <li>• Analyzes common UI patterns and color schemes</li>
                <li>• Simulates how the page appears with different types of color blindness</li>
                <li>• Provides actionable insights for improving accessibility</li>
              </ul>
              <p className="text-xs text-blue-700 italic mt-2">
                Note: This creates representative mockups for demonstration. For production use, 
                integrate with a real screenshot service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}