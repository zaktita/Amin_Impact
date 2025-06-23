import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";
import aminLogo from '../assets/AMIN_Logotype.png';

export function Footer() {
  return (
    <footer className="bg-[var(--color-foreground)] text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={aminLogo} 
                alt="AMIN Worldwide" 
                className="h-10 w-auto brightness-0 invert"
              />
              <div className="border-l border-white/20 pl-4">
                <div className="font-bold text-lg text-white">ImPact Hub</div>
                <div className="text-sm text-white/70">Sustainable Future Initiative</div>
              </div>
            </div>
            <p className="text-white/80 mb-6 max-w-md leading-relaxed">
              Leading the way in environmental, social, and governance excellence through innovative solutions, transparent practices, and meaningful community impact.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/60" />
                <span className="text-sm text-white/80">impact@aminworldwide.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/60" />
                <span className="text-sm text-white/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-white/60" />
                <span className="text-sm text-white/80">Global Headquarters</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-6">Resources</h4>
            <nav className="space-y-4">
              <a href="#" className="block text-white/80 hover:text-white transition-colors duration-200">
                ESG Policy Framework
              </a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors duration-200">
                Impact Reports
              </a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors duration-200">
                Case Studies
              </a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors duration-200">
                Best Practices Guide
              </a>
            </nav>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <nav className="space-y-4">
              <a href="#" className="block text-white/80 hover:text-white transition-colors duration-200">
                About AMIN
              </a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors duration-200">
                Leadership Team
              </a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors duration-200">
                Careers
              </a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors duration-200">
                Contact Us
              </a>
            </nav>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left - Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm text-white/70">
                © 2024 AMIN ImPact Resource Hub. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-white/70">
                <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              </div>
            </div>
            
            {/* Right - Social & Badge */}
            <div className="flex items-center gap-6">
              {/* Certification Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <span className="text-sm text-white/90">Certified B-Corp</span>
                <span className="text-lg">🌿</span>
              </div>
              
              {/* Social Icons */}
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-200 group">
                  <Linkedin className="w-4 h-4 text-white/80 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-200 group">
                  <Twitter className="w-4 h-4 text-white/80 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-200 group">
                  <Facebook className="w-4 h-4 text-white/80 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}