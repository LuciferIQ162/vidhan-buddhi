import { useState } from "react";
import { Search, Loader2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { runQuery, runIngest, runAnswer, Match, DEFAULT_MODEL } from "@/lib/api";

const QueryInterface = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reasoningSteps, setReasoningSteps] = useState<string[]>([]);
  const [results, setResults] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ingestInfo, setIngestInfo] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [answersByModel, setAnswersByModel] = useState<Record<string, string>>({});
  const [activeModel, setActiveModel] = useState<string>(DEFAULT_MODEL);
  const modelOptions = ["gpt-4o-mini", "gpt-4o"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setReasoningSteps([]);
    setResults([]);
    setError(null);
    setAnswer(null);

    // Simulate reasoning steps
    const steps = [
      "Searching historical legislative archives...",
      "Accessing technical committee records...",
      "Correlating with tribunal proceedings...",
      "Analyzing policy implications...",
      "Generating evidence-backed response...",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setReasoningSteps((prev) => [...prev, steps[i]]);
    }

    try {
      const matches = await runQuery(query, 8);
      setResults(matches);
    } catch (err) {
      setError("Query failed. Ensure the backend is running.");
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    }
  };

  const exampleQueries = [
    "Analyze the Mahanadi water dispute tribunal proceedings",
    "Compare GST amendment impacts across states",
    "Review environmental clearance policies for industrial projects",
  ];

  return (
    <section id="research" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="sovereign-badge mb-4 inline-flex">
              <Sparkles className="w-3 h-3" />
              AI-Powered Research
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Legislative Query Interface
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ask complex questions about government policies, legislative history, and legal proceedings. Our AI provides evidence-backed responses with full source citations.
            </p>
          </div>

          {/* Query Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={async () => {
                  setIngestInfo(null);
                  try {
                    const added = await runIngest();
                    setIngestInfo(`Ingested ${added} chunks`);
                  } catch {
                    setIngestInfo("Ingest failed");
                  }
                }}
              >
                Build Knowledge Base
              </Button>
            </div>
            <div className="relative">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your legislative research query..."
                className="min-h-[140px] resize-none bg-card border-2 border-border focus:border-secondary transition-colors text-base p-5 pr-14 rounded-xl shadow-card"
              />
              <div className="absolute bottom-4 right-4">
                <Button
                  type="submit"
                  variant="gold"
                  size="icon"
                  disabled={isLoading || !query.trim()}
                  className="rounded-full w-12 h-12"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
            {ingestInfo && (
              <p className="text-xs text-muted-foreground">{ingestInfo}</p>
            )}
            <div className="flex justify-end">
              <Button
                type="button"
                variant="gold"
                disabled={isLoading || !query.trim()}
                onClick={async () => {
                  setError(null);
                  setAnswer(null);
                  try {
                    const runs = await Promise.all(
                      modelOptions.map(async (m) => {
                        try {
                          const r = await runAnswer(query, 8, m);
                          return [m, r.answer] as const;
                        } catch {
                          return [m, ""] as const;
                        }
                      }),
                    );
                    const map: Record<string, string> = {};
                    for (const [m, a] of runs) map[m] = a;
                    setAnswersByModel(map);
                    setAnswer(map[activeModel] || "");
                  } catch (e: any) {
                    setError("Answer failed. Check OPENAI_API_KEY and backend.");
                  }
                }}
              >
                Generate AI Answer
              </Button>
            </div>
            <div className="flex gap-2 justify-end">
              {modelOptions.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={activeModel === m ? "gold" : "outline"}
                  size="sm"
                  onClick={() => {
                    setActiveModel(m);
                    setAnswer(answersByModel[m] || "");
                  }}
                >
                  {m}
                </Button>
              ))}
            </div>

            {/* Example Queries */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Try:</span>
              {exampleQueries.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setQuery(example)}
                  className="text-sm text-primary hover:text-secondary transition-colors underline-offset-4 hover:underline"
                >
                  {example}
                </button>
              ))}
            </div>
          </form>

          {/* Reasoning Status */}
          {reasoningSteps.length > 0 && (
            <div className="mt-8 p-6 bg-card rounded-xl border border-border shadow-card animate-scale-in">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Reasoning Status
              </h3>
              <ul className="space-y-3">
                {reasoningSteps.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm text-muted-foreground animate-fade-in"
                  >
                    <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-secondary">{index + 1}</span>
                    </div>
                    {step}
                  </li>
                ))}
              </ul>

              {!isLoading && results.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-foreground font-medium mb-2">
                    Analysis Complete
                  </p>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Found {results.length} relevant chunks from the knowledge base.
                    </p>
                    <ul className="space-y-3">
                      {results.map((m, i) => (
                        <li key={i} className="p-3 rounded-lg border border-border bg-muted">
                          <p className="text-sm text-foreground">{m.content}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {!isLoading && error && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              {!isLoading && answer && (
                <div className="mt-6 p-6 bg-card rounded-xl border border-border shadow-card">
                  <p className="text-sm text-foreground font-medium mb-2">
                    AI Answer
                  </p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {answer}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QueryInterface;
