import { Hero } from "@/components/sections/hero";
import { MetricsBar } from "@/components/sections/metrics-bar";
import { ServicesGrid } from "@/components/sections/services-grid";
import { AnimatedBeamSection } from "@/components/sections/animated-beam-section";
import { WhyBbr } from "@/components/sections/why-bbr";
import { OrbitalProcess } from "@/components/sections/orbital-process";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsBar />
      <ServicesGrid />
      <AnimatedBeamSection />
      <WhyBbr />
      <OrbitalProcess />
      <Testimonials />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
