import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies, clientWork } from "@/data/case-studies";
import { SectionHeading } from "@/components/ui/section-heading";

const featured = ["turnflow", "pharmaguide", "fieldops-ai"].map((slug) => caseStudies.find((c) => c.slug === slug)!);
const more = ["MVPs & prototypes", "Client portals", "Dashboards", "Inventory systems", "Booking flows", "Chatbots", "APIs & MCP"];

export function ProjectsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="03"
            eyebrow="Projects we've delivered"
            title="Built for real operations."
            lede="A few systems we've designed, built and launched, each one the kind of project we take on for clients."
          />
          <Link href="/work" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground hover:text-amber-600">
            All projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {featured.map((c) => (
            <li key={c.slug} className="w-[84%] shrink-0 snap-start md:w-auto">
              <Link
                href={`/work/${c.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-navy-950 p-6 text-white sm:p-7"
              >
                <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl" style={{ background: c.accent }} aria-hidden />
                <p className="eyebrow relative text-gold-400">{c.card.type}</p>
                <p className="relative mt-1 text-xs text-navy-400">{c.card.industry}</p>
                <p className="font-display relative mt-6 text-5xl font-extrabold tabular">{c.card.metric.value}</p>
                <p className="relative mt-1 text-sm text-navy-400">
                  {c.card.metric.label}
                  {c.card.metric.note && <span className="ml-1.5 text-xs text-white/40">({c.card.metric.note})</span>}
                </p>
                <p className="relative mt-6 text-pretty leading-relaxed text-white/85">{c.card.outcome}</p>
                <span className="relative mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-gold-400">
                  See the project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
          {clientWork.slice(0, 2).map((w) => (
            <li key={w.title} className="w-[84%] shrink-0 snap-start md:w-auto">
              <Link
                href="/work#clients"
                className="group flex h-full flex-col rounded-3xl border border-border bg-bg-elevated p-6 sm:p-7"
              >
                <p className="eyebrow text-amber-600">{w.sector}</p>
                <p className="mt-1 text-xs text-foreground-subtle">Client engagement</p>
                <p className="font-display mt-6 text-2xl font-extrabold leading-tight text-foreground">{w.title}</p>
                <p className="mt-4 text-pretty leading-relaxed text-foreground-muted">{w.body}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-foreground">
                  Client work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
          <li className="w-[84%] shrink-0 snap-start md:w-auto">
            <Link
              href="/contact#message"
              className="group flex h-full flex-col justify-between rounded-3xl border border-dashed border-foreground/25 p-6 sm:p-7"
            >
              <div>
                <p className="eyebrow text-foreground-subtle">And more</p>
                <p className="font-display mt-6 text-3xl font-extrabold leading-tight text-foreground">
                  If it runs on software, we can build it.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {more.map((m) => (
                    <li key={m} className="rounded-full bg-bg-alt px-3 py-1 text-xs text-foreground-muted">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-gold-400">
                Tell us what you need <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
