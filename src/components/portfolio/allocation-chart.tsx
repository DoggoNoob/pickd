"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";

const COLORS = ["#7C6FFF", "#2DD97F", "#F59E0B", "#FF5757", "#9589FF", "#3A3A4A"];

interface SliceData { name: string; value: number; pct: number }

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: SliceData }[] }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs"
      style={{
        background: "var(--vault-raised)",
        border: "1px solid var(--vault-border)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
      }}
    >
      <p className="font-medium mb-1" style={{ color: "var(--vault-text)" }}>{payload[0].name}</p>
      <p className="font-mono tabular-nums" style={{ color: "var(--vault-accent)" }}>{formatCurrency(payload[0].value)}</p>
      <p className="font-mono tabular-nums" style={{ color: "var(--vault-muted)" }}>{payload[0].payload.pct}%</p>
    </div>
  );
};

export function AllocationChart() {
  const [slices, setSlices] = useState<SliceData[]>([]);

  useEffect(() => {
    fetch("/api/assets")
      .then(r => r.ok ? r.json() : [])
      .then((assets: { set: string; currentValue: number; quantity: number }[]) => {
        if (!assets.length) return;
        const totals = new Map<string, number>();
        let grand = 0;
        for (const a of assets) {
          const key = a.set || "Unknown";
          const val = Number(a.currentValue) * a.quantity;
          totals.set(key, (totals.get(key) ?? 0) + val);
          grand += val;
        }
        const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1]);
        const top5 = sorted.slice(0, 5);
        const otherVal = sorted.slice(5).reduce((s, [, v]) => s + v, 0);
        const rows: SliceData[] = top5.map(([name, value]) => ({
          name,
          value: Math.round(value * 100) / 100,
          pct: Math.round((value / grand) * 1000) / 10,
        }));
        if (otherVal > 0) rows.push({ name: "Other", value: Math.round(otherVal * 100) / 100, pct: Math.round((otherVal / grand) * 1000) / 10 });
        setSlices(rows);
      });
  }, []);

  if (!slices.length) return (
    <div
      className="rounded-lg p-4 flex items-center justify-center"
      style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)", minHeight: 180 }}
    >
      <p className="text-xs" style={{ color: "var(--vault-muted)" }}>Add cards to see set allocation</p>
    </div>
  );

  return (
    <div
      className="rounded-lg p-4"
      style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
    >
      <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>
        Set Allocation
      </p>
      <div className="flex gap-6 items-center">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={slices}
              cx="50%"
              cy="50%"
              innerRadius={36}
              outerRadius={55}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
            >
              {slices.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-2">
          {slices.map((s, i) => (
            <div key={s.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-xs truncate max-w-[90px]" style={{ color: "var(--vault-muted)" }}>{s.name}</span>
              </div>
              <span className="font-mono text-xs tabular-nums" style={{ color: "var(--vault-text)" }}>{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
