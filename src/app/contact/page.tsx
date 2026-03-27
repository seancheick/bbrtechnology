import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — B&Br Technology",
  description:
    "Get in touch with B&Br Technology. We'd love to hear about your project.",
};

export default function ContactPage() {
  return (
    <div className="pt-20 flex flex-col items-center justify-center min-h-screen">
      <h1 className="font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-[-0.04em] text-navy-900">
        Contact
      </h1>
    </div>
  );
}
