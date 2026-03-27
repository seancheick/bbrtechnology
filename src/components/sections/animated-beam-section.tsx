"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ClipboardList,
  UserX,
  BarChart3,
  Zap,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

interface BeamPath {
  id: string;
  d: string;
  reverse: boolean;
}

function AnimatedBeamSVG({ paths }: { paths: BeamPath[] }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Glow filter */}
        <filter id="beam-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gradient for left-to-center beams */}
        <linearGradient id="beam-gradient-ltr" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
        </linearGradient>
        {/* Gradient for center-to-right beams */}
        <linearGradient id="beam-gradient-rtl" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {paths.map((beam) => (
        <g key={beam.id}>
          {/* Background trail */}
          <path
            d={beam.d}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1"
            strokeOpacity="0.08"
          />
          {/* Animated beam */}
          <path
            d={beam.d}
            fill="none"
            stroke={beam.reverse ? "url(#beam-gradient-rtl)" : "url(#beam-gradient-ltr)"}
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#beam-glow)"
            className="beam-animated"
            style={{
              strokeDasharray: "40 200",
              animation: `beam-flow-${beam.reverse ? "reverse" : "forward"} 3s linear infinite`,
              animationDelay: `${parseInt(beam.id.slice(-1)) * 0.4}s`,
            }}
          />
        </g>
      ))}

      <style>{`
        @keyframes beam-flow-forward {
          0% { stroke-dashoffset: 240; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes beam-flow-reverse {
          0% { stroke-dashoffset: -240; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}

export function AnimatedBeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [beamPaths, setBeamPaths] = useState<BeamPath[]>([]);

  const calculatePaths = useCallback(() => {
    const container = containerRef.current;
    const center = centerRef.current;
    if (!container || !center) return;

    const containerRect = container.getBoundingClientRect();
    const centerRect = center.getBoundingClientRect();
    const cx = centerRect.left + centerRect.width / 2 - containerRect.left;
    const cy = centerRect.top + centerRect.height / 2 - containerRect.top;

    const newPaths: BeamPath[] = [];

    // Left nodes to center
    leftRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sx = rect.right - containerRect.left;
      const sy = rect.top + rect.height / 2 - containerRect.top;
      // Cubic bezier curving right then into center
      const cpx1 = sx + (cx - sx) * 0.4;
      const cpy1 = sy;
      const cpx2 = cx - (cx - sx) * 0.3;
      const cpy2 = cy;
      newPaths.push({
        id: `left-${i}`,
        d: `M ${sx} ${sy} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${cx} ${cy}`,
        reverse: false,
      });
    });

    // Center to right nodes
    rightRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ex = rect.left - containerRect.left;
      const ey = rect.top + rect.height / 2 - containerRect.top;
      const cpx1 = cx + (ex - cx) * 0.3;
      const cpy1 = cy;
      const cpx2 = ex - (ex - cx) * 0.4;
      const cpy2 = ey;
      newPaths.push({
        id: `right-${i}`,
        d: `M ${cx} ${cy} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${ex} ${ey}`,
        reverse: true,
      });
    });

    setBeamPaths(newPaths);
  }, []);

  useEffect(() => {
    // Initial calculation after a brief delay for layout
    const timeout = setTimeout(calculatePaths, 100);
    window.addEventListener("resize", calculatePaths);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", calculatePaths);
    };
  }, [calculatePaths]);

  return (
    <section className="bg-bg-alt py-20 overflow-hidden">
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

        {/* Beam layout */}
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr]"
        >
          {/* SVG beam overlay */}
          <AnimatedBeamSVG paths={beamPaths} />

          {/* Left: Pain points */}
          <div className="flex flex-col items-center gap-8 md:items-end relative z-10">
            {painPoints.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  ref={(el) => { leftRefs.current[i] = el; }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-bg px-5 py-4 shadow-sm transition-all duration-300 hover:border-red-300 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-navy-900">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center: B&Br hub */}
          <div className="relative flex items-center justify-center py-8 z-10">
            <div
              ref={centerRef}
              className="relative flex h-28 w-28 items-center justify-center rounded-full bg-navy-900 shadow-xl shadow-navy-900/40"
            >
              {/* Pulsing glow rings */}
              <div className="absolute inset-[-8px] rounded-full border-2 border-gold-400/30 animate-[pulse-dot_2s_ease-in-out_infinite]" />
              <div className="absolute inset-[-16px] rounded-full border border-gold-400/15 animate-[pulse-dot_2s_ease-in-out_0.5s_infinite]" />
              <div className="absolute inset-0 rounded-full bg-gold-400/10 animate-pulse" />
              <span className="relative font-[family-name:var(--font-display)] text-2xl font-extrabold text-gold-400">
                B&amp;Br
              </span>
            </div>
          </div>

          {/* Right: Solutions */}
          <div className="flex flex-col items-center gap-8 md:items-start relative z-10">
            {solutions.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  ref={(el) => { rightRefs.current[i] = el; }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-bg px-5 py-4 shadow-sm transition-all duration-300 hover:border-green-300 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-green-200 bg-green-50 text-green-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-navy-900">
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
