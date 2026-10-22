// Preset inquiries for the demo. Their `simulated` results are shown only when live AI is
// unavailable, and always labeled "Simulated". They follow the rules in src/lib/demo/businesses.ts.
import type { DemoResult, Industry } from "@/lib/demo/schema";

export interface DemoScenario {
  id: string;
  label: string;
  message: string;
  simulated: DemoResult;
}

const none = {
  handoff: { needed: false, partner: "", service: "", detail: "" },
  sources: [],
  tool_call: { needed: false, system: "", action: "", summary: "" },
  extracted: [],
};

export const demoScenarios: Record<Industry, DemoScenario[]> = {
  "home-property": [
    {
      id: "leak",
      label: "Leak under the sink",
      message: "Water is leaking under my kitchen sink and the cabinet floor is soaked. Can someone come today?",
      simulated: {
        ...none,
        category: "maintenance",
        urgency: "urgent",
        summary: "Active leak under the kitchen sink; cabinet floor soaked. Wants a same-day repair.",
        task: { needed: true, title: "Same-day plumbing repair, kitchen sink", assignee_role: "Maintenance coordinator", due: "Today" },
        alert: { channel: "sms", to_role: "Maintenance coordinator", message: "URGENT: active kitchen sink leak, cabinet soaked. Handed off to Homecierge." },
        draft_reply:
          "Thanks for telling us right away. Please turn the shut-off valve under the sink clockwise and keep towels on the floor. We've requested a vetted plumber through our partner Homecierge, and you'll get the upfront price and arrival time to confirm shortly.",
        escalate: false,
        escalation_reason: "",
        handoff: {
          needed: true,
          partner: "Homecierge",
          service: "Plumbing, same day",
          detail: "Licensed, insured plumber matched near the property; upfront price and deposit-secured booking sent to confirm.",
        },
        confidence: 0.95,
      },
    },
    {
      id: "ac",
      label: "AC blowing warm air",
      message: "Our AC is running but blowing warm air. It's 96 degrees out and we have a baby at home.",
      simulated: {
        ...none,
        category: "maintenance",
        urgency: "urgent",
        summary: "AC blowing warm air in 96°F heat; infant in the home.",
        task: { needed: true, title: "Emergency HVAC visit", assignee_role: "Maintenance coordinator", due: "Within 4 hours" },
        alert: { channel: "sms", to_role: "Maintenance coordinator", message: "URGENT: no cooling at 96°F, infant at home. HVAC handoff sent." },
        draft_reply:
          "That heat is not safe to wait out, so we're treating this as urgent. We've requested a vetted HVAC pro through Homecierge and will confirm the price and arrival window shortly. Until then, keep blinds closed and the baby in the coolest room.",
        escalate: false,
        escalation_reason: "",
        handoff: {
          needed: true,
          partner: "Homecierge",
          service: "HVAC repair, priority",
          detail: "Vetted HVAC pro matched with an upfront diagnostic price; booking held with a deposit until the job is done.",
        },
        confidence: 0.93,
      },
    },
    {
      id: "early",
      label: "Early check-in",
      message: "We land at 10am on Friday for our stay. Any chance we could check in early?",
      simulated: {
        ...none,
        category: "booking",
        urgency: "normal",
        summary: "Short-stay guest arriving Friday 10 AM asks for early check-in.",
        task: { needed: true, title: "Check Friday turnover for early check-in", assignee_role: "Property manager", due: "Today" },
        alert: { channel: "email", to_role: "Property manager", message: "Early check-in request for Friday (guest lands 10 AM)." },
        draft_reply:
          "Thanks for letting us know! Check-in is normally 4 PM. Early check-in is sometimes possible when there's no same-day turnover, and a team member will confirm by Thursday.",
        escalate: true,
        escalation_reason: "Early check-in needs property manager approval.",
        confidence: 0.9,
      },
    },
  ],
  clinic: [
    {
      id: "chest",
      label: "Chest tightness",
      message: "I've had chest tightness since this morning and my left arm feels heavy. Can I get an appointment today?",
      simulated: {
        ...none,
        category: "clinical",
        urgency: "urgent",
        summary: "Patient reports chest tightness and a heavy left arm since this morning.",
        task: { needed: true, title: "Triage nurse callback now", assignee_role: "Triage nurse", due: "Immediately" },
        alert: { channel: "sms", to_role: "Triage nurse", message: "URGENT: possible emergency symptoms reported via portal. Patient told to call 911." },
        draft_reply:
          "Please call 911 now or go to the nearest emergency room. Chest tightness with arm heaviness needs to be checked right away. Our triage nurse has also been alerted and will call you.",
        escalate: true,
        escalation_reason: "Possible emergency. Clinician follow-up required; no advice given by the system.",
        confidence: 0.97,
      },
    },
    {
      id: "refill",
      label: "Prescription refill",
      message: "Can I get a refill on my blood pressure medication? I have 3 pills left.",
      simulated: {
        ...none,
        category: "clinical",
        urgency: "high",
        summary: "Refill request for blood pressure medication; 3 days of supply left.",
        task: { needed: true, title: "Review refill request in chart", assignee_role: "Triage nurse", due: "Today" },
        alert: { channel: "email", to_role: "Triage nurse", message: "Refill request, 3 days of supply left. Chart review needed." },
        draft_reply:
          "Thanks for reaching out before you run out. Our nurse will review your chart today and the clinic will confirm the refill with you.",
        escalate: true,
        escalation_reason: "Refills need clinician review.",
        confidence: 0.92,
      },
    },
    {
      id: "intake",
      label: "Insurance card & intake",
      message:
        "New patient here. My insurance card says BlueCross PPO, member ID XJK48812, group 7731. Date of birth 04/12/1988. I'd like a physical next week.",
      simulated: {
        ...none,
        category: "document",
        urgency: "normal",
        summary: "New patient sent insurance details and requests a physical next week.",
        task: { needed: true, title: "Verify insurance and book new-patient physical", assignee_role: "Front desk", due: "Within 1 business day" },
        alert: { channel: "email", to_role: "Front desk", message: "New patient intake: insurance fields extracted, ready to verify." },
        draft_reply:
          "Welcome to Lakeside Family Clinic! We've received your insurance details and our front desk will verify coverage and reach out with times for your physical next week.",
        escalate: false,
        escalation_reason: "",
        extracted: [
          { field: "Insurer", value: "BlueCross PPO" },
          { field: "Member ID", value: "XJK48812" },
          { field: "Group", value: "7731" },
          { field: "Date of birth", value: "04/12/1988" },
          { field: "Visit type", value: "New-patient physical" },
        ],
        confidence: 0.94,
      },
    },
  ],
  contractor: [
    {
      id: "noshow",
      label: "“Nobody showed up”",
      message: "Your crew never showed up on October 14 for job 2417 and I'm not paying that invoice.",
      simulated: {
        ...none,
        category: "dispute",
        urgency: "high",
        summary: "Client disputes the Oct 14 visit on job #2417 and refuses the invoice.",
        task: { needed: true, title: "Send visit proof to client, job #2417", assignee_role: "Project manager", due: "Today" },
        alert: { channel: "sms", to_role: "Project manager", message: "Invoice dispute on #2417. GPS record and photos attached for the reply." },
        draft_reply:
          "Thanks for raising this. Our record for job #2417 shows the crew clocked in at 7:58 AM on October 14 at the job address, with 6 time-stamped photos and your signature at 3:35 PM. Your project manager will send the photos and walk through it with you today.",
        escalate: true,
        escalation_reason: "Billing dispute; project manager should handle the client directly.",
        sources: [
          {
            title: "Job #2417 field record · Oct 14",
            quote: "clocked in 7:58 AM at 4410 Gaston Ave, GPS-verified within 8 m. 6 stamped proof photos... Client signature captured at 3:35 PM.",
          },
        ],
        confidence: 0.93,
      },
    },
    {
      id: "ot",
      label: "Overtime request",
      message: "Foreman here on job 2431. We need 2 more hours today to finish the panel before Thursday's inspection.",
      simulated: {
        ...none,
        category: "request",
        urgency: "high",
        summary: "Foreman requests 2 hours overtime on #2431 to finish before the Oct 23 inspection.",
        task: { needed: true, title: "Approve or deny 2h overtime, job #2431", assignee_role: "Project manager", due: "Within 1 hour" },
        alert: { channel: "sms", to_role: "Project manager", message: "OT approval needed: 2h on #2431, inspection Oct 23." },
        draft_reply: "Got it. Your project manager has the request with the job record and will approve or decline within the hour.",
        escalate: true,
        escalation_reason: "Overtime must be approved by the project manager.",
        sources: [{ title: "Job #2431 field record · Oct 21", quote: "Inspection booked Oct 23. 2 hours overtime requested, not yet approved." }],
        confidence: 0.92,
      },
    },
    {
      id: "change",
      label: "Add an outlet",
      message: "While you're here, can you add two outlets in the garage? How much would that be?",
      simulated: {
        ...none,
        category: "change_order",
        urgency: "normal",
        summary: "Client asks to add two garage outlets to the current job.",
        task: { needed: true, title: "Prepare change-order quote: 2 garage outlets", assignee_role: "Project manager", due: "Within 1 business day" },
        alert: { channel: "email", to_role: "Project manager", message: "Change-order request: 2 garage outlets. Quote needed." },
        draft_reply:
          "Happy to look at that. Your project manager will send a change-order quote for the two outlets, and we'll schedule the work once you approve it.",
        escalate: false,
        escalation_reason: "",
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
        ...none,
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
        ...none,
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
      label: "Bulk discount",
      message: "I'm buying 12 sets for my restaurant. Can I get a discount?",
      simulated: {
        ...none,
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
  enterprise: [
    {
      id: "policy",
      label: "Policy question (RAG)",
      message: "A customer in Germany wants to cancel 3 weeks into their enterprise contract. What's our refund policy?",
      simulated: {
        ...none,
        category: "knowledge",
        urgency: "normal",
        summary: "Customer success asks about refunds for an EU enterprise customer cancelling after 3 weeks.",
        task: { needed: false, title: "", assignee_role: "", due: "" },
        alert: { channel: "slack", to_role: "Customer success", message: "Policy answer sent with source: EU enterprise refund after 14 days." },
        draft_reply:
          "Since they're past the 14-day window, unused prepaid months are refunded pro rata rather than in full. If the refund is over €25,000, Finance needs to approve it.",
        escalate: false,
        escalation_reason: "",
        sources: [
          {
            title: "Refund Policy v4 · Enterprise (EU)",
            quote: "After 14 days, unused prepaid months are refunded pro rata. Refunds over €25,000 require Finance approval.",
          },
        ],
        confidence: 0.95,
      },
    },
    {
      id: "quote",
      label: "Create a quote (MCP)",
      message: "Create a 24-month renewal quote for Acme Freight on the Fleet Pro plan with a 6% discount.",
      simulated: {
        ...none,
        category: "system_action",
        urgency: "normal",
        summary: "Sales ops requests a 24-month Fleet Pro renewal quote for Acme Freight at 6% off.",
        task: { needed: true, title: "Approve Salesforce quote for Acme Freight", assignee_role: "Sales ops", due: "Today" },
        alert: { channel: "slack", to_role: "Sales ops", message: "Quote ready to approve: Acme Freight, 24 months, 6%." },
        draft_reply:
          "Here's the renewal quote ready to create in Salesforce. A 6% multi-year discount is within the 8% limit, so Finance approval isn't needed. Approve it and it will be created.",
        escalate: false,
        escalation_reason: "",
        sources: [{ title: "Renewal Playbook 2026", quote: "Multi-year renewals may receive up to 8% discount without Finance approval." }],
        tool_call: {
          needed: true,
          system: "Salesforce (MCP)",
          action: "salesforce.create_quote(account=\"Acme Freight\", product=\"Fleet Pro\", term_months=24, discount_pct=6)",
          summary: "Creates the renewal quote in Salesforce once a person approves.",
        },
        confidence: 0.93,
      },
    },
    {
      id: "laptop",
      label: "Lost laptop",
      message: "I think I left my work laptop on the train this morning. What should I do?",
      simulated: {
        ...none,
        category: "security",
        urgency: "urgent",
        summary: "Employee reports a work laptop lost on the train this morning.",
        task: { needed: true, title: "Lock device and rotate credentials", assignee_role: "IT security", due: "Immediately" },
        alert: { channel: "sms", to_role: "IT security", message: "URGENT: lost laptop reported. Device lock proposed, awaiting approval." },
        draft_reply:
          "Thanks for reporting it quickly. IT Security has been alerted and will lock and wipe the laptop remotely and reset your passwords. Watch for a message from them shortly.",
        escalate: true,
        escalation_reason: "Security event; IT security must approve the remote wipe.",
        sources: [
          {
            title: "Device Security Standard",
            quote: "IT will lock and wipe the device remotely and rotate the user's credentials.",
          },
        ],
        tool_call: {
          needed: true,
          system: "Device manager (MCP)",
          action: "devices.lock_and_wipe(user_email=\"<reporting employee>\")",
          summary: "Locks and wipes the laptop once IT security approves.",
        },
        confidence: 0.96,
      },
    },
  ],
};
