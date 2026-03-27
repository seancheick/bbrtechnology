"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const serviceOptions = [
  "Website or App Development",
  "AI & Automation",
  "SEO & Growth Marketing",
  "Data & Analytics",
  "IT Support & Maintenance",
  "Consulting",
  "Multiple Services",
  "Not Sure Yet — Let's Talk",
];

const budgetOptions = [
  "Under $2,000",
  "$2,000–$5,000",
  "$5,000–$10,000",
  "$10,000–$25,000",
  "$25,000+",
  "Monthly Retainer",
  "Not Sure Yet",
];

const sourceOptions = [
  "Google Search",
  "Social Media",
  "Referral",
  "LinkedIn",
  "Other",
];

const inputClasses =
  "w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-shadow dark:bg-navy-900 dark:border-white/10 dark:text-foreground";

const labelClasses = "block text-sm font-medium text-foreground mb-1.5";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mzdaenay", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-bg shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-amber-600 to-gold-400" />
        <div className="p-8 sm:p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-6">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
            Message Sent!
          </h3>
          <p className="mt-3 max-w-sm text-foreground-muted">
            Thank you for reaching out. We&apos;ll review your inquiry and get
            back to you within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm font-medium text-amber-600 hover:text-amber-600/80 transition-colors"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-bg shadow-sm overflow-hidden">
      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-amber-600 to-gold-400" />

      <div className="p-8 sm:p-10">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
          Start a Conversation
        </h3>
        <p className="mt-2 text-sm text-foreground-muted">
          Fill out the form below and we&apos;ll get back to you within 24
          hours.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Honeypot */}
          <div
            className="absolute left-[-9999px]"
            aria-hidden="true"
          >
            <label htmlFor="_gotcha">
              Do not fill this out
              <input
                type="text"
                name="_gotcha"
                id="_gotcha"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          {/* Row: First Name + Last Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={labelClasses}>
                First Name <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                placeholder="John"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClasses}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Row: Email + Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email <span className="text-amber-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="john@company.com"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="(555) 123-4567"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Row: Service + Budget */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="service" className={labelClasses}>
                Service Needed <span className="text-amber-600">*</span>
              </label>
              <select
                name="service"
                id="service"
                required
                className={inputClasses}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="budget" className={labelClasses}>
                Budget Range
              </label>
              <select
                name="budget"
                id="budget"
                className={inputClasses}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a range
                </option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* How did you find us */}
          <div>
            <label htmlFor="source" className={labelClasses}>
              How did you find us?
            </label>
            <select
              name="source"
              id="source"
              className={inputClasses}
              defaultValue=""
            >
              <option value="" disabled>
                Select an option
              </option>
              {sourceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Project description */}
          <div>
            <label htmlFor="message" className={labelClasses}>
              Project Description <span className="text-amber-600">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={5}
              placeholder="What are you building? What problems are you facing? What does success look like for you?"
              className={inputClasses + " resize-y"}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy-900 px-6 py-3.5 text-sm font-medium text-gold-400 transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 dark:ring-offset-navy-950 dark:bg-navy-800 dark:border dark:border-gold-400/20 disabled:opacity-60 disabled:pointer-events-none"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Project Inquiry
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-600 text-center">
              Something went wrong. Please try again or email us directly at{" "}
              <a
                href="mailto:hello@bbrtechnology.com"
                className="underline underline-offset-2"
              >
                hello@bbrtechnology.com
              </a>
              .
            </p>
          )}

          <p className="text-xs text-foreground-subtle text-center">
            We respect your privacy. No spam, no sales pressure, no data sharing
            — ever.
          </p>
        </form>
      </div>
    </div>
  );
}
