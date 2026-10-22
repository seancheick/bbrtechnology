import type { Industry } from "@/lib/demo/schema";

// Fictional businesses. The public demo never touches real customer data.
export interface DemoBusiness {
  industry: Industry;
  name: string;
  label: string;
  description: string;
  roles: string[];
  rules: string[];
}

export const demoBusinesses: Record<Industry, DemoBusiness> = {
  property: {
    industry: "property",
    name: "Harborline Stays",
    label: "Property management",
    description: "Manages 12 short-term rental units in Boston and Cape Cod, listed on Airbnb, Booking.com and VRBO.",
    roles: ["Property manager", "Maintenance lead", "Cleaning coordinator", "Guest experience"],
    rules: [
      "Check-in 4 PM, checkout 10 AM.",
      "Early check-in or late checkout only if there is no same-day turnover; the property manager confirms, $35 fee.",
      "Water leaks, no heat or hot water, lockouts and any safety issue are urgent: text the maintenance lead immediately.",
      "Cleaning complaints go to the cleaning coordinator with a re-clean task within 2 hours.",
      "Only the property manager can approve refunds, discounts or reservation changes.",
      "Door codes are sent automatically 24 hours before arrival; never put a code in a reply.",
    ],
  },
  "home-services": {
    industry: "home-services",
    name: "Northside Plumbing & Heating",
    label: "Home services",
    description: "A 9-person plumbing and heating company serving the north suburbs of Boston.",
    roles: ["Dispatcher", "On-call technician", "Office manager"],
    rules: [
      "Office hours Monday to Friday, 7 AM to 6 PM.",
      "Emergency service is available 24/7; after-hours visits carry a $149 dispatch fee.",
      "Burst pipes, flooding, no heat in winter and gas smells are emergencies.",
      "For a gas smell: tell the customer to leave the building and call 911 or the gas utility from outside.",
      "Install estimates are free and booked by the dispatcher; never quote repair prices in chat.",
      "Billing questions go to the office manager by email.",
    ],
  },
  ecommerce: {
    industry: "ecommerce",
    name: "Fernleaf Goods",
    label: "E-commerce",
    description: "An online home and kitchen store shipping across the US.",
    roles: ["Support agent", "Fulfillment lead", "Support lead"],
    rules: [
      "Orders ship in 1 business day; delivery takes 2 to 5 business days.",
      "Returns accepted within 30 days for unused items; damaged items are replaced at no cost once a photo is received.",
      "Only the support lead can approve refunds, discounts or exceptions.",
      "Missing or damaged deliveries create a fulfillment task the same day.",
      "Wholesale and press inquiries go to the support lead by email.",
    ],
  },
};
