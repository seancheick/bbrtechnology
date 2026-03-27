"use client";

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
    <section className="bg-bg-alt py-20">
      <div className="mx-auto max-w-3xl px-6">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-foreground-muted">
            Everything you need to know before we start working together.
          </p>
        </div>

        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === key
                  ? "bg-navy-900 text-gold-400"
                  : "border border-border text-foreground-muted hover:bg-bg hover:text-foreground"
              )}
            >
              {faqCategories[key]}
            </button>
          ))}
        </div>

        {/* FAQ accordion */}
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
                    "rounded-xl border transition-colors",
                    isOpen
                      ? "border-border bg-bg"
                      : "border-border bg-bg-alt"
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="pr-4 text-sm font-medium text-foreground">
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
                        <div className="px-6 pb-4 text-sm leading-relaxed text-foreground-muted">
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
    </section>
  );
}
