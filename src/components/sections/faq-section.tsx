"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqCategories, faqData } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const categoryKeys = Object.keys(faqCategories);
  const [activeCategory, setActiveCategory] = useState(categoryKeys[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setOpenIndex(null);
  };

  const items = faqData[activeCategory] || [];

  return (
    <section className="border-t border-border bg-bg-alt py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            FAQ
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            The questions founders ask before they hire us.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-muted">
            Pricing, timelines, website rebuilds, AI automation, technical SEO,
            support, and what working together actually looks like.
          </p>

          <div className="mt-8 rounded-[1.75rem] border border-border bg-bg p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
              What this covers
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "AI automation",
                "website cost",
                "SEO rebuilds",
                "lead capture",
                "retainers",
                "launch timelines",
              ].map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-border bg-bg-alt px-3 py-1.5 text-xs font-medium text-foreground-muted"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
                Next steps
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link
                  href="/services"
                  className="font-medium text-foreground transition-colors hover:text-amber-600"
                >
                  Explore services
                </Link>
                <Link
                  href="/about"
                  className="font-medium text-foreground transition-colors hover:text-amber-600"
                >
                  See proof and founder background
                </Link>
                <Link
                  href="/contact"
                  className="font-medium text-foreground transition-colors hover:text-amber-600"
                >
                  Book a discovery call
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-8 flex flex-wrap gap-2">
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === key
                    ? "bg-navy-900 text-gold-400 dark:bg-gold-400 dark:text-navy-950"
                    : "border border-border text-foreground-muted hover:bg-bg hover:text-foreground"
                )}
              >
                {faqCategories[key]}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {items.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={item.question}
                    className={cn(
                      "rounded-[1.5rem] border transition-colors",
                      isOpen
                        ? "border-border bg-bg dark:border-white/10"
                        : "border-border bg-bg-alt dark:border-white/5"
                    )}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="pr-4 text-base font-medium leading-relaxed text-foreground">
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
                      >
                        <Plus className="h-4 w-4 text-foreground-subtle" />
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1] as const,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-sm leading-7 text-foreground-muted">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
