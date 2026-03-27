"use client";

import { useEffect, useRef } from "react";
import {
  ClipboardList,
  UserX,
  BarChart3,
  Zap,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

const painPoints = [
  { label: "Manual Tasks", icon: ClipboardList },
  { label: "Lost Leads", icon: UserX },
  { label: "Bad Analytics", icon: BarChart3 },
];

const solutions = [
  { label: "Automation", icon: Zap },
  { label: "Growth", icon: TrendingUp },
  { label: "Insights", icon: Lightbulb },
];

function AnimatedLine({ reverse = false }: { reverse?: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length * 0.3} ${length * 0.7}`;
    path.style.strokeDashoffset = String(reverse ? -length : length);

    let start: number | null = null;
    const duration = 3000;

    function animate(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = (elapsed % duration) / duration;
      const offset = reverse
        ? -length + progress * length
        : length - progress * length;
      if (path) path.style.strokeDashoffset = String(offset);
      requestAnimationFrame(animate);
    }

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [reverse]);

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <path
        ref={pathRef}
        d={reverse ? "M 85 50 L 15 50" : "M 15 50 L 85 50"}
        fill="none"
        stroke="url(#beamGrad)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
          <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AnimatedBeamSection() {
  return (
    <section className="bg-bg-alt py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            How It Works
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            From Pain Points to Solutions
          </h2>
        </div>

        {/* 3-column layout */}
        <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          {/* Left: Pain points */}
          <div className="flex flex-col items-center gap-6 md:items-end">
            {painPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-bg px-5 py-3 shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-500">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-navy-900">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center: B&Br logo with beam lines */}
          <div className="relative flex items-center justify-center py-8">
            {/* Left beam connector */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2">
              <AnimatedLine />
            </div>
            {/* Right beam connector */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2">
              <AnimatedLine reverse />
            </div>

            {/* Center hub */}
            <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-navy-900 shadow-lg shadow-navy-900/30">
              <div className="absolute inset-0 animate-pulse rounded-full bg-gold-400/20" />
              <span className="relative font-[family-name:var(--font-display)] text-xl font-extrabold text-gold-400">
                B&amp;Br
              </span>
            </div>
          </div>

          {/* Right: Solutions */}
          <div className="flex flex-col items-center gap-6 md:items-start">
            {solutions.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-bg px-5 py-3 shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-green-200 bg-green-50 text-green-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-navy-900">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
