import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = [
    ["", "weekly", 1],
    ["/services", "monthly", 0.9],
    ["/work", "monthly", 0.9],
    ["/demos", "monthly", 0.7],
    ["/about", "monthly", 0.7],
    ["/contact", "monthly", 0.8],
    ["/privacy", "yearly", 0.2],
    ["/terms", "yearly", 0.2],
  ];
  return [
    ...pages.map(([path, changeFrequency, priority]) => ({ url: `${siteUrl}${path}`, lastModified: now, changeFrequency, priority })),
    ...caseStudies.map((c) => ({ url: `${siteUrl}/work/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
