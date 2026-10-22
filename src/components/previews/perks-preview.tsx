"use client";

import * as React from "react";
import { ArrowRight, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Rebuild of the Perk Graph idea from the perksledger README: card → membership → subscription
// chains and subscriptions your plans already cover. Plans and prices here are generic examples.

const subscriptions = [
  { id: "stream", name: "Streaming service", price: 96, coveredBy: "Membership you get through your card" },
  { id: "delivery", name: "Grocery delivery membership", price: 98, coveredBy: "Premium card credit" },
  { id: "music", name: "Music app", price: 132, coveredBy: null },
];

export function PerksPreview() {
  const [paying, setPaying] = React.useState<string[]>(["stream", "delivery"]);
  const overlap = subscriptions.filter((s) => paying.includes(s.id) && s.coveredBy).reduce((n, s) => n + s.price, 0);

  return (
    <div className="grid gap-5 bg-[#f1f6f3] p-5 text-[#0e2a1f] sm:p-6 md:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#136147]">What you pay for</p>
        <ul className="mt-3 space-y-2">
          {subscriptions.map((s) => (
            <li key={s.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-white p-3 text-xs shadow-sm">
                <input
                  type="checkbox"
                  checked={paying.includes(s.id)}
                  onChange={(e) =>
                    setPaying((p) => (e.target.checked ? [...p, s.id] : p.filter((x) => x !== s.id)))
                  }
                  className="h-4 w-4 accent-[#136147]"
                />
                <span className="flex-1">{s.name}</span>
                <span className="tabular text-[#4b6b5e]">${s.price}/yr</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#d5e6dd]">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#136147]">Perk Graph</p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
          <span className="rounded-lg bg-[#136147] px-2 py-1 text-white">Premium card</span>
          <ArrowRight className="h-3 w-3 text-[#4b6b5e]" />
          <span className="rounded-lg bg-[#e3f0e9] px-2 py-1">Membership credit</span>
          <ArrowRight className="h-3 w-3 text-[#4b6b5e]" />
          <span className="rounded-lg bg-[#e3f0e9] px-2 py-1">Includes streaming</span>
        </div>
        <ul className="mt-4 space-y-2">
          {subscriptions
            .filter((s) => paying.includes(s.id))
            .map((s) => (
              <li
                key={s.id}
                className={cn("flex items-start gap-2 rounded-xl p-3 text-xs", s.coveredBy ? "bg-[#fff6e5]" : "bg-[#f1f6f3]")}
              >
                <Link2 className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", s.coveredBy ? "text-[#b45309]" : "text-[#4b6b5e]")} />
                <span>
                  <strong>{s.name}</strong>{" "}
                  {s.coveredBy ? `is already covered: ${s.coveredBy}.` : "isn't covered by anything you hold."}
                </span>
              </li>
            ))}
        </ul>
        <p className="mt-4 border-t border-[#e3efe8] pt-3 text-sm">
          <span className="font-display text-2xl font-extrabold tabular">${overlap}</span>
          <span className="text-[#4b6b5e]"> /yr sitting in overlaps (example)</span>
        </p>
      </div>
    </div>
  );
}
