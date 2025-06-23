import { Button } from "./ui/button";
import { Download, FileText, Send, PenTool, CheckCircle, Star, Award } from "lucide-react";

export function CEOLetterSection() {
  return (
    <section className="section-purple">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="badge-white mb-6">
            <FileText className="w-4 h-4 mr-2" />
            CEO Commitment Letter
          </div>
          <h2 className="text-section-title mb-6 text-white">
            <span className="text-white">ImPact©</span> Leadership Commitment
          </h2>
          <p className="text-large text-white/80 max-w-3xl mx-auto">
            Official ESG commitment letter ready for CEO signature and implementation
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Preview Card */}
            <div className="lg:col-span-2">
              <div className="card-white p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-light)] text-white rounded-2xl flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--foreground)]">
                      AMIN EMEA ESG CEO Commitment Letter
                    </h3>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      Official declaration of ESG principles and sustainable practices
                    </p>
                  </div>
                </div>
                
                <div className="bg-[var(--background-tertiary)] rounded-lg p-6 mb-6">
                  <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed mb-4">
                    <strong>AMIN</strong> is an alliance of independent agencies and creative thinkers around the globe built on trust who are committed to creating impactful initiatives that regenerate the planet with equality and transparency.
                  </p>
                  <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                    As agency leaders across advertising, digital, and communications, we hold a unique responsibility to help shape a more sustainable future...
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-[var(--foreground)] mb-4">
                    Our Three Key Pledges:
                  </h4>
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[var(--border)]">
                      <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-medium text-[var(--foreground)] mb-1">Promote Informed Messaging</h5>
                        <p className="text-sm text-[var(--foreground-muted)]">Research-based sustainability campaigns and responsible advertising</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[var(--border)]">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-medium text-[var(--foreground)] mb-1">Educate and Empower</h5>
                        <p className="text-sm text-[var(--foreground-muted)]">Enhance ESG and SDG understanding across our network</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[var(--border)]">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-medium text-[var(--foreground)] mb-1">Offer Sustainable Solutions</h5>
                        <p className="text-sm text-[var(--foreground-muted)]">Embed sustainability into all our services and operations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions Card */}
            <div className="space-y-6">
              <div className="card-white p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-light)] text-white rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    Take Action
                  </h3>
                </div>
                
                <div className="space-y-4">
                <a className="btn-outline w-full"
                href="/Commitment_Letter.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </a>


                  <a className="btn-primary w-full">
                    <PenTool className="w-4 h-4 mr-2" />
                    Sign Commitment Letter
                  </a>
                  
                  
                  
                  <a className="btn-outline w-full"
                  href="mailto:sgaeng@bgcom.ch">
                    <Send className="w-4 h-4 mr-2" />
                    Contact ImPact Team
                  </a>
                </div>
              </div>
              
              <div className="card-white p-6">
                <h4 className="font-semibold text-[var(--foreground)] mb-4">
                  Join Our Network
                </h4>
                <p className="text-sm text-[var(--foreground-muted)] mb-4">
                  Become part of a global alliance committed to sustainable change and transparent governance.
                </p>
                <div className="flex items-center gap-2 text-sm text-[var(--brand-primary)]">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified ESG Commitment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}