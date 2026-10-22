import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { HeroVisual } from "@/components/home/hero-visual";
import { KineticText } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="grid-backdrop pointer-events-none absolute inset-0 text-navy-900 dark:text-white" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <p className="eyebrow flex flex-wrap items-center gap-3 text-foreground-muted">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                Taking on new projects
              </span>
              <span>Founder-led studio · Boston</span>
            </p>
            <h1 className="font-display mt-7 text-balance text-[2.9rem] font-extrabold leading-[0.95] text-foreground sm:text-7xl lg:text-[5.4rem]">
              <KineticText text="Software, AI & automation," />{" "}
              <KineticText text="built around your business." delay={0.3} className="text-amber-600 dark:text-gold-400" />
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-foreground-muted sm:text-xl">
              Websites, web and mobile apps, internal tools and AI workflows for growing teams. Real products
              shipped, published prices, and the person building it on every call.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedLink
                cta="hero_book"
                href="/contact#book"
                className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-navy-900 px-7 py-4 text-base font-semibold text-gold-400 transition-colors hover:bg-navy-800 dark:bg-gold-400 dark:text-navy-950 dark:hover:bg-gold-400/90"
              >
                Book a free 30-min call
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </TrackedLink>
              <TrackedLink
                cta="hero_demo"
                href="#demo"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-bg-elevated px-7 py-4 text-base font-semibold text-foreground transition-colors hover:border-foreground/30"
              >
                Try the live demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </TrackedLink>
            </div>
            <p className="mt-5 text-sm text-foreground-subtle">
              Projects from $250 · fixed quotes · reply within one business day
            </p>
          </div>
          <HeroVisual />
        </div>

        <div className="mt-20 border-t border-border py-8 lg:mt-24">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="eyebrow shrink-0 text-foreground-subtle">Products we&apos;ve designed, built and run</p>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {caseStudies.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/work/${c.slug}`}
                    className="font-display text-lg font-extrabold text-foreground/60 transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
