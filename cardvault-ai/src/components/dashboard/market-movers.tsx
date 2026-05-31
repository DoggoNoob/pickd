"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { mockMarketMovers } from "@/lib/mock-data";
import { formatCurrency, formatPct } from "@/lib/utils";
import { GradeBadge } from "@/components/ui/grade-badge";

export function MarketMovers() {
  const gainers = mockMarketMovers.filter(m => m.change7dPct > 0).slice(0, 3);
  const losers = mockMarketMovers.filter(m => m.change7dPct < 0).slice(0, 2);

  return (
    <div
      className="rounded-lg"
      style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
    >
      <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--vault-border)" }}>
        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>
          Market Movers · 7D
        </p>
      </div>

      <div className="p-2">
        <div className="px-2 py-1.5 mb-1">
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--vault-gain)" }}>
            <TrendingUp size={11} /> Gainers
          </span>
        </div>
        {gainers.map((m) => (
          <div
            key={m.cardId}
            className="flex items-center justify-between px-2 py-2.5 rounded-md group cursor-pointer transition-colors"
            style={{ borderBottom: "1px solid transparent" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--vault-surface)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium truncate" style={{ color: "var(--vault-text)" }}>{m.name}</span>
                <GradeBadge grade={m.grade} size="sm" />
              </div>
              <span className="text-xs" style={{ color: "var(--vault-muted)" }}>{m.set}</span>
            </div>
            <div className="text-right ml-4">
              <p className="font-mono text-xs font-semibold tabular-nums" style={{ color: "var(--vault-text)" }}>
                {formatCurrency(m.currentPrice)}
              </p>
              <p className="font-mono text-xs font-medium tabular-nums" style={{ color: "var(--vault-gain)" }}>
                {formatPct(m.change7dPct, true)}
              </p>
            </div>
          </div>
        ))}

        <div className="px-2 py-1.5 mt-1 mb-1">
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--vault-loss)" }}>
            <TrendingDown size={11} /> Losers
          </span>
        </div>
        {losers.map((m) => (
          <div
            key={m.cardId}
            className="flex items-center justify-between px-2 py-2.5 rounded-md cursor-pointer transition-colors"
            onMouseEnter={e => (e.currentTarget.style.background = "var(--vault-surface)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium truncate" style={{ color: "var(--vault-text)" }}>{m.name}</span>
                <GradeBadge grade={m.grade} size="sm" />
              </div>
              <span className="text-xs" style={{ color: "var(--vault-muted)" }}>{m.set}</span>
            </div>
            <div className="text-right ml-4">
              <p className="font-mono text-xs font-semibold tabular-nums" style={{ color: "var(--vault-text)" }}>
                {formatCurrency(m.currentPrice)}
              </p>
              <p className="font-mono text-xs font-medium tabular-nums" style={{ color: "var(--vault-loss)" }}>
                {formatPct(m.change7dPct, true)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
