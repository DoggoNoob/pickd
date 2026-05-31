"use client";

import { Download, AlertCircle } from "lucide-react";
import { mockTaxSummary } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function TaxSnapshot() {
  const t = mockTaxSummary;
  const ytdProgress = (t.totalRevenue / 100000) * 100;

  return (
    <div
      className="rounded-lg p-4"
      style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>
          Tax Snapshot · {t.year}
        </p>
        <button
          className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors"
          style={{ background: "var(--vault-accent)20", color: "var(--vault-accent)", border: "1px solid var(--vault-accent)30" }}
        >
          <Download size={11} />
          Export
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "Revenue YTD", value: t.totalRevenue, color: "var(--vault-text)" },
          { label: "Net Income", value: t.netIncome, color: "var(--vault-gain)" },
          { label: "Cost of Goods", value: t.costOfGoods, color: "var(--vault-muted)" },
          { label: "Est. Tax Owed", value: t.estimatedTax, color: "var(--vault-warn)" },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <p className="text-xs mb-1" style={{ color: "var(--vault-muted)" }}>{label}</p>
            <p className="font-mono font-semibold text-sm tabular-nums" style={{ color }}>
              {formatCurrency(value)}
            </p>
          </div>
        ))}
      </div>

      {/* YTD Revenue bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span style={{ color: "var(--vault-muted)" }}>YTD Revenue</span>
          <span className="font-mono" style={{ color: "var(--vault-text)" }}>{formatCurrency(t.totalRevenue)} / $100k</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--vault-border)" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${ytdProgress}%`, background: "var(--vault-accent)" }}
          />
        </div>
      </div>

      {/* Quarterly estimates */}
      <div>
        <p className="text-xs font-medium mb-2" style={{ color: "var(--vault-muted)" }}>Quarterly Estimates</p>
        <div className="space-y-1.5">
          {t.quarterlyEstimates.map((q) => (
            <div key={q.quarter} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: q.paid ? "var(--vault-gain)" : "var(--vault-warn)" }}
                />
                <span className="text-xs font-medium" style={{ color: "var(--vault-text)" }}>{q.quarter}</span>
                <span className="text-xs" style={{ color: "var(--vault-muted)" }}>{q.dueDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tabular-nums" style={{ color: "var(--vault-text)" }}>
                  {formatCurrency(q.estimatedAmount)}
                </span>
                {!q.paid && (
                  <AlertCircle size={11} style={{ color: "var(--vault-warn)" }} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
