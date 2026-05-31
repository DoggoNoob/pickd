"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  TrendingUp,
  Calculator,
  Scan,
  Sparkles,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Command Center", icon: LayoutDashboard },
  { href: "/portfolio", label: "Portfolio", icon: FolderOpen },
  { href: "/market", label: "Market", icon: TrendingUp },
  { href: "/tax", label: "Tax Center", icon: Calculator },
  { href: "/scan", label: "AI Scanner", icon: Scan },
  { href: "/insights", label: "AI Insights", icon: Sparkles },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[220px] flex flex-col z-30"
      style={{
        background: "var(--vault-surface)",
        borderRight: "1px solid var(--vault-border)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5" style={{ borderBottom: "1px solid var(--vault-border)" }}>
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center"
          style={{ background: "var(--vault-accent)" }}
        >
          <Zap size={14} color="white" fill="white" />
        </div>
        <span className="font-semibold text-sm tracking-tight" style={{ color: "var(--vault-text)" }}>
          CardVault <span style={{ color: "var(--vault-accent)" }}>AI</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md mb-0.5 text-sm font-medium transition-colors group",
              )}
              style={{
                color: isActive ? "var(--vault-text)" : "var(--vault-muted)",
                background: isActive ? "var(--vault-raised)" : "transparent",
              }}
            >
              <Icon
                size={15}
                style={{ color: isActive ? "var(--vault-accent)" : "var(--vault-muted)" }}
                className="transition-colors group-hover:text-[var(--vault-text)]"
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3" style={{ borderTop: "1px solid var(--vault-border)" }}>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium"
          style={{ color: "var(--vault-muted)" }}
        >
          <Settings size={15} />
          Settings
        </Link>
        <div className="mt-3 mx-1 rounded-md p-3" style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="live-dot w-1.5 h-1.5 rounded-full" style={{ background: "var(--vault-gain)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--vault-gain)" }}>Live Prices</span>
          </div>
          <p className="text-xs" style={{ color: "var(--vault-muted)" }}>Updated 2m ago</p>
        </div>
      </div>
    </aside>
  );
}
