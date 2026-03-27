"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ClipboardList,
  UserX,
  BarChart3,
  Zap,
  TrendingUp,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const painPoints = [
  { label: "Manual Tasks", sublabel: "Repetitive work eating your time", icon: ClipboardList },
  { label: "Lost Leads", sublabel: "Prospects falling through cracks", icon: UserX },
  { label: "Bad Analytics", sublabel: "Guessing instead of knowing", icon: BarChart3 },
];

const solutions = [
  { label: "Automation", sublabel: "Systems that run themselves", icon: Zap },
  { label: "Growth", sublabel: "Consistent, measurable results", icon: TrendingUp },
  { label: "Insights", sublabel: "Data-driven decisions", icon: Lightbulb },
];

interface BeamPath {
  id: string;
  d: string;
  direction: "in" | "out";
}

function AnimatedBeamSVG({ paths }: { paths: BeamPath[] }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="beam-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="beam-in" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
          <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="beam-out" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d97706" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </linearGradient>
      </defs>

      {paths.map((beam, i) => (
        <g key={beam.id}>
          {/* Faint background trail */}
          <path
            d={beam.d}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1"
            strokeOpacity="0.06"
          />
          {/* Animated particle beam */}
          <path
            d={beam.d}
            fill="none"
            stroke={beam.direction === "in" ? "url(#beam-in)" : "url(#beam-out)"}
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#beam-glow)"
            style={{
              strokeDasharray: "50 250",
              animation: `beam-${beam.direction} 2.5s linear infinite`,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        </g>
      ))}

      <style>{`
        @keyframes beam-in {
          0% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes beam-out {
          0% { stroke-dashoffset: -300; }
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

    const cr = container.getBoundingClientRect();
    const cenR = center.getBoundingClientRect();
    const cx = cenR.left + cenR.width / 2 - cr.left;
    const cy = cenR.top + cenR.height / 2 - cr.top;

    const newPaths: BeamPath[] = [];

    // Pain points → B&Br (beams flow IN toward center)
    leftRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const sx = r.right - cr.left;
      const sy = r.top + r.height / 2 - cr.top;
      const cpx1 = sx + (cx - sx) * 0.5;
      const cpx2 = cx - (cx - sx) * 0.2;
      newPaths.push({
        id: `in-${i}`,
        d: `M ${sx} ${sy} C ${cpx1} ${sy}, ${cpx2} ${cy}, ${cx} ${cy}`,
        direction: "in",
      });
    });

    // B&Br → Solutions (beams flow OUT from center)
    rightRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const ex = r.left - cr.left;
      const ey = r.top + r.height / 2 - cr.top;
      const cpx1 = cx + (ex - cx) * 0.2;
      const cpx2 = ex - (ex - cx) * 0.5;
      newPaths.push({
        id: `out-${i}`,
        d: `M ${cx} ${cy} C ${cpx1} ${cy}, ${cpx2} ${ey}, ${ex} ${ey}`,
        direction: "out",
      });
    });

    setBeamPaths(newPaths);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(calculatePaths, 150);
    window.addEventListener("resize", calculatePaths);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", calculatePaths);
    };
  }, [calculatePaths]);

  return (
    <section className="bg-bg-alt py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            How It Works
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything Flows Into One System
          </h2>
          <p className="mt-3 text-foreground-muted max-w-xl mx-auto">
            Your pain points flow in. Solutions flow out. B&Br is the engine in the middle.
          </p>
        </div>

        {/* Flow direction labels */}
        <div className="hidden md:flex justify-between items-center max-w-3xl mx-auto mb-4 px-8">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-red-400">
            Problems <ArrowRight className="h-3 w-3" />
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-green-500">
            <ArrowRight className="h-3 w-3" /> Solutions
          </span>
        </div>

        {/* Beam layout — generous spacing */}
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_180px_1fr] md:gap-16 min-h-[320px]"
        >
          {/* SVG beam overlay */}
          <AnimatedBeamSVG paths={beamPaths} />

          {/* Left: Pain points */}
          <div className="flex flex-col items-center gap-6 md:items-end relative z-10">
            {painPoints.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  ref={(el) => { leftRefs.current[i] = el; }}
                  className="flex items-center gap-4 rounded-2xl border border-red-200/60 bg-bg px-5 py-4 shadow-sm w-full max-w-[260px] transition-all duration-300 hover:border-red-300 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-foreground block">
                      {item.label}
                    </span>
                    <span className="text-xs text-foreground-subtle block mt-0.5">
                      {item.sublabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center: B&Br hub */}
          <div className="relative flex items-center justify-center z-10">
            <div
              ref={centerRef}
              className="relative flex h-32 w-32 items-center justify-center rounded-full bg-navy-900 shadow-2xl shadow-navy-900/50"
            >
              {/* Outer glow rings */}
              <div className="absolute inset-[-12px] rounded-full border-2 border-gold-400/25 animate-[pulse-dot_2.5s_ease-in-out_infinite]" />
              <div className="absolute inset-[-24px] rounded-full border border-gold-400/10 animate-[pulse-dot_2.5s_ease-in-out_0.8s_infinite]" />
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-gold-400/10 animate-pulse" />
              <div className="relative text-center">
                <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-gold-400 block">
                  B&amp;Br
                </span>
                <span className="text-[10px] font-medium text-gold-400/60 uppercase tracking-widest">
                  Engine
                </span>
              </div>
            </div>
          </div>

          {/* Right: Solutions */}
          <div className="flex flex-col items-center gap-6 md:items-start relative z-10">
            {solutions.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  ref={(el) => { rightRefs.current[i] = el; }}
                  className="flex items-center gap-4 rounded-2xl border border-green-200/60 bg-bg px-5 py-4 shadow-sm w-full max-w-[260px] transition-all duration-300 hover:border-green-300 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-green-200 bg-green-50 text-green-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-foreground block">
                      {item.label}
                    </span>
                    <span className="text-xs text-foreground-subtle block mt-0.5">
                      {item.sublabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
