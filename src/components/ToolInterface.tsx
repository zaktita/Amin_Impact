import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { UrlInput } from './UrlInput';
import { CVDPreview } from './CVDPreview';
import { ShareDialog } from './ShareDialog';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Upload, Globe, Share2 } from 'lucide-react';

export type CVDType = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export interface PreviewData {
  source: string;
  originalUrl?: string;
  type: 'upload' | 'url';
}

export function ToolInterface() {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [selectedCVD, setSelectedCVD] = useState<CVDType>('protanopia');
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleImageProcess = (data: { source: string; originalUrl?: string; type: 'upload' }) => {
    setPreviewData({
      type: data.type,
      source: data.source,
      originalUrl: data.originalUrl
    });
  };

  const handleUrlProcess = (data: { source: string; originalUrl?: string; type: 'url' }) => {
    setPreviewData({
      type: data.type,
      source: data.source,
      originalUrl: data.originalUrl
    });
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  return (
    <div className="w-full">
      {!previewData ? (
        <div className="space-y-8">
          {/* Input Options */}
          <div className="bg-white rounded-xl border-2 border-gray-100 p-6">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upload" className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Enter URL</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload">
                <ImageUpload onProcess={handleImageProcess} />
              </TabsContent>
              
              <TabsContent value="url">
                <UrlInput onProcess={handleUrlProcess} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Quick Tips */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Pro Tips for Better Results</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• Use high-resolution images (at least 800px wide) for clearer results</li>
              <li>• Test interface elements that rely on color to convey information</li>
              <li>• Pay special attention to charts, status indicators, and call-to-action buttons</li>
              <li>• Remember that 8% of men and 0.5% of women have some form of color vision deficiency</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setPreviewData(null)}
            >
              ← Test New Design
            </Button>
            <Button onClick={handleShare} className="flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Share Results</span>
            </Button>
          </div>

          {/* CVD Preview */}
          <CVDPreview
            data={previewData}
            selectedCVD={selectedCVD}
            onCVDChange={setSelectedCVD}
          />
        </div>
      )}

      {/* Share Dialog */}
      <ShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        previewData={previewData}
        selectedCVD={selectedCVD}
      />
    </div>
  );
}