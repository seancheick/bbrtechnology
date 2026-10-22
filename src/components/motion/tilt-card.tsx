"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// A card that leans slightly toward the cursor and lifts, with a soft glare that
// follows it. Mouse only; touch and reduced-motion get a plain card.
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [0, 1], [5, -5]), spring);
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), spring);
  const lift = useSpring(0, spring);
  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(251,191,36,0.10), transparent 45%)`;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={{ rotateX, rotateY, y: lift, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
        lift.set(-6);
      }}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
        lift.set(0);
      }}
    >
      {children}
      <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl" style={{ background: glare }} />
    </motion.div>
  );
}
