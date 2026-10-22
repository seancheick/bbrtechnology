import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/lib/site";
import { categories } from "@/data/services";
import { caseStudies } from "@/data/case-studies";
import { Logo } from "@/components/layout/header";
import { TrackedLink } from "@/components/analytics/tracked-link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="grid-backdrop pointer-events-none absolute inset-0 text-white" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-white/10 py-12 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-400">Have a workflow that&apos;s costing you hours?</p>
            <p className="font-display mt-4 text-3xl font-extrabold leading-[1.02] sm:text-6xl">
              Let&apos;s build the system behind it.
            </p>
            <p className="mt-5 text-navy-400">
              {site.replyPromise} {site.quotePromise}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              cta="footer_book"
              href="/contact#book"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold-400 px-6 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400/90"
            >
              Book a free call <ArrowUpRight className="h-4 w-4" />
            </TrackedLink>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4 md:gap-10 md:py-14">
          <div className="col-span-2 md:col-span-1">
            <Logo className="text-white" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-400">
              Founder-led software studio. Websites, apps, AI and automation. {site.city}.
            </p>
          </div>
          <FooterColumn title="Studio" links={nav.map((n) => ({ href: n.href, label: n.label }))} />
          <FooterColumn
            title="Services"
            links={categories.map((c) => ({ href: `/services#${c.id}`, label: c.name }))}
          />
          <FooterColumn
            title="Projects"
            className="hidden md:block"
            links={caseStudies.slice(0, 5).map((c) => ({ href: `/work/${c.slug}`, label: c.card.type }))}
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={`tel:${site.phone}`} className="hover:text-white">
              {site.phoneDisplay}
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              GitHub
            </a>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links, className }: { title: string; links: { href: string; label: string }[]; className?: string }) {
  return (
    <div className={className}>
      <h2 className="eyebrow text-white/50">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-navy-400 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
