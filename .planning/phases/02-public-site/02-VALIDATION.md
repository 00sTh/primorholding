---
phase: 2
slug: public-site
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-11
---

# Phase 2 — Validation Strategy

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
| 2-01-01 | 01 | 1 | SITE-12 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 2-01-02 | 01 | 1 | SITE-01 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 2-01-03 | 01 | 1 | SITE-03 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 2-01-04 | 01 | 1 | SITE-08 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 2-01-05 | 01 | 1 | SITE-11 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 2-02-01 | 02 | 1 | SITE-02 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 2-02-02 | 02 | 1 | SITE-04 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 2-02-03 | 02 | 1 | SITE-05 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 2-02-04 | 02 | 1 | SITE-06 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 2-03-01 | 03 | 2 | SITE-07 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 2-03-02 | 03 | 2 | SITE-09 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |
| 2-03-03 | 03 | 2 | SITE-10 | automated | `pnpm type-check` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `prisma/seed.ts` — seed with 3 services, 2 testimonials, SiteSettings defaults (needed for SITE-04, SITE-05, SITE-06)
- [ ] `framer-motion` and `zod` installed (`pnpm add framer-motion zod`)

*Check before starting: `ls prisma/seed.ts && node -e "require('./node_modules/framer-motion')"` (both must exist)*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Navbar anchor links scroll to sections | SITE-01 | Browser behavior | Click each nav link, confirm smooth scroll to section with correct offset |
| Hero animation plays on load | SITE-02 | Visual animation | Open localhost:3000, verify fade-in animation |
| Scroll-reveal animations trigger | SITE-12 | Visual animation | Scroll down page, verify sections animate into view |
| About section founder photo renders | SITE-04 | Image + fallback | Check with null SiteSettings (initials placeholder) and with Cloudinary URL |
| Services load from DB | SITE-05 | DB integration | Run seed, open page, verify 3 service cards appear |
| Testimonials load from DB | SITE-06 | DB integration | Run seed, open page, verify 2 testimonial cards appear |
| Contact form honeypot works | SITE-07 | Security check | Fill "website" hidden field via devtools, submit, verify no DB entry created |
| Contact form saves to DB | SITE-07 | DB integration | Submit valid form, check `prisma studio` for Contact record |
| WhatsApp button links to correct number | SITE-08 | Link behavior | Click button, verify `wa.me/{number}` opens |
| Cookie banner hides on accept | SITE-11 | localStorage | Accept, refresh page, verify banner does not reappear |
| Cookie banner hides on reject | SITE-11 | localStorage | Reject, refresh page, verify banner does not reappear |
| Legal pages accessible from footer | SITE-09/10 | Navigation | Click footer links, verify /privacidade and /termos render |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 20s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
