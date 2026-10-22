// One owner for brand, contact and deployment facts. Change the domain by setting
// NEXT_PUBLIC_SITE_URL; everything canonical (metadata, sitemap, JSON-LD) reads siteUrl.
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "B&Br Technology",
  legalName: "B&Br Technology LLC",
  short: "B&Br",
  tagline: "Software, AI & automation, built around your business.",
  description:
    "Founder-led software studio in Boston. We build websites, web and mobile apps, internal tools, AI assistants and workflow automation for growing businesses.",
  email: "hello@bbrtechnology.com",
  phone: "+16467268345",
  phoneDisplay: "(646) 726-8345",
  city: "Boston, MA",
  founder: "Sean Cheick Baradji",
  calBooking: "bbrtechnology/30min",
  calUrl: "https://cal.com/bbrtechnology",
  github: "https://github.com/seancheick",
  replyPromise: "Reply within one business day.",
  quotePromise: "Fixed quote within two business days of receiving your project details.",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/demos", label: "Demos" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
