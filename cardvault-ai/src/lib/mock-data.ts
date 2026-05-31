import type { Card, MarketMover, PortfolioStats, TaxSummary, AIInsight, PricePoint } from "@/types";

export const mockPortfolioStats: PortfolioStats = {
  totalValue: 84320.50,
  totalCostBasis: 61240.00,
  unrealizedGain: 23080.50,
  unrealizedGainPct: 37.69,
  realizedProfit: 18420.00,
  monthlyGrowth: 3240.80,
  monthlyGrowthPct: 4.0,
  totalCards: 847,
  totalSealedProduct: 23,
  inventoryTurnoverRate: 2.4,
};

function generatePriceHistory(base: number, days: number): PricePoint[] {
  const history: PricePoint[] = [];
  let price = base * 0.7;
  for (let i = days; i >= 0; i--) {
    price = price * (1 + (Math.random() - 0.45) * 0.05);
    const date = new Date();
    date.setDate(date.getDate() - i);
    history.push({
      date: date.toISOString().split("T")[0],
      price: Math.round(price * 100) / 100,
      source: "TCGPlayer",
    });
  }
  return history;
}

export const mockCards: Card[] = [
  {
    id: "1",
    name: "Charizard ex",
    set: "Obsidian Flames",
    setCode: "OBF",
    number: "125/197",
    rarity: "Special Illustration Rare",
    grade: "PSA 10",
    quantity: 1,
    costBasis: 280.00,
    currentValue: 520.00,
    imageUrl: "https://images.pokemontcg.io/sv3/125_hires.png",
    category: "Pokemon TCG",
    tags: ["charizard", "sv", "flagship"],
    acquiredAt: new Date("2024-08-15"),
    acquiredFrom: "TCGPlayer",
    isWatchlisted: false,
    priceHistory: generatePriceHistory(520, 90),
  },
  {
    id: "2",
    name: "Umbreon VMAX",
    set: "Evolving Skies",
    setCode: "EVS",
    number: "215/203",
    rarity: "Secret Rare",
    grade: "PSA 9",
    quantity: 2,
    costBasis: 180.00,
    currentValue: 340.00,
    imageUrl: "https://images.pokemontcg.io/swsh7/215_hires.png",
    category: "Pokemon TCG",
    tags: ["umbreon", "swsh", "alt-art"],
    acquiredAt: new Date("2024-06-20"),
    acquiredFrom: "Whatnot",
    isWatchlisted: true,
    priceHistory: generatePriceHistory(340, 90),
  },
  {
    id: "3",
    name: "Pikachu VMAX",
    set: "Vivid Voltage",
    setCode: "VIV",
    number: "044/185",
    rarity: "Ultra Rare",
    grade: "PSA 10",
    quantity: 1,
    costBasis: 95.00,
    currentValue: 210.00,
    imageUrl: "https://images.pokemontcg.io/swsh4/44_hires.png",
    category: "Pokemon TCG",
    tags: ["pikachu", "swsh"],
    acquiredAt: new Date("2024-09-01"),
    acquiredFrom: "Card Show",
    isWatchlisted: false,
    priceHistory: generatePriceHistory(210, 90),
  },
  {
    id: "4",
    name: "Rayquaza VMAX",
    set: "Evolving Skies",
    setCode: "EVS",
    number: "218/203",
    rarity: "Secret Rare",
    grade: "RAW",
    quantity: 3,
    costBasis: 45.00,
    currentValue: 120.00,
    imageUrl: "https://images.pokemontcg.io/swsh7/218_hires.png",
    category: "Pokemon TCG",
    tags: ["rayquaza", "alt-art"],
    acquiredAt: new Date("2024-11-10"),
    acquiredFrom: "Whatnot",
    isWatchlisted: true,
    priceHistory: generatePriceHistory(120, 90),
  },
  {
    id: "5",
    name: "Lugia V",
    set: "Silver Tempest",
    setCode: "SIT",
    number: "186/195",
    rarity: "Full Art",
    grade: "PSA 10",
    quantity: 1,
    costBasis: 320.00,
    currentValue: 480.00,
    imageUrl: "https://images.pokemontcg.io/swsh12/186_hires.png",
    category: "Pokemon TCG",
    tags: ["lugia", "swsh"],
    acquiredAt: new Date("2024-07-18"),
    acquiredFrom: "eBay",
    isWatchlisted: false,
    priceHistory: generatePriceHistory(480, 90),
  },
  {
    id: "6",
    name: "Gardevoir ex",
    set: "Scarlet & Violet",
    setCode: "SVI",
    number: "086/198",
    rarity: "Ultra Rare",
    grade: "RAW NM",
    quantity: 5,
    costBasis: 18.00,
    currentValue: 14.00,
    imageUrl: "https://images.pokemontcg.io/sv1/86_hires.png",
    category: "Pokemon TCG",
    tags: ["gardevoir", "sv"],
    acquiredAt: new Date("2024-10-05"),
    acquiredFrom: "Pack Pull",
    isWatchlisted: false,
    priceHistory: generatePriceHistory(14, 90),
  },
];

export const mockMarketMovers: MarketMover[] = [
  {
    cardId: "m1",
    name: "Charizard ex (SAR)",
    set: "Obsidian Flames",
    grade: "PSA 10",
    currentPrice: 520.00,
    change7d: 48.50,
    change7dPct: 10.3,
    change30d: 92.00,
    change30dPct: 21.5,
    volume: 234,
  },
  {
    cardId: "m2",
    name: "Umbreon VMAX (Alt Art)",
    set: "Evolving Skies",
    grade: "PSA 9",
    currentPrice: 340.00,
    change7d: 22.00,
    change7dPct: 6.9,
    change30d: 55.00,
    change30dPct: 19.3,
    volume: 412,
  },
  {
    cardId: "m3",
    name: "Mew VMAX",
    set: "Fusion Strike",
    grade: "PSA 10",
    currentPrice: 180.00,
    change7d: -14.00,
    change7dPct: -7.2,
    change30d: -28.00,
    change30dPct: -13.5,
    volume: 189,
  },
  {
    cardId: "m4",
    name: "Lugia V (Full Art)",
    set: "Silver Tempest",
    grade: "RAW",
    currentPrice: 95.00,
    change7d: -8.50,
    change7dPct: -8.2,
    change30d: -22.00,
    change30dPct: -18.8,
    volume: 302,
  },
  {
    cardId: "m5",
    name: "Giratina VSTAR",
    set: "Lost Origin",
    grade: "PSA 10",
    currentPrice: 290.00,
    change7d: 31.00,
    change7dPct: 12.0,
    change30d: 68.00,
    change30dPct: 30.6,
    volume: 156,
  },
];

export const mockTaxSummary: TaxSummary = {
  year: 2025,
  totalRevenue: 48620.00,
  costOfGoods: 29400.00,
  grossProfit: 19220.00,
  expenses: 3840.00,
  netIncome: 15380.00,
  shortTermGains: 12200.00,
  longTermGains: 3180.00,
  estimatedTax: 4268.00,
  quarterlyEstimates: [
    { quarter: "Q1", dueDate: "Apr 15, 2025", estimatedAmount: 1067.00, paid: true },
    { quarter: "Q2", dueDate: "Jun 17, 2025", estimatedAmount: 1067.00, paid: true },
    { quarter: "Q3", dueDate: "Sep 16, 2025", estimatedAmount: 1067.00, paid: false },
    { quarter: "Q4", dueDate: "Jan 15, 2026", estimatedAmount: 1067.00, paid: false },
  ],
};

export const mockInsights: AIInsight[] = [
  {
    id: "i1",
    type: "sell_signal",
    priority: "high",
    title: "Charizard ex PSA 10 — Strong sell window",
    body: "Up 21.5% in 30 days. Current price $520 is within 8% of the 52-week high. Similar spikes in OBF Charizard have historically corrected 15–20% within 6 weeks. Consider taking partial profits.",
    cardIds: ["1"],
    value: 520,
    createdAt: new Date(),
  },
  {
    id: "i2",
    type: "idle_inventory",
    priority: "medium",
    title: "6 cards sitting 180+ days — $1,240 tied up",
    body: "These cards have been in your inventory over 180 days with no price appreciation. Consider liquidating at current market or bundling for a Whatnot break.",
    value: 1240,
    createdAt: new Date(),
  },
  {
    id: "i3",
    type: "tax_alert",
    priority: "high",
    title: "Q3 estimated tax due Sep 16 — $1,067",
    body: "Your Q3 estimated payment is due in 17 days. Based on YTD sales of $48,620, your total annual liability is projected at $4,268. You've paid $2,134 so far.",
    value: 1067,
    createdAt: new Date(),
  },
  {
    id: "i4",
    type: "trend_alert",
    priority: "medium",
    title: "Evolving Skies Alt Arts up 19% this month",
    body: "EVS Alt Art cards are trending up across all grades. You hold 3 copies of Umbreon VMAX Alt Art — current estimated value $340 each, up from $285 last month.",
    cardIds: ["2"],
    createdAt: new Date(),
  },
];

export const mockPortfolioHistory = Array.from({ length: 90 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (89 - i));
  const base = 61000;
  const growth = i * 260 + Math.sin(i * 0.3) * 2000 + Math.random() * 1200;
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: Math.round((base + growth) * 100) / 100,
    costBasis: Math.round((61000 + i * 20) * 100) / 100,
  };
});

export const mockSetAllocation = [
  { name: "Evolving Skies", value: 28400, pct: 33.7 },
  { name: "Obsidian Flames", value: 18200, pct: 21.6 },
  { name: "Silver Tempest", value: 12600, pct: 14.9 },
  { name: "Fusion Strike", value: 9800, pct: 11.6 },
  { name: "Scarlet & Violet", value: 7400, pct: 8.8 },
  { name: "Other", value: 7920, pct: 9.4 },
];
