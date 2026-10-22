"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CalendarClock, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import {
  addOns,
  encodeBrief,
  estimate,
  estimatorOffers,
  formatUsd,
  getOffer,
  type OfferId,
  type Tier,
} from "@/data/services";

const tierLabels: Record<Tier, string> = { focused: "Focused", standard: "Standard", advanced: "Advanced" };

export function ProjectEstimator() {
  const [offerId, setOfferId] = React.useState<OfferId>("automation-sprint");
  const [tier, setTier] = React.useState<Tier>("standard");
  const [extras, setExtras] = React.useState<string[]>([]);
  const touched = React.useRef(false);

  const available = addOns.filter((a) => a.appliesTo.includes(offerId));
  const activeExtras = extras.filter((id) => available.some((a) => a.id === id));
  const est = estimate(offerId, tier, activeExtras);
  const offer = getOffer(offerId);
  const brief = encodeBrief(offerId, tier, activeExtras);

  const interact = () => {
    if (!touched.current) {
      touched.current = true;
      track("estimator_used", { offer: offerId });
    }
  };

  return (
    <div className="grid overflow-hidden rounded-3xl border border-border bg-bg-elevated lg:grid-cols-[1.25fr_0.75fr]">
      <div className="space-y-6 p-5 sm:space-y-8 sm:p-8">
        <fieldset>
          <legend className="eyebrow text-foreground-subtle">1 · What are you building?</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-3">
            {estimatorOffers.map((id) => {
              const o = getOffer(id);
              const active = id === offerId;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    interact();
                    setOfferId(id);
                  }}
                  className={cn(
                    "rounded-2xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 sm:p-4",
                    active ? "border-amber-600 bg-amber-600/5" : "border-border hover:border-foreground/25"
                  )}
                >
                  <span className="block text-sm font-semibold text-foreground">{o.name}</span>
                  <span className="mt-1 block text-xs text-foreground-subtle">from {formatUsd(o.from)}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow text-foreground-subtle">2 · How big is it?</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(Object.keys(tierLabels) as Tier[]).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={t === tier}
                onClick={() => {
                  interact();
                  setTier(t);
                }}
                className={cn(
                  "rounded-2xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 sm:p-4",
                  t === tier ? "border-amber-600 bg-amber-600/5" : "border-border hover:border-foreground/25"
                )}
              >
                <span className="block text-sm font-semibold text-foreground">{tierLabels[t]}</span>
                <span className="mt-1 hidden text-xs leading-snug text-foreground-subtle sm:block">{offer.tiers[t].example}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {available.length > 0 && (
          <fieldset>
            <legend className="eyebrow text-foreground-subtle">3 · Anything extra?</legend>
            <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
              {available.map((a) => {
                const on = activeExtras.includes(a.id);
                return (
                  <label
                    key={a.id}
                    className={cn(
                      "flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-amber-600",
                      on ? "border-amber-600 bg-amber-600/5 text-foreground" : "border-border text-foreground-muted"
                    )}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      onChange={(e) => {
                        interact();
                        setExtras((x) => (e.target.checked ? [...x, a.id] : x.filter((id) => id !== a.id)));
                      }}
                    />
                    {a.label} <span className="tabular text-foreground-subtle">+{formatUsd(a.price)}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}
      </div>

      <div className="flex flex-col bg-navy-950 p-5 text-white sm:p-8" aria-live="polite">
        <p className="eyebrow text-gold-400">Indicative budget</p>
        <p className="font-display mt-4 text-4xl font-extrabold tabular sm:text-5xl">
          {est.low === est.high ? formatUsd(est.low) : `${formatUsd(est.low)}–${formatUsd(est.high)}`}
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm text-navy-400">
          <CalendarClock className="h-4 w-4" /> {est.weeks}
        </p>
        <div className="mt-6 border-t border-white/10 pt-5 text-sm text-white/80">
          <p className="font-semibold text-white">{offer.name}</p>
          <p className="mt-1 text-navy-400">{est.example}</p>
          {est.extras.length > 0 && (
            <ul className="mt-3 space-y-1 text-navy-400">
              {est.extras.map((x) => (
                <li key={x.id}>+ {x.label}</li>
              ))}
            </ul>
          )}
        </div>
        <p className="mt-6 flex gap-2 rounded-xl bg-white/5 p-3 text-xs leading-relaxed text-navy-400">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Indicative, not a quote. Your fixed price comes within two business days of a short call.
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-6">
          <Link
            href={`/contact?${brief}#book`}
            onClick={() => track("estimate_sent", { offer: offerId, tier, target: "book" })}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold-400 text-sm font-semibold text-navy-950 hover:bg-gold-400/90"
          >
            Book a call with this brief <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/contact?${brief}#message`}
            onClick={() => track("estimate_sent", { offer: offerId, tier, target: "form" })}
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 text-sm font-semibold text-white hover:bg-white/5"
          >
            Send it as a message
          </Link>
        </div>
      </div>
    </div>
  );
}
