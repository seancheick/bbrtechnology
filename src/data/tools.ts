export interface ToolCategory {
  title: string;
  items: string[];
}

export const toolCategories: ToolCategory[] = [
  {
    title: "Frontend",
    items: [
      "React / Next.js",
      "Flutter",
      "WordPress / Elementor",
      "Tailwind CSS",
      "HTML / CSS / JS",
    ],
  },
  {
    title: "Backend & Data",
    items: [
      "Python / Node.js",
      "PostgreSQL / Firebase",
      "REST / GraphQL",
      "Pandas / NumPy",
      "Supabase",
    ],
  },
  {
    title: "AI & Tools",
    items: [
      "OpenAI / Claude API",
      "RAG / Vector Search",
      "Zapier / Make",
      "GA4 / Looker Studio",
      "Figma / Notion",
    ],
  },
];
