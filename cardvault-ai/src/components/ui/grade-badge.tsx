"use client";

import type { Grade } from "@/types";
import { getGradeColor, getGradeShort } from "@/lib/utils";

interface GradeBadgeProps {
  grade: Grade;
  size?: "sm" | "md";
}

export function GradeBadge({ grade, size = "md" }: GradeBadgeProps) {
  const color = getGradeColor(grade);
  const label = getGradeShort(grade);

  return (
    <span
      className="inline-flex items-center font-mono font-semibold rounded-full tabular-nums"
      style={{
        color,
        background: `${color}18`,
        border: `1px solid ${color}40`,
        fontSize: size === "sm" ? "10px" : "11px",
        padding: size === "sm" ? "1px 6px" : "2px 8px",
        letterSpacing: "0.02em",
      }}
    >
      {label}
    </span>
  );
}
