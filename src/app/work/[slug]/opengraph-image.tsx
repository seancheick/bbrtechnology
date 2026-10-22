import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "B&Br Technology case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  return ogImage({
    eyebrow: c ? `Case study · ${c.kicker}` : "Case study",
    title: c ? `${c.name}: ${c.headline}` : "B&Br Technology",
    subtitle: c?.status,
  });
}
