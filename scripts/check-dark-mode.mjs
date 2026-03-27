import { readFileSync } from "node:fs";

const checks = [
  {
    file: "src/styles/globals.css",
    required: [
      "@theme {",
      "color-scheme: light;",
      "color-scheme: dark;",
    ],
    forbidden: ["@theme inline {"],
  },
  {
    file: "src/components/sections/hero.tsx",
    forbidden: ["text-navy-400"],
  },
  {
    file: "src/components/sections/why-bbr.tsx",
    forbidden: ["bg-navy-950", "text-white", "text-navy-400"],
  },
  {
    file: "src/components/sections/orbital-process.tsx",
    forbidden: ["bg-navy-950/90", "text-white", "text-navy-400"],
  },
  {
    file: "src/components/sections/cta-banner.tsx",
    forbidden: ["from-navy-950", "text-navy-400", "text-transparent"],
  },
  {
    file: "src/components/ui/radial-orbital-timeline.tsx",
    forbidden: ["bg-navy-950", "text-white", "text-white/"],
  },
  {
    file: "src/components/ui/theme-toggle.tsx",
    required: ["focus-visible:ring-2"],
  },
  {
    file: "src/components/ui/badge.tsx",
    forbidden: ["text-navy-600", "text-white"],
  },
];

const failures = [];

for (const check of checks) {
  const content = readFileSync(new URL(`../${check.file}`, import.meta.url), "utf8");

  for (const required of check.required ?? []) {
    if (!content.includes(required)) {
      failures.push(`${check.file}: missing required theme guard "${required}"`);
    }
  }

  for (const forbidden of check.forbidden ?? []) {
    if (content.includes(forbidden)) {
      failures.push(`${check.file}: found hard-coded theme leak "${forbidden}"`);
    }
  }
}

if (failures.length > 0) {
  console.error("Dark-mode regression check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Dark-mode regression check passed.");
