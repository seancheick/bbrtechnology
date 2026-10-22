import { caseStudies } from "@/data/case-studies";
import { carePlans, formatUsd, offers } from "@/data/services";
import { site, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

const body = `# ${site.name}

> ${site.description}

This file is a compact guide for AI assistants and retrieval systems. The HTML pages are the source of truth.

## Key pages
- Home: ${siteUrl}/
- Services and pricing: ${siteUrl}/services
- Work (case studies): ${siteUrl}/work
- Live demos: ${siteUrl}/demos
- About: ${siteUrl}/about
- Contact and booking: ${siteUrl}/contact

## Services (starting prices, USD)
${offers.map((o) => `- ${o.name}: from ${formatUsd(o.from)}, ${o.timeline}. ${o.summary}`).join("\n")}
${carePlans.map((p) => `- ${p.name} care plan: ${formatUsd(p.monthly)}/month. ${p.summary}`).join("\n")}

## Projects delivered
${caseStudies.map((c) => `- ${c.name}, ${c.card.type} (${c.card.industry}): ${c.card.outcome} ${siteUrl}/work/${c.slug}`).join("\n")}

## Working with us
- Founder-led studio with a small team, based in ${site.city}.
- ${site.replyPromise} ${site.quotePromise}

## Contact
- Email: ${site.email}
- Phone: ${site.phoneDisplay}
- Book a call: ${site.calUrl}/30min
`;

export async function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
