import { readFileSync } from "node:fs";

const checks = [
  {
    // buyer-first: outcome hero, live demo, services, delivered projects, working with us, estimator, FAQ
    file: "src/app/page.tsx",
    required: ["<Hero", "<DemoSection", "<ServicesOverview", "<ProjectsSection", "<WorkingSection", "<EstimatorSection", "<FaqSection"],
    forbidden: ["MetricsBar", "OrbitalProcess", "ProductsShowcase", "FeaturedWork", "HeroVisual"],
  },
  {
    file: "src/data/case-studies.ts",
    required: ["TurnFlow", "PharmaGuide", "FieldOps AI", "Keniya", "attribution"],
    forbidden: ["career-ops"],
  },
  {
    file: "src/data/services.ts",
    required: ["automation-audit", "automation-sprint", "mobile-app", "carePlans"],
    forbidden: ["Up to 40%", "20+ Hrs"],
  },
  {
    file: "src/data/testimonials.ts",
    forbidden: ["randomuser.me"],
    required: ["Clinic Owner", "Airbnb", "featuredTestimonials"],
  },
  {
    // projects read as delivered work, not "our products"
    file: "src/components/home/projects-section.tsx",
    required: ["Projects we've delivered", "card.outcome"],
    forbidden: ["attribution", "Proof you can click"],
  },
  {
    // the demo never presents canned output as live AI
    file: "src/components/demos/inquiry-pipeline.tsx",
    required: ['source: "simulated"', "Simulated"],
  },
];

const failures = [];

for (const check of checks) {
  const content = readFileSync(new URL(`../${check.file}`, import.meta.url), "utf8");

  for (const required of check.required ?? []) {
    if (!content.includes(required)) {
      failures.push(`${check.file}: missing "${required}"`);
    }
  }

  for (const forbidden of check.forbidden ?? []) {
    if (content.includes(forbidden)) {
      failures.push(`${check.file}: contains forbidden "${forbidden}"`);
    }
  }
}

if (failures.length > 0) {
  console.error("Homepage story regression check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Homepage story regression check passed.");
