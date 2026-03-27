"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const displayOrder = [
  "ai-automation",
  "web-mobile",
  "data-analytics",
  "seo-growth",
  "it-support",
];

// Bento grid positions: automation leads, web/mobile supports the system
const gridConfig: Record<
  string,
  { className: string; accent?: boolean; large?: boolean }
> = {
  "web-mobile": {
    className: "md:col-span-1 md:row-span-1",
  },
  "ai-automation": {
    className: "md:col-span-2 md:row-span-1",
    accent: true,
    large: true,
  },
  "seo-growth": {
    className: "md:col-span-1 md:row-span-1",
  },
  "data-analytics": {
    className: "md:col-span-1 md:row-span-1",
  },
  "it-support": {
    className: "md:col-span-1 md:row-span-1",
  },
};

export function ServicesGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const orderedServices = displayOrder
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is (typeof services)[number] => !!service);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            Where We Create Leverage
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Automation First.
            <br />
            Everything Else Supports It.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground-muted">
            We lead with workflow automation because that is usually where the
            fastest operational gains live. Websites, apps, analytics, and
            support layers are built around that core.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {orderedServices.map((service) => {
            const Icon = service.icon;
            const isExpanded = expandedId === service.id;
            const config = gridConfig[service.id] ?? { className: "" };
            const isAccent = config.accent;
            const isLarge = config.large;

            return (
              <motion.div
                layout
                key={service.id}
                className={cn(
                  "group relative cursor-pointer rounded-2xl border p-6 transition-all duration-300",
                  // Base styles
                  "hover:scale-[1.02] hover:shadow-lg",
                  // Grid positioning
                  config.className,
                  // Accent card (AI & Automation)
                  isAccent
                    ? "border-amber-600/40 bg-gradient-to-br from-amber-600/[0.06] to-gold-400/[0.03] shadow-md shadow-amber-600/10 hover:border-amber-600/60 hover:shadow-amber-600/20"
                    : "border-border bg-bg hover:border-navy-400/40 hover:shadow-navy-900/5",
                  // Large card (Web & Mobile)
                  isLarge && "bg-gradient-to-br from-navy-900/[0.03] to-transparent"
                )}
                onClick={() => toggle(service.id)}
              >
                {/* Subtle pattern on large/accent cards */}
                {(isLarge || isAccent) && (
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div
                      className={cn(
                        "absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-[0.04]",
                        isAccent ? "bg-amber-600" : "bg-navy-900"
                      )}
                    />
                    <div
                      className={cn(
                        "absolute -bottom-4 -left-4 h-24 w-24 rounded-full opacity-[0.03]",
                        isAccent ? "bg-gold-400" : "bg-navy-800"
                      )}
                    />
                  </div>
                )}

                <motion.div layout="position" className="relative z-10">
                  {/* Icon area */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "flex items-center justify-center rounded-xl bg-navy-900 dark:bg-navy-800",
                          isLarge || isAccent
                            ? "h-14 w-14"
                            : "h-11 w-11"
                        )}
                      >
                        <Icon
                          className={cn(
                            "text-gold-400",
                            isLarge || isAccent ? "h-7 w-7" : "h-5 w-5"
                          )}
                        />
                      </div>
                      <div>
                        <h3
                          className={cn(
                            "font-[family-name:var(--font-display)] font-bold text-foreground",
                            isLarge ? "text-xl" : "text-lg"
                          )}
                        >
                          {service.title}
                        </h3>
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            isAccent ? "text-amber-600" : "text-amber-600/70"
                          )}
                        >
                          {service.label}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                        isExpanded
                          ? "bg-navy-900 text-gold-400"
                          : "bg-bg-alt text-foreground-muted group-hover:bg-navy-900 group-hover:text-gold-400"
                      )}
                    >
                      {isExpanded ? "Less" : "More"}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p
                    className={cn(
                      "mt-4 text-sm leading-relaxed text-foreground-muted",
                      isLarge && "md:max-w-lg"
                    )}
                  >
                    {service.tagline}
                  </p>

                  {/* Accent glow line for AI card */}
                  {isAccent && (
                    <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
                  )}
                </motion.div>

                {/* Expandable content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="mt-4 border-t border-border pt-4">
                        <p className="text-sm leading-relaxed text-foreground-muted">
                          {service.description}
                        </p>

                        <h4 className="mt-4 text-xs font-semibold uppercase tracking-widest text-foreground-subtle">
                          What We Deliver
                        </h4>
                        <ul className="mt-2 space-y-1.5">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-foreground-muted"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                              {item}
                            </li>
                          ))}
                        </ul>

                        <h4 className="mt-4 text-xs font-semibold uppercase tracking-widest text-foreground-subtle">
                          Who This Is For
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
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
