import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { caseStudies } from "@/data/case-studies";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusDot } from "@/components/ui/spec-badge";

export const metadata: Metadata = {
  title: "About",
  description:
    "B&Br Technology is a founder-led software studio in Boston. We design, build and run our own products, and bring that operator discipline to client work.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Accuracy over hype",
    body: "We recommend tools because they solve the problem, not because they're trending. If a $20/month tool fixes it, we'll tell you.",
  },
  {
    title: "Scope in writing",
    body: "Every project has a written scope, exclusions and test cases before work starts. Done means the tests pass, not that the deadline arrived.",
  },
  {
    title: "Ship, then iterate",
    body: "You see working software every week. Real feedback beats long specifications.",
  },
  {
    title: "Built to hand over",
    body: "Your accounts, your repositories, your documentation. You should be able to run what we build without us.",
  },
];

const toolbox = [
  { title: "Product & front end", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Flutter"] },
  { title: "Back end & data", items: ["Node.js", "Python", "PostgreSQL", "Supabase", "REST & webhooks"] },
  { title: "AI & automation", items: ["LLM APIs", "Structured outputs", "MCP servers", "n8n · Make · Zapier", "Evals & guardrails"] },
  { title: "Ship & run", items: ["Vercel", "GitHub Actions", "Sentry", "PostHog", "Stripe"] },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <div className="grid-backdrop pointer-events-none absolute inset-0 text-navy-900 dark:text-white" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="About the studio"
            title={
              <>
                A small studio <span className="text-amber-600 dark:text-gold-400">with a high bar.</span>
              </>
            }
            lede={`${site.name} is a founder-led software studio in Boston. Sean Cheick Baradji leads every project and works with a small team of engineers and designers when the scope calls for it.`}
          />
        </div>
      </section>

      <section className="border-y border-border bg-bg-alt py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="eyebrow text-amber-600">The founder</p>
            <h2 className="font-display mt-4 text-4xl font-extrabold text-foreground sm:text-5xl">
              Built by someone who runs what he builds.
            </h2>
            <dl className="mt-10 grid grid-cols-2 gap-6 text-sm">
              {[
                ["Based in", site.city],
                ["Focus", "Full-stack, mobile & applied AI"],
                ["Sectors", "Health tech, hospitality, field ops, commerce"],
                ["On every project", "Yes, from first call to launch"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-border pt-3">
                  <dt className="eyebrow text-foreground-subtle">{k}</dt>
                  <dd className="mt-1.5 font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-foreground-muted">
            <p>
              Before taking on client work at scale, Sean built PharmaGuide: a supplement intelligence platform with a
              Flutter app, a staged data pipeline that scores products on a six-pillar, 100-point model, and an
              assistant where known high-risk interactions are answered by deterministic rules instead of a model.
            </p>
            <p>
              Then came the operating problems closer to home. TurnFlow started as the system for a real short-term
              rental portfolio, turning bookings into cleaning jobs, demanding photo proof, reconciling cleaner pay and
              catching calendar problems before they cost a booking. It runs that portfolio today.
            </p>
            <p>
              That&apos;s the difference we bring to client work. We&apos;ve been the operator with the broken
              spreadsheet and the late-night guest message. We know which automations save hours and which ones just create
              a new thing to babysit.
            </p>
            <p className="text-foreground">
              Whether it&apos;s a website, an automation or a full platform, the standard is the same: does it work
              correctly, will it last, and does it solve the actual problem?
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="We run our own products" title="Proof that isn't a slide deck." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/work/${c.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-bg-elevated p-6 transition-colors hover:border-foreground/25"
                >
                  <span className="eyebrow text-foreground-subtle">{c.kicker}</span>
                  <span className="font-display mt-3 text-2xl font-extrabold text-foreground">{c.name}</span>
                  <span className="mt-2 text-sm text-foreground-muted">{c.headline}</span>
                  <span className="mt-auto flex items-center justify-between pt-6">
                    <StatusDot status={c.status} className="text-foreground-muted" />
                    <ArrowUpRight className="h-4 w-4 text-foreground-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-bg-alt py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading eyebrow="How we think" title="Four rules we don't bend." />
            <ul className="mt-10 space-y-6">
              {principles.map((p, i) => (
                <li key={p.title} className="flex gap-5 border-t border-border pt-6">
                  <span aria-hidden className="font-display text-2xl font-extrabold tabular text-amber-600 dark:text-gold-400">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl font-extrabold text-foreground">{p.title}</h3>
                    <p className="mt-2 text-foreground-muted">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Toolbox" title="What we build with." />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {toolbox.map((g) => (
                <div key={g.title} className="rounded-3xl border border-border bg-bg-elevated p-6">
                  <h3 className="eyebrow text-foreground-subtle">{g.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-foreground">
                    {g.items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
