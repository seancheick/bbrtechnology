export interface Project {
  title: string;
  category: string;
  categoryColor: string;
  description: string;
  techStack: string[];
}

export const projects: Project[] = [
  {
    title: "PharmaGuide AI \u2014 Supplement & Medication Scanner",
    category: "Health Technology",
    categoryColor: "#2563eb",
    description:
      "First-of-its-kind AI pharmacist app that scans supplements via barcode and OCR, evaluates quality on a 100-point deterministic scoring algorithm, checks drug-supplement interactions, and provides personalized safety recommendations \u2014 all with HIPAA-compliant, privacy-first architecture.",
    techStack: ["Flutter", "Python", "NLP/RAG", "DSLD Database", "HIPAA"],
  },
  {
    title: "Clinical EHR Integration & Workflow Systems",
    category: "Healthcare",
    categoryColor: "#059669",
    description:
      "Custom electronic health record integrations for medical clinics \u2014 connecting patient intake, scheduling, billing, and clinical documentation into unified workflows. Designed with HIPAA compliance, role-based access controls, and automated reporting.",
    techStack: ["EHR/EMR", "HL7/FHIR", "HIPAA", "API Integration"],
  },
  {
    title: "eCommerce Platforms & Conversion Optimization",
    category: "eCommerce",
    categoryColor: "#7c3aed",
    description:
      "Full-stack eCommerce builds on Shopify and WooCommerce \u2014 custom storefronts, payment processing, inventory management, and conversion-optimized checkout flows. Includes SEO structure, analytics integration, and automated email sequences.",
    techStack: ["Shopify", "WooCommerce", "Stripe", "GA4"],
  },
  {
    title: "AI Chatbots & Automated Lead Pipelines",
    category: "AI & Automation",
    categoryColor: "#f59e0b",
    description:
      "Custom GPT-powered chatbots deployed on business websites for 24/7 customer support, lead qualification, appointment booking, and FAQ handling. Integrated with CRM systems and connected to automated follow-up workflows via Zapier and Make.",
    techStack: ["GPT API", "RAG", "Zapier", "CRM"],
  },
  {
    title: "Pharmaceutical Data Management & Pipeline Architecture",
    category: "Data Engineering",
    categoryColor: "#06b6d4",
    description:
      "Designed and built multi-phase data pipelines for processing 100,000+ supplement products from the DSLD database \u2014 including cleaning, normalization, ingredient identity preservation, enrichment, and deterministic scoring.",
    techStack: ["Python", "JSON/CSV", "DSLD", "Data Validation"],
  },
  {
    title: "Business Websites & Landing Pages",
    category: "Web Development",
    categoryColor: "#8b5cf6",
    description:
      "Custom responsive websites for small businesses and professional brands \u2014 built with React, Next.js, or WordPress depending on the client's needs. SEO-optimized, fast-loading, accessible, and designed for lead conversion from day one.",
    techStack: ["React", "Next.js", "WordPress", "SEO"],
  },
];

export const principles = [
  {
    title: "Accuracy Over Hype",
    description:
      "We don't recommend tools because they're trending \u2014 we recommend them because they solve the problem. Every technical decision is evidence-based and tested under real conditions.",
  },
  {
    title: "Performance First",
    description:
      "Fast load times, clean code, zero bloat. We obsess over the details that users feel but can't name \u2014 the milliseconds, the smooth transitions, the pages that just work.",
  },
  {
    title: "Continuous Learning",
    description:
      "In AI, today's best practice is tomorrow's anti-pattern. We invest hours every week studying new models, frameworks, and research \u2014 so our clients never inherit outdated systems.",
  },
  {
    title: "Authenticity",
    description:
      "We cut through the noise. If a $50/month tool solves your problem, we'll tell you \u2014 even if it means a smaller invoice. Our reputation is built on honesty, not upsells.",
  },
  {
    title: "Human-Centered",
    description:
      "Technology is a tool, not the point. We build for the humans on the other end \u2014 the patient checking their meds, the founder checking their dashboard at midnight.",
  },
  {
    title: "Ship, Then Iterate",
    description:
      "Perfection is the enemy of progress. We get functional systems into your hands fast, then refine based on real data and real user behavior \u2014 not assumptions.",
  },
];
