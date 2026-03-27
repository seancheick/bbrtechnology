# Homepage Wow + Proof Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the homepage so it feels more premium/cinematic on first load while making proof, products, and process clarity stronger than abstraction.

**Architecture:** Keep the existing App Router structure and typed data files, but rebalance the homepage around a stronger parallax hero, an early product-proof section, improved testimonials, and a new linear process section replacing the orbital treatment on the homepage. Reuse the beam transformation concept, but reduce ambient motion and make the process explanation more concrete.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, next-themes

---

### Task 1: Add regression coverage for homepage proof structure

**Files:**
- Create: `scripts/check-homepage-story.mjs`
- Modify: `package.json`

- [ ] Write a failing structural regression script for homepage section order and proof markers.
- [ ] Run the script and verify it fails against the current homepage.
- [ ] Add an npm script entry for the regression check.

### Task 2: Rebuild the hero into a premium/cinematic parallax opening

**Files:**
- Modify: `src/components/sections/hero.tsx`

- [ ] Rewrite hero copy around a sharper automation-first outcome.
- [ ] Add restrained layered parallax and a stronger proof strip.
- [ ] Replace the high-commitment secondary CTA with a “see work” path.

### Task 3: Add a Systems Shipped section above abstraction-heavy sections

**Files:**
- Modify: `src/data/portfolio.ts`
- Create: `src/components/sections/products-showcase.tsx`
- Modify: `src/app/page.tsx`

- [ ] Add featured product entries for PharmaGuide, FieldOps, and AirbnbBBR.
- [ ] Build an editorial proof section that showcases those products.
- [ ] Insert it into the homepage before the abstract explainer sections.

### Task 4: Replace the homepage orbital process section with a linear delivery section

**Files:**
- Create: `src/components/sections/process-roadmap.tsx`
- Modify: `src/app/page.tsx`

- [ ] Build a clearer process section that shows engagement flow, timing, and deliverables.
- [ ] Remove the orbital process section from the homepage composition.

### Task 5: Strengthen credibility sections without losing energy

**Files:**
- Modify: `src/components/sections/animated-beam-section.tsx`
- Modify: `src/components/sections/why-bbr.tsx`
- Modify: `src/components/sections/testimonials.tsx`
- Modify: `src/data/testimonials.ts`

- [ ] Keep the beam concept but reduce ambient motion and improve section clarity.
- [ ] Recompose Built Different to feel less flat and less grid-generic.
- [ ] Keep the testimonial scroller, but replace weak testimonial content and stock-avatar presentation.

### Task 6: Verify the redesigned homepage

**Files:**
- Verify only

- [ ] Run `node scripts/check-homepage-story.mjs`.
- [ ] Run `npm run lint`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Run `npm run build`.
- [ ] Run a browser spot-check of the homepage and contact page in dark mode.
