"use client";

import { AppShell } from "@/components/layout/app-shell";
import { MetricCard } from "@/components/ui/metric-card";
import { GradeBadge } from "@/components/ui/grade-badge";
import { mockMarketMovers } from "@/lib/mock-data";
import { formatCurrency, formatPct } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

function SparklineChart({ positive }: { positive: boolean }) {
  const points = Array.from({ length: 30 }, (_, i) => ({
    i,
    v: 100 + Math.sin(i * 0.4) * 8 + (positive ? i * 2.5 : -i * 1.5) + Math.random() * 6,
  }));
  const color = positive ? "var(--vault-gain)" : "var(--vault-loss)";

  return (
    <ResponsiveContainer width={100} height={36}>
      <AreaChart data={points} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
        <defs>
          <linearGradient id={`sparkGrad-${positive}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#sparkGrad-${positive})`} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default function MarketPage() {
  return (
    <AppShell title="Market" subtitle="Live price intelligence · TCGPlayer · eBay · PriceCharting">
      {/* Top movers overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Market Cap (Tracked)" value="$2.4M" subValue="Pokémon TCG" />
        <MetricCard label="Volume 24h" value="14,820" subValue="eBay sold listings" />
        <MetricCard label="Avg Card Value" value={formatCurrency(148.20)} subValue="+3.2% vs last week" />
        <MetricCard label="Your Exposure" value={formatCurrency(84320.50)} accent subValue="Market-correlated" />
      </div>

      {/* Market movers table */}
      <div
        className="rounded-lg overflow-hidden mb-4"
        style={{ border: "1px solid var(--vault-border)" }}
      >
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ background: "var(--vault-raised)", borderBottom: "1px solid var(--vault-border)" }}
        >
          <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>
            Top Movers · All Markets
          </p>
          <div className="flex gap-1">
            {["All", "Gainers", "Losers", "Volume"].map((f) => (
              <button
                key={f}
                className="text-xs px-2.5 py-1 rounded-md font-medium"
                style={{
                  background: f === "All" ? "var(--vault-accent)20" : "transparent",
                  color: f === "All" ? "var(--vault-accent)" : "var(--vault-muted)",
                  border: f === "All" ? "1px solid var(--vault-accent)30" : "1px solid transparent",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full" style={{ background: "var(--vault-surface)" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--vault-border)" }}>
              {["Card", "Grade", "Price", "7D", "30D", "Volume", "Chart", "Alert"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left">
                  <span className="text-xs font-medium uppercase" style={{ color: "var(--vault-muted)", letterSpacing: "0.06em" }}>{h}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockMarketMovers.map((m) => (
              <tr
                key={m.cardId}
                className="border-b transition-colors cursor-pointer"
                style={{ borderColor: "var(--vault-border)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--vault-raised)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <td className="px-4 py-3">
                  <p className="text-xs font-semibold" style={{ color: "var(--vault-text)" }}>{m.name}</p>
                  <p className="text-xs" style={{ color: "var(--vault-muted)" }}>{m.set}</p>
                </td>
                <td className="px-4 py-3"><GradeBadge grade={m.grade} size="sm" /></td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs font-semibold tabular-nums" style={{ color: "var(--vault-text)" }}>
                    {formatCurrency(m.currentPrice)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs font-semibold tabular-nums" style={{ color: m.change7dPct >= 0 ? "var(--vault-gain)" : "var(--vault-loss)" }}>
                    {formatPct(m.change7dPct, true)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs font-semibold tabular-nums" style={{ color: m.change30dPct >= 0 ? "var(--vault-gain)" : "var(--vault-loss)" }}>
                    {formatPct(m.change30dPct, true)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs tabular-nums" style={{ color: "var(--vault-muted)" }}>
                    {m.volume.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <SparklineChart positive={m.change7dPct >= 0} />
                </td>
                <td className="px-4 py-3">
                  <button
                    className="text-xs px-2 py-1 rounded font-medium"
                    style={{
                      background: "var(--vault-accent)15",
                      color: "var(--vault-accent)",
                      border: "1px solid var(--vault-accent)30",
                    }}
                  >
                    Alert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
