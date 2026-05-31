"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Sparkles, Send, TrendingUp, Clock, DollarSign } from "lucide-react";
import { mockInsights } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const exampleQueries = [
  "What were my most profitable cards this month?",
  "Which cards should I sell right now?",
  "What inventory has been sitting for 180+ days?",
  "How much tax liability have I created this year?",
  "What sets are outperforming the market?",
];

const mockConversation = [
  {
    role: "user",
    content: "Which cards should I sell right now?",
  },
  {
    role: "assistant",
    content: `Based on your current inventory and market conditions, here are your top 3 sell candidates right now:

**1. Charizard ex (SAR) PSA 10** — $520 · Up 21.5% in 30 days
Your cost basis is $280, giving you a $240 realized gain (85.7% ROI). This card is approaching its 52-week high. Historical patterns for OBF Charizard show 15-20% corrections after similar spikes. Window may be 2-3 weeks.

**2. Umbreon VMAX (Alt Art) PSA 9** — $340 × 2 = $680 total
Holding 2 copies. EVS alts are trending up 19% this month but have historically peaked around $360 before pulling back. Selling one copy locks in $160 profit while retaining exposure.

**3. Lugia V (Full Art) PSA 10** — $480
Cost basis $320, sitting 131 days. No meaningful price appreciation expected in the next 30 days based on volume trends. Consider rotating into higher-velocity inventory.

Total potential realized: **$1,420 net profit** from these three positions.`,
  },
];

export default function InsightsPage() {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState(mockConversation);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!query.trim()) return;
    const userMsg = { role: "user", content: query };
    setConversation(prev => [...prev, userMsg]);
    setQuery("");
    setIsLoading(true);
    setTimeout(() => {
      setConversation(prev => [...prev, {
        role: "assistant",
        content: "I'm analyzing your portfolio data. Based on your 847 cards and recent market movements, I can see several patterns worth exploring. Give me a moment to process the full context...",
      }]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <AppShell title="AI Insights" subtitle="Portfolio intelligence powered by your data">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chat */}
        <div
          className="lg:col-span-2 rounded-lg flex flex-col"
          style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)", minHeight: 600 }}
        >
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid var(--vault-border)" }}>
            <Sparkles size={13} style={{ color: "var(--vault-accent)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--vault-text)" }}>CardVault Intelligence</span>
            <span
              className="text-xs px-1.5 py-0.5 rounded-full font-medium ml-auto"
              style={{ background: "var(--vault-gain)15", color: "var(--vault-gain)" }}
            >
              Portfolio context loaded
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {conversation.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] rounded-lg px-4 py-3 text-xs leading-relaxed"
                  style={{
                    background: msg.role === "user" ? "var(--vault-accent)20" : "var(--vault-surface)",
                    border: `1px solid ${msg.role === "user" ? "var(--vault-accent)30" : "var(--vault-border)"}`,
                    color: "var(--vault-text)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="rounded-lg px-4 py-3 text-xs"
                  style={{ background: "var(--vault-surface)", border: "1px solid var(--vault-border)" }}
                >
                  <span className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "var(--vault-accent)",
                          animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3" style={{ borderTop: "1px solid var(--vault-border)" }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Ask about your portfolio..."
                className="flex-1 text-xs px-3 py-2 rounded-md outline-none"
                style={{
                  background: "var(--vault-surface)",
                  border: "1px solid var(--vault-border)",
                  color: "var(--vault-text)",
                }}
              />
              <button
                onClick={handleSend}
                className="w-8 h-8 flex items-center justify-center rounded-md"
                style={{ background: "var(--vault-accent)", color: "white" }}
              >
                <Send size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar — example queries + active insights */}
        <div className="flex flex-col gap-4">
          {/* Example queries */}
          <div
            className="rounded-lg p-4"
            style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
          >
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>
              Example Queries
            </p>
            <div className="space-y-1.5">
              {exampleQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuery(q)}
                  className="w-full text-left text-xs p-2.5 rounded-md transition-colors"
                  style={{ color: "var(--vault-muted)", border: "1px solid transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--vault-surface)"; e.currentTarget.style.color = "var(--vault-text)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--vault-muted)"; }}
                >
                  &ldquo;{q}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Active signals */}
          <div
            className="rounded-lg p-4"
            style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
          >
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>
              Active Signals
            </p>
            <div className="space-y-2">
              {mockInsights.slice(0, 3).map((insight) => (
                <div
                  key={insight.id}
                  className="p-2.5 rounded-md cursor-pointer"
                  style={{ background: "var(--vault-surface)", border: "1px solid var(--vault-border)" }}
                  onClick={() => setQuery(insight.title)}
                >
                  <p className="text-xs font-semibold leading-snug mb-0.5" style={{ color: "var(--vault-text)" }}>
                    {insight.title}
                  </p>
                  {insight.value && (
                    <p className="font-mono text-xs tabular-nums" style={{ color: "var(--vault-accent)" }}>
                      {formatCurrency(insight.value)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
