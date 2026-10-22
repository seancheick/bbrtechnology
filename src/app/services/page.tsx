import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Clock, Minus } from "lucide-react";
import { carePlans, categories, formatUsd, offersIn, type Offer, type Tier } from "@/data/services";
import { getCaseStudy } from "@/data/case-studies";
import { faqItems } from "@/data/faq";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqSection } from "@/components/home/faq-section";
import { HairlineFigure } from "@/components/ui/hairline-figure";

export const metadata: Metadata = {
  title: "Services & pricing",
  description:
    "Published starting prices for automation audits, automation sprints, AI assistants, websites, internal tools, web apps and Flutter mobile apps. Fixed quotes within two business days.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="grid-backdrop pointer-events-none absolute inset-0 text-navy-900 dark:text-white" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <div>
          <SectionHeading
            as="h1"
            eyebrow="Services & pricing"
            title={
              <>
                Clear scope. <span className="text-amber-600 dark:text-gold-400">Published prices.</span>
              </>
            }
            lede={`Every package starts at a real number. Tell us about the project and you'll get a fixed quote within two business days. ${site.replyPromise}`}
          />
          <nav aria-label="Service categories" className="mt-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full border border-border bg-bg-elevated px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
              >
                {c.name}
              </a>
            ))}
            <a
              href="#care"
              className="rounded-full border border-border bg-bg-elevated px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
            >
              Care plans
            </a>
          </nav>
          </div>
          <HairlineFigure name="sorter" className="hidden lg:block" />
        </div>
      </section>

      {categories.map((c, i) => {
        const proof = getCaseStudy(c.proof);
        return (
          <section key={c.id} id={c.id} className={i % 2 === 0 ? "scroll-mt-20 border-t border-border bg-bg-alt py-20" : "scroll-mt-20 border-t border-border py-20"}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-2xl">
                  <p className="eyebrow text-amber-600">0{i + 1} · {c.short}</p>
                  <h2 className="font-display mt-3 text-4xl font-extrabold text-foreground sm:text-5xl">{c.name}</h2>
                  <p className="mt-4 text-lg text-foreground-muted">{c.pitch}</p>
                </div>
                {proof && (
                  <Link
                    href={`/work/${proof.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-amber-600"
                  >
                    Example project: {proof.card.type} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
              {offersIn(c.id).length === 1 ? (
                <TierCards offer={offersIn(c.id)[0]} />
              ) : (
                <div className={`mt-10 grid gap-5 ${offersIn(c.id).length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
                  {offersIn(c.id).map((o) => (
                    <OfferCard key={o.id} offer={o} />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      <section id="care" className="scroll-mt-20 border-t border-border bg-navy-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tone="inverse"
            eyebrow="After launch"
            title="Care plans with stated limits."
            lede="Monitoring, updates and a set number of hours each month. No open-ended retainers."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {carePlans.map((p) => (
              <div key={p.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-extrabold">{p.name}</h3>
                  <p>
                    <span className="font-display text-3xl font-extrabold tabular text-gold-400">{formatUsd(p.monthly)}</span>
                    <span className="text-sm text-navy-400">/month</span>
                  </p>
                </div>
                <p className="mt-2 text-navy-400">{p.summary}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.includes.map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {x}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/10 pt-4 text-xs text-navy-400">{p.limits}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-foreground">Not sure which package fits?</h2>
            <p className="mt-2 text-foreground-muted">Use the estimator for a ballpark, or tell us the problem and we&apos;ll recommend one.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#estimate"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-foreground hover:border-foreground/30"
            >
              Open the estimator
            </Link>
            <Link
              href="/contact#book"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-navy-900 px-6 text-sm font-semibold text-gold-400 hover:bg-navy-800 dark:bg-gold-400 dark:text-navy-950"
            >
              Book a free call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <FaqSection index="" items={faqItems.slice(0, 6)} />
    </>
  );
}

// A category with a single offer shows that offer's three sizes side by side, then
// what every size includes, so each category reads with the same weight.
function TierCards({ offer: o }: { offer: Offer }) {
  const tiers = Object.entries(o.tiers) as [Tier, Offer["tiers"][Tier]][];
  return (
    <>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {tiers.map(([key, t], i) => (
          <article key={key} className="relative flex flex-col rounded-3xl border border-border bg-bg-elevated p-7">
            {i === 0 && (
              <span className="absolute -top-3 left-7 rounded-full bg-amber-600 px-3 py-1 text-[11px] font-semibold text-white">
                Most common start
              </span>
            )}
            <h3 className="font-display text-2xl font-extrabold text-foreground">{t.name ?? o.name}</h3>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="text-sm text-foreground-subtle">From</span>
              <span className="font-display text-4xl font-extrabold tabular text-foreground">{formatUsd(t.range[0])}</span>
            </p>
            <p className="mt-1 text-xs text-foreground-subtle">
              Typical {formatUsd(t.range[0])}–{formatUsd(t.range[1])}
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-foreground-muted">
              <Clock className="h-4 w-4" /> {t.weeks}
            </p>
            <p className="mt-5 text-foreground">{t.example}</p>
            <div className="mt-auto pt-8">
              <Link
                href={`/contact?offer=${o.id}&tier=${key}#message`}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-semibold text-foreground transition-colors hover:bg-navy-900 hover:text-gold-400 dark:hover:bg-gold-400 dark:hover:text-navy-950"
              >
                Get a fixed quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-6 rounded-3xl border border-border bg-bg-elevated p-7 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow text-foreground-subtle">Every {o.name.toLowerCase()} includes</p>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {o.includes.map((x) => (
              <li key={x} className="flex gap-2.5 text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:block">
          <p className="eyebrow text-foreground-subtle">Not included</p>
          <ul className="mt-4 space-y-2 text-sm">
            {o.excludes.map((x) => (
              <li key={x} className="flex gap-2.5 text-foreground-subtle">
                <Minus className="mt-0.5 h-4 w-4 shrink-0" /> {x}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-foreground-muted">
            <span className="font-semibold text-foreground">Best for:</span> {o.bestFor}
          </p>
        </div>
      </div>
    </>
  );
}

function OfferCard({ offer: o }: { offer: Offer }) {
  return (
    <article className="relative flex flex-col rounded-3xl border border-border bg-bg-elevated p-7">
      {o.popular && (
        <span className="absolute -top-3 left-7 rounded-full bg-amber-600 px-3 py-1 text-[11px] font-semibold text-white">
          Most popular starting point
        </span>
      )}
      <h3 className="font-display text-2xl font-extrabold text-foreground">{o.name}</h3>
      <p className="mt-4 flex items-baseline gap-2">
        <span className="text-sm text-foreground-subtle">From</span>
        <span className="font-display text-4xl font-extrabold tabular text-foreground">{formatUsd(o.from)}</span>
      </p>
      <p className="mt-1 text-xs text-foreground-subtle">
        Typical {formatUsd(o.typical[0])}–{formatUsd(o.typical[1])}
      </p>
      <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-foreground-muted">
        <Clock className="h-4 w-4" /> {o.timeline}
      </p>
      <p className="mt-5 text-foreground-muted">{o.summary}</p>
      <p className="mt-4 hidden text-sm text-foreground sm:block">
        <span className="font-semibold">Best for:</span> <span className="text-foreground-muted">{o.bestFor}</span>
      </p>
      <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
        {o.includes.map((x) => (
          <li key={x} className="flex gap-2.5 text-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> {x}
          </li>
        ))}
      </ul>
      <ul className="mt-4 hidden space-y-2 text-sm sm:block">
        {o.excludes.map((x) => (
          <li key={x} className="flex gap-2.5 text-foreground-subtle">
            <Minus className="mt-0.5 h-4 w-4 shrink-0" /> {x}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <Link
          href={`/contact?offer=${o.id}#message`}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-semibold text-foreground transition-colors hover:bg-navy-900 hover:text-gold-400 dark:hover:bg-gold-400 dark:hover:text-navy-950"
        >
          Get a fixed quote <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
