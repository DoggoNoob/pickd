"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Scan, Upload, Sparkles, CheckCircle, AlertCircle, Camera } from "lucide-react";
import { GradeBadge } from "@/components/ui/grade-badge";
import { formatCurrency } from "@/lib/utils";

const mockScanResults = [
  {
    id: "s1",
    name: "Charizard VSTAR",
    set: "Brilliant Stars",
    number: "018/172",
    confidence: 97,
    estGrade: "PSA 9" as const,
    gradeConfidence: 89,
    estValue: 185.00,
    isGradeCandidate: true,
    action: "Grade",
  },
  {
    id: "s2",
    name: "Arceus VSTAR",
    set: "Brilliant Stars",
    number: "123/172",
    confidence: 94,
    estGrade: "RAW NM" as const,
    gradeConfidence: 72,
    estValue: 28.00,
    isGradeCandidate: false,
    action: "Add to inventory",
  },
  {
    id: "s3",
    name: "Galarian Articuno V",
    set: "Chilling Reign",
    number: "060/198",
    confidence: 88,
    estGrade: "PSA 10" as const,
    gradeConfidence: 95,
    estValue: 42.00,
    isGradeCandidate: true,
    action: "Grade",
  },
];

export default function ScanPage() {
  const [stage, setStage] = useState<"upload" | "processing" | "review">("upload");

  return (
    <AppShell title="AI Scanner" subtitle="Upload photos · Auto-detect · Build inventory">
      {stage === "upload" && (
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-xl p-12 text-center mb-4 cursor-pointer transition-colors"
            style={{ background: "var(--vault-raised)", border: "2px dashed var(--vault-border)" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--vault-accent)60")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--vault-border)")}
            onClick={() => { setStage("processing"); setTimeout(() => setStage("review"), 1800); }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "var(--vault-accent)15", border: "1px solid var(--vault-accent)30" }}
            >
              <Upload size={24} style={{ color: "var(--vault-accent)" }} />
            </div>
            <h3 className="font-semibold text-base mb-2" style={{ color: "var(--vault-text)" }}>
              Drop card photos here
            </h3>
            <p className="text-sm" style={{ color: "var(--vault-muted)" }}>
              Binder pages, individual slabs, or bulk photos
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--vault-muted)", opacity: 0.7 }}>
              PNG, JPG, HEIC up to 50MB · Multiple files supported
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Camera, label: "Single Cards", sub: "Raw or slabbed" },
              { icon: Scan, label: "Binder Pages", sub: "Up to 9 cards/photo" },
              { icon: Upload, label: "Sealed Product", sub: "Booster boxes, ETBs" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="rounded-lg p-4 text-center cursor-pointer"
                style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
                onClick={() => { setStage("processing"); setTimeout(() => setStage("review"), 1800); }}
              >
                <Icon size={18} style={{ color: "var(--vault-accent)", margin: "0 auto 8px" }} />
                <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--vault-text)" }}>{label}</p>
                <p className="text-xs" style={{ color: "var(--vault-muted)" }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === "processing" && (
        <div className="max-w-md mx-auto text-center py-20">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--vault-accent)15", border: "1px solid var(--vault-accent)30" }}
          >
            <Sparkles size={24} style={{ color: "var(--vault-accent)" }} className="animate-pulse" />
          </div>
          <h3 className="font-semibold text-base mb-2" style={{ color: "var(--vault-text)" }}>Analyzing cards...</h3>
          <p className="text-sm" style={{ color: "var(--vault-muted)" }}>
            Detecting set · Identifying rarity · Estimating grade · Fetching market price
          </p>
          <div className="mt-6 h-1 rounded-full overflow-hidden mx-auto w-48" style={{ background: "var(--vault-border)" }}>
            <div className="h-full rounded-full animate-pulse" style={{ width: "60%", background: "var(--vault-accent)" }} />
          </div>
        </div>
      )}

      {stage === "review" && (
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-sm mb-0.5" style={{ color: "var(--vault-text)" }}>
                {mockScanResults.length} cards detected
              </h2>
              <p className="text-xs" style={{ color: "var(--vault-muted)" }}>
                Review and confirm before importing to inventory
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="text-xs px-3 py-1.5 rounded-md font-medium"
                style={{ background: "var(--vault-raised)", color: "var(--vault-muted)", border: "1px solid var(--vault-border)" }}
                onClick={() => setStage("upload")}
              >
                Scan more
              </button>
              <button
                className="text-xs px-3 py-1.5 rounded-md font-medium"
                style={{ background: "var(--vault-accent)", color: "white" }}
              >
                Import all ({mockScanResults.length})
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {mockScanResults.map((result) => (
              <div
                key={result.id}
                className="rounded-lg p-4 flex items-start gap-4"
                style={{ background: "var(--vault-raised)", border: "1px solid var(--vault-border)" }}
              >
                <div className="w-16 h-22 rounded-md flex-shrink-0" style={{ background: "var(--vault-border)", minHeight: 88 }} />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold" style={{ color: "var(--vault-text)" }}>{result.name}</h3>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded font-mono font-medium"
                          style={{
                            background: result.confidence >= 90 ? "var(--vault-gain)15" : "var(--vault-warn)15",
                            color: result.confidence >= 90 ? "var(--vault-gain)" : "var(--vault-warn)",
                          }}
                        >
                          {result.confidence}% match
                        </span>
                      </div>
                      <p className="text-xs mb-2" style={{ color: "var(--vault-muted)" }}>
                        {result.set} · #{result.number}
                      </p>
                    </div>
                    <p className="font-mono font-semibold text-sm tabular-nums" style={{ color: "var(--vault-accent)" }}>
                      {formatCurrency(result.estValue)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs" style={{ color: "var(--vault-muted)" }}>Est. grade:</span>
                      <GradeBadge grade={result.estGrade} size="sm" />
                      <span className="text-xs font-mono" style={{ color: "var(--vault-muted)" }}>
                        ({result.gradeConfidence}% conf.)
                      </span>
                    </div>
                    {result.isGradeCandidate && (
                      <span
                        className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: "var(--vault-accent)15", color: "var(--vault-accent)", border: "1px solid var(--vault-accent)30" }}
                      >
                        <Sparkles size={9} />
                        PSA Candidate
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    className="text-xs px-3 py-1.5 rounded-md font-medium whitespace-nowrap"
                    style={{ background: "var(--vault-accent)", color: "white" }}
                  >
                    {result.action}
                  </button>
                  <button
                    className="text-xs px-3 py-1.5 rounded-md font-medium"
                    style={{ background: "transparent", color: "var(--vault-muted)", border: "1px solid var(--vault-border)" }}
                  >
                    Skip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}
