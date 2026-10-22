import type { Metadata } from "next";
import { Clock, FileCheck2, Mail, Phone } from "lucide-react";
import { decodeBrief, describeBrief, encodeBrief, estimate as estimateOf } from "@/data/services";
import { demoScenarios } from "@/data/demo-scenarios";
import { demoBusinesses } from "@/lib/demo/businesses";
import { industries, type Industry } from "@/lib/demo/schema";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { CalBooking } from "@/components/forms/cal-booking";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute call or send a project brief. Reply within one business day, fixed quote within two business days of receiving your project details.",
  alternates: { canonical: "/contact" },
};

// ?demo=clinic.refill (from "Build this for my business") becomes a one-line brief.
function describeDemo(raw: string | string[] | undefined): string | undefined {
  const [ind, id] = (Array.isArray(raw) ? raw[0] : raw ?? "").split(".");
  if (!industries.includes(ind as Industry)) return undefined;
  const industry = ind as Industry;
  const example = demoScenarios[industry].find((s) => s.id === id);
  const label = demoBusinesses[industry].label;
  return `From the live demo: I'd like a workflow like the ${label} example${example ? ` ("${example.label}")` : ""} for my business.`;
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const brief = decodeBrief(params);
  const notes = brief ? describeBrief(brief) : describeDemo(params.demo);
  const estimate = brief?.tier ? encodeBrief(brief.offer.id, brief.tier, brief.extras) : undefined;
  const budgetLow = brief?.tier ? estimateOf(brief.offer.id, brief.tier, brief.extras).low : undefined;

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-32 sm:pt-40">
        <div className="grid-backdrop pointer-events-none absolute inset-0 text-navy-900 dark:text-white" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title={
              <>
                Tell us what&apos;s <span className="text-amber-600 dark:text-gold-400">slowing you down.</span>
              </>
            }
            lede="Book a call if you'd like to talk it through, or send a short brief. Either way, you talk to the person who'll build it."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Clock, title: "Reply within one business day", body: "Every inquiry is read by a person." },
              { icon: FileCheck2, title: "Fixed quote in two business days", body: "Once we have your project details." },
              { icon: Mail, title: site.email, body: site.phoneDisplay, href: `mailto:${site.email}` },
            ].map(({ icon: Icon, title, body, href }) => (
              <li key={title} className="flex gap-3 rounded-2xl border border-border bg-bg-elevated p-4">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div className="min-w-0">
                  {href ? (
                    <a href={href} className="block truncate text-sm font-semibold text-foreground hover:underline">
                      {title}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                  )}
                  <p className="text-sm text-foreground-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          {notes && (
            <p className="mt-6 rounded-2xl border border-amber-600/30 bg-amber-600/5 px-5 py-4 text-sm text-foreground">
              <span className="font-semibold">Your brief is attached.</span> {notes}
            </p>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div id="book" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-extrabold text-foreground">Book a free 30-minute call</h2>
            <p className="mt-2 text-sm text-foreground-muted">
              Pick a time that suits you. {notes ? "Your brief is prefilled in the booking notes." : ""}
            </p>
            <div className="mt-5">
              <CalBooking notes={notes} estimate={estimate} />
            </div>
          </div>
          <div id="message" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-extrabold text-foreground">Or send a message</h2>
            <p className="mt-2 text-sm text-foreground-muted">
              Prefer to write it down? Share the workflow and we&apos;ll come back with questions or a quote.
            </p>
            <div className="mt-5">
              <ContactForm
                defaultOffer={brief?.offer.id ?? (notes ? "ai-assistant" : undefined)}
                budgetLow={budgetLow}
                defaultMessage={notes ? `${notes}\n\n` : undefined}
                brief={estimate}
              />
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-foreground-muted">
              <Phone className="h-4 w-4" /> Prefer the phone?{" "}
              <a href={`tel:${site.phone}`} className="font-medium text-foreground hover:underline">
                {site.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
