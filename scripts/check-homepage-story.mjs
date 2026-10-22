import { readFileSync } from "node:fs";

const checks = [
  {
    // proof before explanation: live demo first, then services, then real work
    file: "src/app/page.tsx",
    required: ["<Hero", "<DemoSection", "<ServicesOverview", "<FeaturedWork", "<EstimatorSection", "<TestimonialsSection", "<FaqSection"],
    forbidden: ["MetricsBar", "OrbitalProcess", "ProductsShowcase"],
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
