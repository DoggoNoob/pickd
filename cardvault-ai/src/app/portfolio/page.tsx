"use client";

import { AppShell } from "@/components/layout/app-shell";
import { MetricCard } from "@/components/ui/metric-card";
import { InventoryTable } from "@/components/portfolio/inventory-table";
import { AllocationChart } from "@/components/portfolio/allocation-chart";
import { mockPortfolioStats } from "@/lib/mock-data";
import { formatCurrency, formatPct } from "@/lib/utils";
import { StatDelta } from "@/components/ui/stat-delta";

export default function PortfolioPage() {
  const s = mockPortfolioStats;

  return (
    <AppShell title="Portfolio" subtitle={`${s.totalCards} assets · ${formatCurrency(s.totalValue)} total value`}>
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Portfolio Value"
          value={formatCurrency(s.totalValue)}
          accent
          subValue={<StatDelta value={s.monthlyGrowthPct} size="sm" />}
        />
        <MetricCard
          label="Total Cost Basis"
          value={formatCurrency(s.totalCostBasis)}
          subValue="Acquisition cost"
        />
        <MetricCard
          label="Unrealized Gain"
          value={
            <span style={{ color: "var(--vault-gain)" }}>
              +{formatCurrency(s.unrealizedGain)}
            </span>
          }
          subValue={
            <span className="font-mono text-xs" style={{ color: "var(--vault-gain)" }}>
              {formatPct(s.unrealizedGainPct)} ROI
            </span>
          }
        />
        <MetricCard
          label="Realized Profit"
          value={
            <span style={{ color: "var(--vault-gain)" }}>
              +{formatCurrency(s.realizedProfit)}
            </span>
          }
          subValue="Closed positions YTD"
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <InventoryTable />
        </div>
        <div>
          <AllocationChart />
        </div>
      </div>
    </AppShell>
  );
}
