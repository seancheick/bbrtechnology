import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredCaseStudies } from "@/data/case-studies";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecBadge, StatusDot } from "@/components/ui/spec-badge";
import { ProductPreview } from "@/components/previews";
import { cn } from "@/lib/utils";

export function FeaturedWork() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div className="grid-backdrop pointer-events-none absolute inset-0 text-white" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="03"
            eyebrow="Selected work"
            tone="inverse"
            title="Proof you can click."
            lede="Products we designed, built and operate. Every preview below is interactive, rebuilt from the real screen with sample data."
          />
          <Link
            href="/work"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-400/80"
          >
            All work <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 space-y-24 sm:space-y-32">
          {featuredCaseStudies.map((c, i) => (
            <article key={c.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2")}>
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                  <span className="eyebrow text-gold-400">{c.kicker}</span>
                  <StatusDot status={c.status} className="text-white/70" />
                </div>
                <h3 className="font-display mt-4 text-4xl font-extrabold leading-[1.02] sm:text-5xl">{c.name}</h3>
                <p className="mt-3 text-xl text-white/85">{c.headline}</p>
                <p className="mt-4 leading-relaxed text-navy-400">{c.summary}</p>
                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
                  {c.facts.slice(0, 4).map((f) => (
                    <div key={f.label} className="border-t border-white/10 pt-3">
                      <dt className="sr-only">{f.label}</dt>
                      <dd className="font-display text-3xl font-extrabold tabular text-white">{f.value}</dd>
                      <dd className="mt-1 text-xs leading-snug text-navy-400">{f.label}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  {c.stack.slice(0, 5).map((s) => (
                    <SpecBadge key={s} label={s} tone="inverse" />
                  ))}
                </div>
                <Link
                  href={`/work/${c.slug}`}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-400/80"
                >
                  Read the case study <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-1")}>
                <ProductPreview preview={c.preview} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
