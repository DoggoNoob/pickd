"use client";

import { AppShell } from "@/components/layout/app-shell";
import { MetricCard } from "@/components/ui/metric-card";
import { mockTaxSummary } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Download, CheckCircle, AlertCircle, FileText, Calculator } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

const monthlyData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  revenue: Math.round(2000 + Math.random() * 6000),
  cogs: Math.round(1200 + Math.random() * 3000),
}));

export default function TaxPage() {
  const t = mockTaxSummary;

  return (
    <AppShell title="Tax Center" subtitle={`${t.year} fiscal year · Est. liability ${formatCurrency(t.estimatedTax)}`}>
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Total Revenue" value={formatCurrency(t.totalRevenue)} />
        <MetricCard
          label="Net Income"
          value={<span style={{ color: "var(--vault-gain)" }}>{formatCurrency(t.netIncome)}</span>}
          subValue="After COGS & expenses"
        />
        <MetricCard
          label="Estimated Tax"
          value={<span style={{ color: "var(--vault-warn)" }}>{formatCurrency(t.estimatedTax)}</span>}
          subValue="Federal + state estimate"
          accent
        />
        <MetricCard
          label="Expenses Tracked"
          value={formatCurrency(t.expenses)}
          subValue="Deductible business expenses"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Monthly P&L chart */}
        <div
          className="lg:col-span-2 rounded-lg p-4"
          style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>
              Monthly Revenue vs COGS
            </p>
            <button
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md"
              style={{ background: "var(--vault-accent)20", color: "var(--vault-accent)", border: "1px solid var(--vault-accent)30" }}
            >
              <Download size={11} /> Export CSV
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#22222E" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#6E6E85", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `$${(v/1000).toFixed(0)}k`} tick={{ fill: "#6E6E85", fontSize: 10 }} axisLine={false} tickLine={false} width={36} />
              <Tooltip
                contentStyle={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)", borderRadius: 6, fontSize: 11 }}
                formatter={(v) => [formatCurrency(Number(v))]}
              />
              <Bar dataKey="revenue" radius={[3, 3, 0, 0]} fill="#7C6FFF" />
              <Bar dataKey="cogs" radius={[3, 3, 0, 0]} fill="#22222E" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Capital gains breakdown */}
        <div
          className="rounded-lg p-4"
          style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
        >
          <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>
            Capital Gains
          </p>
          <div className="space-y-4">
            <div className="p-3 rounded-md" style={{ background: "var(--vault-surface)", border: "1px solid var(--vault-border)" }}>
              <p className="text-xs mb-1" style={{ color: "var(--vault-muted)" }}>Short-Term (&lt;1 year)</p>
              <p className="font-mono font-semibold text-sm tabular-nums" style={{ color: "var(--vault-loss)" }}>
                {formatCurrency(t.shortTermGains)}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--vault-muted)" }}>Taxed as ordinary income</p>
            </div>
            <div className="p-3 rounded-md" style={{ background: "var(--vault-surface)", border: "1px solid var(--vault-border)" }}>
              <p className="text-xs mb-1" style={{ color: "var(--vault-muted)" }}>Long-Term (&gt;1 year)</p>
              <p className="font-mono font-semibold text-sm tabular-nums" style={{ color: "var(--vault-gain)" }}>
                {formatCurrency(t.longTermGains)}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--vault-muted)" }}>Preferred 0–20% rate</p>
            </div>
            <div className="p-3 rounded-md" style={{ background: "var(--vault-warn)10", border: "1px solid var(--vault-warn)30" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Calculator size={11} style={{ color: "var(--vault-warn)" }} />
                <p className="text-xs font-medium" style={{ color: "var(--vault-warn)" }}>Total Est. Tax</p>
              </div>
              <p className="font-mono font-semibold text-sm tabular-nums" style={{ color: "var(--vault-warn)" }}>
                {formatCurrency(t.estimatedTax)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quarterly estimates + export */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div
          className="rounded-lg p-4"
          style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
        >
          <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>
            Quarterly Estimated Payments
          </p>
          <div className="space-y-2">
            {t.quarterlyEstimates.map((q) => (
              <div
                key={q.quarter}
                className="flex items-center justify-between p-3 rounded-md"
                style={{
                  background: "var(--vault-surface)",
                  border: `1px solid ${q.paid ? "var(--vault-gain)20" : "var(--vault-warn)20"}`,
                }}
              >
                <div className="flex items-center gap-3">
                  {q.paid
                    ? <CheckCircle size={14} style={{ color: "var(--vault-gain)" }} />
                    : <AlertCircle size={14} style={{ color: "var(--vault-warn)" }} />
                  }
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--vault-text)" }}>{q.quarter} Estimate</p>
                    <p className="text-xs" style={{ color: "var(--vault-muted)" }}>Due {q.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs font-semibold tabular-nums" style={{ color: "var(--vault-text)" }}>
                    {formatCurrency(q.estimatedAmount)}
                  </p>
                  <p className="text-xs" style={{ color: q.paid ? "var(--vault-gain)" : "var(--vault-warn)" }}>
                    {q.paid ? "Paid" : "Pending"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-lg p-4"
          style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
        >
          <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>
            Export Reports
          </p>
          <div className="space-y-2">
            {[
              { label: "Year-End Summary", sub: "Full P&L, COGS, and tax summary", icon: FileText },
              { label: "Accountant Report", sub: "CPA-ready formatted PDF", icon: FileText },
              { label: "Schedule C Export", sub: "Self-employment income CSV", icon: Download },
              { label: "Transaction Log", sub: "All buys and sells with dates", icon: Download },
            ].map(({ label, sub, icon: Icon }) => (
              <button
                key={label}
                className="w-full flex items-center justify-between p-3 rounded-md transition-colors text-left"
                style={{ background: "var(--vault-surface)", border: "1px solid var(--vault-border)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--vault-accent)40")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--vault-border)")}
              >
                <div className="flex items-center gap-3">
                  <Icon size={14} style={{ color: "var(--vault-accent)" }} />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--vault-text)" }}>{label}</p>
                    <p className="text-xs" style={{ color: "var(--vault-muted)" }}>{sub}</p>
                  </div>
                </div>
                <Download size={12} style={{ color: "var(--vault-muted)" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
