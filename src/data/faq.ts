export interface FaqItem {
  question: string;
  answer: string;
}

export const faqCategories: Record<string, string> = {
  general: "General",
  services: "Services",
  pricing: "Pricing",
  process: "Process",
};

export const faqData: Record<string, FaqItem[]> = {
  general: [
    {
      question: "How long does a typical project take?",
      answer:
        "Most projects launch within 7\u201321 days depending on scope. A simple business website might take 1\u20132 weeks, while a full automation system or custom app could take 3\u20136 weeks. We'll give you a realistic timeline during our discovery call.",
    },
    {
      question: "Do you work with clients outside Boston?",
      answer:
        "Absolutely. While we're based in Boston, we work with clients across the US and internationally. Everything is done remotely with regular check-ins via video call.",
    },
    {
      question: "What makes B&Br different from other agencies?",
      answer:
        "We're founder-led, AI-native, and system-first. You work directly with Sean \u2014 no account managers, no hand-offs. AI isn't an add-on; it's core to how we build. And we focus on systems that scale, not fragile one-offs.",
    },
    {
      question: "Do I need to know about technology to work with you?",
      answer:
        "Not at all. We translate technical concepts into plain language. You tell us your business goals, and we handle the technical decisions. We'll explain everything along the way so you always know what's happening and why.",
    },
  ],
  services: [
    {
      question: "Can you rebuild my existing website?",
      answer:
        "Yes \u2014 redesigns and rebuilds are one of our most common projects. We'll audit your current site, preserve what's working, and rebuild it on a modern, fast, SEO-optimized stack.",
    },
    {
      question: "What platforms do you build on?",
      answer:
        "We work with React, Next.js, WordPress, Shopify, WooCommerce, and Flutter for mobile. We pick the platform that best fits your needs and budget \u2014 not what's trending.",
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer:
        "Yes. Our IT Support & Maintenance service covers security updates, performance monitoring, bug fixes, and ongoing technical support. We don't build and disappear.",
    },
    {
      question: "Can you help with just AI automation without a new website?",
      answer:
        "Absolutely. Many clients come to us specifically for workflow automation, chatbot setup, or AI assistant development. We can work with your existing tech stack.",
    },
  ],
  pricing: [
    {
      question: "How does pricing work?",
      answer:
        "We offer two models: project-based pricing for defined scope work (websites, apps, automation setup), and monthly retainers for ongoing support and continuous development. We'll recommend the right model during your discovery call.",
    },
    {
      question: "What's a 'Launch & Build' engagement?",
      answer:
        "Launch & Build is our project-based model \u2014 perfect for websites, app launches, or setting up a new automation system. Clear scope, clear timeline, fixed price. It includes custom website development, app MVP launch, one-time automation setup, and brand identity systems.",
    },
    {
      question: "Do you offer monthly retainers?",
      answer:
        "Yes. Retainers are ideal for businesses that need ongoing development, maintenance, SEO work, or continuous automation improvements. You get a dedicated allocation of hours each month with priority response times.",
    },
    {
      question: "What if my budget is small?",
      answer:
        "We work with businesses at every stage. If a $50/month tool solves your problem, we'll tell you \u2014 even if it means a smaller invoice. We'd rather build trust than pad a proposal. During the discovery call, we'll be honest about what makes sense for your budget.",
    },
  ],
  process: [
    {
      question: "What's the discovery call like?",
      answer:
        "It's a free 30-minute conversation where we learn about your business, your goals, and your current setup. No sales scripts, no pressure. We'll give you honest feedback on what you need and whether we're the right fit.",
    },
    {
      question: "How involved do I need to be?",
      answer:
        "We keep you in the loop without overwhelming you. Expect brief weekly check-ins and milestone reviews. We handle the technical decisions \u2014 you focus on your business. We'll ask for your input when it matters (brand, content, priorities) and handle the rest.",
    },
    {
      question: "What if I'm not happy with the direction?",
      answer:
        "We build in review checkpoints at every phase. If something isn't right, we course-correct before moving forward. Our Blueprint phase exists specifically to align on direction before any code is written.",
    },
    {
      question: "How do you handle revisions?",
      answer:
        "Revisions are built into every project. Each milestone includes a review round where you can request changes. We find that our Blueprint phase eliminates most major revisions because we align on direction early.",
    },
  ],
};
