"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowUpDown, Star, Trash2, Plus } from "lucide-react";
import { formatCurrency, formatPct, netAfterFee, getPLColor, WHATNOT_FEE_RATE } from "@/lib/utils";
import { useSettings } from "@/hooks/use-settings";
import { GradeBadge } from "@/components/ui/grade-badge";

interface AssetRow {
  id: string;
  name: string;
  set: string;
  number: string;
  grade: string;
  quantity: number;
  costBasis: number;
  currentValue: number;
  imageUrl: string | null;
  isWatchlisted: boolean;
}

type SortKey = "name" | "costBasis" | "currentValue" | "roi" | "plDollar";
type SortDir = "asc" | "desc";

function CardRow({
  card,
  shippingDeduction,
  onWatchlist,
  onDelete,
}: {
  card: AssetRow;
  shippingDeduction: number;
  onWatchlist: (id: string, val: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const unpriced = card.costBasis === 0;
  const netValue = netAfterFee(card.currentValue) - shippingDeduction;
  const pl = netValue - card.costBasis;
  const roi = card.costBasis > 0 ? ((netValue - card.costBasis) / card.costBasis) * 100 : 0;
  const plColor = getPLColor(pl);

  return (
    <tr
      className="group border-b transition-colors"
      style={{ borderColor: "var(--vault-border)" }}
      onMouseEnter={e => (e.currentTarget.style.background = "var(--vault-raised)")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
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
            <p className="text-xs mt-0.5" style={{ color: "var(--vault-muted)" }}>
              {card.set}{card.number ? ` · #${card.number}` : ""}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        <GradeBadge grade={card.grade} size="sm" />
      </td>

      <td className="px-4 py-3">
        <span className="font-mono text-xs tabular-nums" style={{ color: "var(--vault-muted)" }}>{card.quantity}</span>
      </td>

      <td className="px-4 py-3">
        <span className="font-mono text-xs tabular-nums" style={{ color: "var(--vault-muted)" }}>
          {unpriced ? <span style={{ color: "var(--vault-accent)", opacity: 0.6 }}>—</span> : formatCurrency(card.costBasis)}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="font-mono text-xs font-semibold tabular-nums" style={{ color: "var(--vault-text)" }}>
          {formatCurrency(card.currentValue)}
        </span>
      </td>

      <td className="px-4 py-3">
        {unpriced ? (
          <a
            href="/import/prices"
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{ color: "var(--vault-accent)", opacity: 0.7 }}
          >
            Set cost
          </a>
        ) : (
          <div>
            <p className="font-mono text-xs font-semibold tabular-nums" style={{ color: plColor }}>
              {pl >= 0 ? "+" : ""}{formatCurrency(pl)}
            </p>
            <p className="font-mono text-xs tabular-nums" style={{ color: plColor, opacity: 0.8 }}>
              {formatPct(roi, true)}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--vault-muted)", opacity: 0.55, fontSize: "10px" }}>
              after {(WHATNOT_FEE_RATE * 100).toFixed(0)}% fee{shippingDeduction > 0 ? ` + $${shippingDeduction.toFixed(2)} ship` : ""}
            </p>
          </div>
        )}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onWatchlist(card.id, !card.isWatchlisted)}
            className="w-6 h-6 flex items-center justify-center rounded"
            style={{ color: card.isWatchlisted ? "var(--vault-warn)" : "var(--vault-muted)" }}
            title={card.isWatchlisted ? "Remove from watchlist" : "Add to watchlist"}
          >
            <Star size={12} fill={card.isWatchlisted ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => onDelete(card.id)}
            className="w-6 h-6 flex items-center justify-center rounded"
            style={{ color: "var(--vault-muted)" }}
            title="Delete card"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function InventoryTable() {
  const { settings } = useSettings();
  const shipping = settings.shippingDeduction ?? 0;

  const [assets, setAssets] = useState<AssetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("currentValue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/assets");
      if (!res.ok) return;
      const data = await res.json();
      setAssets(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleWatchlist = async (id: string, val: boolean) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, isWatchlisted: val } : a));
    await fetch(`/api/assets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isWatchlisted: val }),
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this card from your portfolio?")) return;
    setAssets(prev => prev.filter(a => a.id !== id));
    await fetch(`/api/assets/${id}`, { method: "DELETE" });
  };

  const sorted = [...assets]
    .filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.set.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "name") return sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      let av = 0, bv = 0;
      if (sortKey === "costBasis") { av = a.costBasis; bv = b.costBasis; }
      if (sortKey === "currentValue") { av = a.currentValue; bv = b.currentValue; }
      if (sortKey === "roi") {
        av = a.costBasis > 0 ? ((netAfterFee(a.currentValue) - shipping - a.costBasis) / a.costBasis) * 100 : 0;
        bv = b.costBasis > 0 ? ((netAfterFee(b.currentValue) - shipping - b.costBasis) / b.costBasis) * 100 : 0;
      }
      if (sortKey === "plDollar") {
        av = netAfterFee(a.currentValue) - shipping - a.costBasis;
        bv = netAfterFee(b.currentValue) - shipping - b.costBasis;
      }
      return sortDir === "asc" ? av - bv : bv - av;
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--vault-border)" }}>
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
                { key: "plDollar" as SortKey, label: "P&L (net)" },
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
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--vault-border)" }}>
                  {[...Array(7)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-3 rounded skeleton" style={{ background: "var(--vault-raised)", width: j === 0 ? "120px" : "60px" }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : sorted.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <p className="text-sm mb-2" style={{ color: "var(--vault-muted)" }}>No cards in your portfolio yet.</p>
                  <a
                    href="/cards/add"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg"
                    style={{ background: "var(--vault-accent)", color: "white" }}
                  >
                    <Plus size={12} /> Add your first card
                  </a>
                </td>
              </tr>
            ) : (
              sorted.map(card => (
                <CardRow
                  key={card.id}
                  card={card}
                  shippingDeduction={shipping}
                  onWatchlist={handleWatchlist}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
