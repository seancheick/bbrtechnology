import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, clientWork } from "@/data/case-studies";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecBadge, StatusDot } from "@/components/ui/spec-badge";
import { HairlineFigure } from "@/components/ui/hairline-figure";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects B&Br Technology has delivered: operations platforms, health-tech apps, field workforce software, e-commerce stores, web apps and AI tooling.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="grid-backdrop pointer-events-none absolute inset-0 text-navy-900 dark:text-white" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="Work"
            title={
              <>
                Projects we&apos;ve <span className="text-amber-600 dark:text-gold-400">delivered.</span>
              </>
            }
            lede="Operations platforms, health-tech apps, field software, online stores and AI tooling. Each project page shows the problem, what we built, and an interactive preview of the real screen."
          />
          <HairlineFigure name="devices" className="hidden lg:block" />
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {caseStudies.map((c, i) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-bg-elevated p-7 transition-colors hover:border-foreground/25 sm:p-9 ${i < 2 ? "md:min-h-[420px]" : ""}`}
            >
              <span
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-35"
                style={{ background: c.accent }}
                aria-hidden
              />
              <div className="relative flex flex-wrap items-center gap-3">
                <span className="eyebrow text-amber-600">{c.card.type}</span>
                <span className="text-xs text-foreground-subtle">{c.card.industry}</span>
              </div>
              <h2 className="font-display relative mt-6 text-4xl font-extrabold text-foreground sm:text-5xl">{c.name}</h2>
              <p className="relative mt-3 max-w-lg text-lg text-foreground-muted">{c.card.outcome}</p>
              <dl className="relative mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {c.facts.slice(0, 4).map((f) => (
                  <div key={f.label}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd className="font-display text-2xl font-extrabold tabular text-foreground">{f.value}</dd>
                    <dd className="text-xs leading-snug text-foreground-subtle">{f.label}</dd>
                  </div>
                ))}
              </dl>
              <div className="relative mt-auto flex items-center justify-between pt-10">
                <StatusDot status={c.status} className="text-foreground-muted" />
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                  Case study
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="clients" className="scroll-mt-20 border-t border-border bg-bg-alt py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Client engagements"
            title="Work we've done for others."
            lede="Client names and repositories stay private. These are the kinds of systems we've delivered."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {clientWork.map((w) => (
              <article key={w.title} className="rounded-3xl border border-border bg-bg-elevated p-7">
                <p className="eyebrow text-amber-600">{w.sector}</p>
                <h3 className="font-display mt-3 text-2xl font-extrabold text-foreground">{w.title}</h3>
                <p className="mt-3 text-foreground-muted">{w.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {w.stack.map((s) => (
                    <SpecBadge key={s} label={s} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
