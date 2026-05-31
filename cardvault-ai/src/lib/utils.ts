import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Grade } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, compact = false): string {
  if (compact && Math.abs(value) >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPct(value: number, showSign = true): string {
  const sign = showSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function getGradeColor(grade: Grade): string {
  if (grade === "PSA 10" || grade === "BGS 10") return "var(--vault-gain)";
  if (grade === "PSA 9" || grade === "BGS 9.5" || grade === "BGS 9") return "var(--vault-accent)";
  if (grade === "PSA 8") return "var(--vault-warn)";
  if (grade === "PSA 7" || grade === "PSA 6") return "var(--vault-muted)";
  return "#3A3A4A";
}

export function getGradeShort(grade: Grade): string {
  return grade.replace("PSA ", "P").replace("BGS ", "B").replace("RAW NM", "NM").replace("RAW LP", "LP");
}

export function getPLColor(value: number): string {
  if (value > 0) return "var(--vault-gain)";
  if (value < 0) return "var(--vault-loss)";
  return "var(--vault-muted)";
}

export function calculateROI(costBasis: number, currentValue: number): number {
  if (costBasis === 0) return 0;
  return ((currentValue - costBasis) / costBasis) * 100;
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
