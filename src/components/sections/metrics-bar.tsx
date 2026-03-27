"use client";

import { metrics, techStack } from "@/data/services";

export function MetricsBar() {
  return (
    <section className="border-y border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Metrics row */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight tabular-nums text-foreground sm:text-4xl">
                {metric.value}
              </div>
              <div className="mt-1 text-sm font-medium text-foreground">
                {metric.label}
              </div>
              <div className="mt-0.5 text-xs text-foreground-subtle">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack marquee */}
        <div className="relative mt-10 overflow-hidden">
          {/* Gradient masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-bg to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-bg to-transparent" />

          <div
            className="flex w-max animate-[marquee_25s_linear_infinite]"
          >
            {/* Duplicate for seamless loop */}
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="mx-6 whitespace-nowrap text-sm font-medium text-foreground-subtle transition-colors hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
