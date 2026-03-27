import Link from "next/link";
import { MagneticDock } from "@/components/ui/magnetic-dock";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section: logo + tagline + columns */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-0.5 font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
              B&amp;Br
              <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
            </div>
            <p className="mt-3 text-sm text-navy-400 leading-relaxed">
              AI-Powered Tech Studio · Boston, MA
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Pages
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Direct
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hello@bbrtechnology.com"
                  className="text-sm text-navy-400 hover:text-white transition-colors"
                >
                  hello@bbrtechnology.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+16467268345"
                  className="text-sm text-navy-400 hover:text-white transition-colors"
                >
                  (646) 726-8345
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Magnetic Social Dock — visual centerpiece */}
        <div className="mt-12 flex justify-center">
          <MagneticDock />
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/10" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-navy-400">
            &copy; {currentYear} B&amp;Br Technology LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-navy-400 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-navy-400 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <span className="text-xs text-navy-400/50 border border-white/10 rounded px-2 py-0.5">
              Built with Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
