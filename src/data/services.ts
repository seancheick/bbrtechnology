import { Globe, Bot, TrendingUp, BarChart3, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  audience: string;
}

export const services: Service[] = [
  {
    id: "web-mobile",
    icon: Globe,
    label: "Core Service",
    title: "Web & Mobile Development",
    tagline: "The foundation of your brand. Fast, SEO-ready, and built to last.",
    description:
      "Your website is more than a brochure — it's the engine of your business. We build fast, responsive, SEO-ready sites and mobile apps that look great, load quickly, and convert visitors into customers. Every project is architected for growth, so you're never stuck rebuilding from scratch when your business scales.",
    deliverables: [
      "Custom business websites built with React, Next.js, or WordPress",
      "Shopify and WooCommerce eCommerce stores",
      "iOS and Android mobile applications",
      "Landing pages optimized for lead generation and conversions",
      "Portfolio and personal brand sites",
      "UX/UI design with performance and accessibility baked in",
    ],
    audience:
      "Founders launching their first site, established businesses needing a redesign, creators building a personal brand, and startups that need an MVP shipped fast without cutting corners.",
  },
  {
    id: "ai-automation",
    icon: Bot,
    label: "Key Differentiator",
    title: "AI & Automation Solutions",
    tagline: "Our key differentiator. We turn manual tasks into automated assets.",
    description:
      "This is what sets us apart. While other agencies treat AI as a buzzword, we implement it as practical infrastructure. We identify the repetitive tasks eating your time, then build automation systems that handle them — accurately, consistently, and at scale.",
    deliverables: [
      "AI chatbots for customer support, lead capture, and FAQ automation",
      "Custom GPT-powered internal assistants",
      "Zapier and Make workflow automation",
      "CRM automation and pipeline management",
      "Smart forms with conditional logic and AI processing",
      "Internal tools that replace manual spreadsheet work",
      "AI-powered onboarding and client intake flows",
    ],
    audience:
      "Solopreneurs drowning in admin work, service businesses with repetitive client intake, growing teams that need structure without hiring more people, and anyone spending hours on tasks a machine could do better.",
  },
  {
    id: "seo-growth",
    icon: TrendingUp,
    label: "Long-Term Value",
    title: "SEO & Growth Marketing",
    tagline: "Long-term value engines that ensure you're found by the right people.",
    description:
      "Getting found online isn't optional — it's survival. We implement technical SEO foundations, content strategies, and local search optimization that compound over time. No black-hat tricks, no empty promises — just methodical work that builds real organic traffic and turns searchers into paying customers.",
    deliverables: [
      "Technical SEO audits and fixes (speed, structure, indexing)",
      "On-page optimization for target keywords",
      "Local SEO for service-based businesses (Google Business, citations)",
      "Content strategy and ranking roadmaps",
      "Conversion rate optimization (CRO)",
      "Personal and business brand positioning",
    ],
    audience:
      "Local businesses that depend on \"near me\" searches, eCommerce stores competing for product keywords, consultants building authority in their niche, and any business with a website that isn't generating leads.",
  },
  {
    id: "data-analytics",
    icon: BarChart3,
    label: "Insight Engine",
    title: "Data Analysis & Visualization",
    tagline: "Clear, visual insights for founders. Stop guessing, start knowing.",
    description:
      "You can't improve what you don't measure. We set up proper analytics, build custom dashboards, and deliver clear reporting that helps you make smarter decisions faster. No more guessing whether your marketing is working or where your revenue is coming from.",
    deliverables: [
      "Google Analytics 4 setup with custom events and goals",
      "Looker Studio, Tableau, and Power BI dashboards",
      "Traffic, sales, and performance reporting",
      "Funnel analysis and conversion tracking",
      "Decision-focused data storytelling for teams and investors",
    ],
    audience:
      "Startups that need investor-ready metrics, eCommerce brands tracking multi-channel performance, marketing teams that want clarity on ROI, and founders who are tired of flying blind.",
  },
  {
    id: "it-support",
    icon: Wrench,
    label: "Trust & Retention",
    title: "IT Support & Maintenance",
    tagline: "We don't just build and leave. We keep your systems healthy and secure.",
    description:
      "We don't build and disappear. Your website, apps, and systems need ongoing care — security updates, performance tuning, bug fixes, and someone to call when something breaks. We act as your on-call technical team so you never have to scramble for help or worry about downtime.",
    deliverables: [
      "Website and application maintenance",
      "Proactive system monitoring and health checks",
      "Security patches and software updates",
      "Office IT setup (networks, devices, software provisioning)",
      "Troubleshooting and ongoing technical support",
      "Preventive maintenance and performance optimization",
    ],
    audience:
      "Any business that depends on its website being up and fast, teams without a dedicated IT person, growing companies that need reliable infrastructure, and anyone who's been burned by a developer who disappeared after launch.",
  },
];

export const metrics = [
  {
    value: "7\u201321 Days",
    label: "Typical Launch Window",
    sub: "From concept to live site or MVP \u2014 depending on scope.",
  },
  {
    value: "Up to 40%",
    label: "SEO Traffic Growth",
    sub: "Targeted organic growth within the first 120 days.",
  },
  {
    value: "20+ Hrs/Mo",
    label: "Time Savings Potential",
    sub: "Through workflow automation tailored to your operations.",
  },
];

export const techStack = [
  "React",
  "Next.js",
  "Flutter",
  "Shopify",
  "Zapier",
  "Make",
  "Google Analytics 4",
  "Tableau",
  "Python",
  "OpenAI",
];

export const comparisonTable = {
  headers: ["Feature", "B&Br Technology", "Traditional Agency", "Freelancer"],
  rows: [
    [
      "Web & Mobile",
      "Strategy, design, and build in one flow",
      "More layers, slower alignment",
      "Limited full-system depth",
    ],
    [
      "AI & Automation",
      "Built in from the start",
      "Usually added later",
      "Best for lighter automations",
    ],
    [
      "Support Model",
      "Launch, refine, improve",
      "Often tied to bigger retainers",
      "Depends on availability",
    ],
    [
      "Communication",
      "Direct, dedicated collaboration",
      "Managed through multiple roles",
      "Direct, but bandwidth is limited",
    ],
    [
      "Flexibility",
      "Custom enough to fit, structured enough to scale",
      "Less agile once process is set",
      "Flexible, but can hit capacity limits",
    ],
  ],
};

export const differentiators = [
  {
    title: "Founder-Led",
    description:
      "You talk directly to the person building your product. No layers, no hand-offs.",
  },
  {
    title: "AI-Native",
    description:
      "AI is baked into every solution \u2014 not bolted on as an afterthought.",
  },
  {
    title: "System-First",
    description:
      "We build scalable systems, not fragile one-offs that break when you grow.",
  },
  {
    title: "No BS",
    description:
      "Honest timelines. Transparent pricing. Real results you can measure.",
  },
];

export const processSteps = [
  {
    id: 1,
    title: "Audit & Strategy",
    description:
      "Clarity before code. We analyze your setup and define clear goals.",
  },
  {
    id: 2,
    title: "Blueprint & Architecture",
    description:
      "We design your system logic and visual identity before building.",
  },
  {
    id: 3,
    title: "Build & Deploy",
    description:
      "Performance-first execution using modern, scalable tech stacks.",
  },
  {
    id: 4,
    title: "Optimize & Scale",
    description:
      "Continuous improvements, data insights, and automation expansion.",
  },
];
