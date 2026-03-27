export interface FaqItem {
  question: string;
  answer: string;
}

export const faqCategories: Record<string, string> = {
  automation: "Automation",
  builds: "Websites & Apps",
  seo: "SEO & Growth",
  pricing: "Pricing & Process",
};

export const faqData: Record<string, FaqItem[]> = {
  automation: [
    {
      question: "What does an AI automation agency actually do for a small business?",
      answer:
        "An AI automation agency helps a business reduce manual work by connecting the tools it already uses and building smarter workflows around them. That can include lead capture and follow-up, CRM updates, client intake, scheduling, quoting, reporting, support workflows, internal assistants, and custom dashboards. At B&Br, the goal is not to add flashy AI for its own sake. The goal is to remove bottlenecks, speed up response time, and give founders more leverage.",
    },
    {
      question: "What can you automate for a service business, clinic, or operator-led company?",
      answer:
        "Common starting points are lead routing, appointment reminders, onboarding, estimates, follow-up sequences, customer support triage, reporting, and admin-heavy handoffs between tools. For clinics and regulated workflows, we can also design privacy-conscious systems around intake, messaging, internal search, and operational visibility. The right place to start is usually the most repetitive workflow tied to revenue, response time, or team capacity.",
    },
    {
      question: "Can you automate lead capture, follow-up, and client onboarding?",
      answer:
        "Yes. This is one of the most common use cases. We can connect forms, CRM pipelines, email or SMS follow-up, scheduling, qualification logic, onboarding checklists, and internal notifications so leads do not sit untouched and new clients do not fall into a manual gap. The point is to turn scattered steps into one clear operating system.",
    },
    {
      question: "Can AI handle customer support without making the business feel robotic?",
      answer:
        "Yes, if the workflow is designed properly. Good support automation handles repetitive questions, routing, intake, and first-response coverage while keeping a clean path to a real person when nuance matters. We focus on systems that improve response speed and consistency without making the experience feel canned or careless.",
    },
  ],
  builds: [
    {
      question: "Can you redesign or rebuild my existing website without hurting SEO?",
      answer:
        "Yes. Website redesigns and rebuilds are a common engagement. We audit the existing site, preserve the pages and signals that are already working, improve speed and structure, and handle technical SEO details like crawlability, redirects, metadata, internal linking, and schema where relevant. The goal is a stronger site, not a reset that destroys existing momentum.",
    },
    {
      question: "Do you build custom web apps, internal tools, and client portals?",
      answer:
        "Yes. B&Br builds more than brochure sites. We build custom web apps, internal dashboards, workflow systems, client-facing portals, and product layers that sit on top of your operations. That includes tools for service teams, hospitality workflows, healthcare-adjacent products, and founder-led businesses that have outgrown spreadsheets and patchwork software.",
    },
    {
      question: "How long does it take to build a business website, automation system, or MVP?",
      answer:
        "A focused website project can often launch in 1 to 3 weeks. A workflow automation system or internal tool is usually closer to 2 to 6 weeks depending on complexity, integrations, and review speed. During discovery, we map the actual scope so the timeline is based on the system being built rather than a generic promise.",
    },
    {
      question: "What platforms, integrations, and stacks do you work with?",
      answer:
        "We regularly work with Next.js, React, Flutter, WordPress, Shopify, Python, Zapier, Make, GA4, dashboards, CRM systems, scheduling tools, forms, email providers, and custom APIs. We choose the stack based on the business need, the budget, and the long-term maintenance reality rather than whatever happens to be trendy.",
    },
    {
      question: "Do you only work on new builds, or can you improve what we already have?",
      answer:
        "We do both. Some engagements start from zero, but many start with an existing website, CRM, automation setup, or internal workflow that needs to be cleaned up, rebuilt, or extended. If the current system can be improved instead of replaced, we will say that directly.",
    },
  ],
  seo: [
    {
      question: "Do you offer technical SEO audits and on-page SEO improvements?",
      answer:
        "Yes. Technical SEO is part of how we build and part of how we audit. That includes crawlability, site structure, metadata, heading hierarchy, internal links, schema, speed, indexing issues, image handling, and the technical foundation needed before content strategy can do its job.",
    },
    {
      question: "Can you help us rank in local search, traditional search, and AI-driven search experiences?",
      answer:
        "Yes, but the approach is practical. We improve the fundamentals that help across search environments: clear service pages, crawlable content, useful FAQs, strong metadata, internal linking, structured data, fast rendering, and content that answers real buyer questions. There is no legitimate shortcut for AI search ranking. The best path is being the clearest useful source on the topic.",
    },
    {
      question: "How do you approach SEO for a brand-new website?",
      answer:
        "We start with the technical foundation and information architecture first, then map the content opportunities. That means page structure, keyword intent, service positioning, metadata, internal links, schema, and fast performance are handled early so the site is ready to earn traffic instead of needing an SEO rescue after launch.",
    },
    {
      question: "Do you help with content strategy, FAQs, and keyword targeting?",
      answer:
        "Yes. We help identify the questions buyers are actually asking, map those to service pages and supporting content, and turn them into useful copy, FAQs, and landing-page structure. The goal is not keyword stuffing. The goal is coverage of real search intent in language your buyers actually use.",
    },
  ],
  pricing: [
    {
      question: "How much does workflow automation or a custom business system cost?",
      answer:
        "It depends on the scope, the number of integrations, and whether the project is mostly workflow design, custom UI, or product logic. A smaller automation engagement can be relatively lean, while a broader internal system or custom app is a larger investment. We price based on the business problem being solved and the amount of system complexity involved, not on vague agency packaging.",
    },
    {
      question: "Do you offer fixed-price projects or monthly retainers?",
      answer:
        "Both. We use project-based pricing for clearly defined builds like websites, MVPs, automation systems, and internal tools. We use retainers for ongoing development, technical SEO, maintenance, analytics, and continuous system improvement after launch.",
    },
    {
      question: "What happens during the discovery call?",
      answer:
        "The discovery call is a practical 30-minute conversation about your current setup, bottlenecks, goals, tools, and timeline. We use it to understand where the friction actually lives and whether the right answer is a website project, an automation system, an SEO fix, or a smaller tactical improvement. No scripts, no pressure, and no inflated proposals.",
    },
    {
      question: "How involved do I need to be once the project starts?",
      answer:
        "You do not need to manage the build day-to-day, but your input matters at key points. We usually need fast feedback on priorities, content, approvals, and business rules. The process is designed to keep you informed without turning you into a project manager.",
    },
    {
      question: "What makes B&Br different from a traditional agency or freelancer?",
      answer:
        "B&Br is founder-led, automation-first, and system-first. You work directly with the person building the system. There are no account-manager layers, no disappearing freelancer pattern, and no inflated AI theatre. The work is designed to hold up under real business use, not just look good in a pitch deck.",
    },
  ],
};

export const flatFaqItems = Object.values(faqData).flat();
