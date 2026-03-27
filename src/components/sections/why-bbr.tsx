"use client";

import { motion } from "framer-motion";
import { differentiators, comparisonTable } from "@/data/services";
import { cn } from "@/lib/utils";
import { User, Cpu, Layers, Target } from "lucide-react";

const icons = [User, Cpu, Layers, Target];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function WhyBbr() {
  return (
    <section className="bg-navy-950 py-20 text-white">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section heading */}
        <motion.div className="mb-12 text-center" {...fadeInUp}>
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Why B&amp;Br
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            Built Different
          </h2>
        </motion.div>

        {/* Differentiator cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {differentiators.map((diff, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={diff.title}
                className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-6"
                {...fadeInUp}
                transition={{
                  ...fadeInUp.transition,
                  delay: i * 0.1,
                }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06]">
                  <Icon className="h-5 w-5 text-gold-400" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">
                  {diff.title}
                </h3>
                <p className="mt-1 text-sm text-navy-400">
                  {diff.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Comparison table — wider */}
      <motion.div
        className="mx-auto mt-16 max-w-6xl px-6"
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.4 }}
      >
        <div className="overflow-hidden rounded-xl border border-white/[0.08]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-white/5">
                {comparisonTable.headers.map((header, i) => (
                  <th
                    key={header}
                    className={cn(
                      "px-6 py-4 text-xs font-semibold uppercase tracking-widest",
                      i === 0 ? "text-navy-400" : "text-white",
                      i === 1 && "bg-amber-600/10 text-gold-400"
                    )}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonTable.rows.map((row, rowIdx) => (
                <tr
                  key={row[0]}
                  className={cn(
                    "border-t border-white/[0.06]",
                    rowIdx % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                  )}
                >
                  {row.map((cell, cellIdx) => (
                    <td
                      key={`${row[0]}-${cellIdx}`}
                      className={cn(
                        "px-6 py-4",
                        cellIdx === 0
                          ? "font-medium text-white"
                          : "text-navy-400",
                        cellIdx === 1 && "bg-amber-600/10 font-medium text-gold-400"
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
