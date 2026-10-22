import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pb-32 pt-40">
      <div className="grid-backdrop pointer-events-none absolute inset-0 text-navy-900 dark:text-white" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="eyebrow text-amber-600">404</p>
        <h1 className="font-display mt-5 text-5xl font-extrabold text-foreground sm:text-7xl">This page isn&apos;t here.</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-foreground-muted">
          The link may be old, or the page moved. These are good places to start.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {[
            ["/", "Home"],
            ["/work", "Work"],
            ["/services", "Services & pricing"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-border bg-bg-elevated px-5 py-2.5 text-sm font-semibold text-foreground hover:border-foreground/30"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
