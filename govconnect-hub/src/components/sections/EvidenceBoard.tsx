import { FileText, ExternalLink, Calendar, Building2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const documents = [
  {
    id: "1",
    title: "Mahanadi Water Disputes Tribunal Order - 2021",
    type: "Tribunal Order",
    date: "March 15, 2021",
    source: "Ministry of Jal Shakti",
    excerpt: "The Tribunal, having considered the rival claims of the States of Odisha and Chhattisgarh regarding the sharing of waters of the Mahanadi river...",
    relevance: 98,
  },
  {
    id: "2",
    title: "Inter-State River Water Disputes Act, 1956 (Amendment 2019)",
    type: "Legislative Act",
    date: "August 3, 2019",
    source: "Parliament of India",
    excerpt: "An Act to provide for the adjudication of disputes relating to waters of inter-State rivers and river valleys...",
    relevance: 95,
  },
  {
    id: "3",
    title: "Central Water Commission Technical Report",
    type: "Technical Document",
    date: "January 2020",
    source: "Central Water Commission",
    excerpt: "Hydrological assessment of the Mahanadi basin including analysis of flow patterns, storage capacities, and utilization metrics...",
    relevance: 87,
  },
  {
    id: "4",
    title: "Government Gazette Notification S.O. 4567",
    type: "Notification",
    date: "September 2020",
    source: "Ministry of Water Resources",
    excerpt: "In exercise of the powers conferred by Section 4 of the Inter-State River Water Disputes Act, 1956...",
    relevance: 82,
  },
];

const EvidenceBoard = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="sovereign-badge mb-4 inline-flex">
              <FileText className="w-3 h-3" />
              Source Documents
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Evidence Board
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every response is backed by verifiable government documents. Explore the primary sources that inform our analysis.
            </p>
          </div>

          {/* Document Cards */}
          <Accordion type="single" collapsible className="space-y-4">
            {documents.map((doc) => (
              <AccordionItem
                key={doc.id}
                value={doc.id}
                className="bg-card rounded-xl border border-border shadow-card px-6 data-[state=open]:shadow-elevated transition-all"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-start gap-4 text-left w-full pr-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                          {doc.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {doc.relevance}% relevant
                        </span>
                      </div>
                      <h3 className="font-serif font-semibold text-foreground truncate">
                        {doc.title}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="pl-14 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {doc.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {doc.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        {doc.source}
                      </span>
                    </div>
                    <button
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-secondary transition-colors"
                      onClick={() => {
                        const q = encodeURIComponent(doc.title);
                        window.open(`https://www.google.com/search?q=${q}`, "_blank");
                      }}
                    >
                      View Full Document
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default EvidenceBoard;
