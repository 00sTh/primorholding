---
phase: 3
slug: admin-panel
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-11
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | TypeScript type-check (tsc --noEmit) + manual browser checks |
| **Config file** | tsconfig.json (exists) |
| **Quick run command** | `pnpm type-check` |
| **Full suite command** | `pnpm type-check && pnpm build` |
| **Estimated runtime** | ~20 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm type-check`
- **After every plan wave:** Run `pnpm type-check && pnpm build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 3-01-01 | 01 | 1 | ADMIN-01 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 3-01-02 | 01 | 1 | ADMIN-02 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 3-01-03 | 01 | 1 | ADMIN-03 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 3-02-01 | 02 | 2 | ADMIN-04 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 3-02-02 | 02 | 2 | ADMIN-05 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 3-02-03 | 02 | 2 | ADMIN-06 | automated | `pnpm type-check && pnpm build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Clerk v7 env vars set (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) — admin sign-in cannot be tested without real Clerk keys
- [ ] Cloudinary env vars set (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) — image upload requires real Cloudinary credentials

*Note: Type-check validates code correctness regardless of env vars. Real integration testing requires live credentials.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Sign in redirects to dashboard | ADMIN-01 | Clerk auth flow | Open /admin/sign-in, sign in, verify redirect to /admin |
| Dashboard shows content counts | ADMIN-02 | DB integration | Open /admin dashboard, verify counts match DB records |
| Service image uploads to Cloudinary | ADMIN-03 | Cloud integration | Create service with image, verify Cloudinary URL in DB |
| Service delete removes from public site | ADMIN-03 | Full-stack flow | Delete service, refresh home page, verify card gone |
| Testimonial photo uploads to Cloudinary | ADMIN-04 | Cloud integration | Create testimonial with photo, verify Cloudinary URL |
| Blog post draft vs published toggle | ADMIN-05 | State management | Create post as draft, toggle to published, verify status |
| Contact mark as read/unread | ADMIN-06 | State toggle | Click mark-read, refresh, verify status persists |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 20s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
