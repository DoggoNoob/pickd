"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockPortfolioHistory } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg px-3 py-2.5 text-xs"
      style={{
        background: "var(--vault-raised)",
        border: "1px solid var(--vault-border)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
      }}
    >
      <p className="font-medium mb-1.5" style={{ color: "var(--vault-muted)" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-mono font-semibold" style={{ color: p.name === "value" ? "var(--vault-accent)" : "var(--vault-muted)" }}>
          {p.name === "value" ? "Portfolio" : "Cost Basis"}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

const ticks = mockPortfolioHistory.filter((_, i) => i % 15 === 0).map(d => d.date);

export function PortfolioChart() {
  return (
    <div
      className="rounded-lg p-5"
      style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>Portfolio Performance</p>
          <p className="font-mono font-semibold text-xl tabular-nums" style={{ color: "var(--vault-text)" }}>
            {formatCurrency(84320.50)}
          </p>
        </div>
        <div className="flex gap-3 text-xs">
          {["7D", "30D", "90D", "1Y", "ALL"].map((range) => (
            <button
              key={range}
              className="px-2 py-1 rounded font-medium transition-colors"
              style={{
                background: range === "90D" ? "var(--vault-accent)20" : "transparent",
                color: range === "90D" ? "var(--vault-accent)" : "var(--vault-muted)",
                border: range === "90D" ? "1px solid var(--vault-accent)40" : "1px solid transparent",
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={mockPortfolioHistory} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C6FFF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7C6FFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22222E" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22222E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#22222E" vertical={false} />
          <XAxis
            dataKey="date"
            ticks={ticks}
            tick={{ fill: "#6E6E85", fontSize: 10, fontFamily: "var(--font-geist-mono)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fill: "#6E6E85", fontSize: 10, fontFamily: "var(--font-geist-mono)" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="costBasis"
            stroke="#22222E"
            strokeWidth={1.5}
            fill="url(#costGradient)"
            name="costBasis"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#7C6FFF"
            strokeWidth={2}
            fill="url(#portfolioGradient)"
            name="value"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
