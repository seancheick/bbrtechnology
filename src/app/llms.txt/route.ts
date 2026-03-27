export const dynamic = "force-static";

const llmsText = `# B&Br Technology

> Founder-led studio building automation systems, internal tools, websites, and technical SEO for founders, operators, consultants, clinics, and growing small businesses.

This file is a compact guide for AI assistants and retrieval systems. Canonical HTML pages remain the source of truth.

## Key pages
- Homepage: https://bbrtechnology.com/
- Services: https://bbrtechnology.com/services
- About: https://bbrtechnology.com/about
- Contact: https://bbrtechnology.com/contact
- Privacy: https://bbrtechnology.com/privacy
- Terms: https://bbrtechnology.com/terms

## Core services
- AI automation: workflow automation, lead capture, follow-up, appointment booking, chatbots, and internal assistants.
- Websites and internal tools: conversion-focused websites, portals, dashboards, and operator-facing systems.
- Technical SEO: crawlability, metadata, structured data, internal linking, performance, and launch hygiene.
- Support and iteration: post-launch refinement, maintenance, analytics, and ongoing improvements.

## Product proof
- PharmaGuide AI: healthcare-focused product with barcode scanning, OCR, interaction checking, and deterministic supplement scoring.
- FieldOps: mobile workflow software for service teams.
- AirbnbBBR: private short-term rental operations software.

## Ideal clients
- Founders who need leverage without hiring too early.
- Small business operators with manual workflows slowing down revenue.
- Consultants and lean teams needing internal systems, cleaner follow-up, and clearer operational control.

## Contact
- Email: hello@bbrtechnology.com
- Phone: +1 646 726 8345
- Discovery call: https://cal.com
`;

export async function GET() {
  return new Response(llmsText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
