---
phase: 02-public-site
plan: 01
subsystem: ui
tags: [framer-motion, zod, prisma, tailwind, next, cookie-consent, navbar, footer, whatsapp]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Prisma schema (SiteSettings, Service, Testimonial models), globals.css theme tokens, Button component, Section component, constants.ts

provides:
  - framer-motion and zod installed and importable
  - motion.tsx wrapper enabling Server Components to use framer-motion without "use client"
  - Fixed Navbar with anchor links, CTA, and mobile hamburger menu
  - Footer with CNPJ fallback and legal page links
  - Floating WhatsApp button (wa.me link, fixed bottom-right)
  - LGPD cookie consent banner with localStorage persistence
  - (site) layout wiring all shell components + SiteSettings from DB
  - prisma/seed.ts with 3 services, 2 testimonials, SiteSettings defaults

affects:
  - 02-public-site (all subsequent plans inherit this layout)
  - 03-admin-panel (seed data visible in admin)

# Tech tracking
tech-stack:
  added:
    - framer-motion 12.35.2 (animation library)
    - zod 4.3.6 (schema validation)
  patterns:
    - motion.tsx as single "use client" boundary for framer-motion imports
    - SiteSettings fetched in layout with select (no Date fields across boundary)
    - WhatsApp number conditional render only when non-empty
    - Cookie banner initializes visible=false (SSR-safe), reads localStorage in useEffect

key-files:
  created:
    - prisma/seed.ts
    - src/components/motion.tsx
    - src/components/site/Navbar.tsx
    - src/components/site/Footer.tsx
    - src/components/site/WhatsAppButton.tsx
    - src/components/site/CookieBanner.tsx
  modified:
    - src/app/globals.css
    - src/app/(site)/layout.tsx
    - package.json
    - pnpm-lock.yaml

key-decisions:
  - "Seed file uses PrismaNeon adapter (not bare PrismaClient) because Prisma 7 generated client requires an adapter argument — consistent with lib/prisma.ts"
  - "CookieBanner initializes visible=false for SSR safety, sets true in useEffect only if no consent stored"
  - "Footer and layout use select{} when querying SiteSettings to exclude updatedAt DateTime field, preventing serialization issues across server/client boundary"
  - "Navbar uses plain <a> anchors (not Next.js Link) for in-page scroll navigation to avoid App Router scroll reset"

patterns-established:
  - "Pattern 1: motion.tsx is the single 'use client' wrapper for framer-motion — all other components import from @/components/motion"
  - "Pattern 2: Layout components fetching DB data use select{} to exclude Date/DateTime fields when passing to Client Components"
  - "Pattern 3: Cookie consent key is primor:cookie-consent in localStorage"

requirements-completed:
  - SITE-01
  - SITE-03
  - SITE-08
  - SITE-11
  - SITE-12

# Metrics
duration: 12min
completed: 2026-03-11
---

# Phase 2 Plan 1: Site Shell Summary

**Fixed navbar, footer, WhatsApp button, LGPD cookie banner, and site layout shell with SiteSettings from DB; framer-motion, zod, and seed data with 3 services and 2 testimonials**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-11T20:00:00Z
- **Completed:** 2026-03-11T20:12:00Z
- **Tasks:** 3
- **Files modified:** 8 (4 created new, 4 modified)

## Accomplishments

- Installed framer-motion and zod; created motion.tsx wrapper enabling Server Components to use animations without "use client"
- Built fixed Navbar (Client Component with mobile hamburger), Server Component Footer with CNPJ fallback, floating WhatsApp button, and LGPD cookie consent banner
- Wired the (site) layout to fetch SiteSettings from DB and render all shell components; created prisma/seed.ts with 3 services, 2 testimonials, and SiteSettings defaults

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies and create seed file** - `5923d6e` (feat)
2. **Task 2: motion wrapper + Navbar + Footer** - `9153f4f` (feat)
3. **Task 3: WhatsApp button + cookie banner + site layout** - `b5e05a5` (feat)

**Plan metadata:** (to be committed after SUMMARY.md and state updates)

## Files Created/Modified

- `prisma/seed.ts` - Seeds SiteSettings defaults, 3 services, 2 testimonials via PrismaNeon adapter
- `src/components/motion.tsx` - "use client" re-export of framer-motion motion + AnimatePresence
- `src/components/site/Navbar.tsx` - Fixed top navbar, anchor links, CTA button, mobile hamburger menu
- `src/components/site/Footer.tsx` - 3-column footer, CNPJ fallback, legal page Next.js Links
- `src/components/site/WhatsAppButton.tsx` - Fixed floating wa.me link with WhatsApp SVG icon
- `src/components/site/CookieBanner.tsx` - LGPD consent banner, localStorage primor:cookie-consent key
- `src/app/(site)/layout.tsx` - Async Server Component, fetches SiteSettings with select, renders shell
- `src/app/globals.css` - Added scroll-behavior: smooth + scroll-padding-top: 80px on html
- `package.json` + `pnpm-lock.yaml` - framer-motion and zod added

## Decisions Made

- Seed file uses PrismaNeon adapter because Prisma 7 generated client requires an adapter argument (no bare `new PrismaClient()`). This matches lib/prisma.ts pattern.
- CookieBanner initializes `visible=false` for SSR safety; reads localStorage only in `useEffect` to prevent hydration mismatch.
- Layout queries SiteSettings with `select{}` to exclude `updatedAt` (DateTime) and avoid serialization issues when passing data as props.
- Navbar uses plain `<a>` anchors for in-page hash links instead of Next.js Link to preserve scroll behavior.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Seed file required PrismaNeon adapter**
- **Found during:** Task 1 (Install dependencies and create seed file)
- **Issue:** Prisma 7 generated client constructor requires an `adapter` argument — `new PrismaClient()` with no args is a TypeScript error (Expected 1 arguments, but got 0)
- **Fix:** Added PrismaNeon adapter with dotenv/config import to load DATABASE_URL from .env.local, consistent with lib/prisma.ts pattern
- **Files modified:** prisma/seed.ts
- **Verification:** `pnpm type-check` passed with zero errors
- **Committed in:** `5923d6e` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Fix required for type correctness; consistent with existing lib/prisma.ts adapter pattern. No scope creep.

## Issues Encountered

- Prisma 7 PrismaClient constructor signature requires adapter — handled as Rule 1 auto-fix above.

## User Setup Required

None - no external service configuration required beyond what Phase 1 already established (DATABASE_URL, Clerk keys).

## Next Phase Readiness

- Site shell complete: all pages in (site) route group inherit Navbar, Footer, WhatsApp, CookieBanner automatically
- framer-motion available via @/components/motion for animations in Phase 2 plans
- zod available for form validation (Contact section, admin forms)
- Seed data ready to run once Docker is available: `pnpm db:seed`

## Self-Check: PASSED

All created files verified on disk. All task commits verified in git log:
- 5923d6e: Task 1 (deps + seed)
- 9153f4f: Task 2 (motion + Navbar + Footer)
- b5e05a5: Task 3 (WhatsApp + CookieBanner + layout)

---
*Phase: 02-public-site*
*Completed: 2026-03-11*
