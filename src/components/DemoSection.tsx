import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Play, Eye, Upload, Globe, ArrowRight } from 'lucide-react';

interface DemoSectionProps {
  onTryTool: () => void;
}

// Simplified matrices for demo (less intensive computation)
const DEMO_CVD_MATRICES: Record<string, number[][]> = {
  normal: [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.011820, 0.042940, 0.968881],
  ],
};

export function DemoSection({ onTryTool }: DemoSectionProps) {
  const [activeDemo, setActiveDemo] = useState<'normal' | 'protanopia' | 'deuteranopia'>('normal');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Apply CVD matrix to canvas for demo elements
  function applyCVDToCanvas(matrixKey: string) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get the matrix, fallback to normal if not found
    const matrix = DEMO_CVD_MATRICES[matrixKey] || DEMO_CVD_MATRICES.normal;
    
    // If it's the normal matrix, no transformation needed
    if (matrix === DEMO_CVD_MATRICES.normal) {
      return;
    }

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply matrix transformation to each pixel
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i] / 255;
        let g = data[i + 1] / 255;
        let b = data[i + 2] / 255;

        // Apply linearization
        r = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
        g = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
        b = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

        // Apply matrix - with null checks
        if (matrix && matrix[0] && matrix[1] && matrix[2]) {
          const m = matrix;
          const rr = m[0][0] * r + m[0][1] * g + m[0][2] * b;
          const gg = m[1][0] * r + m[1][1] * g + m[1][2] * b;
          const bb = m[2][0] * r + m[2][1] * g + m[2][2] * b;

          // Gamma encode
          const enc = (c: number) =>
            255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(0, Math.min(1, c)), 1 / 2.4) - 0.055);

          data[i] = enc(rr);
          data[i + 1] = enc(gg);
          data[i + 2] = enc(bb);
        }
      }

      ctx.putImageData(imageData, 0, 0);
    } catch (error) {
      console.error('Error applying CVD matrix:', error);
    }
  }

  // Render demo elements with CVD simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      canvas.width = 300;
      canvas.height = 200;

      // Clear canvas
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw color elements that demonstrate CVD differences
      // Red status indicator
      ctx.fillStyle = '#EF4444'; // red-500
      ctx.fillRect(50, 30, 60, 30);
      ctx.fillStyle = 'black';
      ctx.font = '12px sans-serif';
      ctx.fillText('Error', 60, 50);

      // Yellow status indicator
      ctx.fillStyle = '#EAB308'; // yellow-500
      ctx.fillRect(120, 30, 60, 30);
      ctx.fillStyle = 'black';
      ctx.fillText('Warning', 125, 50);

      // Green status indicator
      ctx.fillStyle = '#22C55E'; // green-500
      ctx.fillRect(190, 30, 60, 30);
      ctx.fillStyle = 'black';
      ctx.fillText('Success', 200, 50);

      // Color gradient
      const gradient = ctx.createLinearGradient(50, 80, 250, 80);
      gradient.addColorStop(0, '#EF4444');    // red
      gradient.addColorStop(0.5, '#EAB308');  // yellow
      gradient.addColorStop(1, '#22C55E');    // green
      ctx.fillStyle = gradient;
      ctx.fillRect(50, 80, 200, 40);

      // Legend
      ctx.fillStyle = '#EF4444';
      ctx.fillRect(60, 140, 15, 15);
      ctx.fillStyle = 'black';
      ctx.fillText('High Risk', 85, 152);

      ctx.fillStyle = '#EAB308';
      ctx.fillRect(160, 140, 15, 15);
      ctx.fillText('Medium', 185, 152);

      ctx.fillStyle = '#22C55E';
      ctx.fillRect(235, 140, 15, 15);
      ctx.fillText('Low', 260, 152);

      // Apply CVD transformation
      applyCVDToCanvas(activeDemo);
    } catch (error) {
      console.error('Error rendering demo canvas:', error);
    }
  }, [activeDemo]);

  return (
    <section id="demo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-teal-600 border-teal-200">
            <Play className="h-3 w-3 mr-1" />
            See It In Action
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Watch Your Design Transform
            <span className="text-teal-600 block">Through Different Eyes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience how your designs appear to users with different types of color vision deficiency. 
            The difference might surprise you.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl border">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Demo Controls */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Interactive Preview</h3>
              <p className="text-gray-600">
                Click the buttons below to see how this dashboard appears to users with different 
                types of color vision deficiency using scientifically accurate Machado 2009 matrices.
              </p>

              {/* Vision Type Selector */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Vision Type</label>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant={activeDemo === 'normal' ? 'default' : 'outline'}
                    onClick={() => setActiveDemo('normal')}
                    className="justify-start"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Normal Vision
                  </Button>
                  <Button
                    variant={activeDemo === 'protanopia' ? 'default' : 'outline'}
                    onClick={() => setActiveDemo('protanopia')}
                    className="justify-start"
                  >
                    <Eye className="h-4 w-4 mr-2 text-red-500" />
                    Protanopia (Red-blind)
                  </Button>
                  <Button
                    variant={activeDemo === 'deuteranopia' ? 'default' : 'outline'}
                    onClick={() => setActiveDemo('deuteranopia')}
                    className="justify-start"
                  >
                    <Eye className="h-4 w-4 mr-2 text-green-500" />
                    Deuteranopia (Green-blind)
                  </Button>
                </div>
              </div>

              {/* Insights */}
              <Card className="p-4 bg-blue-50 border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  {activeDemo === 'normal' && 'Normal Color Vision'}
                  {activeDemo === 'protanopia' && 'Protanopia Impact'}
                  {activeDemo === 'deuteranopia' && 'Deuteranopia Impact'}
                </h4>
                <p className="text-sm text-blue-800">
                  {activeDemo === 'normal' && 'All colors are clearly distinguishable with full color perception.'}
                  {activeDemo === 'protanopia' && 'Red appears significantly different, making red-green distinctions difficult.'}
                  {activeDemo === 'deuteranopia' && 'Green perception is altered, affecting red-green color combinations.'}
                </p>
              </Card>

              <Button size="lg" onClick={onTryTool} className="w-full">
                Try With Your Own Design
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Demo Visual */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-600 ml-2">Analytics Dashboard</span>
                  </div>
                </div>
                
                <div className="p-6 flex justify-center">
                  <canvas
                    ref={canvasRef}
                    className="border border-gray-200 rounded-lg"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              </div>

              <div className="text-center">
                <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                  Currently viewing: {activeDemo === 'normal' ? 'Normal Vision' : 
                    activeDemo === 'protanopia' ? 'Protanopia (Machado 2009)' : 'Deuteranopia (Machado 2009)'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Types Preview */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Test Any Type of Design
          </h3>
          <Tabs defaultValue="upload" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Images</span>
              </TabsTrigger>
              <TabsTrigger value="website" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Test Websites</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-6">
              <Card className="p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Upload Your Designs</h4>
                <p className="text-gray-600 mb-4">
                  Drag and drop mockups, screenshots, or any image file to instantly see how it appears 
                  to users with color vision deficiencies using scientifically accurate simulations.
                </p>
                <Button onClick={onTryTool}>Try Image Upload</Button>
              </Card>
            </TabsContent>
            
            <TabsContent value="website" className="mt-6">
              <Card className="p-6 text-center">
                <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Test Live Websites</h4>
                <p className="text-gray-600 mb-4">
                  Enter any website URL and we'll capture a screenshot to test for color accessibility 
                  issues across different vision types with precise matrix transformations.
                </p>
                <Button onClick={onTryTool}>Try Website Testing</Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}