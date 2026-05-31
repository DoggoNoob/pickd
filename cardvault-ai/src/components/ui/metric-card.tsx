"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | ReactNode;
  subValue?: string | ReactNode;
  accent?: boolean;
  className?: string;
  children?: ReactNode;
}

export function MetricCard({ label, value, subValue, accent, className, children }: MetricCardProps) {
  return (
    <div
      className={cn("rounded-lg p-4 flex flex-col gap-2", className)}
      style={{
        background: "var(--vault-raised)",
        border: `1px solid ${accent ? "var(--vault-accent)30" : "var(--vault-border)"}`,
        boxShadow: accent ? "0 0 0 1px var(--vault-accent)20, 0 4px 16px rgba(124,111,255,0.08)" : undefined,
      }}
    >
      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--vault-muted)", letterSpacing: "0.08em" }}>
        {label}
      </p>
      <div className="font-mono font-semibold tabular-nums" style={{ fontSize: "22px", color: accent ? "var(--vault-accent)" : "var(--vault-text)", lineHeight: 1.1 }}>
        {value}
      </div>
      {subValue && (
        <div className="text-xs" style={{ color: "var(--vault-muted)" }}>
          {subValue}
        </div>
      )}
      {children}
    </div>
  );
}
