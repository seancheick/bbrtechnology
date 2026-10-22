"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldX } from "lucide-react";
import { cn } from "@/lib/utils";
import { pharmaGuideFonts } from "@/components/previews/fonts";

// Rebuild of the PharmaGuide app's product screen, in its v2 theme (warm surfaces, deep
// clinical teal, muted severity tiers, Geist / Geist Mono / Newsreader). Pillars and maximums
// come from lib/core/scoring/v4_pillars.dart, the tier ladder from score_tier.dart, and the
// rule that a banned substance always blocks a product from the pipeline README. The product
// and its points are an illustrative example, not a real catalog entry.

const c = {
  bg: "#FAF9F6",
  surface: "#FFFFFF",
  fg: "#181A1B",
  muted: "#5C5F61",
  subtle: "#686B6E",
  line: "rgba(24,26,27,0.06)",
  container: "#F4F1EA",
  accent: "#183B3F",
  accentStrong: "#246066",
  accentTint: "rgba(24,59,63,0.1)",
  contraindicated: "#9F2929",
  contraindicatedTint: "rgba(159,41,41,0.1)",
  safe: "#3F6250",
};

const pillars = [
  { name: "Formulation", max: 20, value: 17 },
  { name: "Dose", max: 20, value: 16 },
  { name: "Evidence", max: 20, value: 14 },
  { name: "Transparency", max: 15, value: 13 },
  { name: "Verification", max: 15, value: 12 },
  { name: "Safety & hygiene", max: 10, value: 9 },
];

const ladder = ["BLOCKED", "UNSAFE", "NOT_SCORED", "CAUTION", "POOR", "SAFE"];

// score_tier.dart bands
function tier(score: number) {
  if (score >= 95) return "Exceptional";
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very good";
  if (score >= 70) return "Good";
  if (score >= 55) return "Needs improvement";
  return "Poor";
}

const mono = "font-[family-name:var(--font-pg-mono)] text-[10px] uppercase tracking-[0.08em]";

export function PharmaGuidePreview() {
  const reduce = useReducedMotion();
  const [banned, setBanned] = React.useState(false);
  const total = pillars.reduce((s, p) => s + p.value, 0);

  return (
    <div
      className={cn(
        pharmaGuideFonts,
        "grid items-start gap-5 p-5 font-[family-name:var(--font-pg-sans)] font-normal sm:p-6 md:grid-cols-[auto_1fr]"
      )}
      style={{ background: c.container, color: c.fg }}
    >
      {/* the app screen, in a phone */}
      <div className="mx-auto w-[272px] rounded-[2.2rem] bg-[#0E1011] p-2 shadow-[0_24px_60px_-28px_rgba(14,16,17,0.55)]">
        <div className="overflow-hidden rounded-[1.75rem]" style={{ background: c.bg }}>
          <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[11px] font-medium">
            <span>9:41</span>
            <span className="h-4 w-16 rounded-full bg-[#0E1011]" aria-hidden />
            <span className={mono} style={{ color: c.subtle }}>
              5G
            </span>
          </div>
          <div className="px-4 pb-4 pt-2">
            <div className="flex gap-3">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-[family-name:var(--font-pg-serif)] text-xl"
                style={{ background: c.container, color: c.accent }}
                aria-hidden
              >
                Mg
              </div>
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-pg-serif)] text-[18px] leading-tight">Magnesium Glycinate</p>
                <p className="mt-0.5 text-[12px]" style={{ color: c.muted }}>
                  Example brand · 120 capsules
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Third-Party Tested", "Vegan", "Gluten-Free"].map((t) => (
                <span key={t} className="rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ background: c.accentTint, color: c.accent }}>
                  {t}
                </span>
              ))}
            </div>

            {banned ? (
              <motion.div
                key="blocked"
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl p-3"
                style={{ background: c.contraindicatedTint, color: c.contraindicated }}
              >
                <p className="flex items-start gap-1.5 text-[14px] font-medium leading-snug">
                  <ShieldX className="mt-0.5 h-4 w-4 shrink-0" /> PharmaGuide does not recommend this product
                </p>
                <p className="mt-1 text-[12px] leading-snug">Contains a banned substance, so no quality score is shown.</p>
              </motion.div>
            ) : (
              <motion.div key="scored" initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <p className={mono} style={{ color: c.muted }}>
                  Product quality
                </p>
                <p className="mt-1 flex items-center gap-2 text-[22px] font-medium tabular-nums">
                  <span className="h-2 w-2 rounded-full" style={{ background: c.safe }} aria-hidden />
                  {total}/100 <span className="text-[16px]">{tier(total)}</span>
                </p>
              </motion.div>
            )}

            <div className="mt-4 rounded-xl p-3" style={{ background: c.surface, boxShadow: `0 0 0 1px ${c.line}` }}>
              <p className={mono} style={{ color: c.muted }}>
                Score breakdown
              </p>
              <ul className={cn("mt-2 space-y-2 transition-opacity", banned && "opacity-30")}>
                {pillars.map((p, i) => (
                  <li key={p.name}>
                    <div className="flex justify-between text-[12px]">
                      <span>{p.name}</span>
                      <span className="tabular-nums" style={{ color: c.muted }}>
                        {p.value}/{p.max}
                      </span>
                    </div>
                    <div className="mt-1 h-1 overflow-hidden rounded-full" style={{ background: c.container }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: c.accentStrong }}
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${(p.value / p.max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label
          className="flex cursor-pointer items-center gap-3 rounded-xl p-3.5 text-[13px] font-medium"
          style={{ background: c.surface, boxShadow: `0 0 0 1px ${c.line}` }}
        >
          <input
            type="checkbox"
            checked={banned}
            onChange={(e) => setBanned(e.target.checked)}
            className="h-4 w-4"
            style={{ accentColor: c.contraindicated }}
          />
          Try it: add a banned ingredient to this label
        </label>
        <div className="rounded-xl p-4" style={{ background: c.surface, boxShadow: `0 0 0 1px ${c.line}` }}>
          <p className={mono} style={{ color: c.muted }}>
            Verdict precedence
          </p>
          <ol className={cn("mt-3 flex flex-wrap items-center gap-1.5", mono, "normal-case tracking-normal")}>
            {ladder.map((v, i) => {
              const on = banned ? v === "BLOCKED" : v === "SAFE";
              return (
                <li key={v} className="flex items-center gap-1.5">
                  <span
                    className="rounded-full px-2 py-1"
                    style={
                      on
                        ? { background: banned ? c.contraindicated : c.accent, color: "#fff" }
                        : { background: c.container, color: c.muted }
                    }
                  >
                    {v}
                  </span>
                  {i < ladder.length - 1 && <span style={{ color: c.subtle }}>&gt;</span>}
                </li>
              );
            })}
          </ol>
          <p className="mt-3 text-[13px]" style={{ color: c.muted }}>
            No amount of quality points overrides a safety verdict.
          </p>
        </div>
        <div className="rounded-xl p-4" style={{ background: c.surface, boxShadow: `0 0 0 1px ${c.line}` }}>
          <p className={mono} style={{ color: c.muted }}>
            Assistant · known high-risk pair
          </p>
          <p className="ml-auto mt-3 w-fit rounded-2xl rounded-br-sm px-3 py-2 text-[13px] text-white" style={{ background: c.accent }}>
            Can I take ginkgo with warfarin?
          </p>
          <p className="mt-2 rounded-2xl rounded-bl-sm px-3 py-2 text-[13px] leading-relaxed" style={{ background: c.container }}>
            This combination can increase bleeding risk. Please talk to your pharmacist or prescriber before taking them together.
          </p>
          <div className={cn("mt-2 flex flex-wrap gap-1.5", mono, "normal-case tracking-normal")} style={{ color: c.muted }}>
            {["deterministic route", "no model call", "validator passed"].map((t) => (
              <span key={t} className="rounded-full px-2 py-0.5" style={{ background: c.container }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
