import React from 'react';
import { Slider } from './ui/slider';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Eye, Info } from 'lucide-react';

interface SeveritySliderProps {
  severity: number;
  onSeverityChange: (severity: number) => void;
  cvdType: string;
}

export function SeveritySlider({ severity, onSeverityChange, cvdType }: SeveritySliderProps) {
  const getSeverityLabel = (value: number) => {
    if (value === 0) return 'Normal Vision';
    if (value <= 25) return 'Mild';
    if (value <= 50) return 'Moderate';
    if (value <= 75) return 'Strong';
    return 'Complete';
  };

  const getSeverityDescription = (value: number, type: string) => {
    if (value === 0) return 'No color vision deficiency';
    if (value <= 25) return `Slight ${type.toLowerCase()} - barely noticeable`;
    if (value <= 50) return `Moderate ${type.toLowerCase()} - noticeable differences`;
    if (value <= 75) return `Strong ${type.toLowerCase()} - significant impact`;
    return `Complete ${type.toLowerCase()} - full dichromacy`;
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold text-gray-900">CVD Severity</h3>
          </div>
          <Badge variant="outline" className="bg-white text-blue-700 border-blue-300">
            {severity}% - {getSeverityLabel(severity)}
          </Badge>
        </div>

        <div className="space-y-3">
          <Slider
            value={[severity]}
            onValueChange={(value) => onSeverityChange(value[0])}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>0% (Normal)</span>
            <span>25% (Mild)</span>
            <span>50% (Moderate)</span>
            <span>75% (Strong)</span>
            <span>100% (Complete)</span>
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-white/60 rounded-lg border border-blue-200">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-1">
              {getSeverityDescription(severity, cvdType)}
            </p>
            <p className="text-blue-700">
              Most people with CVD have mild to moderate severity (20-60%). 
              Complete dichromacy affects only about 1-2% of those with CVD.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}