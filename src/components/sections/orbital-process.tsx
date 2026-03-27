"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Code, Rocket } from "lucide-react";
import { processSteps } from "@/data/services";
import {
  RadialOrbitalTimeline,
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline";

const stepIcons = [Search, FileText, Code, Rocket] as const;
const stepStatuses: TimelineItem["status"][] = [
  "completed",
  "completed",
  "in-progress",
  "pending",
];
const stepEnergies = [100, 90, 60, 30];

export function OrbitalProcess() {
  const timelineItems: TimelineItem[] = useMemo(
    () =>
      processSteps.map((step, i) => ({
        id: step.id,
        title: step.title,
        date: `Phase ${step.id}`,
        content: step.description,
        category: `Step ${step.id} of ${processSteps.length}`,
        icon: stepIcons[i],
        relatedIds: [
          ...(i > 0 ? [processSteps[i - 1].id] : []),
          ...(i < processSteps.length - 1 ? [processSteps[i + 1].id] : []),
        ],
        status: stepStatuses[i],
        energy: stepEnergies[i],
      })),
    []
  );

  return (
    <section className="bg-navy-950 py-20 text-white">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Our Process
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            How We Work
          </h2>
        </div>

        {/* Desktop: Radial Orbital Timeline */}
        <div className="hidden md:block">
          <div className="mx-auto max-w-xl min-h-[500px]">
            <RadialOrbitalTimeline items={timelineItems} />
          </div>
          {/* Legend */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full border border-gold-400 bg-navy-900" />
              Completed
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-gold-400" />
              In Progress
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full border border-white/20 bg-white/10" />
              Pending
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          <div className="relative border-l-2 border-white/10 pl-8">
            {processSteps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={step.id} className="relative mb-8 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute -left-[calc(1rem+5px)] flex h-8 w-8 items-center justify-center rounded-full border border-gold-400/30 bg-navy-900">
                    <Icon className="h-4 w-4 text-gold-400" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                  >
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-navy-400">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
