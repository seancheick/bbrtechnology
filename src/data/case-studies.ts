// Case studies. Every number in `facts` is quoted from the product's own README or source
// (see `source`). `outcomes` are team-reported results without a public measurement.
import type { OfferId } from "@/data/services";

export type Attribution =
  | "Studio product"
  | "Internal product"
  | "Client engagement"
  | "Open-source tool"
  | "Launching";

export type PreviewKey = "turnflow" | "fieldops" | "pharmaguide" | "keniya" | "perks" | "orchestrator";

export interface Fact {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  kicker: string;
  headline: string;
  summary: string;
  attribution: Attribution;
  status: string;
  role: string;
  accent: string;
  links: { label: string; href: string }[];
  problem: string;
  built: { title: string; body: string }[];
  facts: Fact[];
  source: string;
  outcomes?: (Fact & { note: string })[];
  architecture: { name: string; items: string[] }[];
  stack: string[];
  proves: OfferId[];
  preview: PreviewKey;
  caveat?: string;
  featured?: boolean;
  // how the project reads on cards: as a type of job we deliver, in plain words
  card: { type: string; industry: string; outcome: string; metric: Fact & { note?: string } };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "turnflow",
    name: "TurnFlow",
    kicker: "Short-term rental operations",
    headline: "The operating system for short-term rental turnovers.",
    summary:
      "Bookings become cleaning jobs. Jobs can't close without photo proof. Cleaners are paid from a ledger that reconciles itself, and a guardian watches every channel calendar for nights guests can't book.",
    attribution: "Internal product",
    status: "Live in production",
    role: "Product, design, full-stack engineering, AI agent interface",
    accent: "#16423c",
    links: [
      { label: "Live app", href: "https://str-management-blond.vercel.app" },
      { label: "Repository", href: "https://github.com/seancheick/STR-Management" },
    ],
    problem:
      "Turnovers were spread across Airbnb, Booking.com, VRBO, a channel manager, a cleaner group chat and a spreadsheet. A missed checkout meant a dirty unit at check-in. A calendar that quietly stopped syncing meant nights nobody could book, and nobody noticed until revenue was gone.",
    built: [
      {
        title: "Calendars create the work",
        body: "Every Airbnb, VRBO and Booking.com checkout becomes a cleaning job. Date changes move the job, cancellations cancel it, and the cleaner is told.",
      },
      {
        title: "The server demands proof",
        body: "A job can't close without its required checklist items and before/after photos, enforced on the server rather than in the UI.",
      },
      {
        title: "Money reconciles itself",
        body: "Itemized extras, verified payments, audited corrections and running balances per cleaner. Payout statements and a 1099 view come straight from the ledger.",
      },
      {
        title: "Revenue is guarded",
        body: "The Bookability Guardian reads every channel calendar 180 days ahead, daily and on demand, and flags any night that guests can't book across seven rule types.",
      },
      {
        title: "Agents are first-class",
        body: "An MCP server and OpenAPI REST API expose 36 tools. Every write needs a scoped token, explicit owner approval, an idempotency key and an audit-log entry.",
      },
      {
        title: "A cleaner app that installs",
        body: "Cleaners use an installable PWA with web push: today's jobs, checklists, photo capture and their own pay statement.",
      },
    ],
    facts: [
      { value: "36", label: "agent tools · 17 read, 19 write" },
      { value: "25", label: "channel calendars scanned daily" },
      { value: "180", label: "days ahead checked every scan" },
      { value: "153", label: "open nights found with no price on one rate plan" },
    ],
    source: "STR-Management README",
    outcomes: [
      {
        value: "~150",
        label: "manual coordination texts per unit per month, replaced by scheduled jobs",
        note: "Team-reported on our own portfolio",
      },
    ],
    architecture: [
      { name: "Channels", items: ["Airbnb", "Booking.com", "VRBO"] },
      { name: "Channel manager", items: ["Hostex · iCal feeds", "Hostex Open API"] },
      {
        name: "TurnFlow",
        items: ["iCal sync + reconciliation", "Job state machine", "Cleaner ledger", "Bookability Guardian", "MCP + REST gateway"],
      },
      { name: "Data", items: ["Supabase Postgres", "Row-level security on every table"] },
      { name: "People & agents", items: ["Owner dashboard", "Supervisor review", "Cleaner PWA", "AI agents"] },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase Postgres", "Tailwind v4", "Zod", "Vercel Cron", "Hostex API", "MCP", "Vitest"],
    proves: ["internal-tool", "api-mcp", "automation-sprint"],
    preview: "turnflow",
    card: {
      type: "Operations automation",
      industry: "Short-term rentals",
      outcome: "Bookings turn into cleaning jobs on their own, cleaners prove the work with photos, pay reconciles itself, and every calendar is checked daily for missing prices and restrictions before they block a booking. The owner just approves.",
      metric: { value: "~150", label: "coordination texts per unit, per month, now automatic", note: "team-reported" },
    },
    featured: true,
  },
  {
    slug: "pharmaguide",
    name: "PharmaGuide",
    kicker: "Health technology platform",
    headline: "Supplement intelligence, built with pharmaceutical discipline.",
    summary:
      "A connected platform: a Flutter app that scans and explains supplements, a Python pipeline that scores products on a six-pillar, 100-point model, a Next.js website, and an assistant where known high-risk interactions are answered by deterministic rules, never by a model.",
    attribution: "Studio product",
    status: "Website live · mobile app in TestFlight",
    role: "Product, data engineering, mobile, web and AI safety architecture",
    accent: "#2563eb",
    links: [
      { label: "pharmaguide.io", href: "https://pharmaguide.io" },
      { label: "Scoring pipeline", href: "https://github.com/seancheick/PharmaGuide_Pipeline" },
      { label: "Assistant API", href: "https://github.com/seancheick/pharmaguide-chatbot-api" },
    ],
    problem:
      "Supplement labels don't say whether a form is bioavailable, whether an ingredient was recalled, or whether the evidence holds up. And a general-purpose chatbot is the wrong tool when someone asks about warfarin and ginkgo.",
    built: [
      {
        title: "A staged scoring pipeline",
        body: "Clean, enrich and score NIH label records. Ingredients are resolved to UMLS, PubChem, FDA UNII and RxNorm identifiers, and every stage is resumable with its own output contract.",
      },
      {
        title: "A six-pillar, 100-point score",
        body: "Formulation 20, Dose 20, Evidence 20, Transparency 15, Verification 15, Safety and hygiene 10. A banned substance always blocks a product, whatever its quality points.",
      },
      {
        title: "Deterministic before generative",
        body: "Emergency detection runs before the rate limiter. Known high-risk combinations resolve through 41 reviewed routes and 12 data-driven safety gates, and a validator checks every reply.",
      },
      {
        title: "Designed for failure",
        body: "Primary model, second tier, cross-vendor fallback and per-provider circuit breakers. When every provider fails, a deterministic safe reply is returned instead of an error.",
      },
      {
        title: "An app that shows, not recomputes",
        body: "The Flutter app displays pipeline scores as published, from an over-the-air catalog database, with a checksum-pinned interaction database and a separate local user store.",
      },
      {
        title: "Governed claims",
        body: "Clinical claims carry review dates and sources. A release gate in CI and on every deploy blocks a release when a claim is overdue.",
      },
    ],
    facts: [
      { value: "180,000+", label: "products in the catalog" },
      { value: "6", label: "scoring pillars, 100 points" },
      { value: "41", label: "deterministic response routes" },
      { value: "12", label: "declarative safety gates" },
    ],
    source: "PharmaGuide website, pipeline and assistant READMEs",
    architecture: [
      { name: "Sources", items: ["NIH DSLD labels", "FDA recalls + CAERS", "PubMed evidence"] },
      { name: "Pipeline", items: ["Clean", "Enrich (UMLS, PubChem, UNII, RxNorm)", "Score v4 · six pillars", "Safety verdict"] },
      { name: "Data", items: ["Supabase", "OTA catalog SQLite", "Checksum-pinned interaction DB"] },
      { name: "Assistant", items: ["Emergency detection", "Deterministic routes + gates", "Grounded generation", "Reply validator"] },
      { name: "Surfaces", items: ["Flutter app", "pharmaguide.io", "Chat widget"] },
    ],
    stack: ["Flutter", "Riverpod", "SQLite", "Python 3.13", "pytest", "Next.js 16", "TypeScript", "Node.js", "Supabase", "Upstash Redis", "GitHub Actions", "Vercel"],
    proves: ["mobile-app", "web-app", "ai-assistant", "website"],
    preview: "pharmaguide",
    card: {
      type: "Data & AI platform",
      industry: "Health tech",
      outcome: "A pipeline turns raw label data into a scored catalog behind an API. A retrieval (RAG) assistant answers with checked PubMed citations, and 41 reviewed safety rules respond before any AI model is allowed to guess.",
      metric: { value: "39 → 1", label: "medical databases merged into one scoring engine and API" },
    },
    caveat:
      "Quality scores describe the product, not whether it is right for a specific person. PharmaGuide does not replace advice from a pharmacist or prescriber.",
    featured: true,
  },
  {
    slug: "fieldops-ai",
    name: "FieldOps AI",
    kicker: "Field workforce operations",
    headline: "The system that proves work happened.",
    summary:
      "GPS-verified clock-ins, photos stamped by the server, and a live supervisor view, replacing WhatsApp photos and Excel timesheets for construction, electrical and infrastructure crews.",
    attribution: "Studio product",
    status: "Live in production",
    role: "Product, Flutter mobile app, supervisor web app, backend",
    accent: "#0f766e",
    links: [
      { label: "Live site", href: "https://field-ops-ai.vercel.app" },
      { label: "Repository", href: "https://github.com/seancheick/FieldOpsAi" },
    ],
    problem:
      "Field companies lose money on disputes they can't settle: unpaid invoices, payroll errors, “nobody told me.” The cause is always the same. There is no proof of what happened on site.",
    built: [
      {
        title: "GPS-verified clock in and out",
        body: "Server timestamp and device GPS are locked at the moment of action, in one tap, in under 30 seconds.",
      },
      {
        title: "Photos stamped by the server",
        body: "Worker, GPS, time, job reference and a verification hash are burned into the image pixels, so a photo carries its own evidence.",
      },
      {
        title: "Offline-first mobile",
        body: "The Flutter app works with no signal and syncs through a local queue when the crew is back online.",
      },
      {
        title: "Live supervisor dashboard",
        body: "Supabase Realtime powers the map, photo feed and job timeline with no polling.",
      },
      {
        title: "An append-only event store",
        body: "Events land in partitioned Postgres and are never edited or deleted, with row-level security per company.",
      },
      {
        title: "Overtime and reports",
        body: "Overtime requests are routed and approved with a full audit trail. Timesheets and job summaries export to PDF for billing.",
      },
    ],
    facts: [
      { value: "GPS", label: "verified location on every clock-in and photo" },
      { value: "4", label: "roles: worker, foreman, supervisor, admin" },
      { value: "0", label: "edits or deletes in the event store" },
      { value: "Offline", label: "first, with automatic sync" },
    ],
    source: "FieldOpsAi README",
    outcomes: [
      {
        value: "80%",
        label: "less field-to-office communication lag",
        note: "Team-reported",
      },
      {
        value: "12 hrs/wk",
        label: "of manual dispatch tracking removed",
        note: "Team-reported",
      },
    ],
    architecture: [
      { name: "Crew", items: ["Flutter app (worker + foreman)", "Offline queue (Drift)"] },
      { name: "Backend", items: ["Supabase Edge Functions", "Photo stamping", "Append-only event store"] },
      { name: "Data", items: ["Postgres 17, partitioned", "Row-level security per tenant"] },
      { name: "Office", items: ["Next.js supervisor dashboard", "Realtime map + timeline", "PDF reports"] },
    ],
    stack: ["Flutter", "Dart", "Riverpod", "Drift", "Next.js", "React 19", "Supabase", "Postgres 17", "Mapbox", "Sentry", "PostHog"],
    proves: ["mobile-app", "internal-tool"],
    preview: "fieldops",
    card: {
      type: "Field workforce platform",
      industry: "Construction & electrical",
      outcome: "Every clock-in, photo and overtime request is GPS-stamped and tracked, so crews are paid correctly, supervisors see the day live, and disputed invoices are settled with proof.",
      metric: { value: "12 hrs/wk", label: "of manual dispatch tracking removed", note: "team-reported" },
    },
    featured: true,
  },
  {
    slug: "keniya",
    name: "Keniya",
    kicker: "E-commerce platform",
    headline: "A condition-aware online store with a review gate.",
    summary:
      "A storefront for condition-specific product boxes: each line has its own written screening rules, and nothing goes on sale until a reviewer approves it. Checkout, subscriptions and gifting on one platform.",
    attribution: "Launching",
    status: "First boxes ship November 11, 2026",
    role: "Brand, commerce platform, screening rules, admin",
    accent: "#b45309",
    links: [
      { label: "Live site", href: "https://kaniya-lake.vercel.app" },
      { label: "Repository", href: "https://github.com/seancheick/Keniya" },
    ],
    problem:
      "People managing pregnancy, blood sugar or heart health spend their time reading labels and second-guessing snacks. The people buying gifts for them don't know the rules at all.",
    built: [
      {
        title: "Screening rules per condition",
        body: "A snack must qualify for a condition before it can go in that box. Blood Sugar regular snacks, for example: 15 g or less of total carbs and 3 g or less of added sugar per pack.",
      },
      {
        title: "A review gate on sale",
        body: "A box opens for orders only when its lineup is clinician-approved, priced and has stock. Otherwise the page shows a notify-me form instead.",
      },
      {
        title: "Checkout and a monthly club",
        body: "Stripe Checkout with webhooks, a monthly subscription members can skip, pause or cancel online, and renewals that void instead of charging when nothing is approved.",
      },
      {
        title: "Gifting as a first-class path",
        body: "Any box can be a gift, with a printed note, buyer receipts and send-a-hint links that open a box in gift mode.",
      },
    ],
    facts: [
      { value: "6", label: "product lines, each with its own screening rules" },
      { value: "1", label: "review gate before anything goes on sale" },
      { value: "Stripe", label: "checkout, subscriptions and webhooks" },
      { value: "Gifts", label: "gift mode, printed notes and share links" },
    ],
    source: "Keniya PRODUCT.md",
    architecture: [
      { name: "Storefront", items: ["Next.js site", "Condition quiz", "Gift mode"] },
      { name: "Rules", items: ["Per-condition screening", "Clinician approval gate"] },
      { name: "Commerce", items: ["Stripe Checkout + webhook", "Subscriptions", "Resend email"] },
      { name: "Data", items: ["Supabase Postgres", "Admin: boxes, offers, lineups"] },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Resend", "Vitest", "Vercel"],
    proves: ["website", "web-app"],
    preview: "keniya",
    card: {
      type: "E-commerce store",
      industry: "Retail & subscriptions",
      outcome: "Checkout, subscriptions and gifting in one store, with a review step before any product goes on sale.",
      metric: { value: "6", label: "product lines, each with its own rules" },
    },
    caveat: "Keniya never diagnoses or gives individual medical or nutritional advice.",
  },
  {
    slug: "perks-ledger",
    name: "Perks Ledger",
    kicker: "Consumer finance utility",
    headline: "Every credit, perk and discount, tracked in one place.",
    summary:
      "A single-file, zero-dependency PWA that tracks card and membership benefits, resets them on schedule, and maps the hidden chains between them with the Perk Graph.",
    attribution: "Studio product",
    status: "Live",
    role: "Product, design, engineering",
    accent: "#136147",
    links: [
      { label: "Live app", href: "https://perksledger.vercel.app" },
      { label: "Repository", href: "https://github.com/seancheick/perksledger" },
    ],
    problem:
      "People pay $700+ in annual card fees and redeem barely half of what the cards promise. Credits reset monthly, quarterly and semiannually, quietly, and memberships bundle perks nobody remembers.",
    built: [
      {
        title: "A built-in benefits database",
        body: "41 popular U.S. credit cards plus major memberships, with values verified in July 2026.",
      },
      {
        title: "Tracking that resets itself",
        body: "Period-keyed storage means monthly, quarterly, half-year and annual credits reset on schedule, and unused credits surface before they expire.",
      },
      {
        title: "The Perk Graph",
        body: "Tell it what you pay for and it flags subscriptions your cards already cover and card → membership → subscription chains.",
      },
      {
        title: "Private by design",
        body: "No accounts, no servers, no tracking. Data stays in the browser, with export, import and calendar reminders.",
      },
    ],
    facts: [
      { value: "41", label: "credit cards in the database" },
      { value: "1", label: "HTML file, the whole app" },
      { value: "0", label: "runtime dependencies" },
      { value: "Offline", label: "installable PWA" },
    ],
    source: "perksledger README",
    architecture: [
      { name: "App", items: ["Single HTML file", "Vanilla JS"] },
      { name: "Data", items: ["Built-in card database", "Local-only storage"] },
      { name: "Platform", items: ["Service worker", "Installable PWA", ".ics export"] },
    ],
    stack: ["JavaScript", "HTML", "CSS", "Service Worker", "Node build script", "Vercel"],
    proves: ["web-app", "website"],
    preview: "perks",
    card: {
      type: "Consumer web app",
      industry: "Personal finance",
      outcome: "An installable offline app that tracks card benefits and finds the subscriptions you already get for free.",
      metric: { value: "41", label: "cards in its database" },
    },
  },
  {
    slug: "agentic-orchestrator",
    name: "Agentic Orchestrator",
    kicker: "AI engineering tooling",
    headline: "Orchestration for engineering work that has to be right.",
    summary:
      "A Claude Code skill that breaks large goals into atomic tasks, routes each one to a model tier by cost, and won't call work finished until it passes a nine-point Done Gate.",
    attribution: "Open-source tool",
    status: "Published on npm",
    role: "Design and engineering",
    accent: "#6d28d9",
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/sean-agentic-orchestrator" },
      { label: "Repository", href: "https://github.com/seancheick/Sean-Agentic-Orchestrator" },
    ],
    problem:
      "AI coding agents drift on long tasks: they skip verification, lose the plan and spend expensive model time on cheap work.",
    built: [
      {
        title: "Atomic task decomposition",
        body: "Large goals become small tasks with acceptance criteria and dependency order.",
      },
      {
        title: "Cost-aware model routing",
        body: "Each task goes to the cheapest model tier that can do it, with an advisor pattern for hard calls.",
      },
      {
        title: "Verification gates",
        body: "A nine-point Done Gate, repair loops, and an anti-drift check every three tasks.",
      },
    ],
    facts: [
      { value: "9", label: "specialized agents" },
      { value: "9-point", label: "Done Gate" },
      { value: "Every 3", label: "tasks, an anti-drift check" },
    ],
    source: "Sean-Agentic-Orchestrator README",
    architecture: [
      { name: "Plan", items: ["Goal intake", "Atomic tasks"] },
      { name: "Execute", items: ["Model routing", "Specialized agents"] },
      { name: "Verify", items: ["Done Gate", "Repair loop", "Drift check"] },
    ],
    stack: ["Claude Code", "Markdown skills", "Node.js installer", "npm"],
    proves: ["ai-assistant", "automation-sprint"],
    preview: "orchestrator",
    card: {
      type: "Developer tooling",
      industry: "AI engineering",
      outcome: "Breaks large engineering jobs into small, checked tasks and sends each one to the right AI model.",
      metric: { value: "9-point", label: "completion check" },
    },
  },
];

export const clientWork = [
  {
    title: "Clinic intake and EHR workflows",
    sector: "Healthcare",
    body: "Patient intake, scheduling, billing and documentation connected into one workflow for medical clinics, with role-based access and automated reporting.",
    stack: ["EHR/EMR", "HL7/FHIR", "API integration"],
  },
  {
    title: "Online stores, on Shopify or built from scratch",
    sector: "eCommerce",
    body: "Custom Shopify storefronts, or fully owned stores built from scratch with inventory, subscriptions, payments and fulfillment workflows, and checkout built to convert.",
    stack: ["Shopify", "Next.js", "Stripe", "Inventory", "GA4"],
  },
  {
    title: "AI support assistants and lead pipelines",
    sector: "AI & automation",
    body: "Website assistants for support, lead qualification and FAQs, connected to CRMs and follow-up workflows in Zapier and Make.",
    stack: ["LLM APIs", "RAG", "Zapier", "Make", "CRM"],
  },
  {
    title: "Business websites and landing pages",
    sector: "Web",
    body: "Responsive sites for small businesses and professional brands, built for search and for turning visits into inquiries.",
    stack: ["Next.js", "React", "WordPress", "SEO"],
  },
] as const;

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export const featuredCaseStudies = caseStudies.filter((c) => c.featured);
