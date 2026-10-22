import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { formatUsd, getOffer } from "@/data/services";
import { siteUrl } from "@/lib/site";
import { SpecBadge, StatusDot } from "@/components/ui/spec-badge";
import { ProductPreview } from "@/components/previews";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return {
    title: `${c.name}: ${c.headline}`,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: { title: `${c.name} case study`, description: c.summary, url: `/work/${c.slug}` },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  const index = caseStudies.findIndex((x) => x.slug === c.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${c.name}: ${c.headline}`,
    description: c.summary,
    url: `${siteUrl}/work/${c.slug}`,
    creator: { "@id": `${siteUrl}/#organization` },
    keywords: c.stack.join(", "),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="relative overflow-hidden pb-14 pt-32 sm:pt-40">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full opacity-[0.04] blur-3xl"
          style={{ background: c.accent }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="eyebrow text-foreground-muted">
            <Link href="/work" className="hover:text-foreground">
              Work
            </Link>{" "}
            / <span className="text-foreground-muted">{c.name}</span>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="eyebrow text-amber-600">{c.kicker}</span>
            <SpecBadge label={c.attribution} />
            <StatusDot status={c.status} className="text-foreground-muted" />
          </div>
          <h1 className="font-display mt-5 text-6xl font-extrabold leading-[0.95] text-foreground sm:text-8xl">{c.name}</h1>
          <p className="font-display mt-5 max-w-3xl text-balance text-2xl font-bold text-foreground sm:text-3xl">{c.headline}</p>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground-muted">{c.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {c.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  i === 0
                    ? "inline-flex h-11 items-center gap-1.5 rounded-full bg-navy-900 px-5 text-sm font-semibold text-gold-400 hover:bg-navy-800 dark:bg-gold-400 dark:text-navy-950"
                    : "inline-flex h-11 items-center gap-1.5 rounded-full border border-border px-5 text-sm font-semibold text-foreground hover:border-foreground/30"
                }
              >
                {l.label} <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-foreground-subtle">
            <span className="font-semibold text-foreground-muted">Our role:</span> {c.role}
          </p>
        </div>
      </header>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ProductPreview preview={c.preview} />
          <p className="mt-3 text-center text-xs text-foreground-subtle">
            Interactive preview rebuilt from the real {c.name} screen, with sample data. Not connected to production.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-bg-alt py-14">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {c.facts.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-display text-4xl font-extrabold tabular text-foreground sm:text-5xl">{f.value}</dd>
              <dd className="mt-2 text-sm text-foreground-muted">{f.label}</dd>
            </div>
          ))}
        </dl>
        <p className="mx-auto mt-8 max-w-7xl px-4 text-xs text-foreground-subtle sm:px-6 lg:px-8">Figures from the {c.source}.</p>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="eyebrow text-amber-600">The problem</p>
            <p className="font-display mt-4 text-balance text-3xl font-extrabold leading-tight text-foreground">{c.problem}</p>
          </div>
          <div>
            <p className="eyebrow text-amber-600">What we built</p>
            <ul className="mt-4 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
              {c.built.map((b) => (
                <li key={b.title} className="bg-bg-elevated p-6">
                  <h2 className="font-display text-lg font-extrabold text-foreground">{b.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-24 text-white">
        <div className="grid-backdrop pointer-events-none absolute inset-0 text-white" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-gold-400">Architecture</p>
          <h2 className="font-display mt-4 text-4xl font-extrabold">How it fits together</h2>
          <ol className="mt-12 flex flex-col gap-3 lg:flex-row lg:items-stretch">
            {c.architecture.map((layer, i) => (
              <li key={layer.name} className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center">
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="eyebrow text-white/50">{layer.name}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-white/90">
                    {layer.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
                {i < c.architecture.length - 1 && (
                  <ArrowRight className="mx-auto h-4 w-4 shrink-0 rotate-90 text-gold-400 lg:rotate-0" aria-hidden />
                )}
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap gap-2">
            {c.stack.map((s) => (
              <SpecBadge key={s} label={s} tone="inverse" />
            ))}
          </div>
        </div>
      </section>

      {(c.outcomes?.length || c.caveat) && (
        <section className="border-b border-border py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            {c.outcomes && c.outcomes.length > 0 && (
              <div>
                <p className="eyebrow text-amber-600">Outcomes</p>
                <ul className="mt-5 space-y-5">
                  {c.outcomes.map((o) => (
                    <li key={o.label} className="flex items-baseline gap-4">
                      <span className="font-display text-4xl font-extrabold tabular text-foreground">{o.value}</span>
                      <span className="text-foreground-muted">
                        {o.label} <span className="text-xs text-foreground-subtle">({o.note})</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {c.caveat && (
              <p className="flex gap-3 self-start rounded-2xl border border-border bg-bg-alt p-5 text-sm text-foreground-muted">
                <Info className="mt-0.5 h-4 w-4 shrink-0" /> {c.caveat}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-foreground-subtle">Want something like this?</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {c.proves.map((id) => {
              const o = getOffer(id);
              return (
                <Link
                  key={id}
                  href={`/contact?offer=${id}#message`}
                  className="group flex items-center justify-between rounded-2xl border border-border bg-bg-elevated p-5 hover:border-foreground/25"
                >
                  <span>
                    <span className="block font-semibold text-foreground">{o.name}</span>
                    <span className="text-sm text-foreground-subtle">from {formatUsd(o.from)}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-foreground-subtle transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
          <Link
            href={`/work/${next.slug}`}
            className="group mt-16 flex flex-col gap-2 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between"
          >
            <span>
              <span className="eyebrow text-foreground-subtle">Next case study</span>
              <span className="font-display mt-2 block text-4xl font-extrabold text-foreground sm:text-6xl">{next.name}</span>
            </span>
            <ArrowUpRight className="h-10 w-10 text-foreground-subtle transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </article>
  );
}
