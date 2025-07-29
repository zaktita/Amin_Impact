import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Palette, Eye, Copy, Check } from 'lucide-react';

interface PresetPalettePreviewProps {
  selectedCVD: string;
  severity: number;
  cvdMatrices: Record<string, number[][]>;
}

interface ColorPalette {
  name: string;
  description: string;
  colors: { name: string; hex: string; usage: string }[];
}

const COLOR_PALETTES: Record<string, ColorPalette[]> = {
  material: [
    {
      name: 'Material Design',
      description: 'Google Material Design color system',
      colors: [
        { name: 'Primary', hex: '#6200EE', usage: 'Main brand color' },
        { name: 'Primary Variant', hex: '#3700B3', usage: 'Darker primary' },
        { name: 'Secondary', hex: '#03DAC6', usage: 'Accent color' },
        { name: 'Error', hex: '#B00020', usage: 'Error states' },
        { name: 'Warning', hex: '#FF6F00', usage: 'Warning states' },
        { name: 'Success', hex: '#00C853', usage: 'Success states' },
      ]
    }
  ],
  bootstrap: [
    {
      name: 'Bootstrap 5',
      description: 'Bootstrap framework default colors',
      colors: [
        { name: 'Primary', hex: '#0D6EFD', usage: 'Primary actions' },
        { name: 'Secondary', hex: '#6C757D', usage: 'Secondary content' },
        { name: 'Success', hex: '#198754', usage: 'Success feedback' },
        { name: 'Danger', hex: '#DC3545', usage: 'Destructive actions' },
        { name: 'Warning', hex: '#FFC107', usage: 'Warning messages' },
        { name: 'Info', hex: '#0DCAF0', usage: 'Informational' },
      ]
    }
  ],
  tailwind: [
    {
      name: 'Tailwind CSS',
      description: 'Tailwind CSS default color palette',
      colors: [
        { name: 'Blue 600', hex: '#2563EB', usage: 'Primary blue' },
        { name: 'Green 600', hex: '#16A34A', usage: 'Success green' },
        { name: 'Red 600', hex: '#DC2626', usage: 'Error red' },
        { name: 'Yellow 500', hex: '#EAB308', usage: 'Warning yellow' },
        { name: 'Purple 600', hex: '#9333EA', usage: 'Purple accent' },
        { name: 'Gray 600', hex: '#4B5563', usage: 'Neutral gray' },
      ]
    }
  ],
  accessibility: [
    {
      name: 'High Contrast',
      description: 'WCAG AAA compliant color combinations',
      colors: [
        { name: 'Dark Blue', hex: '#003366', usage: 'Primary (on white)' },
        { name: 'Dark Green', hex: '#006600', usage: 'Success (on white)' },
        { name: 'Dark Red', hex: '#CC0000', usage: 'Error (on white)' },
        { name: 'Dark Orange', hex: '#CC6600', usage: 'Warning (on white)' },
        { name: 'Purple', hex: '#663399', usage: 'Info (on white)' },
        { name: 'Black', hex: '#000000', usage: 'Text (on white)' },
      ]
    }
  ]
};

export function PresetPalettePreview({ selectedCVD, severity, cvdMatrices }: PresetPalettePreviewProps) {
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(COLOR_PALETTES.material[0]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Apply CVD matrix to a color - Fixed implementation
  const applyCVDToColor = (hex: string, matrix: number[][], severityPercent: number): string => {
    try {
      // Convert hex to RGB
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      // Apply linearization (sRGB to linear)
      const toLinear = (c: number) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      const linearR = toLinear(r);
      const linearG = toLinear(g);
      const linearB = toLinear(b);

      // Get identity matrix for interpolation
      const identityMatrix = cvdMatrices.normal || [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ];
      
      // Interpolate between identity matrix and CVD matrix based on severity
      const t = Math.max(0, Math.min(1, severityPercent / 100));
      
      const interpolatedMatrix = [
        [
          identityMatrix[0][0] * (1 - t) + matrix[0][0] * t,
          identityMatrix[0][1] * (1 - t) + matrix[0][1] * t,
          identityMatrix[0][2] * (1 - t) + matrix[0][2] * t,
        ],
        [
          identityMatrix[1][0] * (1 - t) + matrix[1][0] * t,
          identityMatrix[1][1] * (1 - t) + matrix[1][1] * t,
          identityMatrix[1][2] * (1 - t) + matrix[1][2] * t,
        ],
        [
          identityMatrix[2][0] * (1 - t) + matrix[2][0] * t,
          identityMatrix[2][1] * (1 - t) + matrix[2][1] * t,
          identityMatrix[2][2] * (1 - t) + matrix[2][2] * t,
        ],
      ];

      // Apply matrix transformation
      const transformedR = interpolatedMatrix[0][0] * linearR + interpolatedMatrix[0][1] * linearG + interpolatedMatrix[0][2] * linearB;
      const transformedG = interpolatedMatrix[1][0] * linearR + interpolatedMatrix[1][1] * linearG + interpolatedMatrix[1][2] * linearB;
      const transformedB = interpolatedMatrix[2][0] * linearR + interpolatedMatrix[2][1] * linearG + interpolatedMatrix[2][2] * linearB;

      // Gamma encode back to sRGB (linear to sRGB)
      const toSRGB = (c: number) => {
        c = Math.max(0, Math.min(1, c)); // Clamp to valid range
        return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
      };

      const finalR = Math.round(toSRGB(transformedR) * 255);
      const finalG = Math.round(toSRGB(transformedG) * 255);
      const finalB = Math.round(toSRGB(transformedB) * 255);

      // Convert back to hex
      const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
      return `#${toHex(finalR)}${toHex(finalG)}${toHex(finalB)}`;
      
    } catch (error) {
      console.error('Error applying CVD to color:', hex, error);
      return hex; // Return original color if transformation fails
    }
  };

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Color Palette Testing</h3>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {selectedCVD === 'normal' ? 'Normal Vision' : `${selectedCVD} ${severity}%`}
          </Badge>
        </div>

        <Tabs defaultValue="material" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="material">Material</TabsTrigger>
            <TabsTrigger value="bootstrap">Bootstrap</TabsTrigger>
            <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
            <TabsTrigger value="accessibility">A11y</TabsTrigger>
          </TabsList>
          
          {Object.entries(COLOR_PALETTES).map(([category, palettes]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid gap-2">
                {palettes.map((palette) => (
                  <Button
                    key={palette.name}
                    variant={selectedPalette?.name === palette.name ? "default" : "outline"}
                    className="justify-start h-auto p-3"
                    onClick={() => setSelectedPalette(palette)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{palette.name}</div>
                      <div className="text-xs text-gray-500">{palette.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {selectedPalette && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">{selectedPalette.name}</h4>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedPalette.colors.map((color, index) => {
                const matrix = cvdMatrices[selectedCVD] || cvdMatrices.normal;
                const originalColor = color.hex;
                
                // Only apply transformation if not normal vision and matrix exists
                const transformedColor = (selectedCVD === 'normal' || !matrix) 
                  ? originalColor 
                  : applyCVDToColor(originalColor, matrix, severity);

                // Check if there's a significant difference
                const hasSignificantChange = originalColor.toLowerCase() !== transformedColor.toLowerCase();

                return (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    {/* Original vs CVD comparison */}
                    <div className="h-16 flex">
                      <div 
                        className="flex-1 flex items-center justify-center relative group cursor-pointer"
                        style={{ backgroundColor: originalColor }}
                        onClick={() => copyToClipboard(originalColor)}
                        title={`Original: ${originalColor}`}
                      >
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                          {copiedColor === originalColor ? (
                            <Check className="h-4 w-4 text-white opacity-0 group-hover:opacity-100" />
                          ) : (
                            <Copy className="h-4 w-4 text-white opacity-0 group-hover:opacity-100" />
                          )}
                        </div>
                        <span className="text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 px-2 py-1 rounded">
                          Original
                        </span>
                      </div>
                      <div 
                        className="flex-1 flex items-center justify-center relative group cursor-pointer"
                        style={{ backgroundColor: transformedColor }}
                        onClick={() => copyToClipboard(transformedColor)}
                        title={`CVD: ${transformedColor}`}
                      >
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                          {copiedColor === transformedColor ? (
                            <Check className="h-4 w-4 text-white opacity-0 group-hover:opacity-100" />
                          ) : (
                            <Copy className="h-4 w-4 text-white opacity-0 group-hover:opacity-100" />
                          )}
                        </div>
                        <span className="text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 px-2 py-1 rounded">
                          CVD
                        </span>
                      </div>
                    </div>

                    {/* Color info */}
                    <div className="p-3 space-y-2">
                      <div className="font-medium text-gray-900 text-sm">{color.name}</div>
                      <div className="text-xs text-gray-600">{color.usage}</div>
                      <div className="flex items-center justify-between">
                        <code className="text-xs font-mono text-gray-500">{originalColor}</code>
                        {hasSignificantChange && (
                          <code className="text-xs font-mono text-orange-600 font-medium">{transformedColor}</code>
                        )}
                      </div>
                      {hasSignificantChange && (
                        <div className="text-xs text-orange-600 font-medium">
                          Color changes with {selectedCVD}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-900 mb-2">Accessibility Insights</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Click on any color to copy its hex value</li>
                <li>• Compare original colors (left) with CVD simulation (right)</li>
                <li>• Orange text indicates colors that change significantly with CVD</li>
                <li>• Use high contrast palette for maximum accessibility</li>
                <li>• Consider adding patterns or icons alongside color coding</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}