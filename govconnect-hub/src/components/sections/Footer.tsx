import { Scale, Mail, Github, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer id="about" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Scale className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold">Vidhan Buddhi</h3>
                <p className="text-xs text-primary-foreground/60 tracking-widest uppercase">
                  Legislative Intelligence
                </p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 max-w-md leading-relaxed mb-6">
              An agentic AI platform designed for sovereign, evidence-backed legislative research. Built to serve legal professionals, policy researchers, and government institutions.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/LuciferIQ162/vidhan-buddhi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@vidhanbuddhi.in"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors flex items-center gap-1.5">
                  Documentation
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Installation Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Data Sources
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Data Compliance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Open Source License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            © 2024 Vidhan Buddhi. Open source project for legislative research.
          </p>
          <p className="text-xs text-primary-foreground/50">
            Made with dedication for transparent governance
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
