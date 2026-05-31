"use client";

import { Sparkles, AlertTriangle, TrendingUp, Clock, DollarSign } from "lucide-react";
import { mockInsights } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import type { AIInsight } from "@/types";

const iconMap = {
  sell_signal: TrendingUp,
  hold_signal: Clock,
  tax_alert: DollarSign,
  trend_alert: TrendingUp,
  idle_inventory: Clock,
};

const priorityColor = {
  high: "var(--vault-loss)",
  medium: "var(--vault-warn)",
  low: "var(--vault-muted)",
};

function InsightRow({ insight }: { insight: AIInsight }) {
  const Icon = iconMap[insight.type];
  return (
    <div
      className="flex gap-3 p-3 rounded-md cursor-pointer"
      style={{ border: "1px solid var(--vault-border)" }}
      onMouseEnter={e => (e.currentTarget.style.background = "var(--vault-surface)")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: `${priorityColor[insight.priority]}18`,
          border: `1px solid ${priorityColor[insight.priority]}30`,
        }}
      >
        <Icon size={12} style={{ color: priorityColor[insight.priority] }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold leading-tight" style={{ color: "var(--vault-text)" }}>
            {insight.title}
          </p>
          {insight.value && (
            <span className="font-mono text-xs font-semibold tabular-nums flex-shrink-0" style={{ color: "var(--vault-accent)" }}>
              {formatCurrency(insight.value)}
            </span>
          )}
        </div>
        <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--vault-muted)" }}>
          {insight.body}
        </p>
      </div>
    </div>
  );
}

export function AIInsightsPanel() {
  return (
    <div
      className="rounded-lg"
      style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
    >
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--vault-border)" }}>
        <div className="flex items-center gap-2">
          <Sparkles size={13} style={{ color: "var(--vault-accent)" }} />
          <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>
            AI Insights
          </p>
        </div>
        <span
          className="text-xs font-semibold rounded-full px-2 py-0.5"
          style={{ background: "var(--vault-loss)20", color: "var(--vault-loss)", border: "1px solid var(--vault-loss)30" }}
        >
          {mockInsights.filter(i => i.priority === "high").length} urgent
        </span>
      </div>
      <div className="p-3 flex flex-col gap-2">
        {mockInsights.map((insight) => (
          <InsightRow key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
}
