"use client";

import { AppShell } from "@/components/layout/app-shell";
import { MetricCard } from "@/components/ui/metric-card";
import { StatDelta } from "@/components/ui/stat-delta";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { MarketMovers } from "@/components/dashboard/market-movers";
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel";
import { TaxSnapshot } from "@/components/dashboard/tax-snapshot";
import { mockPortfolioStats } from "@/lib/mock-data";
import { formatCurrency, formatNumber, formatPct } from "@/lib/utils";

export default function DashboardPage() {
  const s = mockPortfolioStats;

  return (
    <AppShell title="Command Center" subtitle="Sunday, May 31, 2026 · Portfolio snapshot">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total Value"
          value={formatCurrency(s.totalValue)}
          accent
          subValue={
            <StatDelta value={s.monthlyGrowth} pct={s.monthlyGrowthPct} showCurrency size="sm" />
          }
        />
        <MetricCard
          label="Unrealized Gain"
          value={
            <span style={{ color: "var(--vault-gain)" }}>
              {formatCurrency(s.unrealizedGain)}
            </span>
          }
          subValue={
            <span className="font-mono text-xs" style={{ color: "var(--vault-gain)" }}>
              {formatPct(s.unrealizedGainPct)} vs cost basis
            </span>
          }
        />
        <MetricCard
          label="Realized Profit"
          value={
            <span style={{ color: "var(--vault-gain)" }}>
              {formatCurrency(s.realizedProfit)}
            </span>
          }
          subValue="Closed positions YTD"
        />
        <MetricCard
          label="Total Inventory"
          value={formatNumber(s.totalCards)}
          subValue={`${s.totalSealedProduct} sealed · ${s.inventoryTurnoverRate}x turnover`}
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Chart — 2 col */}
        <div className="lg:col-span-2">
          <PortfolioChart />
        </div>

        {/* Market movers */}
        <div>
          <MarketMovers />
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* AI Insights — 2 col */}
        <div className="lg:col-span-2">
          <AIInsightsPanel />
        </div>

        {/* Tax snapshot */}
        <div>
          <TaxSnapshot />
        </div>
      </div>
    </AppShell>
  );
}
