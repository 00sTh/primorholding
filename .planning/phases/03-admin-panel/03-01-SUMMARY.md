---
phase: 03-admin-panel
plan: 01
subsystem: ui
tags: [admin, cloudinary, clerk, crud, next.js, prisma, server-actions]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Prisma client, Clerk auth setup, Tailwind tokens, utility functions
  - phase: 02-public-site
    provides: Service and Testimonial models populated in schema
provides:
  - Admin layout with sidebar nav (5 links)
  - Clerk sign-in page at /admin/sign-in
  - Dashboard with real counts (services, testimonials, blog posts, unread contacts)
  - Cloudinary upload helper (uploadImage)
  - Full CRUD for Services (list/create/edit/delete with image upload)
  - Full CRUD for Testimonials (list/create/edit/delete with photo upload)
affects: [03-admin-panel, 04-deploy]

# Tech tracking
tech-stack:
  added: [cloudinary v2.9.0]
  patterns:
    - Server Component page wrapping Client Component form (edit pages)
    - useActionState with bound server action for edit forms (.bind(null, id) pattern)
    - Conditional image upload (uploadImage called only when file.size > 0)
    - Explicit type annotations on Prisma findMany results to satisfy strict TypeScript

key-files:
  created:
    - src/lib/cloudinary.ts
    - src/app/admin/layout.tsx
    - src/app/admin/sign-in/page.tsx
    - src/app/admin/page.tsx
    - src/app/actions/services.ts
    - src/app/admin/services/page.tsx
    - src/app/admin/services/new/page.tsx
    - src/app/admin/services/[id]/page.tsx
    - src/app/admin/services/[id]/ServiceEditForm.tsx
    - src/app/actions/testimonials.ts
    - src/app/admin/testimonials/page.tsx
    - src/app/admin/testimonials/new/page.tsx
    - src/app/admin/testimonials/[id]/page.tsx
    - src/app/admin/testimonials/[id]/TestimonialEditForm.tsx
  modified:
    - package.json (added cloudinary dependency)
    - pnpm-lock.yaml

key-decisions:
  - "Admin layout uses 'use client' at module level (not layout-level) — usePathname requires client context; layout itself becomes client component"
  - "Edit pages split into Server page + Client form component — page fetches data (server), form handles state (client)"
  - "Explicit ServiceRow/TestimonialRow interfaces for Prisma findMany results — Prisma 7 inference triggers TS7006 implicit any on map callbacks without annotation"
  - "Conditional photo/image upload — uploadImage only called when file.size > 0, preserving existing URL on edit"
  - "pnpm build remains broken due to pre-existing Turbopack workspace root detection issue (orphaned /home/sth/package-lock.json) — deferred to Phase 04"

patterns-established:
  - "Pattern: Server page + Client edit form — page.tsx fetches and passes data; [Model]EditForm.tsx holds useActionState"
  - "Pattern: Auth guard in all server actions — await auth(); if (!userId) throw new Error('Unauthorized')"
  - "Pattern: Bind pattern for actions with id — updateService.bind(null, id) passed to useActionState"
  - "Pattern: Explicit row type interface — define interface [Model]Row for Prisma findMany select results"

requirements-completed: [ADMIN-01, ADMIN-02, ADMIN-03, ADMIN-04]

# Metrics
duration: 18min
completed: 2026-03-11
---

# Phase 3 Plan 1: Admin Panel Foundation Summary

**Clerk sign-in + sidebar admin layout + dashboard counts + Cloudinary upload + full Services and Testimonials CRUD with image upload**

## Performance

- **Duration:** ~18 min
- **Started:** 2026-03-11T20:25:00Z
- **Completed:** 2026-03-11T20:43:00Z
- **Tasks:** 3
- **Files modified:** 16

## Accomplishments

- Admin panel foundation: Clerk sign-in at /admin/sign-in with gold/navy theme, sidebar layout with 5 nav links and active state detection
- Dashboard showing real DB counts for services, testimonials, blog posts, and unread contacts via Promise.all
- Cloudinary v2 upload helper and full Services CRUD (list table, create form, pre-filled edit form, delete) with conditional image upload
- Full Testimonials CRUD with same pattern — avatar photo fallback shows initial letter when no photo URL

## Task Commits

Each task was committed atomically:

1. **Task 1: Cloudinary helper + Admin layout + Sign-in + Dashboard** - `74ca26b` (feat)
2. **Task 2: Services CRUD** - `dbd07e5` (feat)
3. **Task 3: Testimonials CRUD** - `98a954d` (feat)

## Files Created/Modified

- `src/lib/cloudinary.ts` - uploadImage(buffer, folder) returning Cloudinary secure_url via upload_stream
- `src/app/admin/layout.tsx` - Admin layout with sidebar nav using usePathname for active link detection
- `src/app/admin/sign-in/page.tsx` - Clerk SignIn component with gold/navy appearance theme
- `src/app/admin/page.tsx` - Dashboard with 4 count stat cards (Promise.all fetch)
- `src/app/actions/services.ts` - createService, updateService, deleteService with Zod validation and auth guard
- `src/app/admin/services/page.tsx` - Services list table with edit/delete actions
- `src/app/admin/services/new/page.tsx` - Create service form with useActionState
- `src/app/admin/services/[id]/page.tsx` - Server page fetching service by id
- `src/app/admin/services/[id]/ServiceEditForm.tsx` - Client edit form pre-filled with service data
- `src/app/actions/testimonials.ts` - createTestimonial, updateTestimonial, deleteTestimonial with auth guard
- `src/app/admin/testimonials/page.tsx` - Testimonials list with avatar photo or initials fallback
- `src/app/admin/testimonials/new/page.tsx` - Create testimonial form
- `src/app/admin/testimonials/[id]/page.tsx` - Server page fetching testimonial by id
- `src/app/admin/testimonials/[id]/TestimonialEditForm.tsx` - Client edit form pre-filled
- `package.json` + `pnpm-lock.yaml` - Added cloudinary v2.9.0

## Decisions Made

- Admin layout uses `"use client"` at module level because `usePathname()` (for active link detection) requires client context — the whole layout becomes a client component. Acceptable tradeoff for a protected admin area.
- Edit pages split into a Server Component page (fetches data) + Client Component form (holds `useActionState`) — clean separation of data fetching and interactivity.
- Explicit interface annotations (`ServiceRow`, `TestimonialRow`) added for Prisma `findMany` results — Prisma 7 type inference triggers TS7006 implicit any error on `.map()` callbacks without this.
- Conditional upload guard: `if (imageFile && imageFile.size > 0)` ensures Cloudinary is only called when a new file is actually provided, preserving existing `imageUrl`/`photoUrl` on edits.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added explicit type interfaces for Prisma findMany results**
- **Found during:** Task 2 (Services list page verification)
- **Issue:** TypeScript error TS7006 "Parameter 'service' implicitly has an 'any' type" on `.map()` callback; Prisma 7 with strict mode doesn't infer map callback parameter type automatically
- **Fix:** Added `interface ServiceRow` and `interface TestimonialRow` with explicit field types; annotated `findMany` results as `ServiceRow[]` / `TestimonialRow[]`
- **Files modified:** `src/app/admin/services/page.tsx`, `src/app/admin/testimonials/page.tsx`
- **Verification:** `pnpm type-check` passes with zero errors
- **Committed in:** `dbd07e5` (Task 2 commit) and `98a954d` (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Necessary fix for TypeScript strict mode compliance. No scope creep.

## Issues Encountered

- **Pre-existing build failure:** `pnpm build` fails due to Turbopack workspace root detection issue — Next.js finds `/home/sth/package-lock.json` as workspace root instead of project's `pnpm-lock.yaml`, causing `@prisma/client/runtime` wasm module not found. This was already documented in Phase 02 deferred-items.md and deferred to Phase 04 (Deploy). `pnpm type-check` (tsc --noEmit) passes cleanly — code is correct, build issue is environment-level.

## User Setup Required

**External services require manual configuration before image uploads work:**

1. Create a Cloudinary account at https://cloudinary.com
2. Add to `.env.local`:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
   (Found in Cloudinary Dashboard -> Settings -> Access Keys)
3. Images will be uploaded to folders `primorholding/services` and `primorholding/testimonials`

## Next Phase Readiness

- Admin foundation complete — sign-in, layout, dashboard, Services CRUD, Testimonials CRUD all implemented
- Phase 03 Plan 02 (Blog + Contacts admin) can proceed immediately using the same patterns established here
- Pre-existing Turbopack build issue remains deferred to Phase 04

## Self-Check: PASSED

All created files verified present. All task commits verified in git history (74ca26b, dbd07e5, 98a954d). Final metadata commit: bab3782.

---
*Phase: 03-admin-panel*
*Completed: 2026-03-11*
