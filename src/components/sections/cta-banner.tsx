import { ArrowRight } from "lucide-react";
import { ShineButton } from "@/components/effects/shine-button";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 to-navy-800 py-20">
      {/* Subtle grid overlay */}
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
            Ready to Build Something Real?
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-navy-400">
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

        <p className="mt-4 text-sm text-navy-400/60">
          Or email us directly:{" "}
          <a
            href="mailto:hello@bbrtechnology.com"
            className="text-gold-400 underline underline-offset-2 hover:text-gold-400/80 transition-colors"
          >
            hello@bbrtechnology.com
          </a>
        </p>

        <p className="mt-6 text-xs text-navy-400/50">
          No sales scripts — just a conversation about your goals.
        </p>
      </div>
    </section>
  );
}
