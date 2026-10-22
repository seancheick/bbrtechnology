"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { cn } from "@/lib/utils";

// Phones only: a booking bar that appears once the hero has scrolled away.
export function StickyCta() {
  const pathname = usePathname();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/contact")) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-300 md:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
      aria-hidden={!show}
    >
      <TrackedLink
        cta="sticky_book"
        href="/contact#book"
        tabIndex={show ? 0 : -1}
        className="flex h-12 items-center justify-center gap-2 rounded-full bg-navy-900 text-sm font-semibold text-gold-400 dark:bg-gold-400 dark:text-navy-950"
      >
        Book a free 30-min call <ArrowUpRight className="h-4 w-4" />
      </TrackedLink>
    </div>
  );
}
