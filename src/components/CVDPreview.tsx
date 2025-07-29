import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Download, Eye, RotateCcw, ZoomIn, ZoomOut, Settings, Move } from 'lucide-react';
import { SeveritySlider } from './SeveritySlider';
import { WCAGContrastChecker } from './WCAGContrastChecker';
import { AccessibilityScoreMeter } from './AccessibilityScoreMeter';


// Define types locally
export type CVDType = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export interface PreviewData {
  source: string;
  originalUrl?: string;
  type: 'upload' | 'url';
}

interface CVDPreviewProps {
  data: PreviewData;
  selectedCVD: CVDType;
  onCVDChange: (cvd: CVDType) => void;
}

const CVD_OPTIONS = [
  { value: 'protanopia', label: 'Protanopia', description: 'Red-blind (1% of men)' },
  { value: 'deuteranopia', label: 'Deuteranopia', description: 'Green-blind (1% of men)' },
  { value: 'tritanopia', label: 'Tritanopia', description: 'Blue-blind (rare)' },
  { value: 'achromatopsia', label: 'Achromatopsia', description: 'Complete color blindness (very rare)' },
] as const;

// Machado 2009 3x3 matrices @ 100% severity
const CVD_MATRICES: Record<CVDType, number[][]> = {
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
  tritanopia: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, -0.052398],
    [0.004733, 0.691367, 0.303900],
  ],
  achromatopsia: [
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114],
  ],
};

export function CVDPreview({ data, selectedCVD, onCVDChange }: CVDPreviewProps) {
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const filteredCanvasRef = useRef<HTMLCanvasElement>(null);
  const sliderCanvasRef = useRef<HTMLCanvasElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  
  const [viewMode, setViewMode] = useState<'side-by-side' | 'slider'>('side-by-side');
  const [zoom, setZoom] = useState(100);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [severity, setSeverity] = useState(100);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [originalImageData, setOriginalImageData] = useState<HTMLImageElement | null>(null);

  // Core pixel-transform function with severity support
  function applyCVDMatrixToImage(
    img: HTMLImageElement, 
    matrix: number[][], 
    canvas: HTMLCanvasElement,
    severityPercent: number = 100
  ) {
    if (!canvas || !matrix || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // If it's the normal matrix or 0% severity, no transformation needed
      if (matrix === CVD_MATRICES.normal || severityPercent === 0) {
        return;
      }

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const pixelData = imageData.data;

      // Interpolate between identity matrix and CVD matrix based on severity
      const identityMatrix = CVD_MATRICES.normal;
      const t = severityPercent / 100;
      
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
      
      // for each pixel
      for (let i = 0; i < pixelData.length; i += 4) {
        // read sRGB [0..255], normalize to [0..1]
        let r = pixelData[i] / 255;
        let g = pixelData[i + 1] / 255;
        let b = pixelData[i + 2] / 255;
        
        // apply linearization
        r = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
        g = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
        b = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

        // apply interpolated CVD matrix
        const m = interpolatedMatrix;
        const rr = m[0][0] * r + m[0][1] * g + m[0][2] * b;
        const gg = m[1][0] * r + m[1][1] * g + m[1][2] * b;
        const bb = m[2][0] * r + m[2][1] * g + m[2][2] * b;

        // gamma-encode back to sRGB
        const enc = (c: number) =>
          255 *
          (c <= 0.0031308
            ? 12.92 * c
            : 1.055 * Math.pow(Math.max(0, Math.min(1, c)), 1 / 2.4) - 0.055);

        pixelData[i] = Math.max(0, Math.min(255, enc(rr)));
        pixelData[i + 1] = Math.max(0, Math.min(255, enc(gg)));
        pixelData[i + 2] = Math.max(0, Math.min(255, enc(bb)));
        // leave alpha untouched
      }
      ctx.putImageData(imageData, 0, 0);
    } catch (error) {
      console.error('Error applying CVD matrix to image:', error);
    }
  }

  // Create slider comparison image
  function createSliderComparison() {
    if (!sliderCanvasRef.current || !originalImageData) return;
    
    const canvas = sliderCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = originalImageData;
    canvas.width = img.width;
    canvas.height = img.height;

    const splitPoint = (sliderPosition / 100) * canvas.width;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw original image first (full canvas)
    ctx.drawImage(img, 0, 0);

    // Create CVD filtered version and draw on right side
    const tempCanvas = document.createElement('canvas');
    const normalMatrix = CVD_MATRICES.normal;
    const cvdMatrix = CVD_MATRICES[selectedCVD] || normalMatrix;
    
    // Apply CVD transformation to temp canvas
    applyCVDMatrixToImage(img, cvdMatrix, tempCanvas, severity);

    // Draw filtered image on right side only
    ctx.save();
    ctx.beginPath();
    ctx.rect(splitPoint, 0, canvas.width - splitPoint, canvas.height);
    ctx.clip();
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.restore();

    // Draw divider line
    ctx.beginPath();
    ctx.moveTo(splitPoint, 0);
    ctx.lineTo(splitPoint, canvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw outer divider line for contrast
    ctx.beginPath();
    ctx.moveTo(splitPoint, 0);
    ctx.lineTo(splitPoint, canvas.height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw handle
    const handleY = canvas.height / 2;
    const handleRadius = 20;
    
    // Handle shadow
    ctx.beginPath();
    ctx.arc(splitPoint + 2, handleY + 2, handleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fill();
    
    // Handle background
    ctx.beginPath();
    ctx.arc(splitPoint, handleY, handleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Handle icon (drag lines)
    ctx.fillStyle = '#374151';
    for (let i = -6; i <= 6; i += 4) {
      ctx.fillRect(splitPoint + i - 1, handleY - 8, 2, 16);
    }
  }

  // Handle slider interaction
  const handleSliderInteraction = (clientX: number) => {
    if (!sliderContainerRef.current || !originalImageData) return;
    
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(newPosition);
  };

  // Mouse events for slider
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleSliderInteraction(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderInteraction(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Process images function
  const processImages = () => {
    if (!originalImageData || !imageLoaded) return;

    try {
      const normalMatrix = CVD_MATRICES.normal;
      const cvdMatrix = CVD_MATRICES[selectedCVD] || normalMatrix;
      
      if (originalCanvasRef.current) {
        applyCVDMatrixToImage(originalImageData, normalMatrix, originalCanvasRef.current, 0);
      }
      
      if (filteredCanvasRef.current) {
        applyCVDMatrixToImage(originalImageData, cvdMatrix, filteredCanvasRef.current, severity);
      }
      
      // Update slider view if active
      if (viewMode === 'slider') {
        setTimeout(() => createSliderComparison(), 50);
      }
    } catch (error) {
      console.error('Error processing images:', error);
    }
  };

  // Load and process image
  useEffect(() => {
    if (!data.source) return;
    
    setImageLoaded(false);
    setOriginalImageData(null);
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        setOriginalImageData(img);
        setImageLoaded(true);
      } catch (error) {
        console.error('Error processing image:', error);
        setImageLoaded(false);
      }
    };
    img.onerror = () => {
      console.error('Failed to load image:', data.source);
      setImageLoaded(false);
    };
    img.src = data.source;
  }, [data.source]);

  // Process images when dependencies change
  useEffect(() => {
    if (imageLoaded && originalImageData) {
      // Small delay to ensure canvases are ready
      setTimeout(() => processImages(), 100);
    }
  }, [selectedCVD, severity, originalImageData, imageLoaded]);

  // Handle view mode changes
  useEffect(() => {
    if (imageLoaded && originalImageData) {
      if (viewMode === 'slider') {
        setTimeout(() => createSliderComparison(), 100);
      } else {
        // Refresh side-by-side canvases
        setTimeout(() => processImages(), 50);
      }
    }
  }, [viewMode]);

  // Update slider comparison when slider position changes
  useEffect(() => {
    if (imageLoaded && viewMode === 'slider' && originalImageData) {
      createSliderComparison();
    }
  }, [sliderPosition]);

  // Global mouse events for dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (sliderContainerRef.current && originalImageData) {
        const rect = sliderContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(newPosition);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, originalImageData]);

  const downloadImage = (filtered: boolean = false) => {
    if (!originalImageData) return;
    
    try {
      const canvas = document.createElement('canvas');
      const matrix = filtered ? (CVD_MATRICES[selectedCVD] || CVD_MATRICES.normal) : CVD_MATRICES.normal;
      const downloadSeverity = filtered ? severity : 0;
      applyCVDMatrixToImage(originalImageData, matrix, canvas, downloadSeverity);
      
      const link = document.createElement('a');
      const filename = filtered 
        ? `color-sight-${selectedCVD}-${severity}%.png`
        : 'color-sight-original.png';
      link.download = filename;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden canvases for processing */}
      <div style={{ display: 'none' }}>
        <canvas ref={originalCanvasRef} />
        <canvas ref={filteredCanvasRef} />
      </div>

      {/* Main Controls */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white p-6 rounded-xl border-2 border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Color Vision Deficiency</label>
              <Select value={selectedCVD} onValueChange={(value: CVDType) => onCVDChange(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CVD_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">View Mode</label>
              <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                <TabsList>
                  <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
                  <TabsTrigger value="slider">Slider Compare</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={showAdvanced ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}
            >
              <Settings className="h-4 w-4 mr-1" />
              Advanced
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[4rem] text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoom(100)}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Severity Slider */}
        <SeveritySlider 
          severity={severity}
          onSeverityChange={setSeverity}
          cvdType={CVD_OPTIONS.find(opt => opt.value === selectedCVD)?.label || 'CVD'}
        />
      </div>

      {/* Preview Area */}
      <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
        {data.originalUrl && (
          <div className="bg-gray-50 px-6 py-3 border-b flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {data.type === 'url' ? 'Website' : 'Image'}
            </Badge>
            {data.originalUrl && (
              <span className="text-sm text-gray-600 truncate">{data.originalUrl}</span>
            )}
          </div>
        )}

        <div className="p-6">
          {viewMode === 'side-by-side' ? (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Original */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <h3 className="font-medium text-gray-900">Original</h3>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => downloadImage(false)}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
                <Card className="overflow-hidden border-2 border-gray-200">
                  <div className="relative">
                    <canvas
                      ref={originalCanvasRef}
                      className="w-full h-auto"
                      style={{ 
                        transform: `scale(${zoom / 100})`, 
                        transformOrigin: 'top left',
                        display: imageLoaded ? 'block' : 'none'
                      }}
                    />
                    {!imageLoaded && (
                      <div className="flex items-center justify-center h-48 bg-gray-100">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                          <span className="text-sm text-gray-500">Loading image...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* CVD Simulation */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-red-500" />
                    <h3 className="font-medium text-gray-900">
                      {CVD_OPTIONS.find(opt => opt.value === selectedCVD)?.label || 'CVD Simulation'} ({severity}%)
                    </h3>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => downloadImage(true)}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
                <Card className="overflow-hidden border-2 border-gray-200">
                  <div className="relative">
                    <canvas
                      ref={filteredCanvasRef}
                      className="w-full h-auto"
                      style={{ 
                        transform: `scale(${zoom / 100})`, 
                        transformOrigin: 'top left',
                        display: imageLoaded ? 'block' : 'none'
                      }}
                    />
                    {!imageLoaded && (
                      <div className="flex items-center justify-center h-48 bg-gray-100">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                          <span className="text-sm text-gray-500">Processing CVD simulation...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            /* Slider View */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Move className="h-4 w-4 text-blue-500" />
                  <h3 className="font-medium text-gray-900">
                    Original vs {CVD_OPTIONS.find(opt => opt.value === selectedCVD)?.label || 'CVD Simulation'} ({severity}%)
                  </h3>
                </div>
                <Button variant="outline" size="sm" onClick={() => downloadImage(true)}>
                  <Download className="h-4 w-4 mr-1" />
                  Download Simulation
                </Button>
              </div>
              
              <Card className="overflow-hidden border-2 border-gray-200">
                <div 
                  ref={sliderContainerRef}
                  className="relative cursor-ew-resize select-none"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <canvas
                    ref={sliderCanvasRef}
                    className="w-full h-auto pointer-events-none"
                    style={{ 
                      transform: `scale(${zoom / 100})`, 
                      transformOrigin: 'top left',
                      display: imageLoaded ? 'block' : 'none'
                    }}
                  />
                  {!imageLoaded && (
                    <div className="flex items-center justify-center h-48 bg-gray-100">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                        <span className="text-sm text-gray-500">Processing comparison...</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Original</span>
                  <span>CVD Simulation</span>
                </div>
                <Slider
                  value={[sliderPosition]}
                  onValueChange={(values) => setSliderPosition(values[0])}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 text-center">
                  Drag the slider or click on the image to compare views
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Features - Hidden by default */}
      {showAdvanced && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <AccessibilityScoreMeter 
              canvasRef={filteredCanvasRef}
              cvdType={selectedCVD}
              severity={severity}
            />
            <WCAGContrastChecker canvasRef={filteredCanvasRef} />
          </div>
        </div>
      )}

      {/* Info Panel */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Eye className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              About {CVD_OPTIONS.find(opt => opt.value === selectedCVD)?.label || 'Color Vision Deficiency'} at {severity}% severity
            </h4>
            <p className="text-sm text-blue-800">
              {CVD_OPTIONS.find(opt => opt.value === selectedCVD)?.description || 'Color vision deficiency simulation'}
              {selectedCVD === 'protanopia' && ' - Uses Machado 2009 matrix for accurate red-blindness simulation.'}
              {selectedCVD === 'deuteranopia' && ' - Uses Machado 2009 matrix for accurate green-blindness simulation.'}
              {selectedCVD === 'tritanopia' && ' - Uses Machado 2009 matrix for accurate blue-blindness simulation.'}
              {selectedCVD === 'achromatopsia' && ' - Complete removal of color information, showing only luminance.'}
              {severity < 100 && ` At ${severity}% severity, this represents ${severity < 25 ? 'mild' : severity < 50 ? 'moderate' : severity < 75 ? 'strong' : 'complete'} ${selectedCVD.toLowerCase()}.`}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}