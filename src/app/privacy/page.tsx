import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — B&Br Technology",
  description:
    "How B&Br Technology collects, uses, and protects information shared through this website.",
  robots: {
    index: false,
    follow: true,
  },
};

const sections = [
  {
    title: "What We Collect",
    body: "When you contact B&Br through the site, we may collect the information you choose to share, such as your name, email address, phone number, company details, and project notes. We may also collect basic technical data needed to keep the site running, such as browser, device, and page request information.",
  },
  {
    title: "How We Use Information",
    body: "We use submitted information to respond to inquiries, evaluate project fit, communicate about services, and improve the website experience. We do not use your contact details for unrelated outreach, and we do not sell personal information.",
  },
  {
    title: "How Information Is Shared",
    body: "Information is shared only when needed to operate the business and website, such as secure form handling, email delivery, hosting, analytics, or legal compliance. Service providers are expected to handle data appropriately and only for the services they provide to us.",
  },
  {
    title: "Data Retention",
    body: "We keep inquiry and client-related information only as long as it is reasonably needed for communication, project planning, legal obligations, or legitimate business records. If you want us to delete information you submitted through the site, contact us and we will review the request.",
  },
  {
    title: "Your Choices",
    body: "You can contact us to request access, correction, or deletion of information you previously shared. If we cannot comply for legal or contractual reasons, we will explain why.",
  },
  {
    title: "Contact",
    body: "Privacy questions can be sent to hello@bbrtechnology.com. If this policy changes materially, the updated version will be posted on this page.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-600">
            Privacy
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-base leading-7 text-foreground-muted sm:text-lg">
            This page explains how B&Br Technology handles information shared
            through the website. It is written to be clear and practical, not
            padded with legal filler.
          </p>
          <p className="mt-4 text-sm text-foreground-subtle">
            Effective date: March 27, 2026
          </p>
        </div>

        <div className="grid gap-6">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-border bg-bg-alt/70 p-7 shadow-[0_12px_48px_rgba(15,23,42,0.08)] backdrop-blur"
            >
              <h2 className="text-xl font-semibold text-foreground">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-foreground-muted sm:text-base">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
