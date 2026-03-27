import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { ServicesGrid } from "@/components/sections/services-grid";
import { AnimatedBeamSection } from "@/components/sections/animated-beam-section";
import { WhyBbr } from "@/components/sections/why-bbr";
import { ProcessRoadmap } from "@/components/sections/process-roadmap";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { flatFaqItems } from "@/data/faq";

const siteUrl = "https://bbrtechnology.com";

export const metadata: Metadata = {
  title: "AI Automation, Internal Tools & Websites for Founders | B&Br Technology",
  description:
    "Founder-led studio building AI automation systems, internal tools, websites, and technical SEO for founders, operators, and growing small businesses.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Automation, Internal Tools & Websites for Founders | B&Br Technology",
    description:
      "Founder-led studio building AI automation systems, internal tools, websites, and technical SEO for founders, operators, and growing small businesses.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation, Internal Tools & Websites for Founders | B&Br Technology",
    description:
      "Founder-led studio building AI automation systems, internal tools, websites, and technical SEO for founders, operators, and growing small businesses.",
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
        "Founder-led studio building automation systems, internal tools, websites, and technical SEO.",
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
      audience: "Founders, operators, consultants, and growing small businesses",
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
      <AnimatedBeamSection />
      <WhyBbr />
      <ProcessRoadmap />
      <Testimonials />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
