import { SectionHeading } from "@/components/ui/section-heading";
import { InquiryPipeline } from "@/components/demos/inquiry-pipeline";

export function DemoSection() {
  return (
    <section id="demo" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="See it work"
          title="A message in. A finished workflow out."
          lede="Pick a business: home and property, a clinic, a contractor, an online store, or an enterprise team. Send a message and watch it get sorted, checked against records, handed off and answered, with a person approving every step that matters."
        />
        <div className="mt-10">
          <InquiryPipeline />
        </div>
      </div>
    </section>
  );
}
