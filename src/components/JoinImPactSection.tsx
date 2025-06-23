import { ArrowRight, FileText, Mail } from "lucide-react";

export function JoinImPactSection() {
 

 

  return (
    <section className="section bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background-tertiary)]">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
                  
          {/* Bottom CTA */}
          <div className="join-impact-cta-card">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-light)] text-white rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
                Ready to Make an Impact?
              </h3>
              
              <p className="text-[var(--foreground-muted)] mb-8 max-w-2xl mx-auto">
                Get in touch with our team to explore partnership opportunities and start your sustainability journey with the AMIN ImPact community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a className="btn-primary text-lg px-8 py-4"
                href="mailto:sgaeng@bgcom.ch"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact ImPact Team
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                
                <a
                  href="/Commitment_Letter.pdf"
                  download
                  className="btn-outline text-lg px-8 py-4  inline-flex items-center justify-center no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Download Commitment Letter
                </a>
              </div>
              
              <p className="text-sm text-[var(--foreground-subtle)] mt-6">
                Join 500+ professionals already making a difference through sustainable practices
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}