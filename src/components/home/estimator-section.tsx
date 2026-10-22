import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectEstimator } from "@/components/demos/project-estimator";

export function EstimatorSection({ index = "04" }: { index?: string }) {
  return (
    <section id="estimate" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index={index}
          eyebrow="Budget estimator"
          title="Know the ballpark before the call."
          lede="Pick what you're building and how big it is. The ranges come straight from our published prices."
        />
        <div className="mt-12">
          <ProjectEstimator />
        </div>
      </div>
    </section>
  );
}
