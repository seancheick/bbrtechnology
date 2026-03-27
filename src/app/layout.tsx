import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css";

const siteUrl = "https://bbrtechnology.com";
const siteTitle =
  "B&Br Technology — Automation Systems for Founders Who Need Leverage";
const siteDescription =
  "Founder-led studio building automation systems, internal tools, and product layers that reduce manual work and help lean teams scale.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "B&Br Technology",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  metadataBase: new URL(siteUrl),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "B&Br Technology",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: siteDescription,
  areaServed: "US",
  knowsAbout: [
    "AI automation",
    "workflow automation",
    "internal tools",
    "website development",
    "technical SEO",
    "lead capture systems",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Boston",
    addressRegion: "MA",
    addressCountry: "US",
  },
  telephone: "+16467268345",
  email: "hello@bbrtechnology.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@bbrtechnology.com",
    telephone: "+16467268345",
    areaServed: "US",
    availableLanguage: ["en"],
  },
  founder: {
    "@type": "Person",
    name: "Sean Cheick Baradji",
  },
  sameAs: [
    "https://linkedin.com/company/bbrtechnology",
    "https://twitter.com/bbrtechnology",
    "https://github.com/bbrtechnology",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-bg text-foreground" suppressHydrationWarning>
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-navy-900 focus:text-gold-400 focus:px-4 focus:py-2 focus:rounded-lg"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
