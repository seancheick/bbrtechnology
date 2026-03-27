import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — B&Br Technology",
  description:
    "Website terms for using the B&Br Technology site and contacting the studio about services.",
  robots: {
    index: false,
    follow: true,
  },
};

const sections = [
  {
    title: "Use of This Website",
    body: "This website is provided for general information about B&Br Technology and its services. You may browse the site, contact us about projects, and share information relevant to legitimate business inquiries. You may not misuse the site, interfere with its operation, or use the content in a misleading way.",
  },
  {
    title: "No Project Agreement by Default",
    body: "Using this website or submitting a contact form does not create a client relationship, project agreement, or guarantee of service. Any actual work engagement is governed separately by a written agreement between B&Br and the client.",
  },
  {
    title: "Intellectual Property",
    body: "Unless stated otherwise, the text, branding, design, and original content on this site belong to B&Br Technology. You may not republish or reuse site materials in a way that implies ownership, endorsement, or partnership without permission.",
  },
  {
    title: "External Services and Links",
    body: "Some site actions may rely on third-party tools, such as scheduling, form handling, hosting, or analytics. We are not responsible for the separate policies or uptime of those external services.",
  },
  {
    title: "Accuracy and Availability",
    body: "We aim to keep the site accurate and available, but we do not guarantee that every page, statement, or feature will always be complete, current, or uninterrupted. Content may be updated, removed, or changed without notice.",
  },
  {
    title: "Contact",
    body: "Questions about these terms can be sent to hello@bbrtechnology.com. Continued use of the site after updates means you accept the revised terms as posted here.",
  },
];

export default function TermsPage() {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-600">
            Terms
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-5 text-base leading-7 text-foreground-muted sm:text-lg">
            These terms cover general use of the B&Br Technology website. They
            are not a substitute for a client services agreement.
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
