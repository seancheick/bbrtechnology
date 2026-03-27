"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServicesGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            What We Build
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Systems Built to Scale
          </h2>
        </div>

        {/* Grid: 2x2 + 1 full-width */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            const isExpanded = expandedId === service.id;
            const isFullWidth = service.id === "it-support";

            return (
              <motion.div
                layout
                key={service.id}
                className={cn(
                  "group cursor-pointer rounded-xl border border-border p-6 transition-colors hover:border-navy-400/40",
                  isFullWidth && "md:col-span-2"
                )}
                onClick={() => toggle(service.id)}
              >
                <motion.div layout="position">
                  {/* Icon + label */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900">
                        <Icon className="h-5 w-5 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-navy-900">
                          {service.title}
                        </h3>
                        <span className="text-xs font-medium text-amber-600">
                          {service.label}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-amber-600">
                      {isExpanded ? "- Collapse" : "+ Expand"}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="mt-3 text-sm text-navy-600">
                    {service.tagline}
                  </p>
                </motion.div>

                {/* Expandable content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 border-t border-border pt-4">
                        <p className="text-sm text-navy-600">
                          {service.description}
                        </p>

                        <h4 className="mt-4 text-xs font-semibold uppercase tracking-widest text-navy-400">
                          What We Deliver
                        </h4>
                        <ul className="mt-2 space-y-1.5">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-navy-600"
                            >
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                              {item}
                            </li>
                          ))}
                        </ul>

                        <h4 className="mt-4 text-xs font-semibold uppercase tracking-widest text-navy-400">
                          Who This Is For
                        </h4>
                        <p className="mt-2 text-sm text-navy-600">
                          {service.audience}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
