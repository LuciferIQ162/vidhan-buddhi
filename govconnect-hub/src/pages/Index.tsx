import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import QueryInterface from "@/components/sections/QueryInterface";
import EvidenceBoard from "@/components/sections/EvidenceBoard";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <QueryInterface />
        <EvidenceBoard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
