import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyBbr } from "@/components/sections/why-bbr";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { flatFaqItems } from "@/data/faq";

const siteUrl = "https://bbrtechnology.com";

export const metadata: Metadata = {
  title: "Custom Software & Automation for Service Teams | B&Br Technology",
  description:
    "Engineering team building custom web apps, mobile apps, and workflow automation systems for service businesses and operator-led teams.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Custom Software & Automation for Service Teams | B&Br Technology",
    description:
      "Engineering team building custom web apps, mobile apps, and workflow automation systems for service businesses and operator-led teams.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software & Automation for Service Teams | B&Br Technology",
    description:
      "Engineering team building custom web apps, mobile apps, and workflow automation systems for service businesses and operator-led teams.",
  },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "B&Br Technology",
      description:
        "Engineering studio building custom web apps, internal tools, and workflow automation.",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "B&Br Technology",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      serviceType: [
        "AI automation",
        "workflow automation",
        "internal tools",
        "website development",
        "technical SEO",
      ],
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: "US",
      audience: "Service businesses, growing agencies, operator-led teams, and clinics",
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: flatFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Hero />
      <ProductsShowcase />
      <ServicesGrid />
      <WhyBbr />
      <Testimonials />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
