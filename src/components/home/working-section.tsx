import { processSteps } from "@/data/services";
import { featuredTestimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";

export function WorkingSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-24">
      <div className="grid-backdrop pointer-events-none absolute inset-0 text-white" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          tone="inverse"
          eyebrow="Working with us"
          title="Clear steps. No surprises."
          lede="You talk to the person building your system, see working software every week, and get a written definition of done."
        />
        <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {processSteps.map((s) => (
            <li key={s.step} className="border-t border-white/15 pt-4">
              <p className="tabular eyebrow text-gold-400">{s.step} · {s.duration}</p>
              <h3 className="font-display mt-2 text-xl font-extrabold">{s.title}</h3>
              <p className="mt-2 hidden text-sm leading-relaxed text-navy-400 sm:block">{s.body}</p>
            </li>
          ))}
        </ol>

        <h3 className="eyebrow mt-14 text-white/60">What clients say</h3>
        <ul className="-mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {featuredTestimonials.slice(0, 3).map((t) => (
            <li key={t.name} className="w-[84%] shrink-0 snap-start rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:w-auto">
              <blockquote>
                <p className="text-pretty leading-relaxed text-white/90">&ldquo;{t.text}&rdquo;</p>
                <footer className="mt-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-navy-950">
                    {t.initials}
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-navy-400">{t.role}</span>
                  </span>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
