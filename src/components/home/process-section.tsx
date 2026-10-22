import { processSteps } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProcessSection({ index = "05" }: { index?: string }) {
  return (
    <section className="border-y border-border bg-bg-alt py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index={index}
          eyebrow="How we work"
          title="No surprises, by design."
          lede="A fixed quote before work starts, a working preview every week, and a written definition of done."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <li key={s.step} className="relative rounded-3xl border border-border bg-bg-elevated p-7">
              <span aria-hidden className="font-display text-5xl font-extrabold tabular text-amber-600 dark:text-gold-400">{s.step}</span>
              <h3 className="font-display mt-4 text-2xl font-extrabold text-foreground">{s.title}</h3>
              <p className="eyebrow mt-2 text-amber-600 dark:text-gold-400">{s.duration}</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
