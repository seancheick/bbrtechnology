import { carePlans, formatUsd, getOffer } from "@/data/services";
import { site } from "@/lib/site";

export interface FaqItem {
  question: string;
  answer: string;
}

const sprint = getOffer("automation-sprint");
const audit = getOffer("automation-audit");
const site_ = getOffer("website");
const mobile = getOffer("mobile-app");

export const faqItems: FaqItem[] = [
  {
    question: "What does a project cost?",
    answer: `Every service has a published starting price. An automation audit starts at ${formatUsd(audit.from)}, an automation sprint at ${formatUsd(sprint.from)}, a business website at ${formatUsd(site_.from)}, and a mobile app MVP at ${formatUsd(mobile.from)}. After a short call you get a fixed quote within two business days of us receiving your project details, so the number doesn't move once work starts.`,
  },
  {
    question: "Can you work with the tools we already pay for?",
    answer:
      "Usually, yes, and we'd rather do that than sell you a replacement. We connect CRMs, booking systems, property-management software, spreadsheets, email and payment tools through their supported APIs. If a tool doesn't allow the integration you need, we tell you before quoting, not after.",
  },
  {
    question: "How quickly can you start, and how long does it take?",
    answer: `Small automation work usually starts within a week. A sprint takes ${sprint.timeline}. Websites take ${site_.timeline}, web apps 6–12 weeks, and mobile apps ${mobile.timeline}. You see working software on a private preview link every week.`,
  },
  {
    question: "Who will I actually work with?",
    answer: `${site.short} is a founder-led studio. Sean leads every project from the first call to launch and works with a small team of engineers and designers when the scope needs it. You always know who is building your system.`,
  },
  {
    question: "Fixed price or hourly?",
    answer:
      "Fixed price for defined scope. Direct projects are 50% to start and 50% at acceptance; marketplace projects use funded milestones. Ongoing work moves to a monthly care plan with stated hours, so nothing is open-ended.",
  },
  {
    question: "How do you use AI, and is our data safe?",
    answer:
      "We use AI where it saves real hours: classifying requests, drafting replies, summarizing, answering from your approved knowledge. Anything consequential, such as sending a message, moving money or changing a booking, goes through a human approval step. We build on accounts you own wherever possible and choose providers whose data terms fit your business.",
  },
  {
    question: "Can you improve what we have instead of rebuilding it?",
    answer:
      "Yes. Many projects start with an audit of an existing site, automation or app. We fix what's worth keeping and only rebuild what's holding you back.",
  },
  {
    question: "What happens after launch?",
    answer: `Every build includes a fix window after launch (14 days for sprints, 30 days for apps). After that, care plans start at ${formatUsd(carePlans[0].monthly)}/month for monitoring, updates and small changes, or ${formatUsd(carePlans[1].monthly)}/month for systems your business runs on every day.`,
  },
  {
    question: "Who owns the code and accounts?",
    answer:
      "You do. We build in repositories and accounts you own wherever possible, and hand over everything, including documentation and access, at final payment.",
  },
  {
    question: "What happens on the discovery call?",
    answer:
      "A practical 30-minute conversation about your current setup, the bottleneck, the tools involved and what a good outcome is worth. You leave with a clear recommendation, even when the right answer is a smaller fix or a tool you already have.",
  },
];
