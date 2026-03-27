"use client";

import { motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Split testimonials into 3 columns
const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(3, 6);
const col3 = testimonials.slice(6, 9);

function TestimonialCard({
  text,
  name,
  role,
  image,
}: {
  text: string;
  name: string;
  role: string;
  image: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-bg dark:bg-bg-alt p-6">
      <p className="text-sm leading-relaxed text-foreground-muted">
        &ldquo;{text}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3">
        <Image
          src={image}
          alt={name}
          width={36}
          height={36}
          className="rounded-full"
        />
        <div>
          <div className="text-sm font-medium text-foreground">{name}</div>
          <div className="text-xs text-foreground-subtle">{role}</div>
        </div>
      </div>
    </div>
  );
}

function ScrollColumn({
  items,
  duration,
  className,
  reducedMotion,
}: {
  items: typeof testimonials;
  duration: number;
  className?: string;
  reducedMotion?: boolean;
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  if (reducedMotion) {
    return (
      <div
        className={cn(
          "relative overflow-hidden",
          "[mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]",
          className
        )}
        style={{ height: 500 }}
      >
        <div className="flex flex-col gap-4">
          {items.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} {...t} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "[mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]",
        className
      )}
      style={{ height: 500 }}
    >
      <motion.div
        className="flex flex-col gap-4"
        animate={{ y: [0, -(items.length * (160 + 16))] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} {...t} />
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            Testimonials
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Our Clients Say
          </h2>
        </div>

        {/* 3-column scrolling testimonials */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ScrollColumn items={col1} duration={15} reducedMotion={!!prefersReducedMotion} />
          <ScrollColumn
            items={col2}
            duration={19}
            className="hidden md:block"
            reducedMotion={!!prefersReducedMotion}
          />
          <ScrollColumn
            items={col3}
            duration={17}
            className="hidden lg:block"
            reducedMotion={!!prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
