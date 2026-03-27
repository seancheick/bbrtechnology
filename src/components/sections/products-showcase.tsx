import { ArrowRight, LockKeyhole, Sparkles } from "lucide-react";
import { featuredProjects } from "@/data/portfolio";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/scroll-reveal";

const [flagship, ...supporting] = featuredProjects;

export function ProductsShowcase() {
  return (
    <section id="systems-shipped" className="border-y border-border bg-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <ScrollReveal className="lg:sticky lg:top-24">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-amber-600">
              <Sparkles className="h-4 w-4" />
              Systems Shipped
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Product Proof Before
              <br />
              We Start Explaining.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-muted">
              Before the diagrams and differentiators, this is the work. Real
              systems for healthcare, field operations, and hospitality
              workflows. Built to reduce manual work, tighten execution, and
              give operators clearer control.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-foreground-muted sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-bg-alt px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                  What this proves
                </div>
                <p className="mt-2 leading-relaxed">
                  B&Br can ship products, internal tools, and workflow systems
                  with actual business constraints.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-bg-alt px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                  Why it matters
                </div>
                <p className="mt-2 leading-relaxed">
                  Visitors see proof of execution before they have to trust the
                  positioning.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-4 lg:grid-cols-5">
            {flagship ? (
              <StaggerItem className="lg:col-span-3">
                <article className="group relative overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-bg-alt)_78%,transparent),var(--color-bg))] p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-600 via-gold-400 to-amber-600" />
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-border bg-bg px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-subtle">
                      {flagship.category}
                    </span>
                    {flagship.stage ? (
                      <span className="rounded-full border border-amber-600/20 bg-amber-600/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-600">
                        {flagship.stage}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-6 max-w-xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground">
                    {flagship.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground-muted">
                    {flagship.description}
                  </p>

                  {flagship.impact ? (
                    <div className="mt-6 rounded-2xl border border-border bg-bg px-5 py-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                        Why it stands out
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">
                        {flagship.impact}
                      </p>
                    </div>
                  ) : null}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {flagship.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-foreground-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </StaggerItem>
            ) : null}

            <div className="grid gap-4 lg:col-span-2">
              {supporting.map((project) => (
                <StaggerItem key={project.title}>
                  <article className="relative overflow-hidden rounded-[1.75rem] border border-border bg-bg-alt p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full border border-border bg-bg px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
                        {project.category}
                      </span>
                      <LockKeyhole className="h-4 w-4 text-foreground-subtle" />
                    </div>

                    <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                      {project.description}
                    </p>

                    {project.impact ? (
                      <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-foreground">
                        {project.impact}
                      </p>
                    ) : null}

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-foreground-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>

        <ScrollReveal className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm text-foreground-muted">
          <p className="max-w-2xl">
            These are the kinds of systems behind the homepage claims: product
            logic, operational tooling, and automation layers built for real
            teams.
          </p>
          <a
            href="/about"
            className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-amber-600"
          >
            More work and background
            <ArrowRight className="h-4 w-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
