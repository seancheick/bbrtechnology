"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, ShieldX } from "lucide-react";
import { cn } from "@/lib/utils";

// Rebuild of the PharmaGuide score card from the pipeline README: six pillars and their maximum
// points, and the rule that a banned substance always blocks a product. The product and its
// points are an illustrative example, not a real catalog entry.

const pillars = [
  { name: "Formulation", max: 20, value: 17 },
  { name: "Dose", max: 20, value: 16 },
  { name: "Evidence", max: 20, value: 14 },
  { name: "Transparency", max: 15, value: 13 },
  { name: "Verification", max: 15, value: 12 },
  { name: "Safety & hygiene", max: 10, value: 9 },
];

const ladder = ["BLOCKED", "UNSAFE", "NOT_SCORED", "CAUTION", "POOR", "SAFE"];

export function PharmaGuidePreview() {
  const reduce = useReducedMotion();
  const [banned, setBanned] = React.useState(false);
  const total = pillars.reduce((s, p) => s + p.value, 0);

  return (
    <div className="grid gap-5 bg-[#f5f8ff] p-5 text-[#0b1b3a] sm:p-6 md:grid-cols-[1.2fr_1fr]">
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#dfe6f5]">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#5b6b8c]">Example product</p>
        <p className="font-display mt-1 text-lg font-extrabold">Magnesium glycinate, 200 mg</p>
        <div className="mt-4 flex items-end gap-3">
          <motion.span
            key={banned ? "b" : "s"}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("font-display text-5xl font-extrabold tabular", banned ? "text-[#b42318]" : "text-[#2563eb]")}
          >
            {banned ? "—" : total}
          </motion.span>
          <span className="pb-2 text-sm text-[#5b6b8c]">{banned ? "score suppressed" : "/ 100"}</span>
          <span
            className={cn(
              "mb-2 ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold",
              banned ? "bg-[#fee4e2] text-[#b42318]" : "bg-[#e0ecff] text-[#1d4ed8]"
            )}
          >
            {banned ? <ShieldX className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
            {banned ? "BLOCKED" : "SCORED"}
          </span>
        </div>
        <ul className={cn("mt-4 space-y-2.5 transition-opacity", banned && "opacity-35")}>
          {pillars.map((p, i) => (
            <li key={p.name}>
              <div className="flex justify-between text-xs">
                <span>{p.name}</span>
                <span className="tabular text-[#5b6b8c]">
                  {p.value}/{p.max}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#e8eefb]">
                <motion.div
                  className="h-full rounded-full bg-[#2563eb]"
                  initial={reduce ? false : { width: 0 }}
                  whileInView={{ width: `${(p.value / p.max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </li>
          ))}
        </ul>
        <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl bg-[#f5f8ff] p-3 text-xs">
          <input type="checkbox" checked={banned} onChange={(e) => setBanned(e.target.checked)} className="h-4 w-4 accent-[#b42318]" />
          Add a banned ingredient to this label
        </label>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#dfe6f5]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#5b6b8c]">Verdict precedence</p>
          <ol className="mt-3 flex flex-wrap items-center gap-1.5 font-[family-name:var(--font-mono)] text-[10px]">
            {ladder.map((v, i) => (
              <li key={v} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "rounded px-1.5 py-1",
                    (banned ? v === "BLOCKED" : v === "SAFE") ? "bg-[#0b1b3a] text-white" : "bg-[#eef2fb] text-[#5b6b8c]"
                  )}
                >
                  {v}
                </span>
                {i < ladder.length - 1 && <span className="text-[#9aa7c2]">&gt;</span>}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-[#5b6b8c]">No amount of quality points overrides a safety verdict.</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#dfe6f5]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#5b6b8c]">Assistant · known high-risk pair</p>
          <p className="mt-3 ml-auto w-fit rounded-2xl rounded-br-sm bg-[#2563eb] px-3 py-2 text-xs text-white">
            Can I take ginkgo with warfarin?
          </p>
          <p className="mt-2 rounded-2xl rounded-bl-sm bg-[#f5f8ff] px-3 py-2 text-xs leading-relaxed">
            This combination can increase bleeding risk. Please talk to your pharmacist or prescriber before taking them
            together.
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5 font-[family-name:var(--font-mono)] text-[10px] text-[#5b6b8c]">
            <span className="rounded bg-[#eef2fb] px-1.5 py-0.5">deterministic route</span>
            <span className="rounded bg-[#eef2fb] px-1.5 py-0.5">no model call</span>
            <span className="rounded bg-[#eef2fb] px-1.5 py-0.5">validator passed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
