"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { processSteps } from "@/data/services";
import { cn } from "@/lib/utils";

const ORBIT_RADIUS = 140;
const AUTO_ROTATE_INTERVAL = 3000;

export function OrbitalProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotation
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev + 90);
    }, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [paused]);

  const handleNodeClick = useCallback(
    (stepId: number) => {
      if (activeStep === stepId) {
        setActiveStep(null);
        setPaused(false);
      } else {
        setActiveStep(stepId);
        setPaused(true);
      }
    },
    [activeStep]
  );

  // Desktop orbital positions
  const getNodePosition = (index: number) => {
    const angle = ((index * 90 + rotation) * Math.PI) / 180;
    return {
      x: Math.cos(angle) * ORBIT_RADIUS,
      y: Math.sin(angle) * ORBIT_RADIUS,
    };
  };

  return (
    <section className="bg-navy-950 py-20 text-white">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Our Process
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            How We Work
          </h2>
        </div>

        {/* Desktop orbital */}
        <div className="hidden md:flex flex-col items-center">
          <div className="relative" style={{ width: 340, height: 340 }}>
            {/* Orbit ring */}
            <div className="absolute inset-0 rounded-full border border-white/10" />

            {/* Center pulsing core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-400/30 to-amber-600/30">
                <div className="absolute inset-0 animate-pulse rounded-full bg-gold-400/20" />
                <span className="relative font-[family-name:var(--font-display)] text-sm font-bold text-gold-400">
                  B&amp;Br
                </span>
              </div>
            </div>

            {/* Orbital nodes */}
            {processSteps.map((step, i) => {
              const pos = getNodePosition(i);
              const isActive = activeStep === step.id;

              return (
                <motion.button
                  key={step.id}
                  className={cn(
                    "absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-sm font-bold transition-colors",
                    isActive
                      ? "border-gold-400 bg-gold-400 text-navy-950"
                      : "border-white/20 bg-navy-900 text-white hover:border-gold-400/50"
                  )}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                  onClick={() => handleNodeClick(step.id)}
                >
                  {step.id}
                </motion.button>
              );
            })}
          </div>

          {/* Active step detail card */}
          <AnimatePresence>
            {activeStep && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="mt-8 w-full max-w-md rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 text-center"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-gold-400">
                  Step {activeStep}:{" "}
                  {processSteps.find((s) => s.id === activeStep)?.title}
                </h3>
                <p className="mt-2 text-sm text-navy-400">
                  {processSteps.find((s) => s.id === activeStep)?.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          <div className="relative border-l-2 border-white/10 pl-8">
            {processSteps.map((step, i) => (
              <div key={step.id} className="relative mb-8 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute -left-[calc(1rem+5px)] flex h-8 w-8 items-center justify-center rounded-full border border-gold-400/30 bg-navy-900 text-sm font-bold text-gold-400">
                  {step.id}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
