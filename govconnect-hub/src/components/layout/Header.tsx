import { Scale, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center shadow-glow">
              <Scale className="w-5 h-5 md:w-6 md:h-6 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-serif font-bold text-primary-foreground tracking-wide">
                Vidhan Buddhi
              </h1>
              <p className="text-[10px] md:text-xs text-primary-foreground/70 tracking-widest uppercase">
                Legislative Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#research" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
              Research
            </a>
            <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
              About
            </a>
            <Button
              variant="gold"
              size="sm"
              onClick={() => {
                const el = document.getElementById("research");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Start Query
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-foreground/10 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
                Features
              </a>
              <a href="#research" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
                Research
              </a>
              <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
                About
              </a>
              <Button
                variant="gold"
                size="sm"
                className="w-full mt-2"
                onClick={() => {
                  const el = document.getElementById("research");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  setIsMenuOpen(false);
                }}
              >
                Start Query
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
