import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — B&Br Technology",
  description:
    "Explore B&Br Technology's AI-powered development services, from product engineering to data platforms.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20 flex flex-col items-center justify-center min-h-screen">
      <h1 className="font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-[-0.04em] text-navy-900">
        Services
      </h1>
    </div>
  );
}
