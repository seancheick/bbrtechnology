"use client";

import * as React from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/data/case-studies";
import { StatusDot } from "@/components/ui/spec-badge";
import { BrowserFrame } from "@/components/ui/device-frame";
import { TurnFlowPreview } from "@/components/previews/turnflow-preview";
import { PharmaGuidePreview } from "@/components/previews/pharmaguide-preview";
import { KeniyaPreview } from "@/components/previews/keniya-preview";

// One line per product: what a visitor can try in the preview, in plain words.
const products = [
  {
    slug: "turnflow",
    label: "Operations software",
    url: "turnflow / bookability",
    does: "Finds calendar problems that block bookings, proposes the fix, and waits for the owner to approve it.",
    Component: TurnFlowPreview,
  },
  {
    slug: "pharmaguide",
    label: "Data & mobile product",
    url: "pharmaguide / product score",
    does: "Scores a product on six pillars, and a safety rule overrides the points when it has to.",
    Component: PharmaGuidePreview,
  },
  {
    slug: "keniya",
    label: "E-commerce store",
    url: "keniya / boxes",
    does: "Pick a box, send it as a gift, and the sale stays locked until a reviewer approves the lineup.",
    Component: KeniyaPreview,
  },
].map((p) => ({ ...p, study: caseStudies.find((c) => c.slug === p.slug)! }));

const ROTATE_MS = 7000;

// The hero's product stage: real screens we built, rebuilt with sample data. It rotates on its
// own until the visitor touches it or presses pause, and never rotates under reduced motion.
export function ProductShowcase({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [hovered, setHovered] = React.useState(false);
  const auto = playing && !hovered && !reduce;

  React.useEffect(() => {
    if (!auto) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % products.length), ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [auto, active]);

  const current = products[active];

  return (
    <div
      className={cn("relative", className)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={() => setPlaying(false)}
      onFocusCapture={() => setPlaying(false)}
    >
      <div className="flex items-center gap-2">
        <div role="tablist" aria-label="Products we've built" className="-mx-4 flex flex-1 gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {products.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              id={`showcase-tab-${p.slug}`}
              aria-selected={i === active}
              aria-controls={`showcase-panel-${p.slug}`}
              onClick={() => setActive(i)}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-full border px-4 py-2 text-left text-sm transition-colors",
                i === active
                  ? "border-navy-900 bg-navy-900 text-white dark:border-gold-400 dark:bg-gold-400 dark:text-navy-950"
                  : "border-border bg-bg-elevated text-foreground-muted hover:border-foreground/30 hover:text-foreground"
              )}
            >
              <span className="font-semibold">{p.study.name}</span>
              <span className="ml-1.5 hidden opacity-70 sm:inline">· {p.label}</span>
              {i === active && auto && (
                <span
                  key={active}
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[showcase-progress_linear_forwards] bg-gold-400 dark:bg-navy-950"
                  style={{ animationDuration: `${ROTATE_MS}ms` }}
                />
              )}
            </button>
          ))}
        </div>
        {!reduce && (
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            aria-label={playing ? "Pause the product rotation" : "Play the product rotation"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-bg-elevated text-foreground-muted transition-colors hover:text-foreground"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>

      {/* every screen sits in the same grid cell, so the stage keeps the tallest height and never jumps;
          phones see the top of each screen, faded, with the full one a tap away */}
      <div className="relative mt-4 grid max-h-[540px] overflow-hidden rounded-2xl sm:max-h-none sm:overflow-visible">
        {products.map((p, i) => (
          <div
            key={p.slug}
            role="tabpanel"
            id={`showcase-panel-${p.slug}`}
            aria-labelledby={`showcase-tab-${p.slug}`}
            inert={i !== active}
            className={cn(
              "[grid-area:1/1] transition-[opacity,transform] duration-500 motion-reduce:transition-none",
              i === active ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
            )}
          >
            <BrowserFrame url={p.url} label="Interactive preview · sample data">
              <p.Component />
            </BrowserFrame>
          </div>
        ))}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent sm:hidden"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-pretty text-sm text-foreground-muted" aria-live="polite">
          <span className="font-semibold text-foreground">{current.study.card.type}.</span> {current.does}
        </p>
        <div className="flex shrink-0 items-center gap-4">
          <StatusDot status={current.study.status} className="text-foreground-subtle" />
          <Link
            href={`/work/${current.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:underline dark:text-gold-400"
          >
            Case study <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
