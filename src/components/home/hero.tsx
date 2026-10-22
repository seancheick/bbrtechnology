import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { formatUsd, offers } from "@/data/services";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { KineticText } from "@/components/motion/reveal";
import { HeroVisual } from "@/components/three/hero-visual";

const lowest = Math.min(...offers.map((o) => o.from));

const promises = [
  `Projects from ${formatUsd(lowest)}`,
  "Fixed quote in 2 business days",
  "You own the code",
];

// Tools we connect through their own APIs. A capability list, not a partner claim.
const tools = [
  "Google Workspace", "Microsoft 365", "Slack", "Shopify", "Stripe", "QuickBooks", "HubSpot", "Salesforce",
  "ClickUp", "Notion", "Airtable", "Calendly", "Twilio", "Zapier", "Make", "n8n", "Supabase", "PostHog",
  "OpenAI", "Claude", "Gemini", "Hostex",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-32">
      <div className="grid-backdrop pointer-events-none absolute inset-0 text-navy-900 dark:text-white" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-foreground-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
              Software studio · Boston · Taking on new projects
            </p>
            <h1 className="font-display mt-6 text-balance text-[2.6rem] font-extrabold leading-[0.98] text-foreground sm:text-6xl lg:text-[4.6rem]">
              <KineticText text="Software and AI automation" />{" "}
              <KineticText text="that gives your team hours back." delay={0.25} className="text-amber-600 dark:text-gold-400" />
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground-muted">
              We build websites, web and mobile apps, and AI automations around the tools you already use. Fixed
              prices, a person who answers, and everything is yours at handover.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                cta="hero_book"
                href="/contact#book"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-7 py-4 text-base font-semibold text-gold-400 transition-colors hover:bg-navy-800 dark:bg-gold-400 dark:text-navy-950 dark:hover:bg-gold-400/90"
              >
                Book a free 30-min call
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </TrackedLink>
              <TrackedLink
                cta="hero_demo"
                href="#demo"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-bg-elevated px-7 py-4 text-base font-semibold text-foreground transition-colors hover:border-foreground/30"
              >
                See it work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </TrackedLink>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground-muted">
              {promises.map((p) => (
                <li key={p} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-success" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <HeroVisual className="mx-auto max-w-[300px] md:max-w-[460px] lg:max-w-none" />
        </div>

        <div className="mt-14 border-t border-border py-6 sm:mt-20">
          <p className="eyebrow text-foreground-subtle">We connect the tools you already pay for</p>
          {/* a slow rolling strip; it pauses on hover and stands still for reduced motion */}
          <div className="group relative -mx-4 mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:mx-0">
            <ul className="flex w-max animate-[marquee_45s_linear_infinite] gap-10 pr-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
              {[...tools, ...tools].map((t, i) => (
                <li
                  key={`${t}-${i}`}
                  aria-hidden={i >= tools.length ? true : undefined}
                  className="font-display shrink-0 text-lg font-extrabold text-foreground/55 transition-colors hover:text-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
