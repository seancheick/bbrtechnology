"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Compass, DraftingCompass, Hammer, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    phase: "Step 1",
    title: "Discovery call",
    description:
      "A quick alignment call to understand your operational friction and see if we're the right engineering partner.",
    outcome: "We decide if it makes sense to dig deeper.",
    icon: Compass,
  },
  {
    phase: "Step 2",
    title: "Workflow breakdown",
    description:
      "We map the bottlenecks, handoffs, and revenue-critical workflows before touching implementation.",
    outcome: "You leave with a clearer system map and a sharper scope.",
    icon: LineChart,
  },
  {
    phase: "Step 3",
    title: "System design",
    description:
      "We define the product shape, automation logic, and the exact system your team will operate inside.",
    outcome: "You know exactly what gets built, how it works, and why.",
    icon: DraftingCompass,
  },
  {
    phase: "Step 4",
    title: "Build + iteration",
    description:
      "We ship the tool, connect it to your workflows, and tighten the weak points based on real-world use.",
    outcome: "You get a working system, not a frozen mockup.",
    icon: Hammer,
  },
];

const stairOffsets = [
  "",
  "lg:ml-[2.75rem] lg:max-w-[calc(100%-2.75rem)]",
  "lg:ml-[5.5rem] lg:max-w-[calc(100%-5.5rem)]",
  "lg:ml-[8.25rem] lg:max-w-[calc(100%-8.25rem)]",
];

export function ProcessRoadmap() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border bg-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
              Our Process
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              How We Work
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-muted">
              We build the system layer that sits between your tools and your operations. 
              Clear phases, tight feedback loops, and no mystery handoffs. The goal is to 
              ship a system your business can actually run on.
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-border bg-bg-alt p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
                Typical engagement
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                2–6 weeks to launch the core system.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                The exact timeline depends on scope, but every phase is designed
                to reduce ambiguity and move quickly without improvising the
                architecture.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[1.25rem] top-6 hidden h-[calc(100%-3rem)] w-px bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-gold-400)_55%,transparent),transparent)] md:block" />

            <div className="grid gap-5">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.article
                    key={step.title}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                    className={cn(
                      "relative overflow-hidden rounded-[1.75rem] border border-border bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-bg-alt)_85%,transparent),var(--color-bg))] p-6 shadow-sm",
                      stairOffsets[index]
                    )}
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-start">
                      <div className="flex items-center gap-4 md:min-w-[11rem] md:flex-col md:items-start">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy-900 text-gold-400 dark:bg-navy-800">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
                            {step.phase}
                          </div>
                          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-foreground">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className="text-sm leading-relaxed text-foreground-muted">
                          {step.description}
                        </p>
                        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-bg px-4 py-4">
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                          <p className="text-sm leading-relaxed text-foreground">
                            {step.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
