"use client";

import Link from "next/link";
import { Zap, TrendingUp, Calculator, Scan, Sparkles, Shield, BarChart3, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Portfolio Analytics",
    body: "Bloomberg-grade charts. Cost basis tracking. Realized vs. unrealized gain/loss. Every card treated like a line item in a financial statement.",
  },
  {
    icon: TrendingUp,
    title: "Live Price Intelligence",
    body: "Real-time market data from TCGPlayer, eBay, and PriceCharting. 7-day and 30-day trend lines. Price alerts when your targets hit.",
  },
  {
    icon: Scan,
    title: "AI Card Scanner",
    body: "Upload photos of your binder or slabs. AI identifies every card, estimates the grade, and builds your inventory automatically.",
  },
  {
    icon: Calculator,
    title: "Tax Center",
    body: "Quarterly estimated payments. Capital gains breakdown. One-click export of accountant-ready reports. No more spreadsheets at tax time.",
  },
  {
    icon: Sparkles,
    title: "AI Insights Engine",
    body: "Ask questions in plain English. What should I sell today? Which cards are stale? How much tax liability have I created? Instant answers.",
  },
  {
    icon: Shield,
    title: "Whatnot Integration",
    body: "Connect your Whatnot account. Auto-import sales, match sold items to inventory, and generate seller scorecards without manual entry.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: 0,
    period: "forever",
    features: ["Up to 100 cards", "Manual inventory", "Basic price lookup", "Tax summary"],
  },
  {
    name: "Pro",
    price: 29,
    period: "/month",
    features: ["Unlimited inventory", "AI Scanner (50 scans/mo)", "Live price alerts", "Full tax center", "Whatnot integration", "AI Insights"],
    accent: true,
  },
  {
    name: "Enterprise",
    price: 99,
    period: "/month",
    features: ["Everything in Pro", "Unlimited AI scans", "Team accounts", "API access", "Priority support", "Custom exports"],
  },
];

export default function HomePage() {
  return (
    <div style={{ background: "var(--vault-bg)", color: "var(--vault-text)" }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: "var(--vault-bg)ee", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--vault-border)" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "var(--vault-accent)" }}>
            <Zap size={14} color="white" fill="white" />
          </div>
          <span className="font-semibold text-sm">
            CardVault <span style={{ color: "var(--vault-accent)" }}>AI</span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm" style={{ color: "var(--vault-muted)" }}>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm px-3 py-1.5 rounded-md font-medium"
            style={{ color: "var(--vault-muted)" }}
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="text-sm px-4 py-1.5 rounded-md font-medium transition-colors"
            style={{ background: "var(--vault-accent)", color: "white" }}
          >
            Start free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-8 text-center relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--vault-accent), transparent 70%)", filter: "blur(60px)" }}
        />

        <div className="relative max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-6"
            style={{ background: "var(--vault-accent)15", border: "1px solid var(--vault-accent)30", color: "var(--vault-accent)" }}
          >
            <Sparkles size={11} />
            Now with AI Card Scanner + Portfolio Analytics
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight mb-6">
            Your Pokémon Collection<br />
            <span className="holo-text">Is an Asset.</span><br />
            Manage It Like One.
          </h1>

          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "var(--vault-muted)" }}>
            Track inventory, monitor real-time prices, calculate taxes, analyze profits, and use AI to make smarter decisions about your Pokémon TCG collection.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              style={{ background: "var(--vault-accent)", color: "white" }}
            >
              Open Command Center
              <ArrowRight size={14} />
            </Link>
            <a
              href="#features"
              className="px-6 py-3 rounded-lg font-semibold text-sm"
              style={{ background: "var(--vault-raised)", color: "var(--vault-text)", border: "1px solid var(--vault-border)" }}
            >
              See how it works
            </a>
          </div>

          <p className="text-xs mt-4" style={{ color: "var(--vault-muted)", opacity: 0.7 }}>
            Free tier available · No credit card required · Built for Whatnot sellers
          </p>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-xl p-1"
            style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}
          >
            {/* Mock dashboard preview */}
            <div className="rounded-lg overflow-hidden" style={{ background: "var(--vault-bg)" }}>
              {/* Fake topbar */}
              <div className="flex items-center gap-2 px-4 py-2" style={{ background: "var(--vault-surface)", borderBottom: "1px solid var(--vault-border)" }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--vault-loss)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--vault-warn)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--vault-gain)" }} />
                <span className="text-xs ml-2" style={{ color: "var(--vault-muted)" }}>CardVault AI · Command Center</span>
              </div>
              {/* Fake dashboard grid */}
              <div className="grid grid-cols-4 gap-3 p-4">
                {[
                  { label: "Portfolio Value", value: "$84,320", color: "var(--vault-accent)" },
                  { label: "Unrealized Gain", value: "+$23,080", color: "var(--vault-gain)" },
                  { label: "Realized Profit", value: "+$18,420", color: "var(--vault-gain)" },
                  { label: "Total Cards", value: "847", color: "var(--vault-text)" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="rounded-md p-3" style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}>
                    <p className="text-xs mb-1" style={{ color: "var(--vault-muted)" }}>{label}</p>
                    <p className="font-mono font-semibold text-sm" style={{ color }}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="mx-4 mb-4 h-28 rounded-md" style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}>
                <div className="flex items-end h-full p-3 gap-1">
                  {Array.from({ length: 28 }, (_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${30 + Math.sin(i * 0.5) * 20 + i * 1.5}%`,
                        background: i > 22 ? "var(--vault-accent)" : "var(--vault-border)",
                        opacity: i > 22 ? 1 : 0.6,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-24" style={{ borderTop: "1px solid var(--vault-border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--vault-accent)", letterSpacing: "0.12em" }}>
              Platform
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Everything a serious seller needs
            </h2>
            <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: "var(--vault-muted)" }}>
              Built specifically for Whatnot Pokémon sellers who treat their inventory as a financial asset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-lg p-5"
                style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
              >
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center mb-4"
                  style={{ background: "var(--vault-accent)15", border: "1px solid var(--vault-accent)25" }}
                >
                  <Icon size={16} style={{ color: "var(--vault-accent)" }} />
                </div>
                <h3 className="font-semibold text-sm mb-2">{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--vault-muted)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-8 py-24" style={{ borderTop: "1px solid var(--vault-border)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--vault-accent)", letterSpacing: "0.12em" }}>Pricing</p>
            <h2 className="text-3xl font-semibold tracking-tight">Simple, transparent pricing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className="rounded-lg p-6"
                style={{
                  background: plan.accent ? "var(--vault-accent)08" : "var(--vault-raised)",
                  border: `1px solid ${plan.accent ? "var(--vault-accent)40" : "var(--vault-border)"}`,
                  boxShadow: plan.accent ? "0 0 0 1px var(--vault-accent)20, 0 8px 32px rgba(124,111,255,0.1)" : undefined,
                }}
              >
                {plan.accent && (
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full mb-3 inline-block"
                    style={{ background: "var(--vault-accent)20", color: "var(--vault-accent)", border: "1px solid var(--vault-accent)30" }}
                  >
                    Most popular
                  </span>
                )}
                <h3 className="font-semibold text-sm mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="font-mono font-bold text-2xl tabular-nums" style={{ color: plan.accent ? "var(--vault-accent)" : "var(--vault-text)" }}>
                    {plan.price === 0 ? "Free" : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="text-xs pb-0.5" style={{ color: "var(--vault-muted)" }}>{plan.period}</span>}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--vault-muted)" }}>
                      <CheckCircle size={12} style={{ color: plan.accent ? "var(--vault-accent)" : "var(--vault-gain)", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className="block text-center text-xs font-semibold py-2.5 rounded-md transition-colors"
                  style={{
                    background: plan.accent ? "var(--vault-accent)" : "var(--vault-surface)",
                    color: plan.accent ? "white" : "var(--vault-text)",
                    border: `1px solid ${plan.accent ? "transparent" : "var(--vault-border)"}`,
                  }}
                >
                  {plan.price === 0 ? "Get started free" : "Start free trial"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24" style={{ borderTop: "1px solid var(--vault-border)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Stop guessing. Start knowing.
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--vault-muted)" }}>
            Join Whatnot sellers who've turned their hobby into a managed portfolio.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm"
            style={{ background: "var(--vault-accent)", color: "white" }}
          >
            Open your vault
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8" style={{ borderTop: "1px solid var(--vault-border)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "var(--vault-accent)" }}>
              <Zap size={10} color="white" fill="white" />
            </div>
            <span className="text-xs font-semibold">CardVault AI</span>
          </div>
          <p className="text-xs" style={{ color: "var(--vault-muted)" }}>
            © 2026 CardVault AI. Not affiliated with Pokémon Company International.
          </p>
        </div>
      </footer>
    </div>
  );
}
