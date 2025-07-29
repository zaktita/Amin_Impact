import React, { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Eye, Target, CheckCircle, XCircle, Info } from 'lucide-react';

interface WCAGContrastCheckerProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

interface ContrastResult {
  ratio: number;
  foreground: string;
  background: string;
  aaPass: boolean;
  aaaPass: boolean;
  foregroundLum: number;
  backgroundLum: number;
}

export function WCAGContrastChecker({ canvasRef }: WCAGContrastCheckerProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState<{fg?: {x: number, y: number, color: string}, bg?: {x: number, y: number, color: string}}>({});
  const [contrastResult, setContrastResult] = useState<ContrastResult | null>(null);

  // Calculate relative luminance from RGB
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const getContrastRatio = (lum1: number, lum2: number) => {
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  // Get pixel color from canvas
  const getPixelColor = (x: number, y: number): {r: number, g: number, b: number, hex: string} | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const canvasX = Math.floor(x * scaleX);
    const canvasY = Math.floor(y * scaleY);

    const imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
    const [r, g, b] = imageData.data;
    
    const hex = `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    
    return { r, g, b, hex };
  };

  // Handle canvas click
  const handleCanvasClick = (event: React.MouseEvent) => {
    if (!isSelecting) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const color = getPixelColor(x, y);
    if (!color) return;

    if (!selectedPoints.fg) {
      setSelectedPoints({ fg: { x, y, color: color.hex } });
    } else if (!selectedPoints.bg) {
      const newPoints = { ...selectedPoints, bg: { x, y, color: color.hex } };
      setSelectedPoints(newPoints);
      
      // Calculate contrast
      const fgColor = getPixelColor(selectedPoints.fg.x, selectedPoints.fg.y);
      const bgColor = color;
      
      if (fgColor && bgColor) {
        const fgLum = getLuminance(fgColor.r, fgColor.g, fgColor.b);
        const bgLum = getLuminance(bgColor.r, bgColor.g, bgColor.b);
        const ratio = getContrastRatio(fgLum, bgLum);
        
        setContrastResult({
          ratio,
          foreground: fgColor.hex,
          background: bgColor.hex,
          aaPass: ratio >= 4.5,
          aaaPass: ratio >= 7,
          foregroundLum: fgLum,
          backgroundLum: bgLum
        });
      }
      
      setIsSelecting(false);
    }
  };

  const startSelection = () => {
    setIsSelecting(true);
    setSelectedPoints({});
    setContrastResult(null);
  };

  const resetSelection = () => {
    setIsSelecting(false);
    setSelectedPoints({});
    setContrastResult(null);
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-green-600" />
            <h3 className="font-semibold text-gray-900">WCAG Contrast Checker</h3>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={startSelection}
              disabled={isSelecting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSelecting ? 'Click Canvas' : 'Check Contrast'}
            </Button>
            {(selectedPoints.fg || selectedPoints.bg || contrastResult) && (
              <Button size="sm" variant="outline" onClick={resetSelection}>
                Reset
              </Button>
            )}
          </div>
        </div>

        {isSelecting && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              {!selectedPoints.fg 
                ? 'Click on the foreground color (text/element)' 
                : 'Now click on the background color'
              }
            </p>
          </div>
        )}

        {/* Selection Status */}
        {(selectedPoints.fg || selectedPoints.bg) && (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: selectedPoints.fg?.color || '#f3f4f6' }}
              />
              <span className="text-sm font-medium">
                {selectedPoints.fg ? 'Foreground' : 'Select foreground'}
              </span>
              {selectedPoints.fg && <CheckCircle className="h-4 w-4 text-green-600" />}
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: selectedPoints.bg?.color || '#f3f4f6' }}
              />
              <span className="text-sm font-medium">
                {selectedPoints.bg ? 'Background' : 'Select background'}
              </span>
              {selectedPoints.bg && <CheckCircle className="h-4 w-4 text-green-600" />}
            </div>
          </div>
        )}

        {/* Contrast Results */}
        {contrastResult && (
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Contrast Ratio</h4>
                <Badge 
                  variant={contrastResult.aaPass ? "default" : "destructive"}
                  className="text-lg px-3"
                >
                  {contrastResult.ratio.toFixed(2)}:1
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {contrastResult.aaPass ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="font-medium">WCAG AA</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {contrastResult.aaPass ? 'Passes' : 'Fails'} (4.5:1 required)
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {contrastResult.aaaPass ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="font-medium">WCAG AAA</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {contrastResult.aaaPass ? 'Passes' : 'Fails'} (7:1 required)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <div 
                  className="w-8 h-8 rounded flex items-center justify-center text-xs font-medium"
                  style={{ 
                    backgroundColor: contrastResult.background,
                    color: contrastResult.foreground 
                  }}
                >
                  Aa
                </div>
                <span className="text-sm text-gray-600">Preview</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 p-3 bg-white/60 rounded-lg border border-green-200">
          <Info className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-green-900 mb-1">How to use:</p>
            <p className="text-green-700">
              Click "Check Contrast", then click on two colors in the image above. 
              WCAG AA requires 4.5:1 for normal text, AAA requires 7:1.
            </p>
          </div>
        </div>
      </div>

      {/* Invisible overlay for canvas clicks when selecting */}
      {isSelecting && canvasRef.current && (
        <div
          className="fixed inset-0 z-50 cursor-crosshair"
          onClick={handleCanvasClick}
          style={{ pointerEvents: isSelecting ? 'auto' : 'none' }}
        />
      )}
    </Card>
  );
}