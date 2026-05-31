"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { formatPct, formatCurrency } from "@/lib/utils";

interface StatDeltaProps {
  value: number;
  pct?: number;
  showCurrency?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StatDelta({ value, pct, showCurrency = false, size = "md" }: StatDeltaProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const color = isPositive ? "var(--vault-gain)" : isNegative ? "var(--vault-loss)" : "var(--vault-muted)";

  const fontSize = size === "sm" ? "11px" : size === "lg" ? "15px" : "12px";
  const iconSize = size === "sm" ? 10 : size === "lg" ? 14 : 11;

  return (
    <span
      className="inline-flex items-center gap-1 font-mono font-medium tabular-nums"
      style={{ color, fontSize }}
    >
      {isPositive ? (
        <TrendingUp size={iconSize} />
      ) : isNegative ? (
        <TrendingDown size={iconSize} />
      ) : (
        <Minus size={iconSize} />
      )}
      {showCurrency && formatCurrency(Math.abs(value))}
      {pct !== undefined && formatPct(pct)}
      {!showCurrency && pct === undefined && formatPct(value)}
    </span>
  );
}
