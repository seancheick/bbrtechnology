import Link from "next/link";
import { ArrowUpRight, Bot, Globe, LayoutDashboard, Smartphone } from "lucide-react";
import { categories, categoryFrom, formatUsd, offersIn } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { HairlineFigure } from "@/components/ui/hairline-figure";

const icons = { "ai-automation": Bot, websites: Globe, "custom-software": LayoutDashboard, mobile: Smartphone } as const;

export function ServicesOverview() {
  return (
    <section className="border-y border-border bg-bg-alt py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_400px]">
          <SectionHeading
            index="02"
            eyebrow="What we build"
            title="From your first automation to your next platform."
            lede="Four kinds of work, one standard: scoped in writing, tested against real scenarios, and handed over so you're never locked in."
          />
          <HairlineFigure name="stack" className="hidden lg:block" />
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
          {categories.map((c, i) => {
            const Icon = icons[c.id];
            return (
              <Link
                key={c.id}
                href={`/services#${c.id}`}
                className="group relative flex flex-col bg-bg-elevated p-7 transition-colors hover:bg-bg sm:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-gold-400 dark:bg-white/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="tabular eyebrow text-foreground-subtle">0{i + 1}</span>
                </div>
                <h3 className="font-display mt-8 text-3xl font-extrabold text-foreground">{c.name}</h3>
                <p className="mt-3 max-w-md text-foreground-muted">{c.pitch}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {offersIn(c.id).map((o) => (
                    <li key={o.id} className="rounded-full bg-bg-alt px-3 py-1 text-xs text-foreground-muted">
                      {o.name} · from {formatUsd(o.from)}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between pt-8">
                  <p className="text-sm text-foreground">
                    From <span className="font-display text-2xl font-extrabold tabular">{formatUsd(categoryFrom(c.id))}</span>
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 dark:text-gold-400">
                    See packages
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
