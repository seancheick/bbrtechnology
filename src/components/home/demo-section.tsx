import { SectionHeading } from "@/components/ui/section-heading";
import { InquiryPipeline } from "@/components/demos/inquiry-pipeline";

export function DemoSection() {
  return (
    <section id="demo" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            index="01"
            eyebrow="Live demo"
            title="Watch a customer inquiry become an actionable workflow."
            lede="Pick a business, send a message, and watch it get classified, assigned, routed and answered. It's the same pattern we build into real operations, with a person approving anything that leaves the building."
          />
          <ul className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
            {["Classification", "Task creation", "Alert routing", "Drafted reply", "Human escalation"].map((t) => (
              <li key={t} className="rounded-full border border-border px-3 py-1 text-xs text-foreground-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12">
          <InquiryPipeline />
        </div>
      </div>
    </section>
  );
}
