import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyCta } from "@/components/layout/sticky-cta";
import { site, siteUrl } from "@/lib/site";
import "@/styles/globals.css";

const defaultTitle = `${site.name} | Software, AI & Automation Studio`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    title: defaultTitle,
    description: site.description,
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: site.description,
  areaServed: "US",
  knowsAbout: [
    "Workflow automation",
    "AI assistants",
    "Website development",
    "Web application development",
    "Flutter mobile apps",
    "Internal tools and dashboards",
  ],
  address: { "@type": "PostalAddress", addressLocality: "Boston", addressRegion: "MA", addressCountry: "US" },
  email: site.email,
  telephone: site.phone,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.email,
    telephone: site.phone,
    areaServed: "US",
    availableLanguage: ["en"],
  },
  founder: { "@type": "Person", name: site.founder },
  sameAs: [site.github],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-bg text-foreground antialiased" suppressHydrationWarning>
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-gold-400"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <StickyCta />
        </Providers>
      </body>
    </html>
  );
}
