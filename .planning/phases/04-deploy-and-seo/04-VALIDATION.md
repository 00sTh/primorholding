---
phase: 4
slug: deploy-and-seo
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-11
---

# Phase 4 — Validation Strategy

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
| 4-01-01 | 01 | 1 | DEPLOY-03, DEPLOY-04 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 4-01-02 | 01 | 1 | DEPLOY-01 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 4-01-03 | 01 | 1 | DEPLOY-05 | automated | `pnpm type-check && pnpm build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Pre-existing Turbopack workspace root issue (`/home/sth/package-lock.json`) must be resolved before `pnpm build` can pass — this is the known deferred issue from Phase 2/3
- [ ] Vercel CLI available (`pnpm add -g vercel`) OR deploy via Vercel dashboard (manual)
- [ ] Vercel project linked to GitHub repo `00sTh/primorholding`

*Note: Code correctness verified by `pnpm type-check`. Build pass needed for DEPLOY-02 (Vercel deploys from build). Deploy itself is a manual step.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Vercel deploy succeeds | DEPLOY-02 | External service | Push to main, verify Vercel dashboard shows successful build |
| All pages load on Vercel URL | DEPLOY-02 | Live environment | Visit each page (/, /privacidade, /termos, /admin) on Vercel URL |
| OpenGraph preview correct | DEPLOY-03 | Social share test | Use opengraph.xyz or share URL in Telegram/WhatsApp |
| sitemap.xml accessible | DEPLOY-04 | URL check | Visit /sitemap.xml on Vercel URL, verify XML content |
| robots.txt accessible | DEPLOY-04 | URL check | Visit /robots.txt on Vercel URL |
| DB seeded on Vercel | DEPLOY-05 | Remote DB | Run `pnpm db:seed` with DIRECT_URL pointing to Neon prod DB |
| README visible on GitHub | DEPLOY-01 | Visual check | Visit github.com/00sTh/primorholding, verify README renders |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 20s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
