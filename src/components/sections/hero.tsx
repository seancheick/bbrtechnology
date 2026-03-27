"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ShineButton } from "@/components/effects/shine-button";
import { Button } from "@/components/ui/button";

const ease = [0.16, 1, 0.3, 1] as const;

function FadeUp({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Grid background */}
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

      {/* Radial accent at bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[50%] w-[120%]"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 100%, var(--color-bg) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
        {/* Now Booking badge */}
        <FadeUp delay={0.2}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-1.5 text-sm text-navy-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-[pulse-dot_2s_infinite] rounded-full bg-success" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Now booking new projects
          </div>
        </FadeUp>

        {/* Headline */}
        <FadeUp delay={0.3}>
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="gradient-text">AI-Powered Tech.</span>
            <br />
            <span className="gradient-text">Built for Real Growth.</span>
          </h1>
        </FadeUp>

        {/* Subtitle */}
        <FadeUp delay={0.4}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-navy-600">
            We build websites, apps, and automation systems that help founders
            and growing businesses launch faster, work smarter, and scale
            with confidence.
          </p>
        </FadeUp>

        {/* Dual CTAs */}
        <FadeUp delay={0.5}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ShineButton
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Discovery Call
              <ArrowRight className="ml-1 h-4 w-4" />
            </ShineButton>
            <Button variant="outline" asChild>
              <a href="#services">View Services</a>
            </Button>
          </div>
        </FadeUp>

        {/* Audience pills */}
        <FadeUp delay={0.55}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-navy-400">
            <span>For Founders</span>
            <span className="text-navy-400/40">&middot;</span>
            <span>Solopreneurs</span>
            <span className="text-navy-400/40">&middot;</span>
            <span>Local Biz</span>
            <span className="text-navy-400/40">&middot;</span>
            <span>Startups</span>
          </div>
        </FadeUp>

        {/* Trust signals */}
        <FadeUp delay={0.6}>
          <div className="mt-10 border-t border-border pt-6">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-navy-600">
              <span>Founder-Led &#10003;</span>
              <span className="hidden sm:inline text-navy-400/30">|</span>
              <span>System-First &#10003;</span>
              <span className="hidden sm:inline text-navy-400/30">|</span>
              <span>AI-Native &#10003;</span>
              <span className="hidden sm:inline text-navy-400/30">|</span>
              <span>Scalable &#10003;</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
