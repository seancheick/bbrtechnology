import { readFileSync } from "node:fs";

const checks = [
  {
    file: "src/app/page.tsx",
    required: ['ProductsShowcase', 'ProcessRoadmap'],
    forbidden: ['MetricsBar', 'OrbitalProcess'],
  },
  {
    file: "src/data/portfolio.ts",
    required: ['PharmaGuide', 'FieldOps', 'AirbnbBBR'],
  },
  {
    file: "src/data/testimonials.ts",
    forbidden: ['randomuser.me'],
    required: ['Clinic Owner', 'Airbnb', 'Solopreneur'],
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
