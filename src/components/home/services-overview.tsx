import Link from "next/link";
import { ArrowUpRight, Bot, Globe, LayoutDashboard, Smartphone } from "lucide-react";
import { categories, categoryFrom, formatUsd, getOffer } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = { "ai-automation": Bot, websites: Globe, "custom-software": LayoutDashboard, mobile: Smartphone } as const;

const outcomes: Record<(typeof categories)[number]["id"], string> = {
  "ai-automation": "Leads, bookings, invoices and follow-ups that run on their own, instead of being copied between tools by hand.",
  websites: "A fast site that explains what you do in five seconds and turns visits into booked calls.",
  "custom-software": "Dashboards, client portals and internal tools that replace the spreadsheet everyone is afraid to touch.",
  mobile: "iOS and Android apps for your customers, or for crews working away from a desk.",
};

const sprint = getOffer("automation-sprint");

export function ServicesOverview() {
  return (
    <section className="border-y border-border bg-bg-alt py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="What we build"
          title="Pick the problem. We build the fix."
          lede="Every project is scoped in writing, tested against real scenarios, and handed over so you're never locked in."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {categories.map((c) => {
            const Icon = icons[c.id];
            return (
              <Link
                key={c.id}
                href={`/services#${c.id}`}
                className="group flex flex-col rounded-3xl border border-border bg-bg-elevated p-4 transition-colors hover:border-foreground/25 sm:p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-gold-400 dark:bg-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-4 text-lg font-extrabold leading-tight text-foreground sm:mt-5 sm:text-2xl">{c.name}</h3>
                <p className="mt-2 hidden text-sm leading-relaxed text-foreground-muted sm:block">{outcomes[c.id]}</p>
                <div className="mt-auto flex items-center justify-between pt-4 sm:pt-6">
                  <p className="text-sm text-foreground-muted">
                    From <span className="font-display text-lg font-extrabold tabular text-foreground sm:text-xl">{formatUsd(categoryFrom(c.id))}</span>
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-foreground-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>

        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 sm:gap-6 sm:pt-8">
          <div>
            <dt className="sr-only">Time saved with AI</dt>
            <dd className="font-display text-2xl font-extrabold tabular text-foreground sm:text-4xl">~1 hr/day</dd>
            <dd className="mt-1 text-xs leading-snug text-foreground-muted sm:text-sm">
              saved by people who use AI at work, on average.{" "}
              <a
                href="https://www.adeccogroup.com/our-group/media/press-releases/ai-saves-workers-an-average-of-one-hour-each-day"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-subtle underline underline-offset-2 hover:text-foreground"
              >
                Adecco Group, 35,000 workers, 2024
              </a>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Time to a first automation</dt>
            <dd className="font-display text-2xl font-extrabold tabular text-foreground sm:text-4xl">{sprint.timeline.split(" ")[0]} days</dd>
            <dd className="mt-1 text-xs leading-snug text-foreground-muted sm:text-sm">to your first automation, once we have access to your tools.</dd>
          </div>
          <div>
            <dt className="sr-only">Time to a fixed quote</dt>
            <dd className="font-display text-2xl font-extrabold tabular text-foreground sm:text-4xl">2 days</dd>
            <dd className="mt-1 text-xs leading-snug text-foreground-muted sm:text-sm">
              to a fixed quote. Packages are published, starting at {formatUsd(categoryFrom("ai-automation"))}.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
