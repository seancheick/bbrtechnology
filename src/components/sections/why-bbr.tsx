"use client";

import { motion } from "framer-motion";
import { differentiators, comparisonTable } from "@/data/services";
import { User, Cpu, Layers, Target, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [User, Cpu, Layers, Target];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

export function WhyBbr() {
  return (
    <section className="border-b border-border bg-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <motion.div className="lg:sticky lg:top-24" {...fadeInUp}>
            <span className="text-sm font-semibold uppercase tracking-widest text-gold-400">
              Built Different
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The advantage is not the tool.
              <br />
              It&apos;s the operator behind it.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-muted">
              Most agencies sell deliverables. B&Br is closer to a founder-side
              systems partner: sharper communication, tighter execution, and a
              stronger bias toward workflows that actually hold up once the
              business gets busy.
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-border bg-bg-alt p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
                What that means in practice
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                Fewer layers, clearer scope, more operational thinking, and less
                tolerance for hype that doesn&apos;t survive contact with the
                business.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {differentiators.map((diff, index) => {
              const Icon = icons[index];

              return (
                <motion.article
                  key={diff.title}
                  className={cn(
                    "flex h-full min-h-[15.5rem] flex-col overflow-hidden rounded-[1.75rem] border border-border p-6 shadow-sm",
                    index === 0
                      ? "bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-bg-alt)_88%,transparent),var(--color-bg))]"
                      : "bg-bg-alt"
                  )}
                  {...fadeInUp}
                  transition={{
                    ...fadeInUp.transition,
                    delay: index * 0.08,
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-gold-400 dark:bg-navy-800">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-foreground">
                    {diff.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {diff.description}
                  </p>

                  {index === 0 ? (
                    <div className="mt-auto pt-5">
                      <div className="rounded-2xl border border-border bg-bg/70 px-4 py-4">
                        <div className="flex items-start gap-2 text-sm font-medium leading-relaxed text-foreground">
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                          You work with the person thinking about the system,
                          not just the ticket queue.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-auto" />
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          className="mt-16 rounded-[2rem] border border-border bg-bg-alt p-5 shadow-sm"
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.24 }}
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(12rem,0.6fr)_minmax(0,1.4fr)]">
            <div className="px-2 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
                Quick comparison
              </div>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-foreground">
                Why operators pick B&Br
              </h3>
            </div>

            <div className="grid gap-3">
              {comparisonTable.rows.map((row) => (
                <motion.div
                  key={row[0]}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="grid items-stretch gap-3 rounded-[1.5rem] border border-border bg-bg p-4 md:grid-cols-[minmax(9rem,0.9fr)_repeat(3,minmax(0,1fr))]"
                >
                  <div className="flex items-center text-xs font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
                    {row[0]}
                  </div>
                  {row.slice(1).map((cell, cellIdx) => (
                    <div
                      key={`${row[0]}-${cellIdx}`}
                      className={cn(
                        "flex min-h-[5.75rem] h-full flex-col justify-between rounded-2xl border px-4 py-3 text-sm leading-relaxed",
                        cellIdx === 0
                          ? "border-emerald-200/80 bg-emerald-50/90 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-50"
                          : "border-rose-200/80 bg-rose-50/85 text-rose-950 dark:border-rose-900/60 dark:bg-rose-950/25 dark:text-rose-100"
                      )}
                    >
                      <div
                        className={cn(
                          "min-h-[2rem] text-[11px] font-semibold uppercase tracking-[0.22em]",
                          cellIdx === 0
                            ? "text-emerald-700 dark:text-emerald-300"
                            : "text-rose-700 dark:text-rose-300"
                        )}
                      >
                        {comparisonTable.headers[cellIdx + 1]}
                      </div>
                      <div className="mt-1 font-medium">
                        {cell}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
