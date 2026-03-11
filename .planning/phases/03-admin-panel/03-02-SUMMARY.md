---
phase: 03-admin-panel
plan: 02
subsystem: ui
tags: [admin, blog, contacts, crud, next.js, prisma, server-actions, clerk]

# Dependency graph
requires:
  - phase: 03-admin-panel
    plan: 01
    provides: Admin layout, sidebar nav with Blog and Contatos links, Clerk auth pattern, Server page + Client form pattern, useActionState bind pattern
  - phase: 01-foundation
    provides: Prisma client, BlogPost and Contact models, slugify utility
provides:
  - Blog posts CRUD: list with status badges, create form, pre-filled edit form
  - Draft/published workflow with publishedAt set only on first publish
  - Contacts viewer: table with read/unread toggle, message expansion, unread count
  - toggleContactRead revalidates /admin to keep dashboard unread count current
affects: [04-deploy]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component page wrapping Client Component form (same as Plan 01)
    - useActionState with bound server action for edit forms (.bind(null, id) pattern)
    - React.Fragment with key for multiple sibling table rows per map iteration
    - details/summary HTML element for collapsible message expansion (no modal needed)
    - form action={serverAction.bind(null, id, value)} for server mutations from Server Components

key-files:
  created:
    - src/app/actions/blog.ts
    - src/app/admin/blog/page.tsx
    - src/app/admin/blog/new/page.tsx
    - src/app/admin/blog/[id]/page.tsx
    - src/app/admin/blog/[id]/BlogPostEditForm.tsx
    - src/app/actions/contacts.ts
    - src/app/admin/contacts/page.tsx
  modified: []

key-decisions:
  - "publishedAt is set to new Date() only when transitioning from unpublished to published — re-saving an already-published post preserves the original publishedAt"
  - "Blog edit page follows the same Server page + Client form split from Plan 01 — page.tsx selects only non-DateTime fields (no publishedAt in select), BlogPostEditForm.tsx holds useActionState"
  - "Contacts page is a pure Server Component — no client boundary needed since toggleContactRead binds directly as form action"
  - "React.Fragment with key used for map() that yields multiple sibling rows (main row + optional detail row) — avoids React key warning on shorthand fragment"

patterns-established:
  - "Pattern: details/summary for collapsible content — native HTML, zero JS, no modal, ideal for admin text expansion"
  - "Pattern: form action={serverAction.bind(null, id, currentValue)} — passes current state into server action from Server Component without client state"

requirements-completed: [ADMIN-05, ADMIN-06]

# Metrics
duration: 3min
completed: 2026-03-11
---

# Phase 3 Plan 2: Blog Posts CRUD and Contacts Viewer Summary

**Blog posts CRUD with draft/published workflow (publishedAt on first publish only) and contacts viewer with read/unread toggle that refreshes dashboard count**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-11T20:38:24Z
- **Completed:** 2026-03-11T20:41:00Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Full Blog posts CRUD: list table with Publicado (green badge) / Rascunho (slate badge) status, create form with "Publicar imediatamente" checkbox, pre-filled edit form — all using the Server page + Client form pattern from Plan 01
- publishedAt logic: set to now() on first publish, preserved on subsequent saves of already-published posts, null for drafts
- Contacts viewer: table with all contacts ordered by most recent, summary line ("X mensagens, Y nao lidas"), visual distinction between unread (bg-navy/80 font-medium) and read (bg-navy-dark opacity-70) rows, mark read/unread form buttons with Mail/MailOpen icons, details/summary expand for full message text
- toggleContactRead revalidates both /admin/contacts and /admin so the dashboard unread count badge stays current

## Task Commits

Each task was committed atomically:

1. **Task 1: Blog posts CRUD** - `20a3c8e` (feat)
2. **Task 2: Contacts viewer** - `58904dc` (feat)

## Files Created/Modified

- `src/app/actions/blog.ts` - createBlogPost and updateBlogPost server actions with Zod validation, auth guard, publishedAt-on-first-publish logic
- `src/app/admin/blog/page.tsx` - Blog list table with status badges and "Novo Post" link
- `src/app/admin/blog/new/page.tsx` - Create form with useActionState, title/excerpt/content/published fields
- `src/app/admin/blog/[id]/page.tsx` - Server page fetching post by id, passes non-DateTime fields to BlogPostEditForm
- `src/app/admin/blog/[id]/BlogPostEditForm.tsx` - Client edit form pre-filled with useActionState(updateBlogPost.bind(null, post.id))
- `src/app/actions/contacts.ts` - toggleContactRead server action, revalidates /admin and /admin/contacts
- `src/app/admin/contacts/page.tsx` - Contacts table with Promise.all fetch, read/unread visual states, form action toggles, details expand

## Decisions Made

- publishedAt is preserved on re-save of already-published posts by fetching the existing record's publishedAt before updating — only set to new Date() when transitioning from unpublished to published.
- Blog edit page selects only non-DateTime fields from Prisma (id, title, excerpt, content, published) — publishedAt is handled entirely server-side in the action, never crosses the server/client boundary.
- Contacts page is a pure Server Component — no "use client" needed because toggleContactRead.bind(null, id, read) is used directly as form action, and createdAt.toLocaleDateString("pt-BR") is called server-side on the Date object before rendering.
- React.Fragment with key used in contacts map() to wrap two sibling rows (main tr + optional detail tr) — the short fragment <> does not accept a key prop.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed React key warning on map() with multiple sibling rows**
- **Found during:** Task 2 (Contacts viewer implementation)
- **Issue:** Using `<>` (short fragment) inside .map() and placing key on inner `<tr>` leaves the fragment without a key — React key warning at runtime
- **Fix:** Changed to `<Fragment key={contact.id}>` wrapping the two sibling rows; removed redundant key from inner `<tr>` and detail `<tr>`; added `import { Fragment } from "react"`
- **Files modified:** src/app/admin/contacts/page.tsx
- **Verification:** pnpm type-check passes, no duplicate key issues
- **Committed in:** 58904dc (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Necessary correctness fix. No scope creep.

## Issues Encountered

- **Pre-existing build failure (unchanged):** `pnpm build` fails due to Turbopack workspace root detection issue — Next.js finds `/home/sth/package-lock.json` as workspace root instead of project's `pnpm-lock.yaml`, causing `@prisma/client/runtime` wasm module not found. This was already documented in Phase 02 and Phase 03 Plan 01 deferred-items. `pnpm type-check` passes cleanly — code is correct, build issue is environment-level and deferred to Phase 04.

## User Setup Required

None - no new external service configuration required. Blog and Contacts use the existing database and auth setup.

## Next Phase Readiness

- Admin panel complete: all 6 ADMIN-* requirements satisfied (ADMIN-01 through ADMIN-06)
- Phase 04 (Deploy) can proceed — entire codebase is type-clean
- Pre-existing Turbopack build issue remains deferred to Phase 04 (set turbopack.root or remove orphaned lockfile)

## Self-Check: PASSED

All created files verified present. Task commits 20a3c8e and 58904dc verified in git history.

---
*Phase: 03-admin-panel*
*Completed: 2026-03-11*
