import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Copy, Link, Clock, CheckCircle, Mail, MessageSquare } from 'lucide-react';
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

export type CVDType = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  previewData: PreviewData | null;
  selectedCVD: CVDType;
}

export function ShareDialog({ open, onOpenChange, previewData, selectedCVD }: ShareDialogProps) {
  const [shareUrl, setShareUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [embedCode, setEmbedCode] = useState('');
  const [showEmbed, setShowEmbed] = useState(false);

  const generateShareUrl = async () => {
    setIsGenerating(true);
    
    // Simulate API call to generate share URL
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock share URL
    const shareId = Math.random().toString(36).substring(2, 15);
    const mockUrl = `https://color-sight.com/shared/${shareId}`;
    setShareUrl(mockUrl);
    
    // Generate embed code
    const embedHtml = `<iframe src="${mockUrl}/embed" width="800" height="600" frameborder="0"></iframe>`;
    setEmbedCode(embedHtml);
    
    setIsGenerating(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Color Vision Accessibility Report');
    const body = encodeURIComponent(
      `I've created a color vision accessibility report using Color-Sight.\n\nView it here: ${shareUrl}\n\nThis report shows how the design appears to users with different color vision deficiencies.`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent('Just tested my design for color accessibility with @ColorSight 🎨 Check out the results:');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`);
  };

  React.useEffect(() => {
    if (open && !shareUrl) {
      generateShareUrl();
    }
  }, [open]);

  if (!previewData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Share Accessibility Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">
                {previewData.type === 'url' ? 'Website' : 'Image'}
              </Badge>
              <Badge variant="outline">{selectedCVD}</Badge>
            </div>
            {previewData.originalUrl && (
              <p className="text-sm text-gray-600 truncate">{previewData.originalUrl}</p>
            )}
          </div>

          {/* Share URL */}
          <div className="space-y-3">
            <Label>Share Link</Label>
            {isGenerating ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-teal-600 border-t-transparent"></div>
                <span className="text-sm text-gray-600">Generating share link...</span>
              </div>
            ) : shareUrl ? (
              <div className="flex gap-2">
                <Input 
                  value={shareUrl} 
                  readOnly 
                  className="font-mono text-sm"
                />
                <Button 
                  variant="outline" 
                  onClick={() => copyToClipboard(shareUrl)}
                  className="flex-shrink-0"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ) : null}
          </div>

          {shareUrl && (
            <>
              {/* Link Expiration Info */}
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  This link will expire in 30 days. Anyone with the link can view your report.
                </AlertDescription>
              </Alert>

              {/* Quick Share Options */}
              <div className="space-y-3">
                <Label>Quick Share</Label>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={shareViaEmail} className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" onClick={shareViaTwitter} className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                </div>
              </div>

              {/* Embed Code */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Embed Code</Label>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowEmbed(!showEmbed)}
                  >
                    {showEmbed ? 'Hide' : 'Show'} Embed
                  </Button>
                </div>
                
                {showEmbed && (
                  <div className="space-y-2">
                    <Textarea 
                      value={embedCode}
                      readOnly
                      className="font-mono text-sm"
                      rows={3}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(embedCode)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Embed Code
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {shareUrl && (
              <Button onClick={() => copyToClipboard(shareUrl)}>
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}