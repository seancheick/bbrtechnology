"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav } from "@/lib/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TrackedLink } from "@/components/analytics/tracked-link";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display inline-flex items-baseline text-xl font-extrabold", className)}>
      B&amp;Br
      <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-600" aria-hidden />
      <span className="sr-only"> Technology</span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-b border-border bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-foreground" aria-label="B&Br Technology home">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-bg-alt text-foreground"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle compact />
          <TrackedLink
            cta="header_book"
            href="/contact#book"
            className="group inline-flex h-10 items-center gap-1.5 rounded-full bg-navy-900 pl-4 pr-3 text-sm font-medium text-gold-400 transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:bg-gold-400 dark:text-navy-950 dark:hover:bg-gold-400/90"
          >
            Book a call
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </TrackedLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle compact />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-border bg-bg px-4 pb-6 pt-2 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="font-display flex items-center justify-between border-b border-border py-4 text-2xl font-bold text-foreground"
            >
              {item.label}
              <ArrowUpRight className="h-5 w-5 text-foreground-subtle" />
            </Link>
          ))}
        </nav>
        <TrackedLink
          cta="mobile_book"
          href="/contact#book"
          onClick={() => setOpen(false)}
          className="mt-6 flex h-12 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-gold-400 dark:bg-gold-400 dark:text-navy-950"
        >
          Book a free 30-minute call
        </TrackedLink>
      </div>
    </header>
  );
}
