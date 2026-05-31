"use client";

import { Bell, Search, Command } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-6 py-3"
      style={{
        background: "var(--vault-bg)ee",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--vault-border)",
      }}
    >
      <div>
        <h1 className="font-semibold text-base" style={{ color: "var(--vault-text)" }}>{title}</h1>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: "var(--vault-muted)" }}>{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors"
          style={{
            background: "var(--vault-raised)",
            border: "1px solid var(--vault-border)",
            color: "var(--vault-muted)",
          }}
        >
          <Search size={12} />
          <span>Search cards...</span>
          <span className="flex items-center gap-0.5 ml-2 opacity-50">
            <Command size={10} />
            <span>K</span>
          </span>
        </button>

        {/* Notifications */}
        <button
          className="relative w-8 h-8 flex items-center justify-center rounded-md transition-colors"
          style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
        >
          <Bell size={14} style={{ color: "var(--vault-muted)" }} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--vault-accent)" }}
          />
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
          style={{ background: "var(--vault-accent)30", color: "var(--vault-accent)", border: "1px solid var(--vault-accent)40" }}
        >
          JD
        </div>
      </div>
    </header>
  );
}
