import type { Industry } from "@/lib/demo/schema";

// Fictional businesses. The public demo never touches real customer or patient data.
export interface DemoBusiness {
  industry: Industry;
  name: string;
  label: string;
  description: string;
  roles: string[];
  rules: string[];
  // reference material the AI may cite or use; nothing outside it counts as a source
  knowledge?: { title: string; text: string }[];
  tools?: string[];
}

export const demoBusinesses: Record<Industry, DemoBusiness> = {
  "home-property": {
    industry: "home-property",
    name: "Harborline Homes & Stays",
    label: "Home & property",
    description:
      "Manages 40 rental homes and short-term stays around Dallas for owners, and handles repair requests for homeowners in its service plan.",
    roles: ["Property manager", "Maintenance coordinator", "Guest experience", "Owner relations"],
    rules: [
      "Repairs that need a licensed pro (plumbing, HVAC, electrical, roofing) are handed off to Homecierge, our home-services partner, which matches a vetted, insured pro, sets one upfront price and books it with a deposit held until the job is done.",
      "Active water leaks, no heat or AC in extreme weather, electrical burning smells and lockouts are urgent: text the maintenance coordinator now.",
      "For a gas smell or anything dangerous, tell the person to leave and call 911 or the gas utility first.",
      "Guest check-in is 4 PM; early check-in only if there is no same-day turnover, confirmed by the property manager.",
      "Only the property manager approves refunds, discounts or reservation changes.",
      "Every repair is logged to the property's service history.",
    ],
  },
  clinic: {
    industry: "clinic",
    name: "Lakeside Family Clinic",
    label: "Clinic",
    description: "A primary-care clinic with 4 providers and a front desk that handles calls, portal messages and paperwork.",
    roles: ["Front desk", "Triage nurse", "Provider", "Billing"],
    rules: [
      "Possible emergencies (chest pain or tightness, trouble breathing, stroke signs, severe bleeding, thoughts of self-harm) are urgent: the reply tells the patient to call 911 now, the triage nurse is alerted, and no medical advice is given.",
      "Never diagnose, prescribe, change doses or give medical advice. A clinician decides.",
      "Refill requests are clinical: category clinical, urgency high when supply is under a week, a triage-nurse task to check the chart, escalate=true, and the reply says the clinic will confirm.",
      "Documents patients send (insurance cards, intake forms, referrals) are read into structured fields for the front desk to verify before anything goes into the chart.",
      "Billing questions go to billing by email.",
      "Use the minimum necessary information. Do not repeat sensitive details in alerts.",
    ],
  },
  contractor: {
    industry: "contractor",
    name: "Brightline Electric & Build",
    label: "Contractors",
    description:
      "A 30-person electrical and renovation contractor. Crews clock in with GPS, take stamped proof photos and log work in the field app.",
    roles: ["Dispatcher", "Project manager", "Foreman", "Office manager"],
    rules: [
      "When a client disputes a visit or the work, check the job record before replying, and quote what it shows.",
      "Overtime must be approved by the project manager before it is worked or paid.",
      "Any change to the scope becomes a change-order quote for the project manager; no extra work starts without the client's signed approval.",
      "Safety issues on site (exposed live wires, injuries) are urgent: alert the foreman and project manager by SMS.",
      "Never promise dates or prices the project manager hasn't confirmed.",
    ],
    knowledge: [
      {
        title: "Job #2417 field record · Oct 14",
        text: "Crew of 2 (D. Alvarez, M. Chen) clocked in 7:58 AM at 4410 Gaston Ave, GPS-verified within 8 m. 6 stamped proof photos (panel before/after, conduit run). Clocked out 3:42 PM. Client signature captured at 3:35 PM.",
      },
      {
        title: "Job #2431 field record · Oct 21",
        text: "Foreman J. Ortiz on site 8:05 AM. Panel upgrade 70% complete. Inspection booked Oct 23. 2 hours overtime requested, not yet approved.",
      },
    ],
  },
  ecommerce: {
    industry: "ecommerce",
    name: "Fernleaf Goods",
    label: "E-commerce",
    description: "An online home and kitchen store shipping across the US.",
    roles: ["Support agent", "Fulfillment lead", "Support lead"],
    rules: [
      "Orders ship in 1 business day; delivery takes 2 to 5 business days.",
      "Returns accepted within 30 days for unused items; damaged items are replaced at no cost once a photo is received.",
      "Only the support lead can approve refunds, discounts or exceptions.",
      "Missing or damaged deliveries create a fulfillment task the same day.",
      "Wholesale and press inquiries go to the support lead by email.",
    ],
  },
  enterprise: {
    industry: "enterprise",
    name: "Northwind Logistics",
    label: "Enterprise AI",
    description:
      "A 1,200-person logistics company with an internal AI assistant connected to its policy library and, through MCP, to Salesforce, Jira and the IT device manager.",
    roles: ["Sales ops", "Customer success", "IT security", "Finance"],
    rules: [
      "Answer policy questions only from the knowledge library, and cite the document. If the library doesn't cover it, say so and route it to the right team.",
      "The assistant may propose a tool call to a connected system, but nothing is written until a person approves it.",
      "Lost or stolen devices and suspected account compromise are urgent security events: alert IT security by SMS and propose a device lock.",
      "Pricing exceptions over 10% need finance approval.",
    ],
    knowledge: [
      {
        title: "Refund Policy v4 · Enterprise (EU)",
        text: "Enterprise customers in the EU may cancel within 14 days of contract start for a full refund. After 14 days, unused prepaid months are refunded pro rata. Refunds over €25,000 require Finance approval.",
      },
      {
        title: "Renewal Playbook 2026",
        text: "Renewals are quoted 60 days before term end at the current list price. Multi-year renewals may receive up to 8% discount without Finance approval.",
      },
      {
        title: "Device Security Standard",
        text: "Report lost or stolen devices to IT Security immediately. IT will lock and wipe the device remotely and rotate the user's credentials.",
      },
    ],
    tools: [
      "salesforce.create_quote(account, product, term_months, discount_pct)",
      "jira.create_ticket(project, summary, priority)",
      "devices.lock_and_wipe(user_email)",
    ],
  },
};
