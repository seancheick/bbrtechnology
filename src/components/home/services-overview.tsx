import Link from "next/link";
import { ArrowUpRight, Bot, Globe, LayoutDashboard, Smartphone } from "lucide-react";
import { categories, categoryFrom, formatUsd, getOffer } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/motion/tilt-card";

const icons = { "ai-automation": Bot, websites: Globe, "custom-software": LayoutDashboard, mobile: Smartphone } as const;

const outcomes: Record<(typeof categories)[number]["id"], string> = {
  "ai-automation": "Leads, bookings, invoices and follow-ups that run on their own, instead of being copied between tools by hand.",
  websites: "A fast site that explains what you do in five seconds and turns visits into booked calls.",
  "custom-software": "Dashboards, client portals, APIs and MCP servers that connect your systems, and let AI agents use them safely.",
  mobile: "iOS and Android apps for your customers, or for crews working away from a desk.",
};

// names the cheapest offer, so "$250" reads as an audit and "$2,000" as a prototype
const fromLabel: Record<(typeof categories)[number]["id"], string> = {
  "ai-automation": "Audits from",
  websites: "From",
  "custom-software": "Prototypes from",
  mobile: "MVPs from",
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
              <TiltCard key={c.id} className="h-full rounded-3xl">
              <Link
                href={`/services#${c.id}`}
                className="group flex h-full flex-col rounded-3xl border border-border bg-bg-elevated p-4 shadow-[0_1px_0_rgba(10,15,26,0.04)] transition-[border-color,box-shadow] hover:border-foreground/25 hover:shadow-[0_24px_60px_-30px_rgba(10,15,26,0.45)] sm:p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-gold-400 dark:bg-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-4 text-lg font-extrabold leading-tight text-foreground sm:mt-5 sm:text-2xl">{c.name}</h3>
                <p className="mt-2 hidden text-sm leading-relaxed text-foreground-muted sm:block">{outcomes[c.id]}</p>
                <div className="mt-auto flex items-center justify-between pt-4 sm:pt-6">
                  <p className="text-sm text-foreground-muted">
                    {fromLabel[c.id]} <span className="font-display text-lg font-extrabold tabular text-foreground sm:text-xl">{formatUsd(categoryFrom(c.id))}</span>
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-foreground-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
              </TiltCard>
            );
          })}
        </div>

        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 sm:gap-6 sm:pt-8">
          <div>
            <dt className="sr-only">How often you see progress</dt>
            <dd className="font-display text-2xl font-extrabold tabular text-foreground sm:text-4xl">Weekly</dd>
            <dd className="mt-1 text-xs leading-snug text-foreground-muted sm:text-sm">
              working previews on a private link, so you see the software, not status reports.
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
              to a fixed quote. Every package and price is <Link href="/services" className="underline underline-offset-2 hover:text-foreground">published</Link>.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
