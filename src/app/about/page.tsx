import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — B&Br Technology",
  description:
    "Learn about B&Br Technology, a Boston-based AI-powered tech studio building products for real business growth.",
};

export default function AboutPage() {
  return (
    <div className="pt-20 flex flex-col items-center justify-center min-h-screen">
      <h1 className="font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-[-0.04em] text-navy-900">
        About
      </h1>
    </div>
  );
}
