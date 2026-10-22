"use client";

import * as React from "react";
import { Bell, Check, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

// Rebuild of Keniya's box picker and sale gate, from PRODUCT.md: six boxes of 14 selections,
// and a box opens for orders only when its lineup is clinician-approved.

const boxes = [
  { id: "pregnancy", name: "Pregnancy Comfort", rule: "Keniya Pregnancy Screening on every snack." },
  { id: "blood", name: "Blood Sugar", rule: "≤15 g total carbs and ≤3 g added sugar per pack." },
  { id: "heart", name: "Heart Wellness", rule: "Its own heart-conscious screening standard." },
  { id: "gdm", name: "Gestational Diabetes", rule: "Full Pregnancy screen plus the Blood Sugar standard." },
  { id: "glp1", name: "GLP-1 Companion", rule: "Its own written GLP-1 screening standard." },
  { id: "postpartum", name: "Postpartum & Nursing", rule: "Its own postpartum screening standard." },
];

export function KeniyaPreview() {
  const [active, setActive] = React.useState("blood");
  const [approved, setApproved] = React.useState(true);
  const [gift, setGift] = React.useState(false);
  const box = boxes.find((b) => b.id === active)!;

  return (
    <div className="grid gap-5 bg-[#fbf6ee] p-5 text-[#3b2a1a] sm:p-6 md:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7d5229]">Choose a box</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {boxes.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setActive(b.id)}
              aria-pressed={active === b.id}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-colors",
                active === b.id ? "border-[#b45309] bg-white shadow-sm" : "border-[#ead9c2] hover:bg-white/60"
              )}
            >
              {b.name}
            </button>
          ))}
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl bg-white/70 p-3 text-xs">
          <input type="checkbox" checked={approved} onChange={(e) => setApproved(e.target.checked)} className="h-4 w-4 accent-[#b45309]" />
          Lineup approved by the clinical reviewer
        </label>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#ead9c2]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-xl font-extrabold">{box.name}</p>
            <p className="mt-1 text-xs text-[#7a5a3a]">14 snack selections · free US shipping</p>
          </div>
          <p className="rounded-full bg-[#fbf6ee] px-2.5 py-1 text-[11px] font-semibold">One-time or monthly</p>
        </div>
        <p className="mt-4 flex gap-2 rounded-xl bg-[#fbf6ee] p-3 text-xs">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#b45309]" /> {box.rule}
        </p>
        <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs">
          <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="h-4 w-4 accent-[#b45309]" />
          <Gift className="h-3.5 w-3.5" /> It&apos;s a gift (printed note in the box)
        </label>
        {approved ? (
          <span className="mt-4 flex h-11 items-center justify-center rounded-full bg-[#3b2a1a] text-sm font-semibold text-white">
            {gift ? "Send as a gift" : "Order now"}
          </span>
        ) : (
          <span className="mt-4 flex h-11 items-center justify-center gap-2 rounded-full border border-[#3b2a1a]/30 text-sm font-semibold">
            <Bell className="h-4 w-4" /> Notify me when it opens
          </span>
        )}
        <p className="mt-3 text-[11px] text-[#7a5a3a]">
          {approved
            ? "Open for orders: lineup approved, priced and in stock."
            : "The gate holds: no approved lineup, so the box can't be sold."}
        </p>
      </div>
    </div>
  );
}
