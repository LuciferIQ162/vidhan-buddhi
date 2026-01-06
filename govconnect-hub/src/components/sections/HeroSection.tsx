import { Search, Shield, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BASE } from "@/lib/api";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-ashoka/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in">
            <span className="sovereign-badge">
              <Shield className="w-3 h-3" />
              Sovereign
            </span>
            <span className="sovereign-badge">
              <BookOpen className="w-3 h-3" />
              Evidence-Backed
            </span>
            <span className="sovereign-badge">
              <Search className="w-3 h-3" />
              Local AI Ready
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6 animate-slide-up leading-tight">
            Agentic AI for{" "}
            <span className="text-gradient-gold">Legislative Research</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up animation-delay-100 leading-relaxed">
            Navigate government records, legislative archives, and tribunal proceedings with sovereign, evidence-backed AI intelligence designed for legal professionals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-200">
            <Button
              variant="hero"
              size="xl"
              onClick={() => {
                const el = document.getElementById("research");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Begin Research
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button
              variant="hero-outline"
              size="xl"
              onClick={() => {
                window.open(`${BASE}/docs`, "_blank");
              }}
            >
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in animation-delay-300">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif font-bold text-secondary">50K+</p>
              <p className="text-sm text-primary-foreground/60 mt-1">Legislative Documents</p>
            </div>
            <div className="text-center border-x border-primary-foreground/20">
              <p className="text-3xl md:text-4xl font-serif font-bold text-secondary">100%</p>
              <p className="text-sm text-primary-foreground/60 mt-1">Local Processing</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif font-bold text-secondary">24/7</p>
              <p className="text-sm text-primary-foreground/60 mt-1">Availability</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(210 33% 98%)"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
