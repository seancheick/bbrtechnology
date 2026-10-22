// Preset inquiries for the demo. Their `simulated` results are shown only when live AI is
// unavailable, and always labeled "Simulated". They follow the rules in src/lib/demo/businesses.ts.
import type { DemoResult, Industry } from "@/lib/demo/schema";

export interface DemoScenario {
  id: string;
  label: string;
  message: string;
  simulated: DemoResult;
}

export const demoScenarios: Record<Industry, DemoScenario[]> = {
  property: [
    {
      id: "leak",
      label: "Leaking sink",
      message: "Hi, the bathroom sink is leaking and there's water all over the floor. What should we do?",
      simulated: {
        category: "maintenance",
        urgency: "urgent",
        summary: "Guest reports an active bathroom sink leak with water on the floor.",
        task: { needed: true, title: "Fix bathroom sink leak and dry floor", assignee_role: "Maintenance lead", due: "Within 1 hour" },
        alert: { channel: "sms", to_role: "Maintenance lead", message: "URGENT: active sink leak reported by current guest. Water on bathroom floor." },
        draft_reply:
          "I'm so sorry about this. If you can, turn the small valve under the sink clockwise to stop the water, and please avoid the wet floor. Our maintenance lead has been alerted and will be in touch shortly to fix it.",
        escalate: true,
        escalation_reason: "Active water damage; maintenance needs to confirm arrival time.",
        confidence: 0.94,
      },
    },
    {
      id: "early",
      label: "Early check-in",
      message: "We land at 10am on Friday. Any chance we could check in early?",
      simulated: {
        category: "booking",
        urgency: "normal",
        summary: "Guest arriving Friday 10 AM asks for early check-in.",
        task: { needed: true, title: "Check Friday turnover for early check-in", assignee_role: "Property manager", due: "Today" },
        alert: { channel: "email", to_role: "Property manager", message: "Early check-in request for Friday (guest lands 10 AM). Check same-day turnover." },
        draft_reply:
          "Thanks for letting us know! Check-in is normally at 4 PM. Early check-in is sometimes possible when there's no same-day turnover, for a $35 fee. A team member will confirm by Thursday.",
        escalate: true,
        escalation_reason: "Early check-in needs property manager approval.",
        confidence: 0.9,
      },
    },
    {
      id: "dirty",
      label: "Cleaning complaint",
      message: "Just arrived and the kitchen wasn't cleaned. There are dirty dishes in the sink.",
      simulated: {
        category: "cleaning",
        urgency: "high",
        summary: "Guest arrived to an uncleaned kitchen with dirty dishes.",
        task: { needed: true, title: "Re-clean kitchen for current guest", assignee_role: "Cleaning coordinator", due: "Within 2 hours" },
        alert: { channel: "sms", to_role: "Cleaning coordinator", message: "Re-clean needed: kitchen not cleaned before arrival. Guest on site." },
        draft_reply:
          "I'm really sorry, that's not the welcome you should have had. I've asked our cleaning team to come back and take care of the kitchen as soon as possible, and someone will message you with a time shortly.",
        escalate: true,
        escalation_reason: "Guest experience issue; manager may want to offer a gesture.",
        confidence: 0.92,
      },
    },
  ],
  "home-services": [
    {
      id: "furnace",
      label: "No heat tonight",
      message: "Our furnace stopped working and it's 40 degrees in the house. Can someone come tonight?",
      simulated: {
        category: "maintenance",
        urgency: "urgent",
        summary: "No heat with indoor temperature around 40°F; customer requests tonight.",
        task: { needed: true, title: "Emergency furnace call", assignee_role: "On-call technician", due: "Tonight" },
        alert: { channel: "sms", to_role: "On-call technician", message: "EMERGENCY: no heat, house at ~40°F. Customer requests a visit tonight." },
        draft_reply:
          "That sounds miserable, and we treat no heat as an emergency. Our on-call technician has been alerted and will call you shortly to confirm a time. After-hours visits carry a $149 dispatch fee.",
        escalate: false,
        escalation_reason: "",
        confidence: 0.95,
      },
    },
    {
      id: "estimate",
      label: "Water heater quote",
      message: "Thinking about replacing our 15-year-old water heater. Do you do free estimates?",
      simulated: {
        category: "booking",
        urgency: "low",
        summary: "Customer wants an estimate to replace a 15-year-old water heater.",
        task: { needed: true, title: "Book free install estimate", assignee_role: "Dispatcher", due: "Within 1 business day" },
        alert: { channel: "email", to_role: "Dispatcher", message: "New install lead: water heater replacement estimate requested." },
        draft_reply:
          "Yes, install estimates are free. Our dispatcher will reach out within one business day to find a time that works for a quick visit.",
        escalate: false,
        escalation_reason: "",
        confidence: 0.93,
      },
    },
    {
      id: "invoice",
      label: "Invoice question",
      message: "I think I was charged twice for last week's visit. Can you check?",
      simulated: {
        category: "billing",
        urgency: "normal",
        summary: "Customer believes they were double-charged for last week's visit.",
        task: { needed: true, title: "Review possible duplicate charge", assignee_role: "Office manager", due: "Within 1 business day" },
        alert: { channel: "email", to_role: "Office manager", message: "Possible duplicate charge for last week's visit. Customer asked for a check." },
        draft_reply:
          "Thanks for flagging this. Our office manager will review your account and get back to you within one business day.",
        escalate: true,
        escalation_reason: "Billing correction must be confirmed by the office manager.",
        confidence: 0.91,
      },
    },
  ],
  ecommerce: [
    {
      id: "cracked",
      label: "Damaged item",
      message: "My order arrived but the glass pitcher is cracked. What do I do?",
      simulated: {
        category: "complaint",
        urgency: "high",
        summary: "Customer received a cracked glass pitcher.",
        task: { needed: true, title: "Send replacement pitcher once photo received", assignee_role: "Fulfillment lead", due: "Today" },
        alert: { channel: "slack", to_role: "Fulfillment lead", message: "Damaged delivery: cracked glass pitcher. Replacement pending photo." },
        draft_reply:
          "I'm sorry it arrived damaged! Could you reply with a quick photo of the pitcher and the box? As soon as we have it, we'll send a replacement at no cost.",
        escalate: false,
        escalation_reason: "",
        confidence: 0.94,
      },
    },
    {
      id: "where",
      label: "Where's my order?",
      message: "I ordered five days ago and haven't received anything yet. Where is it?",
      simulated: {
        category: "question",
        urgency: "normal",
        summary: "Customer hasn't received an order placed five days ago.",
        task: { needed: true, title: "Check tracking and update customer", assignee_role: "Support agent", due: "Today" },
        alert: { channel: "slack", to_role: "Support agent", message: "Delivery check: order placed 5 days ago not yet received." },
        draft_reply:
          "Thanks for checking in. Most orders arrive within 2 to 5 business days after shipping, so it may be close. We're checking the tracking now and will update you today.",
        escalate: false,
        escalation_reason: "",
        confidence: 0.88,
      },
    },
    {
      id: "discount",
      label: "Discount request",
      message: "I'm buying 12 sets for my restaurant. Can I get a discount?",
      simulated: {
        category: "question",
        urgency: "normal",
        summary: "Restaurant buyer requests a bulk discount on 12 sets.",
        task: { needed: true, title: "Respond to bulk pricing request", assignee_role: "Support lead", due: "Within 1 business day" },
        alert: { channel: "email", to_role: "Support lead", message: "Bulk inquiry: 12 sets for a restaurant, discount requested." },
        draft_reply:
          "Thanks for thinking of us for your restaurant! Our support lead handles larger orders and will follow up within one business day.",
        escalate: true,
        escalation_reason: "Discounts can only be approved by the support lead.",
        confidence: 0.9,
      },
    },
  ],
};
