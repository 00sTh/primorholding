---
phase: 02-public-site
plan: "02"
subsystem: ui
tags: [next.js, react, framer-motion, prisma, tailwind, server-components]

# Dependency graph
requires:
  - phase: 02-01
    provides: Layout shell (Navbar, Footer, Section/Card/Button UI components, motion.tsx wrapper, CookieBanner)
provides:
  - HeroSection: full-height animated hero with mount animations, CTAs, and gold gradient decoration
  - AboutSection: two-column founder section with scroll animations and initials placeholder
  - ServicesSection: 3-column grid populated from DB with whileInView animations and empty state
  - TestimonialsSection: 2-column grid populated from DB with stars/avatars and empty state
  - "(site)/page.tsx: async Server Component home page with Promise.all concurrent Prisma fetches"
affects:
  - 02-03 (contact section will be appended to this same page)
  - 03-admin (admin panel manages services/testimonials displayed here)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Components import motion from @/components/motion — "use client" boundary in motion.tsx, not in consumers
    - Prisma select with no Date fields for serialization safety when passing to client context
    - Promise.all for concurrent server-side data fetches in page.tsx

key-files:
  created:
    - src/components/site/HeroSection.tsx
    - src/components/site/AboutSection.tsx
    - src/components/site/ServicesSection.tsx
    - src/components/site/TestimonialsSection.tsx
    - src/app/(site)/page.tsx
  modified: []

key-decisions:
  - "HeroSection uses animate (not whileInView) — hero is above the fold on load, no scroll trigger needed"
  - "AboutSection initials placeholder uses hardcoded 'JA' (Joao Antonio) not dynamic derivation — matches design spec"
  - "ServicesSection uses Briefcase as default icon for all services regardless of service.icon field — dynamic icon rendering deferred"
  - "page.tsx uses ?? null fallback for founderPhotoUrl — avoids undefined serialization issues"

patterns-established:
  - "Section components are Server Components — no use client directive; animation via motion.tsx client boundary"
  - "whileInView with viewport={{ once: true }} for all below-fold sections — animates once on scroll into view"
  - "Empty state pattern: services.length === 0 renders centered Em breve. paragraph"

requirements-completed: [SITE-02, SITE-04, SITE-05, SITE-06, SITE-12]

# Metrics
duration: 2min
completed: 2026-03-11
---

# Phase 2 Plan 02: Homepage Sections Summary

**Animated homepage with Hero, About, Services, and Testimonials sections using framer-motion Server Components and Prisma Promise.all concurrent fetches**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-11T20:08:12Z
- **Completed:** 2026-03-11T20:09:55Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Built HeroSection with on-mount framer-motion animations, gold gradient orbs, scroll indicator, and CTA buttons
- Built AboutSection with scroll-triggered slide-in animation and founder photo/initials placeholder
- Built ServicesSection and TestimonialsSection as Server Components with whileInView animations and DB-driven empty states
- Created (site)/page.tsx async Server Component using Promise.all with Prisma select (no Date fields) for serialization safety

## Task Commits

Each task was committed atomically:

1. **Task 1: HeroSection + AboutSection** - `c218573` (feat)
2. **Task 2: ServicesSection + TestimonialsSection + home page** - `eedd6d0` (feat)

## Files Created/Modified

- `src/components/site/HeroSection.tsx` - Full-height hero with mount animations, gold orb background, CTAs, scroll indicator
- `src/components/site/AboutSection.tsx` - Two-column layout with slide-in scroll animation, photo or JA initials fallback
- `src/components/site/ServicesSection.tsx` - 3-column service grid with staggered whileInView animations, empty state
- `src/components/site/TestimonialsSection.tsx` - 2-column testimonial grid with quotes, stars, author avatars, empty state
- `src/app/(site)/page.tsx` - Async Server Component home page, Promise.all fetch, settings fallbacks

## Decisions Made

- HeroSection uses `animate` (not `whileInView`) because the hero is already visible on page load — scroll trigger is not applicable
- Briefcase icon used as default for all services — dynamic icon lookup by name deferred (would require client component or icon map)
- Initials placeholder hardcoded to "JA" per design spec (plan explicitly specifies this value)
- `founderPhotoUrl ?? null` pattern avoids passing `undefined` through serialization boundary

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Homepage is complete and renders correctly with static content and DB fallbacks
- Contact section (Plan 03) will add a `<section id="contato">` to this same page — anchor links from HeroSection CTAs are already in place
- Admin panel (Phase 3) will manage the services and testimonials displayed here

## Self-Check: PASSED

- src/components/site/HeroSection.tsx: FOUND
- src/components/site/AboutSection.tsx: FOUND
- src/components/site/ServicesSection.tsx: FOUND
- src/components/site/TestimonialsSection.tsx: FOUND
- src/app/(site)/page.tsx: FOUND
- .planning/phases/02-public-site/02-02-SUMMARY.md: FOUND
- Commit c218573: FOUND
- Commit eedd6d0: FOUND

---
*Phase: 02-public-site*
*Completed: 2026-03-11*
