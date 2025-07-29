import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle, AlertTriangle, XCircle, Award, Info } from 'lucide-react';

interface AccessibilityScoreMeterProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  cvdType: string;
  severity: number;
}

interface AccessibilityScore {
  overall: number;
  contrastIssues: number;
  colorDependency: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  wcagLevel: 'AAA' | 'AA' | 'A' | 'Fail';
  recommendations: string[];
}

export function AccessibilityScoreMeter({ canvasRef, cvdType, severity }: AccessibilityScoreMeterProps) {
  const [score, setScore] = useState<AccessibilityScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Analyze image for accessibility issues
  const analyzeAccessibility = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsAnalyzing(true);

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Sample colors and analyze contrast
      const colorSamples: { r: number, g: number, b: number }[] = [];
      const sampleInterval = Math.max(1, Math.floor(data.length / (4 * 100))); // Sample ~100 pixels

      for (let i = 0; i < data.length; i += 4 * sampleInterval) {
        if (i + 2 < data.length) {
          colorSamples.push({
            r: data[i],
            g: data[i + 1],
            b: data[i + 2]
          });
        }
      }

      // Calculate various metrics
      const contrastAnalysis = analyzeContrasts(colorSamples);
      const colorDiversityAnalysis = analyzeColorDiversity(colorSamples);
      const overallScore = calculateOverallScore(contrastAnalysis, colorDiversityAnalysis, severity);

      setScore(overallScore);
    } catch (error) {
      console.error('Accessibility analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Analyze contrast between color pairs
  const analyzeContrasts = (colors: { r: number, g: number, b: number }[]) => {
    const contrasts: number[] = [];
    const lowContrasts: number[] = [];

    // Sample pairs of colors
    for (let i = 0; i < Math.min(colors.length, 50); i += 2) {
      if (i + 1 < colors.length) {
        const lum1 = getLuminance(colors[i].r, colors[i].g, colors[i].b);
        const lum2 = getLuminance(colors[i + 1].r, colors[i + 1].g, colors[i + 1].b);
        
        const contrast = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
        contrasts.push(contrast);
        
        if (contrast < 3.0) {
          lowContrasts.push(contrast);
        }
      }
    }

    const avgContrast = contrasts.reduce((a, b) => a + b, 0) / contrasts.length || 1;
    const lowContrastPercentage = (lowContrasts.length / contrasts.length) * 100;

    return {
      averageContrast: avgContrast,
      lowContrastPercentage,
      totalPairs: contrasts.length,
      lowContrastCount: lowContrasts.length
    };
  };

  // Analyze color diversity and potential issues
  const analyzeColorDiversity = (colors: { r: number, g: number, b: number }[]) => {
    // Calculate color distribution
    const hues: number[] = [];
    const saturations: number[] = [];

    colors.forEach(({ r, g, b }) => {
      const max = Math.max(r, g, b) / 255;
      const min = Math.min(r, g, b) / 255;
      const delta = max - min;
      
      let hue = 0;
      if (delta !== 0) {
        if (max === r / 255) hue = ((g / 255 - b / 255) / delta) % 6;
        else if (max === g / 255) hue = (b / 255 - r / 255) / delta + 2;
        else hue = (r / 255 - g / 255) / delta + 4;
      }
      hue = (hue * 60 + 360) % 360;
      
      const saturation = max === 0 ? 0 : delta / max;
      
      hues.push(hue);
      saturations.push(saturation);
    });

    // Detect red-green heavy usage (problematic for most common CVD)
    const redGreenRatio = hues.filter(h => (h >= 0 && h <= 60) || (h >= 120 && h <= 180)).length / hues.length;
    const avgSaturation = saturations.reduce((a, b) => a + b, 0) / saturations.length;

    return {
      redGreenRatio,
      avgSaturation,
      colorVariety: new Set(colors.map(c => `${Math.floor(c.r/32)}-${Math.floor(c.g/32)}-${Math.floor(c.b/32)}`)).size
    };
  };

  // Calculate overall accessibility score
  const calculateOverallScore = (contrast: any, colorDiversity: any, severityLevel: number) => {
    let baseScore = 100;
    const recommendations: string[] = [];

    // Penalize for low contrast
    if (contrast.lowContrastPercentage > 30) {
      baseScore -= 30;
      recommendations.push('Improve color contrast ratios');
    } else if (contrast.lowContrastPercentage > 15) {
      baseScore -= 15;
      recommendations.push('Some colors may have insufficient contrast');
    }

    // Penalize for heavy red-green usage when testing CVD
    if ((cvdType === 'protanopia' || cvdType === 'deuteranopia') && colorDiversity.redGreenRatio > 0.6) {
      const penalty = Math.min(25, severityLevel * 0.4);
      baseScore -= penalty;
      recommendations.push('Reduce reliance on red-green color combinations');
    }

    // Bonus for good color variety
    if (colorDiversity.colorVariety > 20) {
      baseScore += 5;
    }

    // Adjust based on CVD severity
    if (severityLevel > 50 && cvdType !== 'normal') {
      const severityPenalty = (severityLevel - 50) * 0.2;
      baseScore -= severityPenalty;
      if (severityLevel > 75) {
        recommendations.push('Consider alternative visual indicators beyond color');
      }
    }

    const finalScore = Math.max(0, Math.min(100, Math.round(baseScore)));

    // Determine grade and WCAG level
    let grade: 'A' | 'B' | 'C' | 'D' | 'F' = 'F';
    let wcagLevel: 'AAA' | 'AA' | 'A' | 'Fail' = 'Fail';

    if (finalScore >= 90) {
      grade = 'A';
      wcagLevel = 'AAA';
    } else if (finalScore >= 80) {
      grade = 'B';
      wcagLevel = 'AA';
    } else if (finalScore >= 70) {
      grade = 'C';
      wcagLevel = 'A';
    } else if (finalScore >= 60) {
      grade = 'D';
      wcagLevel = 'Fail';
    }

    if (recommendations.length === 0) {
      recommendations.push('Good color accessibility detected');
    }

    return {
      overall: finalScore,
      contrastIssues: contrast.lowContrastPercentage,
      colorDependency: colorDiversity.redGreenRatio * 100,
      grade,
      wcagLevel,
      recommendations
    };
  };

  // Auto-analyze when canvas or settings change
  useEffect(() => {
    const timer = setTimeout(() => {
      analyzeAccessibility();
    }, 500); // Debounce analysis

    return () => clearTimeout(timer);
  }, [canvasRef.current, cvdType, severity]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeIcon = (grade: string) => {
    switch (grade) {
      case 'A': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'B': return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'C': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'D': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'F': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return null;
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Accessibility Score</h3>
          </div>
          {isAnalyzing && (
            <Badge variant="outline" className="animate-pulse">
              Analyzing...
            </Badge>
          )}
        </div>

        {score && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                {getGradeIcon(score.grade)}
                <div className={`text-4xl font-bold ${getScoreColor(score.overall)}`}>
                  {score.overall}
                </div>
                <div className="text-2xl font-bold text-gray-600">/100</div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Badge 
                  variant={score.grade === 'A' || score.grade === 'B' ? 'default' : 'destructive'}
                  className="text-sm"
                >
                  Grade {score.grade}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  WCAG {score.wcagLevel}
                </Badge>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Accessibility Score</span>
                <span>{score.overall}%</span>
              </div>
              <Progress 
                value={score.overall} 
                className="h-3"
              />
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/60 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Contrast Issues</div>
                <div className={`text-lg font-semibold ${score.contrastIssues > 30 ? 'text-red-600' : score.contrastIssues > 15 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {score.contrastIssues.toFixed(1)}%
                </div>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Color Dependency</div>
                <div className={`text-lg font-semibold ${score.colorDependency > 60 ? 'text-red-600' : score.colorDependency > 40 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {score.colorDependency.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Recommendations</h4>
              <div className="space-y-2">
                {score.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-white/60 rounded text-sm">
                    <Info className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!score && !isAnalyzing && (
          <div className="text-center py-8 text-gray-500">
            <Award className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p>Upload an image to see accessibility analysis</p>
          </div>
        )}
      </div>
    </Card>
  );
}