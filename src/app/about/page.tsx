import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle,
  Code,
  BookOpen,
  Shield,
  Smile,
  LayoutGrid,
} from "lucide-react";
import { projects, principles } from "@/data/portfolio";
import { toolCategories } from "@/data/tools";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShineButton } from "@/components/effects/shine-button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/scroll-reveal";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "About — B&Br Technology",
  description:
    "Learn about B&Br Technology — a Boston-based digital studio building real systems for real businesses. Founded by Sean Cheick Baradji.",
  openGraph: {
    title: "About — B&Br Technology",
    description:
      "Learn about B&Br Technology — a Boston-based digital studio building real systems for real businesses. Founded by Sean Cheick Baradji.",
    type: "website",
    locale: "en_US",
    url: "https://bbrtechnology.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — B&Br Technology",
    description:
      "Learn about B&Br Technology — a Boston-based digital studio building real systems for real businesses. Founded by Sean Cheick Baradji.",
  },
};

/* Map principle titles to icons */
const principleIcons: Record<string, LucideIcon> = {
  "Accuracy Over Hype": CheckCircle,
  "Performance First": Code,
  "Continuous Learning": BookOpen,
  Authenticity: Shield,
  "Human-Centered": Smile,
  "Ship, Then Iterate": LayoutGrid,
};

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden py-28 lg:py-36">
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

        <ScrollReveal className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <Badge variant="accent" className="mb-6">
            About B&amp;Br Technology
          </Badge>

          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Built by Builders.
            <br />
            <span className="gradient-text">Not by Hype.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-600">
            We&apos;re a Boston-based digital studio that ships real systems for
            real businesses. No inflated promises, no trend-chasing — just
            precise, reliable technology that earns its place in your stack.
          </p>
        </ScrollReveal>
      </section>

      {/* ─── The Story ─── */}
      <section className="py-20 bg-bg-alt">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <Badge variant="accent" className="mb-4">
              Our Story
            </Badge>

            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl mb-8">
              Why B&amp;Br Exists
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-6 text-navy-600 leading-relaxed">
              <p>
                B&amp;Br Technology was founded by Sean Cheick Baradji — a
                developer, systems architect, and first-generation American with
                roots in West Africa and a career that spans New York City, Boston,
                and Washington, D.C. After years of watching businesses get burned
                by the same cycle, it became clear that the industry needed a
                different approach.
              </p>

              <p>
                The problem was obvious: traditional agencies overcharged for
                bloated deliverables, freelancers disappeared mid-project, and a
                new wave of AI vendors was wrapping basic automations in marketing
                jargon and charging premium rates. Businesses deserved better than
                a choice between expensive, unreliable, and misleading.
              </p>

              <p>
                B&amp;Br operates differently. Every line of code has a reason.
                Every recommendation is evidence-based. We ship on time, we
                communicate in plain language, and nothing is hidden — not the
                timeline, not the cost, not the limitations. If a $50/month tool
                solves your problem, we&apos;ll tell you — even if it means a
                smaller invoice.
              </p>

              <p>
                We love collaborating. Whether it&apos;s teaming up with another
                agency&apos;s engineering team, consulting on an existing project,
                or serving as that third set of eyes on a critical system, we work
                well alongside other builders. Our interns come from Boston-area
                colleges and work on real client projects — not made-up exercises —
                because we believe in learning by shipping.
              </p>

              <p>
                Today, B&amp;Br works with medical clinics, eCommerce brands,
                startups, solopreneurs, and growing teams across the country. The
                common thread isn&apos;t industry — it&apos;s ambition. If
                you&apos;re building something real and you need technology that
                keeps up, that&apos;s exactly what we&apos;re here for.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Founder Section ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Founder card */}
            <ScrollReveal className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-bg shadow-sm p-8 text-center">
                {/* Avatar */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-gold-400">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                    SC
                  </span>
                </div>

                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-bold text-navy-900">
                  Sean Cheick Baradji
                </h3>
                <p className="text-sm text-amber-600 font-medium">
                  Founder &amp; Lead Developer
                </p>

                <div className="mt-6 space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm text-navy-600">
                    <span className="text-navy-400">Location</span>
                    <span className="ml-auto font-medium text-navy-900">
                      Boston, MA
                    </span>
                  </div>
                  <div className="border-t border-border" />
                  <div className="flex items-center gap-3 text-sm text-navy-600">
                    <span className="text-navy-400">Focus</span>
                    <span className="ml-auto font-medium text-navy-900">
                      Full-Stack &amp; AI Systems
                    </span>
                  </div>
                  <div className="border-t border-border" />
                  <div className="flex items-center gap-3 text-sm text-navy-600">
                    <span className="text-navy-400">Industries</span>
                    <span className="ml-auto font-medium text-navy-900">
                      Healthcare / eCommerce / AI-ML
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Bio prose */}
            <ScrollReveal delay={0.1} className="lg:col-span-3">
              <Badge variant="accent" className="mb-4">
                The Person Behind the Code
              </Badge>

              <div className="space-y-5 text-navy-600 leading-relaxed">
                <p>
                  Before B&amp;Br, Sean built PharmaGuide AI — a first-of-its-kind
                  AI pharmacist app that scans supplements via barcode and OCR,
                  evaluates quality on a 100-point deterministic scoring
                  algorithm, checks drug-supplement interactions, and provides
                  personalized safety recommendations. The system handles
                  100,000+ products across a multi-phase data pipeline, all built
                  with HIPAA-compliant, privacy-first architecture.
                </p>

                <p>
                  PharmaGuide wasn&apos;t a weekend project — it was a deep
                  engineering effort that required building custom NLP pipelines,
                  multi-modal scanning (barcode + OCR + manual search), and an AI
                  pharmacist that can process complex medical interactions in real
                  time. The scoring algorithm alone processes dozens of quality
                  signals per product — certifications, ingredient identity,
                  dosage accuracy, contaminant testing — with every score fully
                  deterministic and explainable.
                </p>

                <p>
                  That same rigor — the obsession with accuracy, the refusal to
                  cut corners, the belief that technology should work for the
                  human on the other end — is what Sean brings to every B&amp;Br
                  engagement. Whether it&apos;s a business website, an automation
                  pipeline, or a data dashboard, the standard is the same: does it
                  work correctly, is it built to last, and does it solve the
                  actual problem?
                </p>

                <p>
                  Sean&apos;s background spans full-stack web development, mobile
                  engineering with Flutter, data architecture, and applied AI/ML.
                  He&apos;s worked in healthcare technology, eCommerce, and
                  government-adjacent systems — always drawn to projects where
                  accuracy matters more than speed and where getting it wrong has
                  real consequences.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Operating Principles ─── */}
      <section className="py-20 bg-bg-alt">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center mb-12">
            <Badge variant="accent" className="mb-4">
              How We Think
            </Badge>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Our Operating Principles
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => {
              const Icon =
                principleIcons[principle.title] ?? CheckCircle;

              return (
                <StaggerItem key={principle.title}>
                  <div className="rounded-xl border border-border bg-bg p-6 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600/10 mb-4">
                      <Icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-navy-900">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy-600 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── Systems We've Built ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center mb-12">
            <Badge variant="accent" className="mb-4">
              Track Record
            </Badge>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Systems We&apos;ve Built
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <StaggerItem key={project.title}>
                <div
                  className="rounded-xl border border-border bg-bg p-6 shadow-sm border-l-4"
                  style={{ borderLeftColor: project.categoryColor }}
                >
                  <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold mb-3"
                    style={{
                      color: project.categoryColor,
                      backgroundColor: `${project.categoryColor}15`,
                    }}
                  >
                    {project.category}
                  </span>

                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-navy-900">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-navy-600 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-bg-alt px-2.5 py-0.5 text-xs font-medium text-navy-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── Tools We Trust ─── */}
      <section className="py-20 bg-bg-alt">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center mb-12">
            <Badge variant="accent" className="mb-4">
              Our Stack
            </Badge>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Tools We Trust
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-navy-600">
              We&apos;re tool-agnostic — we pick what works best for the job,
              not what&apos;s trending on Twitter.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {toolCategories.map((category) => (
              <StaggerItem key={category.title}>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-amber-600 mb-4">
                    {category.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-navy-600"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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

        <ScrollReveal className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
              Ready to Work With a Team That Delivers?
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-navy-400">
            No pitch decks. No jargon. Just a conversation about what you need
            built and whether we&apos;re the right fit.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ShineButton href="/contact">
              Get Started
              <ArrowRight className="ml-1 h-4 w-4" />
            </ShineButton>
            <Button variant="outline" asChild>
              <a
                href="/services"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Explore Services
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
