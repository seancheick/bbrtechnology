import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css";

const siteUrl = "https://bbrtechnology.com";
const siteTitle = "B&Br Technology — AI-Powered Tech. Built for Real Growth.";
const siteDescription =
  "Boston-based digital studio building websites, apps, and AI automation systems for founders and growing businesses.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
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
  "@type": ["Organization", "LocalBusiness"],
  name: "B&Br Technology",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Boston",
    addressRegion: "MA",
    addressCountry: "US",
  },
  telephone: "+16467268345",
  email: "hello@bbrtechnology.com",
  founder: {
    "@type": "Person",
    name: "Sean Cheick Baradji",
  },
  sameAs: [
    "https://linkedin.com",
    "https://twitter.com",
    "https://github.com",
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
      <body className="antialiased bg-bg text-navy-900">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
