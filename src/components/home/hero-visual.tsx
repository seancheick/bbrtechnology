"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BellRing, ShieldAlert, Smartphone } from "lucide-react";

// Three real product moments, stacked: a TurnFlow Guardian finding, a demo triage result,
// a PharmaGuide score. Static data drawn from the case studies and demo.
export function HeroVisual() {
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[460px] sm:h-[470px]" aria-hidden>
      <motion.div
        {...enter(0.1)}
        className="absolute left-0 top-0 w-[82%] rounded-2xl bg-[#f4f1ea] p-4 text-[#1d1b18] shadow-[0_30px_60px_-30px_rgba(10,15,26,0.45)] ring-1 ring-black/5"
      >
        <p className="flex items-center gap-2 text-[11px] font-semibold text-[#16423c]">
          <ShieldAlert className="h-3.5 w-3.5" /> TurnFlow · Bookability Guardian
        </p>
        <div className="mt-3 rounded-lg bg-white p-3">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#b43f33] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[9px] uppercase text-white">
              critical
            </span>
            <code className="font-[family-name:var(--font-mono)] text-[10px] text-[#16423c]">missing_price</code>
          </div>
          <p className="mt-1.5 text-xs">153 sellable nights have no price on one rate plan.</p>
        </div>
        <p className="mt-2 text-[10px] text-[#61594f]">25 calendars · 180 days ahead · scanned daily</p>
      </motion.div>

      <motion.div
        {...enter(0.3)}
        className="absolute right-0 top-[34%] w-[78%] rounded-2xl bg-navy-900 p-4 text-white shadow-[0_40px_80px_-30px_rgba(10,15,26,0.7)] ring-1 ring-white/10"
      >
        <p className="eyebrow text-gold-400">Inquiry → workflow</p>
        <p className="mt-2 text-sm text-white/80">&ldquo;The bathroom sink is leaking and there&apos;s water on the floor.&rdquo;</p>
        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-semibold">
          <span className="rounded bg-white/10 px-2 py-1">maintenance</span>
          <span className="rounded bg-red-500/20 px-2 py-1 text-red-300">urgent</span>
          <span className="rounded bg-white/10 px-2 py-1">task created</span>
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs text-white/70">
          <Smartphone className="h-3.5 w-3.5 text-gold-400" /> SMS → Maintenance lead
          <BellRing className="ml-auto h-3.5 w-3.5 text-gold-400" />
        </p>
      </motion.div>

      <motion.div
        {...enter(0.5)}
        className="absolute bottom-0 left-[6%] w-[62%] rounded-2xl bg-white p-4 text-[#0b1b3a] shadow-[0_30px_60px_-30px_rgba(10,15,26,0.45)] ring-1 ring-black/5"
      >
        <p className="text-[11px] font-semibold text-[#2563eb]">PharmaGuide · example score</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="font-display text-4xl font-extrabold tabular text-[#2563eb]">81</span>
          <span className="pb-1.5 text-xs text-[#5b6b8c]">/ 100 · six pillars</span>
        </div>
        <div className="mt-2 grid grid-cols-6 gap-1">
          {[85, 80, 70, 87, 80, 90].map((w, i) => (
            <div key={i} className="h-1.5 overflow-hidden rounded-full bg-[#e8eefb]">
              <div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
