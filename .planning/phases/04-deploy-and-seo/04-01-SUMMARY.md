---
phase: 04-deploy-and-seo
plan: 01
subsystem: infra
tags: [nextjs, seo, opengraph, sitemap, robots, prisma, vercel, build]

# Dependency graph
requires:
  - phase: 03-admin-panel
    provides: complete admin panel with all CRUD operations
provides:
  - SEO metadata complete (layout.tsx + homepage page.tsx)
  - Dynamic OG image at /opengraph-image (1200x630, navy/gold)
  - /sitemap.xml via sitemap.ts (3 URLs: /, /privacidade, /termos)
  - /robots.txt via robots.ts (disallow /admin/)
  - Professional README.md (Portuguese, setup + env vars + deploy)
  - vercel.json with all required env var names
  - pnpm build passing (Turbopack module resolution fixed)
affects: [vercel-deploy, production]

# Tech tracking
tech-stack:
  added: ["@prisma/client@7.5.0 (runtime for generated Prisma 7 client)"]
  patterns:
    - "export const dynamic = 'force-dynamic' on all DB-querying pages"
    - ".catch(() => null/[]) on Prisma queries in layouts for build-time safety"
    - "Next.js file-based metadata (opengraph-image.tsx) for OG image"
    - "next/og ImageResponse for dynamic OG image generation"

key-files:
  created:
    - src/app/opengraph-image.tsx
    - src/app/sitemap.ts
    - src/app/robots.ts
    - vercel.json
  modified:
    - src/app/layout.tsx
    - src/app/(site)/page.tsx
    - src/app/(site)/layout.tsx
    - src/app/admin/page.tsx
    - src/app/admin/blog/page.tsx
    - src/app/admin/blog/[id]/page.tsx
    - src/app/admin/contacts/page.tsx
    - src/app/admin/services/page.tsx
    - src/app/admin/services/[id]/page.tsx
    - src/app/admin/testimonials/page.tsx
    - src/app/admin/testimonials/[id]/page.tsx
    - README.md
    - package.json
    - pnpm-lock.yaml

key-decisions:
  - "@prisma/client must be an explicit dependency in Prisma 7 projects — generated client imports @prisma/client/runtime/client at runtime"
  - "export const dynamic = 'force-dynamic' on all DB-querying pages prevents build-time prerender failures with Neon WebSocket connections"
  - ".catch(() => null) in site layout prevents entire layout from failing at build time — pages render with fallback data"
  - "Removed orphaned /home/sth/package-lock.json that caused Turbopack to detect wrong workspace root"

patterns-established:
  - "Prisma 7 + Neon: always add @prisma/client as explicit dep alongside prisma"
  - "DB-querying server components: always use export const dynamic = 'force-dynamic'"
  - "Layout DB queries: wrap with .catch(() => null) for build-time safety"

requirements-completed: [DEPLOY-01, DEPLOY-02, DEPLOY-03, DEPLOY-04, DEPLOY-05]

# Metrics
duration: 9min
completed: 2026-03-11
---

# Phase 4 Plan 01: Deploy and SEO Summary

**SEO metadata, OG image, sitemap.xml, robots.txt, README, and vercel.json complete — pnpm build passes with Turbopack after removing orphaned package-lock.json and adding missing @prisma/client dependency**

## Performance

- **Duration:** 9 min
- **Started:** 2026-03-11T22:44:37Z
- **Completed:** 2026-03-11T22:53:43Z
- **Tasks:** 3 auto tasks complete (checkpoint pending user verification)
- **Files modified:** 14

## Accomplishments
- Turbopack build fully fixed: removed /home/sth/package-lock.json + added @prisma/client@7.5.0
- SEO metadata complete: keywords, full OG fields, twitter card, robots directive in layout.tsx; page-level metadata in homepage
- Dynamic OG image (1200x630) with navy background #0A1628 and gold "PRIMOR HOLDING" title
- sitemap.ts and robots.ts generate /sitemap.xml and /robots.txt via Next.js file-based routing
- Professional Portuguese README.md replacing create-next-app placeholder
- vercel.json declaring all 10 required env var names
- All changes pushed to 00sTh/primorholding main branch

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix build, complete SEO metadata, create OG image, sitemap, robots** - `bb456ef` (feat)
2. **Task 2: Write professional README.md and create vercel.json** - `b1b82d8` (feat)
3. **Task 3: Verify seed, run final build** - `1fa6be1` (feat)

## Files Created/Modified
- `src/app/layout.tsx` - Enhanced metadata with keywords, OG, twitter card, robots
- `src/app/(site)/page.tsx` - Added page-level metadata + dynamic export + .catch() fallbacks
- `src/app/(site)/layout.tsx` - Added .catch(() => null) on siteSettings query
- `src/app/opengraph-image.tsx` - New: dynamic OG image 1200x630 (navy/gold)
- `src/app/sitemap.ts` - New: generates /sitemap.xml with 3 URLs
- `src/app/robots.ts` - New: generates /robots.txt (allow all, disallow /admin/)
- `src/app/admin/*.tsx` - Added export const dynamic = "force-dynamic" to all DB-querying admin pages
- `README.md` - Professional Portuguese README with setup, env vars, deploy guide
- `vercel.json` - New: framework:nextjs + all 10 env var names mapped to Vercel secrets
- `package.json` + `pnpm-lock.yaml` - Added @prisma/client@7.5.0 dependency

## Decisions Made
- **@prisma/client as explicit dep:** Prisma 7's `prisma-client` generator outputs to `src/generated/prisma` but still imports `@prisma/client/runtime/client` at build time. Must be in dependencies.
- **force-dynamic on admin pages:** Neon serverless driver uses WebSocket which fails in Node.js worker processes during static generation. All pages querying DB need `export const dynamic = "force-dynamic"`.
- **.catch() in layouts:** Site layout queries DB; wrapping with `.catch(() => null)` allows static pages (privacidade, termos) to build without DB connection.
- **Orphaned package-lock.json:** Removed `/home/sth/package-lock.json` which caused Turbopack to detect the wrong workspace root. This was the originally identified root cause.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Missing @prisma/client dependency**
- **Found during:** Task 3 (run final build)
- **Issue:** Prisma 7 generated client at `src/generated/prisma/internal/class.ts` imports `@prisma/client/runtime/client` which doesn't exist without `@prisma/client` package. Build failed with 4 module-not-found errors.
- **Fix:** `pnpm add @prisma/client@7.5.0` — matching Prisma version
- **Files modified:** package.json, pnpm-lock.yaml
- **Verification:** `ls node_modules/@prisma/client/runtime/` shows runtime files; build compiles successfully
- **Committed in:** `1fa6be1` (Task 3 commit)

**2. [Rule 3 - Blocking] Neon WebSocket failures during static prerender**
- **Found during:** Task 3 (run final build)
- **Issue:** After fixing @prisma/client, build still failed during static page generation: all pages that use prisma queries (site layout, homepage, all admin pages) failed with `[object ErrorEvent]` — PrismaNeon uses WebSocket which can't connect in worker processes
- **Fix:** Added `.catch(() => null/[])` to all layout/homepage Prisma queries + added `export const dynamic = "force-dynamic"` to all 8 admin data-fetching pages
- **Files modified:** src/app/(site)/layout.tsx, src/app/(site)/page.tsx, 8 admin page files
- **Verification:** `pnpm build` exits 0 with all 17 pages compiled
- **Committed in:** `1fa6be1` (Task 3 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking — both discovered during Task 3 build run)
**Impact on plan:** Both auto-fixes essential to achieve passing build. No scope creep — all changes directly serve the "build passes" requirement.

## Issues Encountered
- The originally identified build blocker (orphaned package-lock.json causing Turbopack workspace root detection) was confirmed real and fixed. However, two additional build blockers were discovered: missing @prisma/client runtime dependency and Neon WebSocket failures during static prerender. All resolved.

## User Setup Required
None for code changes. The following manual steps remain for production deployment (checkpoint task):
- Create Vercel project linked to 00sTh/primorholding
- Configure 10 environment variables in Vercel dashboard (DATABASE_URL, DIRECT_URL, Clerk keys, Cloudinary keys, NEXT_PUBLIC_SITE_URL)
- Deploy from main branch
- Run `pnpm db:seed` with production Neon credentials

## Next Phase Readiness
- Codebase is fully deploy-ready: build passes, SEO complete, README professional
- Awaiting user manual steps: Vercel project creation, env var configuration, deploy
- After deploy: run `pnpm db:seed` with production credentials to populate Neon DB

## Self-Check: PASSED

All files verified:
- FOUND: src/app/opengraph-image.tsx
- FOUND: src/app/sitemap.ts
- FOUND: src/app/robots.ts
- FOUND: vercel.json
- FOUND: README.md
- FOUND: .planning/phases/04-deploy-and-seo/04-01-SUMMARY.md

All commits verified:
- FOUND: bb456ef (Task 1)
- FOUND: b1b82d8 (Task 2)
- FOUND: 1fa6be1 (Task 3 + build fix)

---
*Phase: 04-deploy-and-seo*
*Completed: 2026-03-11*
