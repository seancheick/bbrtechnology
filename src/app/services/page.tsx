import type { Metadata } from "next";
import { ArrowRight, Cloud, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShineButton } from "@/components/effects/shine-button";

export const metadata: Metadata = {
  title: "Services — B&Br Technology",
  description:
    "Explore B&Br Technology's full range of digital services — web development, AI automation, SEO, data analytics, and IT support.",
};

/* Accent colors per service (for visual cards' left border) */
const accentColors: Record<string, string> = {
  "web-mobile": "border-l-amber-600",
  "ai-automation": "border-l-gold-400",
  "seo-growth": "border-l-success",
  "data-analytics": "border-l-[#2563eb]",
  "it-support": "border-l-[#7c3aed]",
};

/* Short-name pills for the quick-nav */
const navPills: { label: string; id: string }[] = [
  { label: "Web & Mobile", id: "web-mobile" },
  { label: "AI & Automation", id: "ai-automation" },
  { label: "SEO & Growth", id: "seo-growth" },
  { label: "Data & Insights", id: "data-analytics" },
  { label: "IT Support", id: "it-support" },
];

/* Highlight cards per service — derived from the service data to spotlight key capabilities */
const highlights: Record<string, { title: string; description: string }[]> = {
  "web-mobile": [
    {
      title: "Custom Sites & Apps",
      description:
        "React, Next.js, WordPress, Shopify, and Flutter builds — pick the stack that fits your business, not the one that's trending.",
    },
    {
      title: "Conversion-First Design",
      description:
        "Every page is crafted for performance, accessibility, and lead generation from day one — not added as an afterthought.",
    },
    {
      title: "Built to Grow",
      description:
        "Architected so you never rebuild from scratch. Scale from a landing page to a full platform without starting over.",
    },
  ],
  "ai-automation": [
    {
      title: "AI Chatbots & Assistants",
      description:
        "GPT-powered bots for customer support, lead capture, and FAQ automation — integrated directly into your existing tools.",
    },
    {
      title: "Workflow Automation",
      description:
        "Zapier, Make, and custom integrations that connect your CRM, email, scheduling, and intake into seamless pipelines.",
    },
    {
      title: "Internal AI Tools",
      description:
        "Replace manual spreadsheet work and repetitive processes with intelligent tools your team actually wants to use.",
    },
  ],
  "seo-growth": [
    {
      title: "Technical SEO Foundation",
      description:
        "Comprehensive audits covering site speed, crawlability, structured data, and indexing — the invisible engine behind organic traffic.",
    },
    {
      title: "Local Search Dominance",
      description:
        "Google Business optimization, citation management, and review strategy for businesses that depend on 'near me' searches.",
    },
    {
      title: "Content & Conversion Strategy",
      description:
        "Keyword roadmaps, content calendars, and CRO experiments that turn searchers into paying customers over time.",
    },
  ],
  "data-analytics": [
    {
      title: "Custom Dashboards",
      description:
        "Looker Studio, Tableau, and Power BI dashboards tailored to the metrics that actually matter for your business decisions.",
    },
    {
      title: "Analytics Setup & Tracking",
      description:
        "GA4 configured properly with custom events, goals, and funnels — no more guessing where your traffic and revenue come from.",
    },
    {
      title: "Data Storytelling",
      description:
        "Decision-focused reporting for your team and investors. Turn raw numbers into clear narratives that drive action.",
    },
  ],
  "it-support": [
    {
      title: "Proactive Monitoring",
      description:
        "System health checks, performance tuning, and security patches before problems become emergencies.",
    },
    {
      title: "On-Call Technical Team",
      description:
        "Bug fixes, troubleshooting, and someone to call when something breaks — no scrambling for help or waiting days for a response.",
    },
    {
      title: "Office & Infrastructure",
      description:
        "Network setup, device provisioning, software management, and ongoing IT support for teams without a dedicated IT person.",
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden py-28 lg:py-36">
        {/* Grid bg effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "6rem 5rem",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <Badge variant="accent" className="mb-6">
            What We Do
          </Badge>

          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="gradient-text">
              Digital Systems That Actually Move the Needle
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-600">
            We don&apos;t just build websites. We design complete digital systems
            — from your first online presence to advanced automation — so you can
            focus on running your business while your tech works for you.
          </p>

          {/* Quick-nav pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {navPills.map((pill) => (
              <a
                key={pill.id}
                href={`#${pill.id}`}
                className="rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:border-amber-600/40 hover:text-amber-600"
              >
                {pill.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Service Deep-Dive Sections ─── */}
      {services.map((service, index) => {
        const Icon = service.icon;
        const isEven = index % 2 === 0;
        const accent = accentColors[service.id] ?? "border-l-amber-600";
        const cards = highlights[service.id] ?? [];

        const contentBlock = (
          <div>
            <Badge variant="accent" className="mb-4">
              {service.label}
            </Badge>

            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              {service.title}
            </h2>

            <p className="mt-4 text-navy-600 leading-relaxed">
              {service.description}
            </p>

            <h3 className="mt-8 text-xs font-semibold uppercase tracking-widest text-navy-400">
              What We Deliver
            </h3>
            <ul className="mt-3 space-y-2">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-navy-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-xs font-semibold uppercase tracking-widest text-navy-400">
              Who This Is For
            </h3>
            <p className="mt-3 text-sm text-navy-600 leading-relaxed">
              {service.audience}
            </p>
          </div>
        );

        const visualBlock = (
          <div className="flex flex-col gap-4">
            {/* Icon card at the top */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900">
                <Icon className="h-6 w-6 text-gold-400" />
              </div>
              <span className="font-[family-name:var(--font-display)] text-lg font-bold text-navy-900">
                {service.tagline}
              </span>
            </div>

            {/* Highlight cards */}
            {cards.map((card) => (
              <div
                key={card.title}
                className={`rounded-lg border border-border bg-bg p-5 border-l-4 ${accent} shadow-sm`}
              >
                <h4 className="font-[family-name:var(--font-display)] font-bold text-navy-900">
                  {card.title}
                </h4>
                <p className="mt-2 text-sm text-navy-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        );

        return (
          <section
            key={service.id}
            id={service.id}
            className="scroll-mt-24 py-20 even:bg-bg-alt"
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
                {isEven ? (
                  <>
                    {contentBlock}
                    {visualBlock}
                  </>
                ) : (
                  <>
                    <div className="order-2 lg:order-1">{visualBlock}</div>
                    <div className="order-1 lg:order-2">{contentBlock}</div>
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── On-Demand Services ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Badge variant="accent" className="mb-4">
            Expand When You Need To
          </Badge>

          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            On-Demand &amp; Partner-Led Services
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-navy-600">
            Some needs don&apos;t fit a monthly retainer. For specialized work
            like cloud infrastructure and cybersecurity, we bring in vetted
            partners so you get expert-level execution without the overhead.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Cloud Infrastructure */}
            <div className="rounded-xl border border-border bg-bg p-8 text-left shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 mb-4">
                <Cloud className="h-5 w-5 text-gold-400" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy-900">
                Cloud Infrastructure
              </h3>
              <p className="mt-3 text-sm text-navy-600 leading-relaxed">
                Scalable architecture, cloud migration, and server planning for
                businesses ready to grow beyond shared hosting.
              </p>
            </div>

            {/* Cybersecurity */}
            <div className="rounded-xl border border-border bg-bg p-8 text-left shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 mb-4">
                <ShieldCheck className="h-5 w-5 text-gold-400" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy-900">
                Cybersecurity
              </h3>
              <p className="mt-3 text-sm text-navy-600 leading-relaxed">
                Security audits, compliance support, and advanced protection
                delivered through our vetted external partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 to-navy-800 py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "6rem 5rem",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
              Not Sure Which Service You Need?
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-navy-400">
            That&apos;s completely fine. Most of our clients start with a
            conversation, not a shopping cart. Tell us where you are and where
            you want to be — we&apos;ll recommend exactly what makes sense for
            your stage and budget.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ShineButton href="/contact">
              Start a Conversation
              <ArrowRight className="ml-1 h-4 w-4" />
            </ShineButton>
            <Button variant="outline" asChild>
              <a
                href="/contact"
                className="border-white/20 text-white hover:bg-white/10"
              >
                View Pricing Models
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-navy-400/60">
            No sales scripts. No pressure. Just an honest conversation about
            your goals.
          </p>
        </div>
      </section>
    </>
  );
}
