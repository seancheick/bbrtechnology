import { Plus } from "lucide-react";
import { faqItems, type FaqItem } from "@/data/faq";
import { SectionHeading } from "@/components/ui/section-heading";

export function FaqSection({ index = "07", items = faqItems }: { index?: string; items?: FaqItem[] }) {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <SectionHeading
          index={index}
          eyebrow="FAQ"
          title="Questions people ask before hiring us."
          lede="Anything else, ask on the call. You'll get a straight answer."
        />
        <div className="divide-y divide-border border-y border-border">
          {items.map((f) => (
            <details key={f.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                {f.question}
                <Plus className="h-5 w-5 shrink-0 text-foreground-subtle transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-foreground-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
