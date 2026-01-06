import { 
  Shield, 
  Database, 
  FileSearch, 
  Scale, 
  Lock, 
  Zap,
  BookMarked,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Sovereign Processing",
    description: "All data processing happens locally within your infrastructure. No external API calls for sensitive queries.",
  },
  {
    icon: Database,
    title: "Vector Database",
    description: "ChromaDB-powered semantic search enables intelligent retrieval across millions of legislative documents.",
  },
  {
    icon: FileSearch,
    title: "Deep Document Analysis",
    description: "RAG architecture provides accurate, context-aware responses with full source citations.",
  },
  {
    icon: Scale,
    title: "Tribunal Archives",
    description: "Access proceedings from water tribunals, environmental courts, and specialized legal bodies.",
  },
  {
    icon: Lock,
    title: "Data Privacy",
    description: "End-to-end encryption ensures sensitive government data remains secure and compliant.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Automatic ingestion of new legislative documents keeps your knowledge base current.",
  },
  {
    icon: BookMarked,
    title: "Citation Tracking",
    description: "Every response includes verifiable references to original government documents and notifications.",
  },
  {
    icon: Globe,
    title: "Multi-jurisdiction",
    description: "Cross-reference central and state legislation with intelligent conflict detection.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="sovereign-badge mb-4 inline-flex">
            <Zap className="w-3 h-3" />
            Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Built for Government-Grade Research
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enterprise-ready features designed to meet the stringent requirements of legal professionals and government institutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-xl border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
