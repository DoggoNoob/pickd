export type Grade = "PSA 10" | "PSA 9" | "PSA 8" | "PSA 7" | "PSA 6" | "BGS 10" | "BGS 9.5" | "BGS 9" | "RAW" | "RAW NM" | "RAW LP";

export type Platform = "Whatnot" | "eBay" | "TCGPlayer" | "Local" | "Card Show" | "Trade" | "Pack Pull" | "Other";

export type CardRarity = "Common" | "Uncommon" | "Rare" | "Holo Rare" | "Ultra Rare" | "Secret Rare" | "Full Art" | "Rainbow Rare" | "Gold Rare" | "Special Illustration Rare";

export type CollectibleCategory = "Pokemon TCG" | "Sports Cards" | "One Piece TCG" | "Magic: The Gathering" | "Yu-Gi-Oh!" | "Funko Pop" | "Sealed" | "Comic" | "Video Game";

export interface Card {
  id: string;
  name: string;
  set: string;
  setCode: string;
  number: string;
  rarity: CardRarity;
  grade: Grade;
  quantity: number;
  costBasis: number;
  currentValue: number;
  imageUrl?: string;
  category: CollectibleCategory;
  tags: string[];
  acquiredAt: Date;
  acquiredFrom: Platform;
  notes?: string;
  isWatchlisted: boolean;
  priceHistory: PricePoint[];
}

export interface PricePoint {
  date: string;
  price: number;
  source: "TCGPlayer" | "eBay" | "PriceCharting" | "Whatnot";
  volume?: number;
}

export interface Transaction {
  id: string;
  cardId: string;
  type: "buy" | "sell";
  date: Date;
  platform: Platform;
  price: number;
  fees: number;
  shipping: number;
  quantity: number;
  notes?: string;
}

export interface PortfolioStats {
  totalValue: number;
  totalCostBasis: number;
  unrealizedGain: number;
  unrealizedGainPct: number;
  realizedProfit: number;
  monthlyGrowth: number;
  monthlyGrowthPct: number;
  totalCards: number;
  totalSealedProduct: number;
  inventoryTurnoverRate: number;
}

export interface MarketMover {
  cardId: string;
  name: string;
  set: string;
  grade: Grade;
  currentPrice: number;
  change7d: number;
  change7dPct: number;
  change30d: number;
  change30dPct: number;
  volume: number;
  imageUrl?: string;
}

export interface TaxSummary {
  year: number;
  totalRevenue: number;
  costOfGoods: number;
  grossProfit: number;
  expenses: number;
  netIncome: number;
  shortTermGains: number;
  longTermGains: number;
  estimatedTax: number;
  quarterlyEstimates: QuarterlyEstimate[];
}

export interface QuarterlyEstimate {
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  dueDate: string;
  estimatedAmount: number;
  paid: boolean;
}

export interface AIInsight {
  id: string;
  type: "sell_signal" | "hold_signal" | "tax_alert" | "trend_alert" | "idle_inventory";
  priority: "high" | "medium" | "low";
  title: string;
  body: string;
  cardIds?: string[];
  value?: number;
  createdAt: Date;
}
