"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { offers } from "@/data/services";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

const FORMSPREE = "https://formspree.io/f/mzdaenay";

const budgets = ["Under $1,000", "$1,000–$3,000", "$3,000–$10,000", "$10,000–$25,000", "$25,000+", "Not sure yet"];
const budgetFloors = [0, 1000, 3000, 10000, 25000];

// the band an estimator range starts in; the visitor can still change it
function budgetFor(low?: number) {
  if (low === undefined) return "";
  return budgets[budgetFloors.findLastIndex((f) => low >= f)];
}
const timelines = ["As soon as possible", "Within a month", "In 1–3 months", "Just exploring"];
const sources = ["Upwork", "Referral", "Direct outreach from B&Br", "Google search", "LinkedIn", "Business card / in person", "Other"];

const input =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-base text-foreground placeholder:text-foreground-subtle transition-colors focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20";
const label = "mb-1.5 block text-sm font-medium text-foreground";

export function ContactForm({
  defaultOffer,
  defaultMessage,
  brief,
  budgetLow,
}: {
  defaultOffer?: string;
  defaultMessage?: string;
  brief?: string;
  budgetLow?: number;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      track("inquiry_submitted", {
        offer: String(data.get("service") ?? ""),
        budget: String(data.get("budget") ?? ""),
        source: String(data.get("source") ?? ""),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-3xl border border-border bg-bg-elevated p-8">
        <CheckCircle2 className="h-10 w-10 text-success" />
        <h3 className="font-display text-2xl font-extrabold text-foreground">Got it. We&apos;ll be in touch.</h3>
        <p className="text-foreground-muted">
          {site.replyPromise} If it&apos;s urgent, email{" "}
          <a className="font-medium text-foreground underline underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    // method/action make a submit before hydration post straight to Formspree, never a GET with form data in the URL
    <form onSubmit={onSubmit} method="post" action={FORMSPREE} className="space-y-5 rounded-3xl border border-border bg-bg-elevated p-6 sm:p-8">
      <input type="hidden" name="_subject" value="New project inquiry · bbr website" />
      {brief && <input type="hidden" name="estimate" value={brief} />}
      {/* Formspree honeypot */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name <span className="text-amber-600">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className={input} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email <span className="text-amber-600">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={input} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          What would you like to build or improve? <span className="text-amber-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={defaultMessage}
          placeholder="The idea or the workflow, the tools involved, and what a good outcome looks like."
          className={`${input} resize-y`}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className={label}>
            Project type <span className="text-foreground-subtle">(optional)</span>
          </label>
          <select id="service" name="service" defaultValue={defaultOffer ?? ""} className={input}>
            <option value="">Not sure yet</option>
            {offers.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={label}>
            Budget <span className="text-foreground-subtle">(optional)</span>
          </label>
          <select id="budget" name="budget" defaultValue={budgetFor(budgetLow)} className={input}>
            <option value="">Choose…</option>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <details className="group rounded-xl border border-border px-4 py-3">
        <summary className="cursor-pointer text-sm font-medium text-foreground-muted marker:text-foreground-subtle">
          More details <span className="text-foreground-subtle">(optional)</span>
        </summary>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="company" className={label}>
              Company
            </label>
            <input id="company" name="company" autoComplete="organization" className={input} />
          </div>
          <div>
            <label htmlFor="timeline" className={label}>
              Timeline
            </label>
            <select id="timeline" name="timeline" defaultValue="" className={input}>
              <option value="">Choose…</option>
              {timelines.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="source" className={label}>
              How did you find us?
            </label>
            <select id="source" name="source" defaultValue="" className={input}>
              <option value="">Choose…</option>
              {sources.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </details>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          That didn&apos;t send. Please try again, or email {site.email} directly.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-foreground-subtle">{site.replyPromise} We never share your details.</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-navy-900 px-7 text-sm font-semibold text-gold-400 transition-colors hover:bg-navy-800 disabled:opacity-60 dark:bg-gold-400 dark:text-navy-950"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send inquiry <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
