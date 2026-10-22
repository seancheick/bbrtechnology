"use client";

import * as React from "react";
import { Bell, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { keniyaFonts } from "@/components/previews/fonts";

// Rebuild of Keniya's box picker and purchase panel, in its "Wrapped & Sealed" theme (cream
// paper, charcoal type, one tissue colorway per box, Bricolage Grotesque + Figtree). Boxes and
// colorways from src/lib/box.ts, the $47 one-time price from src/lib/site.ts, and the rule that a
// box opens for orders only when its lineup is clinician-approved from PRODUCT.md.

const k = {
  cream: "#fff8ef",
  creamDeep: "#fbeedc",
  card: "#fffdf9",
  line: "#ebdfcd",
  ink: "#252525",
  inkSoft: "#5b554d",
  coral: "#ff796c",
  butter: "#ffe38a",
};

const boxes = [
  { id: "pregnancy", name: "Pregnancy Comfort", tissue: "#c5b3ee", ink: "#3b2a6b", rule: "Keniya Pregnancy Screening on every snack." },
  { id: "blood", name: "Blood Sugar", tissue: "#a9d4f5", ink: "#123a5c", rule: "≤15 g total carbs and ≤3 g added sugar per pack." },
  { id: "heart", name: "Heart Wellness", tissue: "#ff796c", ink: "#5a150d", rule: "Its own heart-conscious screening standard." },
  { id: "gdm", name: "Gestational Diabetes", tissue: "#b7e5cc", ink: "#14503a", rule: "Full Pregnancy screen plus the Blood Sugar standard." },
  { id: "glp1", name: "GLP-1 Companion", tissue: "#ffe38a", ink: "#5c4300", rule: "Its own written GLP-1 screening standard." },
  { id: "postpartum", name: "Postpartum & Nursing", tissue: "#f7b8cc", ink: "#6b1e3e", rule: "Its own postpartum screening standard." },
];

const display = "font-[family-name:var(--font-kn-display)] font-extrabold tracking-tight";

export function KeniyaPreview() {
  const [active, setActive] = React.useState("blood");
  const [approved, setApproved] = React.useState(true);
  const [gift, setGift] = React.useState(false);
  const box = boxes.find((b) => b.id === active)!;

  return (
    <div
      className={cn(keniyaFonts, "grid gap-5 p-5 font-[family-name:var(--font-kn-sans)] sm:p-6 md:grid-cols-[1fr_1.1fr]")}
      style={{ background: k.cream, color: k.ink }}
    >
      <div>
        <p className={cn(display, "text-2xl leading-none")}>Pick a box.</p>
        <p className="mt-1 text-xs" style={{ color: k.inkSoft }}>
          Every snack screened against the box&apos;s own written rules.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {boxes.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setActive(b.id)}
              aria-pressed={active === b.id}
              className={cn(
                "flex items-center gap-2 rounded-xl border-2 px-2.5 py-2 text-left text-xs font-semibold transition-colors",
                active === b.id ? "shadow-[3px_3px_0_#252525]" : "border-transparent hover:bg-white/60"
              )}
              style={active === b.id ? { borderColor: k.ink, background: k.card } : { background: k.creamDeep }}
            >
              <span className="h-5 w-5 shrink-0 rounded-[3px]" style={{ background: b.tissue }} aria-hidden />
              {b.name}
            </button>
          ))}
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl p-3 text-xs" style={{ background: k.creamDeep }}>
          <input type="checkbox" checked={approved} onChange={(e) => setApproved(e.target.checked)} className="h-4 w-4" style={{ accentColor: k.ink }} />
          Lineup approved by the clinical reviewer
        </label>
      </div>

      <div className="rounded-2xl border p-5" style={{ background: k.card, borderColor: k.line }}>
        <div className="relative overflow-hidden rounded-xl px-4 py-5" style={{ background: box.tissue, color: box.ink }}>
          <p className={cn(display, "text-[1.65rem] leading-[0.95]")}>{box.name} Box</p>
          <p className="mt-1 text-xs font-medium">14 snack selections · free US shipping</p>
          <span
            className={cn(display, "absolute right-3 top-3 grid h-14 w-14 rotate-12 place-items-center rounded-full text-lg")}
            style={{ background: k.butter, color: k.ink }}
          >
            $47
          </span>
        </div>
        <p className="mt-3 flex gap-2 rounded-[4px] px-3 py-2.5 text-xs" style={{ background: k.creamDeep }}>
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#1e6b4b" }} strokeWidth={3} /> {box.rule}
        </p>
        <div role="radiogroup" aria-label="Who is it for?" className="mt-4 grid grid-cols-2 gap-1 rounded-full border-2 p-1" style={{ borderColor: k.ink }}>
          {[
            { value: false, label: "For me" },
            { value: true, label: "It's a gift" },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              role="radio"
              aria-checked={gift === opt.value}
              onClick={() => setGift(opt.value)}
              className="h-8 rounded-full text-xs font-semibold transition-colors"
              style={gift === opt.value ? { background: k.ink, color: k.cream } : { color: k.inkSoft }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {approved ? (
          <span className="mt-4 flex h-11 items-center justify-center rounded-full text-sm font-semibold" style={{ background: k.ink, color: k.cream }}>
            {gift ? `Send the ${box.name} box, $47` : `Order the ${box.name} box, $47`}
          </span>
        ) : (
          <span className="mt-4 flex h-11 items-center justify-center gap-2 rounded-full border-2 text-sm font-semibold" style={{ borderColor: k.ink }}>
            <Bell className="h-4 w-4" /> Notify me
          </span>
        )}
        <p className="mt-3 text-center text-[11px] font-semibold">
          {approved
            ? gift
              ? "A printed note goes in the box. Gifts are always one-time."
              : "No subscription. No surprise renewal."
            : "The gate holds: no approved lineup, so the box can't be sold."}
        </p>
      </div>
    </div>
  );
}
