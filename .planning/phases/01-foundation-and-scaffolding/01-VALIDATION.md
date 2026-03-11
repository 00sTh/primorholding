---
phase: 1
slug: foundation-and-scaffolding
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-11
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | TypeScript type-check (tsc --noEmit) + manual browser checks |
| **Config file** | tsconfig.json (created in Wave 1) |
| **Quick run command** | `pnpm type-check` |
| **Full suite command** | `pnpm type-check && pnpm build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm type-check`
- **After every plan wave:** Run `pnpm type-check && pnpm build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUND-01 | build | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-02 | manual | `git status` shows no .env | ✅ | ⬜ pending |
| 1-01-03 | 01 | 1 | FOUND-03 | manual | `.env.example` exists with all keys | ✅ | ⬜ pending |
| 1-02-01 | 02 | 1 | FOUND-05 | automated | `pnpm prisma db push` exits 0 | ❌ W0 | ⬜ pending |
| 1-02-02 | 02 | 2 | FOUND-04 | manual | curl localhost/admin redirects to sign-in | ✅ | ⬜ pending |
| 1-03-01 | 03 | 1 | FOUND-06 | manual | visual check dark blue theme in browser | ✅ | ⬜ pending |

---

## Wave 0 Requirements

- [ ] `pnpm` available and lock file present
- [ ] `pnpm type-check` script in package.json → `tsc --noEmit`
- [ ] Docker running for `docker compose up -d` to succeed

*Existing infrastructure: None yet — greenfield project.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| .gitignore blocks secrets | FOUND-02 | File system check | Run `git status` after setup, confirm no .env files shown |
| /admin redirects to sign-in | FOUND-04 | Browser redirect | Open localhost:3000/admin, confirm redirect to /admin/sign-in |
| Dark blue theme renders | FOUND-06 | Visual verification | Open localhost:3000, confirm #0A1628 background, correct fonts |
| Docker PostgreSQL starts | FOUND-01 | Process check | `docker compose up -d`, confirm port 5432 accessible |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
