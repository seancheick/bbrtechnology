import { featuredTestimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";

export function TestimonialsSection({ index = "06" }: { index?: string }) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index={index}
          eyebrow="Client words"
          title="Operators who stopped chasing their own workflows."
          lede="Clinics, founders and service teams. Initials only, at our clients' request."
        />
        <ul className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
          {featuredTestimonials.map((t) => (
            <li key={t.name} className="mb-6 break-inside-avoid rounded-3xl border border-border bg-bg-elevated p-7">
              <blockquote>
                <p className="text-pretty text-lg leading-relaxed text-foreground">&ldquo;{t.text}&rdquo;</p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-gold-400 dark:bg-white/10">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{t.name}</span>
                    <span className="block text-xs text-foreground-subtle">{t.role}</span>
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
