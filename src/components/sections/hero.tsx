"use client";

import { ChevronRight, ArrowRight } from "lucide-react";
import { ShineButton } from "@/components/effects/shine-button";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full pt-40 px-6 text-center md:px-8
      min-h-[calc(100vh-40px)] overflow-hidden
      bg-[linear-gradient(to_bottom,var(--color-bg),var(--color-bg)_50%,var(--color-border)_88%)]
      rounded-b-xl"
    >
      {/* Grid BG */}
      <div
        className="absolute -z-10 inset-0 opacity-80 h-[600px] w-full
        bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]
        bg-[size:6rem_5rem]
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* Radial Accent — the big ellipse at the bottom */}
      <div
        className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)]
        h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[140%]
        -translate-x-1/2 rounded-[100%] bg-bg
        bg-[radial-gradient(closest-side,var(--color-bg)_82%,var(--color-navy-950))]
        dark:bg-[radial-gradient(closest-side,var(--color-bg)_82%,#ffffff)]
        animate-[fade-up_1s_ease-out]"
      />

      {/* Eyebrow — Now Booking */}
      <a href="#services" className="group">
        <span
          className="animate-[fade-in_0.6s_ease-out_0.1s_both] text-sm text-navy-600
          mx-auto px-5 py-2
          bg-gradient-to-tr from-navy-400/5 via-navy-400/5 to-transparent
          border-[2px] border-border
          rounded-3xl w-fit tracking-tight uppercase flex items-center justify-center"
        >
          <span className="relative mr-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-[pulse-dot_2s_infinite] rounded-full bg-success" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Now booking new projects
          <ChevronRight className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </a>

      {/* Title */}
      <h1
        className="animate-[fade-in_0.8s_ease-out_0.2s_both] -translate-y-4 text-balance
        py-6 text-5xl font-semibold leading-none tracking-tighter
        sm:text-6xl md:text-7xl lg:text-8xl
        font-[family-name:var(--font-display)]"
      >
        <span className="gradient-text">AI-Powered Tech.</span>
        <br />
        <span className="gradient-text">Built for Real Growth.</span>
      </h1>

      {/* Subtitle */}
      <p
        className="animate-[fade-in_0.8s_ease-out_0.35s_both] mb-8 -translate-y-4 text-balance
        text-lg tracking-tight text-navy-600
        md:text-xl max-w-xl mx-auto"
      >
        We build websites, apps, and automation systems that help founders
        and growing businesses launch faster, work smarter, and scale
        with confidence.
      </p>

      {/* CTAs */}
      <div className="animate-[fade-in_0.8s_ease-out_0.45s_both] flex flex-col items-center justify-center gap-4 sm:flex-row">
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

      {/* Audience pills */}
      <div className="animate-[fade-in_0.6s_ease-out_0.55s_both] mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-navy-400">
        <span>For Founders</span>
        <span className="text-navy-400/40">&middot;</span>
        <span>Solopreneurs</span>
        <span className="text-navy-400/40">&middot;</span>
        <span>Local Biz</span>
        <span className="text-navy-400/40">&middot;</span>
        <span>Startups</span>
      </div>

      {/* Trust signals */}
      <div className="animate-[fade-in_0.6s_ease-out_0.65s_both] mt-10 border-t border-border pt-6">
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

      {/* Bottom Fade */}
      <div
        className="animate-[fade-up_1s_ease-out_0.4s_both] relative mt-32 [perspective:2000px]
        after:absolute after:inset-0 after:z-50
        after:[background:linear-gradient(to_top,var(--color-bg)_10%,transparent)]"
      />
    </section>
  );
}
