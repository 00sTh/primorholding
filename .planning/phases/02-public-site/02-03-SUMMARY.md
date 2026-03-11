---
phase: 02-public-site
plan: 03
subsystem: ui
tags: [zod, server-actions, forms, lgpd, react, nextjs]

# Dependency graph
requires:
  - phase: 02-public-site/02-01
    provides: Section UI component, Button component, site layout shell
  - phase: 02-public-site/02-02
    provides: page.tsx with Hero/About/Services/Testimonials sections
provides:
  - submitContact Server Action with Zod v4 validation and honeypot
  - ContactSection client component with useActionState and success card
  - /privacidade LGPD privacy policy page with CNPJ from constants
  - /termos terms of use page with CNPJ from constants
  - Complete homepage with all 5 sections assembled
affects:
  - 03-admin-panel (admin will need to read Contact records from DB)
  - 04-deploy (pre-existing Turbopack build issue needs fix before deploy)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Action with "use server" directive, Zod v4 z.email() top-level validator
    - useActionState pattern for progressive-enhancement form with server action
    - Honeypot field using sr-only class (not display:none) for bot detection
    - Legal page Server Components with metadata export and COMPANY constants

key-files:
  created:
    - src/app/actions/contact.ts
    - src/components/site/ContactSection.tsx
    - src/app/(site)/privacidade/page.tsx
    - src/app/(site)/termos/page.tsx
  modified:
    - src/app/(site)/page.tsx

key-decisions:
  - "Honeypot uses sr-only not display:none -- screen readers respect sr-only but bots skip display:none, making sr-only more effective for bot detection"
  - "Honeypot validation failure silently returns success:true -- bots must not know their submission was discarded"
  - "Legal pages use Server Components with no interactivity -- plain HTML with COMPANY constants, no client state needed"
  - "ContactSection is a Client Component to enable useActionState -- server action is imported directly (no API route)"

patterns-established:
  - "Server Action pattern: 'use server' file exporting async function(prevState, formData) for useActionState"
  - "useActionState triple destructure: [state, formAction, pending] for form with loading state"
  - "Legal pages import COMPANY constants for CNPJ/email -- never hardcode company data inline"

requirements-completed: [SITE-07, SITE-09, SITE-10]

# Metrics
duration: 2min
completed: 2026-03-11
---

# Phase 02 Plan 03: Contact Form + Legal Pages Summary

**Contact form Server Action with Zod v4 honeypot validation saving to DB, plus LGPD-compliant /privacidade and /termos pages, completing the homepage with all 5 sections**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-11T20:12:26Z
- **Completed:** 2026-03-11T20:15:21Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- submitContact Server Action with Zod v4 z.email() validation, silent honeypot (website field), prisma.contact.create on valid data
- ContactSection client component using useActionState with sr-only honeypot input, per-field error display in Portuguese, success card on submission
- /privacidade page with all 8 LGPD sections (Art. 7 VI, Art. 7 I, Art. 18 rights, 5-year retention, DPO contact) and real CNPJ from COMPANY constant
- /termos page with 8 sections including IP notice, forum: Sao Paulo, SP, and link to privacy policy
- Homepage page.tsx updated to include ContactSection as 5th section (Hero, About, Services, Testimonials, Contact)

## Task Commits

Each task was committed atomically:

1. **Task 1: Contact Server Action + ContactSection component** - `f9ef4f1` (feat)
2. **Task 2: Legal pages + wire ContactSection into homepage** - `c36f473` (feat)

**Plan metadata:** (pending — created in final commit)

## Files Created/Modified

- `src/app/actions/contact.ts` - submitContact Server Action with Zod v4 validation, honeypot, prisma.contact.create
- `src/components/site/ContactSection.tsx` - Client Component with useActionState, sr-only honeypot, success card
- `src/app/(site)/privacidade/page.tsx` - LGPD privacy policy with 8 sections and CNPJ from COMPANY constant
- `src/app/(site)/termos/page.tsx` - Terms of use with 8 sections and CNPJ from COMPANY constant
- `src/app/(site)/page.tsx` - Added ContactSection import and rendered as 5th section

## Decisions Made

- Honeypot uses `sr-only` CSS class (not `display:none`) — bots typically skip hidden elements but respect screen-reader-only classes, making sr-only more effective for detection
- Honeypot failure returns `{ success: true }` silently — bots must not detect that their submission was discarded
- Legal pages are plain Server Components with no framer-motion — static content, no animation needed, consistent with Next.js Server Component default
- ContactSection is a Client Component solely to enable `useActionState` — the server action itself is "use server" in a separate file per Next.js App Router module boundary requirements

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

**Pre-existing Turbopack build failure (out of scope):** `pnpm build` fails due to Next.js Turbopack workspace root detection issue — it finds `/home/sth/package-lock.json` instead of `/home/sth/PrimorHolding/pnpm-lock.yaml` as workspace root, causing `@prisma/client/runtime/client` module resolution to fail. Confirmed pre-existing via git stash test. `pnpm type-check` (tsc --noEmit) passes clean. Documented in `deferred-items.md` for Phase 04 (Deploy) to resolve.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 02 (Public Site) is now complete — all 3 plans done: site shell, homepage sections, contact form + legal pages
- Phase 03 (Admin Panel) can proceed: will need to query Contact model (already in schema) for admin inbox
- Pre-existing Turbopack build issue must be resolved before Phase 04 (Deploy) — see deferred-items.md for fix options

## Self-Check: PASSED

All created files verified present. All task commits verified in git log.

---
*Phase: 02-public-site*
*Completed: 2026-03-11*
