"use client";

import { useRef } from "react";
import { ArrowRight, ChevronRight, Layers3, Workflow, Zap } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ShineButton } from "@/components/effects/shine-button";
import { Button } from "@/components/ui/button";

const heroCards = [
  {
    title: "Workflow friction",
    body: "Manual follow-up, disconnected tools, and no clean view of what is actually happening.",
    icon: Workflow,
  },
  {
    title: "B&Br system layer",
    body: "Automation, product logic, and operator-grade interfaces designed to reduce overhead.",
    icon: Layers3,
  },
  {
    title: "Leverage",
    body: "A business that moves faster because the system is finally doing its share of the work.",
    icon: Zap,
  },
];

const proofPoints = [
  "Dedicated engineering team",
  "Custom Web & Mobile Apps",
  "Lightweight Automations",
  "Real, durable code",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.2,
  });

  const gridY = useTransform(smoothProgress, [0, 1], [0, 140]);
  const glowY = useTransform(smoothProgress, [0, 1], [0, 90]);
  const stageY = useTransform(smoothProgress, [0, 1], [0, -50]);
  const stageRotate = useTransform(smoothProgress, [0, 1], [0, -4]);
  const cardYOffset = [
    useTransform(smoothProgress, [0, 1], [0, -16]),
    useTransform(smoothProgress, [0, 1], [0, 10]),
    useTransform(smoothProgress, [0, 1], [0, -24]),
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden border-b border-border pt-28 sm:pt-32 lg:pt-36"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={shouldReduceMotion ? undefined : { y: gridY }}
      >
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:6rem_5rem]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute right-[-14rem] top-16 h-[34rem] w-[34rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-gold-400) 20%, transparent) 0%, transparent 70%)",
          ...(shouldReduceMotion ? {} : { y: glowY }),
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute left-[-10rem] top-40 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-navy-700) 18%, transparent) 0%, transparent 72%)",
          ...(shouldReduceMotion ? {} : { y: glowY }),
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 sm:pb-24 lg:pb-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)] lg:items-center">
          <div>
            <motion.a
              href="#systems-shipped"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground-muted backdrop-blur-sm"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              Custom Software & Automations for Operators
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            <motion.h1
              className="mt-6 max-w-4xl font-[family-name:var(--font-display)] text-5xl font-bold tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Custom software & automations
              <br />
              <span className="text-amber-600">for teams moving fast.</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted sm:text-xl"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              From custom Next.js websites and mobile apps, to simple workflow automations—B&Br builds 
              the technical systems that reduce manual work and help service teams scale without adding chaos.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <ShineButton
                href="https://cal.com/bbrtechnology"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Discovery Call
                <ArrowRight className="ml-1 h-4 w-4" />
              </ShineButton>
              <Button variant="outline" asChild>
                <a href="#systems-shipped">See Systems Shipped</a>
              </Button>
            </motion.div>

            <motion.div
              className="mt-10 border-t border-border pt-6"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground-subtle">
                Built for service businesses, clinics, and operators looking for a team that delivers.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {proofPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-border bg-bg-alt px-3 py-2 text-sm text-foreground-muted"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-[34rem] lg:max-w-none"
            style={shouldReduceMotion ? undefined : { y: stageY, rotate: stageRotate }}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-bg)_88%,transparent),color-mix(in_srgb,var(--color-bg-alt)_82%,transparent))] p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-80" />

              <div className="grid gap-4">
                {heroCards.map((card, index) => {
                  const Icon = card.icon;

                  return (
                    <motion.div
                      key={card.title}
                      className="rounded-[1.5rem] border border-border bg-bg/95 p-5 backdrop-blur-sm"
                      style={shouldReduceMotion ? undefined : { y: cardYOffset[index] }}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.56,
                        delay: 0.18 + index * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-gold-400 dark:bg-navy-800">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
                            {index === 0 ? "Before" : index === 1 ? "Build" : "After"}
                          </div>
                          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-foreground">
                            {card.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                            {card.body}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
