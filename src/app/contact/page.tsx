import type { Metadata } from "next";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/forms/contact-form";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

export const metadata: Metadata = {
  title: "Contact — B&Br Technology",
  description:
    "Get in touch with B&Br Technology. Tell us about your project and we'll respond within 24 hours.",
  openGraph: {
    title: "Contact — B&Br Technology",
    description:
      "Get in touch with B&Br Technology. Tell us about your project and we'll respond within 24 hours.",
    type: "website",
    locale: "en_US",
    url: "https://bbrtechnology.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — B&Br Technology",
    description:
      "Get in touch with B&Br Technology. Tell us about your project and we'll respond within 24 hours.",
  },
};

const steps = [
  {
    number: "1",
    title: "We Read Every Detail",
    description:
      "Your inquiry goes directly to our team — no bots, no ticket queues.",
  },
  {
    number: "2",
    title: "We Respond Within 24 Hours",
    description:
      "With honest feedback on scope, timeline, and whether we're the right match.",
  },
  {
    number: "3",
    title: "Free Discovery Call",
    description:
      "A 30-minute conversation to dig into your goals — zero obligation, zero pressure.",
  },
];

const trustSignals = [
  "No contracts required to start",
  "Free 30-minute discovery call",
  "Honest about what we can and can't do",
  "Your data stays private — always",
];

export default function ContactPage() {
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
            Get in Touch
          </Badge>

          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s Build Something
            <br />
            <span className="gradient-text">That Actually Works</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-muted">
            Tell us where you are and where you want to be. We&apos;ll tell you
            honestly whether we&apos;re the right fit.
          </p>
        </ScrollReveal>
      </section>

      {/* ─── Two-column layout ─── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* ── Left sidebar ── */}
            <ScrollReveal className="lg:col-span-2 space-y-8">
              {/* What Happens Next */}
              <div className="rounded-xl border border-border bg-bg p-6 shadow-sm">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground mb-6">
                  What Happens Next
                </h3>

                <div className="space-y-6">
                  {steps.map((step) => (
                    <div key={step.number} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-600/10 text-sm font-bold text-amber-600">
                        {step.number}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          {step.title}
                        </h4>
                        <p className="mt-1 text-sm text-foreground-muted">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reach Us Directly */}
              <div className="rounded-xl border border-border bg-bg p-6 shadow-sm">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground mb-5">
                  Reach Us Directly
                </h3>

                <div className="space-y-4">
                  <a
                    href="mailto:hello@bbrtechnology.com"
                    className="flex items-center gap-3 text-sm text-foreground-muted hover:text-amber-600 transition-colors group"
                  >
                    <Mail className="h-4 w-4 text-foreground-subtle group-hover:text-amber-600 transition-colors" />
                    hello@bbrtechnology.com
                  </a>
                  <a
                    href="tel:+16467268345"
                    className="flex items-center gap-3 text-sm text-foreground-muted hover:text-amber-600 transition-colors group"
                  >
                    <Phone className="h-4 w-4 text-foreground-subtle group-hover:text-amber-600 transition-colors" />
                    (646) 726-8345
                  </a>
                  <div className="flex items-center gap-3 text-sm text-foreground-muted">
                    <MapPin className="h-4 w-4 text-foreground-subtle" />
                    Boston, MA
                  </div>
                </div>
              </div>

              {/* Trust signals */}
              <div className="space-y-3 px-1">
                {trustSignals.map((signal) => (
                  <div
                    key={signal}
                    className="flex items-center gap-2.5 text-sm text-foreground-muted"
                  >
                    <Check className="h-4 w-4 shrink-0 text-success" />
                    {signal}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* ── Right form ── */}
            <ScrollReveal delay={0.1} className="lg:col-span-3">
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
