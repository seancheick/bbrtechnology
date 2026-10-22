import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { DemoSection } from "@/components/home/demo-section";
import { ServicesOverview } from "@/components/home/services-overview";
import { FeaturedWork } from "@/components/home/featured-work";
import { EstimatorSection } from "@/components/home/estimator-section";
import { ProcessSection } from "@/components/home/process-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { faqItems } from "@/data/faq";
import { offers } from "@/data/services";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: site.name,
      url: siteUrl,
      description: site.description,
      areaServed: "US",
      provider: { "@id": `${siteUrl}/#organization` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: offers.map((o) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: o.name, description: o.summary },
          priceSpecification: { "@type": "PriceSpecification", minPrice: o.from, priceCurrency: "USD" },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <DemoSection />
      <ServicesOverview />
      <FeaturedWork />
      <EstimatorSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
