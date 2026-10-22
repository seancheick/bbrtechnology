import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { SectionHeading } from "@/components/ui/section-heading";
import { InquiryPipeline } from "@/components/demos/inquiry-pipeline";
import { ProjectEstimator } from "@/components/demos/project-estimator";
import { ProductPreview } from "@/components/previews";
import { HairlineFigure } from "@/components/ui/hairline-figure";

export const metadata: Metadata = {
  title: "Live demos",
  description:
    "Try a live AI inquiry-triage workflow, a project budget estimator, and interactive previews of products B&Br Technology built.",
  alternates: { canonical: "/demos" },
};

export default function DemosPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-32 sm:pt-40">
        <div className="grid-backdrop pointer-events-none absolute inset-0 text-navy-900 dark:text-white" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="Demos"
            title={
              <>
                Don&apos;t take our word for it. <span className="text-amber-600 dark:text-gold-400">Click around.</span>
              </>
            }
            lede="A live AI workflow, a budget estimator, and interactive rebuilds of products we shipped. Everything here runs on sample data."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold text-foreground">Inquiry → workflow, with live AI</h2>
          <p className="mt-2 max-w-2xl text-foreground-muted">
            A customer message goes in; a classification, task, alert, draft reply and escalation decision come out.
          </p>
          <div className="mt-8">
            <InquiryPipeline />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bg-alt py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold text-foreground">Budget estimator</h2>
          <p className="mt-2 max-w-2xl text-foreground-muted">Ranges come from our published pricing. Indicative, not a quote.</p>
          <div className="mt-8">
            <ProjectEstimator />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Interaction craft"
            title="Small figures, built to answer the pointer."
            lede="Hand-built isometric line figures: hover, drag across, try the slider. The same care goes into the interfaces we build for clients."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <HairlineFigure name="stack" />
            <HairlineFigure name="sorter" />
            <HairlineFigure name="devices" />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Product previews" title="Screens from real products, rebuilt to play with." />
          <div className="mt-14 space-y-20">
            {caseStudies.map((c) => (
              <div key={c.slug}>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="eyebrow text-amber-600">{c.kicker}</p>
                    <h3 className="font-display mt-2 text-3xl font-extrabold text-foreground">{c.name}</h3>
                  </div>
                  <Link href={`/work/${c.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-amber-600">
                    Case study <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <ProductPreview preview={c.preview} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
