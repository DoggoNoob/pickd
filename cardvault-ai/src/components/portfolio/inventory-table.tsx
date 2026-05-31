"use client";

import { useState } from "react";
import { ArrowUpDown, Star, MoreHorizontal } from "lucide-react";
import { mockCards } from "@/lib/mock-data";
import { formatCurrency, formatPct, calculateROI, getPLColor } from "@/lib/utils";
import { GradeBadge } from "@/components/ui/grade-badge";
import type { Card } from "@/types";

type SortKey = "name" | "costBasis" | "currentValue" | "roi" | "plDollar";
type SortDir = "asc" | "desc";

function CardRow({ card }: { card: Card }) {
  const pl = card.currentValue - card.costBasis;
  const roi = calculateROI(card.costBasis, card.currentValue);
  const plColor = getPLColor(pl);

  return (
    <tr
      className="group border-b transition-colors"
      style={{ borderColor: "var(--vault-border)" }}
      onMouseEnter={e => (e.currentTarget.style.background = "var(--vault-raised)")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      {/* Card name + set */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-11 rounded-sm overflow-hidden flex-shrink-0" style={{ background: "var(--vault-border)" }}>
            {card.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" loading="lazy" />
            )}
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--vault-text)" }}>{card.name}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--vault-muted)" }}>{card.set} · #{card.number}</p>
          </div>
        </div>
      </td>

      {/* Grade */}
      <td className="px-4 py-3">
        <GradeBadge grade={card.grade} size="sm" />
      </td>

      {/* Qty */}
      <td className="px-4 py-3">
        <span className="font-mono text-xs tabular-nums" style={{ color: "var(--vault-muted)" }}>{card.quantity}</span>
      </td>

      {/* Cost Basis */}
      <td className="px-4 py-3">
        <span className="font-mono text-xs tabular-nums" style={{ color: "var(--vault-muted)" }}>
          {formatCurrency(card.costBasis)}
        </span>
      </td>

      {/* Market Value */}
      <td className="px-4 py-3">
        <span className="font-mono text-xs font-semibold tabular-nums" style={{ color: "var(--vault-text)" }}>
          {formatCurrency(card.currentValue)}
        </span>
      </td>

      {/* P&L */}
      <td className="px-4 py-3">
        <div>
          <p className="font-mono text-xs font-semibold tabular-nums" style={{ color: plColor }}>
            {pl >= 0 ? "+" : ""}{formatCurrency(pl)}
          </p>
          <p className="font-mono text-xs tabular-nums" style={{ color: plColor, opacity: 0.8 }}>
            {formatPct(roi, true)}
          </p>
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-6 h-6 flex items-center justify-center rounded" style={{ color: card.isWatchlisted ? "var(--vault-warn)" : "var(--vault-muted)" }}>
            <Star size={12} fill={card.isWatchlisted ? "currentColor" : "none"} />
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded" style={{ color: "var(--vault-muted)" }}>
            <MoreHorizontal size={12} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function InventoryTable() {
  const [sortKey, setSortKey] = useState<SortKey>("currentValue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [search, setSearch] = useState("");

  const sorted = [...mockCards]
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.set.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let av = 0, bv = 0;
      if (sortKey === "name") return sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      if (sortKey === "costBasis") { av = a.costBasis; bv = b.costBasis; }
      if (sortKey === "currentValue") { av = a.currentValue; bv = b.currentValue; }
      if (sortKey === "roi") { av = calculateROI(a.costBasis, a.currentValue); bv = calculateROI(b.costBasis, b.currentValue); }
      if (sortKey === "plDollar") { av = a.currentValue - a.costBasis; bv = b.currentValue - b.costBasis; }
      return sortDir === "asc" ? av - bv : bv - av;
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--vault-border)" }}>
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: "var(--vault-raised)", borderBottom: "1px solid var(--vault-border)" }}>
        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 text-xs px-3 py-1.5 rounded-md outline-none"
          style={{
            background: "var(--vault-surface)",
            border: "1px solid var(--vault-border)",
            color: "var(--vault-text)",
          }}
        />
        <span className="text-xs" style={{ color: "var(--vault-muted)" }}>{sorted.length} items</span>
      </div>

      <div style={{ background: "var(--vault-surface)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--vault-border)" }}>
              {[
                { key: "name" as SortKey, label: "Card" },
                { key: null, label: "Grade" },
                { key: null, label: "Qty" },
                { key: "costBasis" as SortKey, label: "Cost Basis" },
                { key: "currentValue" as SortKey, label: "Market Value" },
                { key: "plDollar" as SortKey, label: "P&L" },
                { key: null, label: "" },
              ].map(({ key, label }) => (
                <th key={label} className="px-4 py-2.5 text-left">
                  {key ? (
                    <button
                      className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest"
                      style={{ color: sortKey === key ? "var(--vault-accent)" : "var(--vault-muted)", letterSpacing: "0.06em" }}
                      onClick={() => handleSort(key)}
                    >
                      {label}
                      <ArrowUpDown size={9} />
                    </button>
                  ) : (
                    <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--vault-muted)", letterSpacing: "0.06em" }}>
                      {label}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(card => (
              <CardRow key={card.id} card={card} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
