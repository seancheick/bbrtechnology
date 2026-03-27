import { ArrowRight } from "lucide-react";
import { ShineButton } from "@/components/effects/shine-button";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-[linear-gradient(to_bottom_right,color-mix(in_srgb,var(--color-bg-alt)_88%,var(--color-navy-950)_12%),var(--color-bg))] py-20">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "6rem 5rem",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Ready to Build Something <span className="text-amber-600">Real</span>?
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-foreground-muted">
          Let&apos;s talk about your business, your goals, and how we can build
          the systems you need to grow. Free 30-minute discovery call — no
          strings attached.
        </p>

        <div className="mt-8">
          <ShineButton
            href="https://cal.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Your Discovery Call
            <ArrowRight className="ml-1 h-4 w-4" />
          </ShineButton>
        </div>

        <p className="mt-4 text-sm text-foreground-subtle">
          Or email us directly:{" "}
          <a
            href="mailto:hello@bbrtechnology.com"
            className="text-gold-400 underline underline-offset-2 hover:text-gold-400/80 transition-colors"
          >
            hello@bbrtechnology.com
          </a>
        </p>

        <p className="mt-6 text-xs text-foreground-subtle">
          No sales scripts — just a conversation about your goals.
        </p>
      </div>
    </section>
  );
}
