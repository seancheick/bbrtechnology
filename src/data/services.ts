// Canonical pricing and service scope. Every price on the site (cards, services page,
// estimator, JSON-LD, FAQ) reads from here. Prices are proposed launch floors in USD.

export type CategoryId = "ai-automation" | "websites" | "custom-software" | "mobile";
export type OfferId =
  | "automation-audit"
  | "automation-sprint"
  | "ai-assistant"
  | "website"
  | "internal-tool"
  | "api-mcp"
  | "prototype"
  | "web-app"
  | "mobile-app";
export type Tier = "focused" | "standard" | "advanced";
type Range = readonly [number, number];

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  pitch: string;
  offers: OfferId[];
  proof: string; // case-study slug that best proves this category
}

export interface Offer {
  id: OfferId;
  category: CategoryId;
  name: string;
  from: number;
  typical: Range;
  timeline: string;
  summary: string;
  bestFor: string;
  includes: string[];
  excludes: string[];
  popular?: boolean;
  tiers: Record<Tier, { range: Range; weeks: string; example: string; name?: string }>;
}

export interface CarePlan {
  id: "care-basic" | "care-growth";
  name: string;
  monthly: number;
  summary: string;
  includes: string[];
  limits: string;
}

export const categories: Category[] = [
  {
    id: "ai-automation",
    name: "AI & Automation",
    short: "Automation",
    pitch:
      "Connect the tools you already pay for, remove the copy-paste work, and add AI where it saves real hours.",
    offers: ["automation-audit", "automation-sprint", "ai-assistant"],
    proof: "turnflow",
  },
  {
    id: "websites",
    name: "Websites",
    short: "Websites",
    pitch:
      "Fast, search-ready sites that explain what you do in five seconds and turn visitors into booked calls.",
    offers: ["website"],
    proof: "pharmaguide",
  },
  {
    id: "custom-software",
    name: "Custom Software",
    short: "Software",
    pitch:
      "Prototypes, MVPs, dashboards, internal tools and APIs that fit how your team actually works, not the other way around.",
    offers: ["prototype", "web-app", "internal-tool", "api-mcp"],
    proof: "turnflow",
  },
  {
    id: "mobile",
    name: "Mobile Apps",
    short: "Mobile",
    pitch:
      "Flutter apps for iOS and Android, built offline-first for people who work away from a desk.",
    offers: ["mobile-app"],
    proof: "fieldops-ai",
  },
];

export const offers: Offer[] = [
  {
    id: "automation-audit",
    category: "ai-automation",
    name: "Automation Audit & Fix",
    from: 250,
    typical: [250, 450],
    timeline: "1–2 business days",
    summary:
      "We inspect one automation that is failing or slowing you down, tell you exactly why, and fix it on the spot when the fix is small.",
    bestFor: "A Zapier, Make or n8n flow that breaks, double-sends, or nobody trusts anymore.",
    includes: [
      "Review of one existing automation or integration",
      "Written diagnosis in plain language",
      "Small fixes (up to one hour) applied during the audit",
      "Fixed quote for anything larger",
    ],
    excludes: ["Rebuilding the whole workflow", "New integrations", "Ongoing monitoring"],
    tiers: {
      focused: { range: [250, 250], weeks: "1–2 days", example: "One flow, one tool" },
      standard: { range: [250, 350], weeks: "2 days", example: "One flow across two or three tools" },
      advanced: { range: [350, 450], weeks: "2–3 days", example: "A tangled flow with custom code" },
    },
  },
  {
    id: "automation-sprint",
    category: "ai-automation",
    name: "Automation Sprint",
    from: 750,
    typical: [750, 1500],
    timeline: "3–5 business days after access",
    summary:
      "One business workflow, built end to end with validation, logging and a handover you can actually follow.",
    bestFor: "Lead intake, booking follow-up, invoice reminders, job dispatch, report generation.",
    includes: [
      "One workflow across your existing tools",
      "Error handling, logging and failure alerts",
      "Test cases run against real scenarios",
      "Handover guide and a short screen recording",
      "14 days of fixes after launch",
    ],
    excludes: ["Custom CRM development", "Unlimited revisions", "Third-party subscription fees"],
    popular: true,
    tiers: {
      focused: { range: [750, 950], weeks: "3–4 days", example: "Form → spreadsheet → email alert" },
      standard: { range: [950, 1200], weeks: "4–5 days", example: "Inquiry → CRM → task → SMS alert" },
      advanced: { range: [1200, 1500], weeks: "1–2 weeks", example: "Multi-step flow with AI classification" },
    },
  },
  {
    id: "ai-assistant",
    category: "ai-automation",
    name: "AI Assistant & Lead Response",
    from: 1500,
    typical: [1500, 4000],
    timeline: "1–3 weeks",
    summary:
      "An assistant that answers from your approved knowledge, captures and routes leads, and hands off to a person whenever it is unsure.",
    bestFor: "Repeated customer questions, after-hours inquiries, lead qualification, internal how-do-I questions.",
    includes: [
      "Assistant grounded in your approved FAQs and documents",
      "Lead capture to your CRM or Google Sheets",
      "Human handoff with the full conversation attached",
      "Guardrails and a written test suite",
      "Admin guide for updating answers",
    ],
    excludes: [
      "Messaging inside platforms without an approved API",
      "Unlimited AI usage (billed at provider cost)",
      "Medical, legal or financial advice use cases",
    ],
    tiers: {
      focused: { range: [1500, 2000], weeks: "1 week", example: "Website FAQ assistant with handoff" },
      standard: { range: [2000, 3000], weeks: "2 weeks", example: "Assistant + lead capture + CRM routing" },
      advanced: { range: [3000, 4000], weeks: "3 weeks", example: "Multi-channel assistant with escalation rules" },
    },
  },
  {
    id: "website",
    category: "websites",
    name: "Business Website",
    from: 2500,
    typical: [2500, 8000],
    timeline: "2–5 weeks",
    summary:
      "A custom Next.js site with real copy structure, technical SEO and lead capture that goes straight to your inbox or CRM.",
    bestFor: "New businesses, rebrands, and sites that look dated or don't produce inquiries.",
    includes: [
      "Custom design in light and dark",
      "Page count and features set by the size you choose",
      "Technical SEO, structured data and analytics",
      "Lead forms and booking wired to your tools",
      "Editable content where you need it",
    ],
    excludes: ["Copywriting from scratch (available)", "Paid ads management", "Stock photo licensing"],
    tiers: {
      focused: { name: "Launch site", range: [2500, 3500], weeks: "2–3 weeks", example: "Up to 6 pages, one lead form" },
      standard: { name: "Growth site", range: [3500, 5500], weeks: "3–4 weeks", example: "10–15 pages, CMS, booking" },
      advanced: { name: "Platform site", range: [5500, 8000], weeks: "4–5 weeks", example: "Content hub, integrations, interactive features" },
    },
  },
  {
    id: "internal-tool",
    category: "custom-software",
    name: "Internal Tool & Dashboard",
    from: 5000,
    typical: [5000, 20000],
    timeline: "3–8 weeks",
    summary:
      "Replace the spreadsheet-and-group-chat workflow with one tool: roles, approvals, live status and reports.",
    bestFor: "Operations teams, dispatch, approvals, client portals, owner reporting.",
    includes: [
      "Role-based access with database-level security",
      "Integrations with the tools you already use",
      "Dashboards and exportable reports",
      "Audit trail on important actions",
      "Deployment, monitoring and handover",
    ],
    excludes: ["Data migration from unsupported systems (quoted)", "24/7 on-call support"],
    tiers: {
      focused: { range: [5000, 8000], weeks: "3–4 weeks", example: "One workflow, two roles, a dashboard" },
      standard: { range: [8000, 14000], weeks: "5–6 weeks", example: "Several workflows, integrations, reports" },
      advanced: { range: [14000, 20000], weeks: "7–8 weeks", example: "Multi-team tool with approvals and an API" },
    },
  },
  {
    id: "api-mcp",
    category: "custom-software",
    name: "API & MCP Integration",
    from: 3000,
    typical: [3000, 12000],
    timeline: "2–6 weeks",
    summary:
      "Connect your systems to each other and to AI agents: REST APIs, two-way syncs, and MCP servers that let assistants like Claude or ChatGPT use your tools safely.",
    bestFor: "Systems that don't talk to each other, and teams that want AI agents working inside their own software.",
    includes: [
      "API design with authentication and rate limits",
      "MCP server with read tools, plus write tools behind approval",
      "Audit log of every write an agent makes",
      "OpenAPI documentation and test suite",
      "Monitoring and failure alerts",
    ],
    excludes: ["Vendor API fees", "Unlimited third-party connectors", "Agents acting without approval"],
    tiers: {
      focused: { range: [3000, 5000], weeks: "2–3 weeks", example: "One system connected, or an MCP server with read tools" },
      standard: { range: [5000, 8000], weeks: "3–4 weeks", example: "Two-way sync, or MCP read and approved write tools" },
      advanced: { range: [8000, 12000], weeks: "5–6 weeks", example: "Several systems, scoped tokens, audit log, OpenAPI" },
    },
  },
  {
    id: "prototype",
    category: "custom-software",
    name: "Prototype / Proof of Concept",
    from: 2000,
    typical: [2000, 5000],
    timeline: "1–2 weeks",
    summary:
      "A clickable prototype or a working proof of concept to test an idea with users, investors or your team before committing to a full build. The fee is credited if we build the MVP.",
    bestFor: "Founders validating an idea, and teams that need to show a working concept before budget is approved.",
    includes: [
      "Scoping session and user flow",
      "Clickable prototype or working proof of concept",
      "One round of feedback and changes",
      "Hosted demo link to share",
      "Fee credited toward the MVP build",
    ],
    excludes: ["Production hardening", "App store submission", "Ongoing hosting"],
    tiers: {
      focused: { range: [2000, 2500], weeks: "1 week", example: "Clickable prototype of the core flow" },
      standard: { range: [2500, 3500], weeks: "1–2 weeks", example: "Working proof of concept with real data" },
      advanced: { range: [3500, 5000], weeks: "2 weeks", example: "Proof of concept with one integration or AI feature" },
    },
  },
  {
    id: "web-app",
    category: "custom-software",
    name: "Web App / SaaS MVP",
    from: 10000,
    typical: [10000, 40000],
    timeline: "6–12 weeks",
    summary:
      "A production-ready first version of your product: accounts, payments, the core workflow and an admin view.",
    bestFor: "Founders validating a product, businesses turning a service into software.",
    includes: [
      "Product scoping workshop and clickable flow",
      "Auth, database, payments and admin",
      "Automated tests on the critical paths",
      "Analytics and error monitoring",
      "Launch support and a 30-day fix window",
    ],
    excludes: ["Marketing and user acquisition", "Ongoing feature development (retainer available)"],
    tiers: {
      focused: { range: [10000, 16000], weeks: "6–8 weeks", example: "One core workflow, payments, admin" },
      standard: { range: [16000, 28000], weeks: "8–10 weeks", example: "Multiple roles, integrations, billing plans" },
      advanced: { range: [28000, 40000], weeks: "10–12 weeks", example: "Multi-tenant SaaS with an API and AI features" },
    },
  },
  {
    id: "mobile-app",
    category: "mobile",
    name: "Mobile App MVP",
    from: 15000,
    typical: [15000, 45000],
    timeline: "8–14 weeks",
    summary:
      "A Flutter app for iOS and Android with offline support, push notifications and store submission handled.",
    bestFor: "Field teams, consumer products, companion apps to an existing platform.",
    includes: [
      "One codebase for iOS and Android",
      "Offline-first data where it matters",
      "Push notifications and deep links",
      "Backend, auth and admin dashboard",
      "App Store and Google Play submission",
    ],
    excludes: ["Apple and Google developer fees", "Hardware integrations (quoted)"],
    tiers: {
      focused: { name: "Core app", range: [15000, 22000], weeks: "8–10 weeks", example: "Core flow, auth, push" },
      standard: { name: "Connected app", range: [22000, 34000], weeks: "10–12 weeks", example: "Offline sync, media, admin web app" },
      advanced: { name: "Full platform", range: [34000, 45000], weeks: "12–14 weeks", example: "Multi-role app, payments, integrations" },
    },
  },
];

export const carePlans: CarePlan[] = [
  {
    id: "care-basic",
    name: "Care",
    monthly: 99,
    summary: "Keep a finished site or automation healthy.",
    includes: [
      "Uptime and error monitoring",
      "Monthly dependency and security updates",
      "1 hour of small changes per month",
      "Email support, reply within 2 business days",
    ],
    limits: "Unused hours don't roll over. New features are quoted separately.",
  },
  {
    id: "care-growth",
    name: "Care Plus",
    monthly: 300,
    summary: "For systems your business runs on every day.",
    includes: [
      "Everything in Care",
      "Automation run checks and failure alerts",
      "4 hours of changes or improvements per month",
      "Priority support, reply within 1 business day",
      "Monthly health report",
    ],
    limits: "Hours reset monthly. Larger work moves to a fixed quote.",
  },
];

export interface AddOn {
  id: string;
  label: string;
  price: number;
  appliesTo: OfferId[];
}

export const addOns: AddOn[] = [
  { id: "ai", label: "AI feature (assistant, classification, summaries)", price: 2000, appliesTo: ["website", "internal-tool", "prototype", "web-app", "mobile-app"] },
  { id: "payments", label: "Payments or subscriptions (Stripe)", price: 1500, appliesTo: ["website", "web-app", "mobile-app"] },
  { id: "integration", label: "Extra integration with an existing tool", price: 1000, appliesTo: ["automation-sprint", "ai-assistant", "internal-tool", "api-mcp", "web-app", "mobile-app"] },
  { id: "admin", label: "Admin dashboard", price: 2500, appliesTo: ["website", "mobile-app"] },
  { id: "copy", label: "Copywriting and page structure", price: 800, appliesTo: ["website"] },
];

export const estimatorOffers: OfferId[] = [
  "automation-sprint",
  "ai-assistant",
  "website",
  "prototype",
  "web-app",
  "internal-tool",
  "api-mcp",
  "mobile-app",
];

export function getOffer(id: OfferId): Offer {
  const offer = offers.find((o) => o.id === id);
  if (!offer) throw new Error(`Unknown offer ${id}`);
  return offer;
}

export function offersIn(category: CategoryId): Offer[] {
  return offers.filter((o) => o.category === category);
}

export function categoryFrom(category: CategoryId): number {
  return Math.min(...offersIn(category).map((o) => o.from));
}

export function formatUsd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export function estimate(offerId: OfferId, tier: Tier, addOnIds: string[]) {
  const offer = getOffer(offerId);
  const t = offer.tiers[tier];
  const extras = addOns.filter((a) => addOnIds.includes(a.id) && a.appliesTo.includes(offerId));
  const extra = extras.reduce((sum, a) => sum + a.price, 0);
  return {
    offer,
    low: t.range[0] + extra,
    high: t.range[1] + extra,
    weeks: t.weeks,
    example: t.example,
    extras,
  };
}

// Estimator briefs travel as plain query params: ?offer=web-app&tier=standard&addons=ai,payments
const tiers: Tier[] = ["focused", "standard", "advanced"];

export function encodeBrief(offer: OfferId, tier: Tier, extras: string[]) {
  const p = new URLSearchParams({ offer, tier });
  if (extras.length) p.set("addons", extras.join(","));
  return p.toString();
}

export function decodeBrief(params: Record<string, string | string[] | undefined>) {
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const offerId = one(params.offer);
  const offer = offers.find((o) => o.id === offerId);
  if (!offer) return null;
  const tierParam = one(params.tier);
  const tier = tiers.includes(tierParam as Tier) ? (tierParam as Tier) : null;
  const extras = (one(params.addons) ?? "").split(",").filter((id) => addOns.some((a) => a.id === id));
  return { offer, tier, extras };
}

export function describeBrief(brief: NonNullable<ReturnType<typeof decodeBrief>>): string {
  const { offer, tier, extras } = brief;
  if (!tier) return `Interested in: ${offer.name} (from ${formatUsd(offer.from)}).`;
  const e = estimate(offer.id, tier, extras);
  const range = e.low === e.high ? formatUsd(e.low) : `${formatUsd(e.low)}–${formatUsd(e.high)}`;
  const addOnText = e.extras.length ? ` + ${e.extras.map((x) => x.label).join(", ")}` : "";
  return `Estimator brief: ${offer.name}, ${tier} (${e.example})${addOnText}. Indicative ${range}, ${e.weeks}.`;
}

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    duration: "30-minute call",
    body: "We learn the workflow, the tools you already pay for, and what a good outcome is worth. You leave with a clear recommendation, even if it isn't us.",
  },
  {
    step: "02",
    title: "Scope",
    duration: "Within 2 business days",
    body: "A fixed quote with what's included, what isn't, the timeline and the test cases we'll use to call it done.",
  },
  {
    step: "03",
    title: "Build",
    duration: "Weekly demos",
    body: "You see working software every week on a private preview link. Feedback goes in while it's still cheap to change.",
  },
  {
    step: "04",
    title: "Launch & care",
    duration: "Handover + support",
    body: "We test against real scenarios, hand over documentation and access, and stay on for fixes. Care plans keep it healthy after.",
  },
] as const;
