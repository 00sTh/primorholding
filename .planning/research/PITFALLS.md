# Pitfalls Research

**Domain:** Institutional consulting/holding website (Next.js 16 + Prisma 7 + Neon + Clerk v7 + Cloudinary + Docker dev / Vercel prod)
**Researched:** 2026-03-11
**Confidence:** HIGH (verified against official docs and multiple sources)

## Critical Pitfalls

### Pitfall 1: Next.js 16 middleware.ts is Deprecated -- Must Use proxy.ts

**What goes wrong:**
Next.js 16 renamed `middleware.ts` to `proxy.ts` and changed the runtime from Edge to Node.js. If you create a `middleware.ts` file (as all pre-16 tutorials and even the developer's own past projects use), it will work today with a deprecation warning but will break in a future Next.js release. More critically, `proxy.ts` runs on the Node.js runtime exclusively -- the Edge runtime is NOT supported. This means Clerk's `clerkMiddleware()` helper, which historically ran on Edge, now runs on Node.js.

**Why it happens:**
Every Clerk tutorial, every past project in the developer's portfolio (AltheiaSite, EmporioSite, ProjetoElearning), and most community guides still reference `middleware.ts`. The rename is fresh (Next.js 16, early 2026) and easy to miss. Additionally, some auth libraries have a documented "Logout Loop" bug when migrating to `proxy.ts` where session cookies do not clear properly because the proxy does not pass response headers correctly.

**How to avoid:**
- Create `src/proxy.ts` (or root `proxy.ts`) instead of `middleware.ts` from day one.
- Export a function named `proxy` (not `middleware`) wrapping `clerkMiddleware()`.
- Run Next.js codemod if starting from a template: `npx @next/codemod middleware-to-proxy`.
- Test sign-out flow explicitly after setup to catch the Logout Loop bug early.
- Use static imports only for Clerk (consistent with developer's existing pattern in MEMORY.md).

**Warning signs:**
- Console deprecation warning mentioning `middleware.ts`.
- Vercel deployment warning about "middleware missing."
- Users cannot log out of admin panel (Logout Loop symptom).

**Phase to address:**
Phase 1 (Foundation/Scaffolding) -- file must be `proxy.ts` from the very first commit.

---

### Pitfall 2: Prisma 7 Import Path and Configuration Overhaul

**What goes wrong:**
Prisma 7 introduces three breaking changes that can completely block the project:
1. **Generator provider** changed from `prisma-client-js` to `prisma-client`.
2. **Output path is now required** -- Prisma no longer generates into `node_modules`. You must specify `output = "../generated/prisma"` (or similar) in the generator block.
3. **Import path** changes from `@prisma/client` to your output folder, e.g., `@/generated/prisma/client`.
4. **Connection URL** moves from `schema.prisma` to a new `prisma.config.ts` file.

If any of these are missed, `prisma generate` fails, imports break, or the app connects to localhost instead of Neon.

**Why it happens:**
The developer has used Prisma 7 before (EmporioSite, AltheiaSite use `@/generated/prisma/client`), but a new project scaffold or copy-paste from older templates can easily regress. The `prisma.config.ts` file is entirely new to Prisma 7 and does not exist in any v6 project. Additionally, there is a known Prisma 7 + Neon adapter bug (GitHub issue #29145) where the connection string fails to parse and falls back to localhost defaults.

**How to avoid:**
- Use `provider = "prisma-client"` with `output = "../generated/prisma"` in the generator block.
- Create `prisma.config.ts` at project root with the database URL configuration.
- Import from `@/generated/prisma/client` (add path alias in `tsconfig.json`).
- Pin `@prisma/adapter-neon` and `@neondatabase/serverless` to known-working versions. Test connection at project setup, not after building features.
- Add `generated/` to `.gitignore` (it is build output, not source).

**Warning signs:**
- `prisma generate` fails silently or with cryptic errors about missing output.
- TypeScript cannot find `PrismaClient` type.
- Database queries silently connect to localhost instead of Neon (returns empty results or connection refused in production).

**Phase to address:**
Phase 1 (Foundation/Scaffolding) -- schema + config must be correct before any model is created.

---

### Pitfall 3: Neon Cold Starts and Connection Pool Exhaustion in Serverless

**What goes wrong:**
Neon free tier auto-suspends compute after 5 minutes of inactivity. First request after suspension incurs 300-800ms cold start latency. For an institutional site where visits may be sporadic, nearly every first visitor could experience this delay. Additionally, each serverless function invocation on Vercel can create a new database connection, and without a singleton pattern + pooled connection, you quickly hit Neon's connection limits.

**Why it happens:**
Developers test locally where the database is always warm. The cold start only manifests in production on Neon free tier after periods of inactivity. Connection pooling issues appear only under concurrent requests, which local development rarely simulates.

**How to avoid:**
- Use Neon's **pooled connection string** (has `-pooler` in hostname) for `DATABASE_URL`.
- Use Neon's **direct connection string** (no `-pooler`) for `DIRECT_URL` (migrations only).
- Add `?connection_limit=5&pool_timeout=20` to the pooled connection string.
- Implement the Prisma singleton pattern using `globalThis` to prevent connection leaks during Next.js hot reload in development.
- Accept cold start latency on free tier as a tradeoff (or upgrade to paid plan for always-on compute).
- Consider a loading skeleton/spinner on the public site to mask the initial database query delay.

**Warning signs:**
- First page load after idle period takes 1-2 seconds longer than expected.
- Error `P1001: Can't reach database server` during deploys or after idle.
- Error about prepared statements already existing (using pooled URL for migrations instead of direct).
- "Too many connections" errors in Vercel function logs.

**Phase to address:**
Phase 1 (Foundation/Scaffolding) -- connection strings and singleton must be configured at project setup. Cold start awareness throughout all phases.

---

### Pitfall 4: Secrets Exposure in Public GitHub Repository

**What goes wrong:**
The project will be in a public GitHub repo (under `00sth`). Any accidentally committed `.env.local`, `prisma.config.ts` with hardcoded URLs, or Cloudinary API secrets will be permanently in Git history -- even after deletion. GitHub secret scanning exists but is reactive, not preventive. One accidental `git add .` can expose: `CLERK_SECRET_KEY`, `CLOUDINARY_API_SECRET`, `DATABASE_URL` (with Neon credentials), and email service credentials.

**Why it happens:**
The developer uses `.env.local` across all projects and knows the pattern, but a new project setup is the highest-risk moment: `.gitignore` may not be in place yet, `prisma.config.ts` (new in Prisma 7) reads from `process.env` but could be templated with hardcoded values during setup, and Docker `.env` files can be different from Next.js ones.

**How to avoid:**
- Create `.gitignore` as the VERY FIRST file in the repo, before any other file. Include: `.env`, `.env.local`, `.env.*.local`, `prisma.config.ts` (if it contains secrets -- or better, have it read from `process.env` only), `generated/`, `node_modules/`, `.next/`.
- Create `.env.example` with placeholder values (never real keys): `CLERK_SECRET_KEY=sk_test_xxx`.
- NEVER put real values in `prisma.config.ts` -- always use `process.env.DATABASE_URL`.
- Install `git-secrets` or `detect-secrets` as a pre-commit hook.
- If a secret is accidentally committed: rotate ALL affected keys immediately, then use `git filter-repo` or BFG Repo-Cleaner to scrub history.
- Clerk publishable key (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`) is safe to expose -- it is designed for client-side use.

**Warning signs:**
- `.env.local` appears in `git status` output.
- GitHub sends a secret scanning alert email.
- Cloudinary usage spikes from unknown sources (someone found your API key).

**Phase to address:**
Phase 1 (Foundation/Scaffolding) -- `.gitignore` and `.env.example` must be the first files committed.

---

### Pitfall 5: LGPD Non-Compliance Risks

**What goes wrong:**
LGPD (Lei Geral de Proteção de Dados) applies to any website collecting data from people in Brazil. The contact form collects name, email, and message -- all personal data under LGPD. Without proper compliance, the business faces fines up to 2% of annual revenue. Common failures: (1) no cookie consent banner, (2) no privacy policy explaining data collection purposes, (3) no mechanism for users to request data deletion, (4) storing contact form data indefinitely without legal basis.

**Why it happens:**
Developers treat compliance as a "nice to have" and defer legal pages to the end. Cookie banners are added cosmetically without actually blocking cookies/analytics until consent is given. Privacy policies are copied from templates without matching the actual data processing activities of the site.

**How to avoid:**
- Cookie consent banner must be present from launch. It must be in Portuguese. It must offer accept/reject (not just "OK"). It must block analytics/tracking scripts until consent is given.
- Privacy policy must list: what data is collected (contact form fields), why (legitimate interest for business contact), how long it is stored, who has access, how to request deletion.
- Terms of use page is required.
- Contact form submissions should include a checkbox: "Li e concordo com a Politica de Privacidade" (I have read and agree to the Privacy Policy).
- Implement a data retention policy -- auto-delete or archive contact submissions after a reasonable period (e.g., 12 months).
- The CNPJ is pending (noted in PROJECT.md) -- legal pages cannot be finalized without it.

**Warning signs:**
- Cookie banner says "OK" only (no reject option).
- Analytics scripts load before consent is given.
- No privacy policy link in the contact form.
- Contact data stored forever with no deletion mechanism in admin panel.

**Phase to address:**
Compliance phase (should be before launch, ideally Phase 3 or 4). CNPJ must be obtained before legal pages can be finalized.

---

### Pitfall 6: Contact Form Without Spam Protection

**What goes wrong:**
A public contact form on an institutional website is a magnet for spam bots. Without protection, the admin panel fills with hundreds of junk submissions within days of launch. If the form triggers email notifications, this also means the business owner gets spammed. Server actions in Next.js do not provide built-in rate limiting or bot detection.

**Why it happens:**
Developers test with manual form submissions and never encounter bots. Spam starts within hours of a public site being indexed by search engines. The simplicity of a server action (`"use server"` + `prisma.contact.create()`) makes it easy to skip protection layers.

**How to avoid:**
- Layer 1: Honeypot field -- a hidden input that bots fill but humans do not. Server action rejects submissions where the honeypot is non-empty.
- Layer 2: Rate limiting -- max 3-5 submissions per IP per 10 minutes. Use in-memory store for simple sites or Vercel KV / Upstash Redis for distributed rate limiting.
- Layer 3 (recommended): Cloudflare Turnstile (privacy-friendly CAPTCHA alternative) or reCAPTCHA v3. Turnstile is free and does not track users (better for LGPD compliance).
- Layer 4: Server-side validation with Zod -- reject malformed data before it reaches the database.
- Never return internal error messages to the client.

**Warning signs:**
- Admin panel shows hundreds of contacts from obvious bot patterns (random strings, URLs in message body).
- Email notifications become unusable due to volume.
- Database grows unexpectedly from spam entries.

**Phase to address:**
Phase where contact form is built (likely Phase 2 or 3). Honeypot + Zod validation from day one. CAPTCHA can be added later but should not be deferred past launch.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip Prisma singleton in dev | Faster initial setup | Connection leak warnings in dev, harder to debug pool exhaustion in prod | Never -- 5 lines of code, always do it |
| Hardcode site settings instead of DB-driven | Skip admin CRUD for settings | Every text/color change requires a code deploy | MVP only if admin panel is Phase 2+ |
| Use unsigned Cloudinary uploads from client | Simpler upload code | Anyone who finds your cloud name + preset can upload to your account, racking up storage costs | Never for admin uploads -- always use signed server-side uploads |
| Copy privacy policy template from another project | Ships faster | Template may not match actual data processing, creating legal liability | Only as a starting point, must be customized before launch |
| `middleware.ts` instead of `proxy.ts` | Works today (with deprecation warning) | Will break in future Next.js update, accumulates migration debt | Never in a greenfield Next.js 16 project |
| Store all env vars in Docker `docker-compose.yml` | Convenient for dev | Risk of committing secrets if docker-compose.yml is not in .gitignore, env drift between Docker and Vercel | Only if docker-compose.yml uses `env_file: .env.local` reference, never inline values |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Clerk v7 + Next.js 16 | Using `middleware.ts` (deprecated) | Use `proxy.ts` with exported `proxy` function wrapping `clerkMiddleware()` |
| Clerk admin role check | Checking role only in pages, not in server actions | Check `sessionClaims?.metadata?.role === 'admin'` in EVERY server action, not just the page |
| Prisma 7 + Neon | Using pooled URL for `prisma db push` / migrations | Use `DIRECT_URL` (non-pooled) for migrations, `DATABASE_URL` (pooled) for app runtime |
| Prisma 7 + Neon adapter | Not pinning adapter version | Pin `@prisma/adapter-neon` to a known-working version; v7.0.0 had connection string parsing bugs |
| Cloudinary | Exposing `CLOUDINARY_API_SECRET` via `NEXT_PUBLIC_` prefix | Only `CLOUDINARY_CLOUD_NAME` can be public. API key and secret must be server-only env vars |
| Cloudinary in admin | Client-side unsigned upload | Always use signed server-side upload via API route or server action |
| Docker dev + Vercel prod | `NEXT_PUBLIC_` vars differ between environments | `NEXT_PUBLIC_` vars are baked at build time; Docker dev build uses Docker env, Vercel uses dashboard env. Ensure `.env.local` is consistent |
| Docker dev | Using `docker-compose up` for hot reload | Mount source as volume, use `next dev` inside container, ensure `node_modules` is NOT mounted from host (platform-specific binaries) |
| Neon free tier | Expecting instant responses after idle | First request after 5min idle incurs 300-800ms cold start. Design UI to handle gracefully |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| No Prisma `select` optimization | Admin queries fetch ALL columns including large text fields | Use `select` to fetch only needed fields, especially in list views | When testimonials/blog posts have large content fields (50+ records) |
| Unbounded queries in admin | Admin pages load all records at once | Implement pagination from the start (20-50 per page) | When contacts/testimonials exceed 100 records |
| Cloudinary images without transformation | Original 5MB images served to mobile visitors | Use Cloudinary URL transformations (`f_auto,q_auto,w_800`) or Next.js `<Image>` with Cloudinary loader | Immediately -- every unoptimized image costs bandwidth and hurts Core Web Vitals |
| No ISR/caching on public pages | Every visitor triggers fresh database queries | Use `revalidate` on public pages (services, testimonials) -- content changes rarely | Even at 10 concurrent visitors, unnecessary DB load |
| Loading all animations eagerly | Large framer-motion bundle blocks initial render | Dynamic import framer-motion components, use CSS animations for simple transitions | Immediately affects Lighthouse score |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Server action without auth check | Any user can call admin actions (create/update/delete services, testimonials) | Every admin server action must verify `auth()` + role check before any database mutation |
| Contact form without input sanitization | XSS via stored content displayed in admin panel | Sanitize HTML in contact message before storage, or render with `dangerouslySetInnerHTML` never used on user content |
| CLERK_SECRET_KEY in public repo | Full account takeover -- attacker can create/delete users, impersonate admin | `.gitignore` from first commit, `git-secrets` pre-commit hook, rotate key if exposed |
| Cloudinary API secret exposed | Attacker uploads unlimited content to your account, racking up storage/bandwidth costs | Server-only env var, signed uploads only, monitor Cloudinary usage dashboard |
| No rate limiting on contact form | Bot spam floods database and email notifications | Honeypot + rate limiting + CAPTCHA (Cloudflare Turnstile recommended) |
| Admin panel accessible without role check in proxy | Any Clerk-authenticated user (not just admin) can access `/admin/*` | Proxy must check role claim, not just authentication status |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Cookie banner covers WhatsApp button | Mobile users cannot reach floating WhatsApp CTA | Position cookie banner at top or ensure z-index stacking does not overlap floating buttons |
| No loading state on contact form submit | User clicks multiple times, creates duplicate submissions | Disable button during submission, show loading spinner, redirect or show success message |
| Hero section with large unoptimized image | 3-5 second load time on mobile, visitor bounces before seeing content | Use `priority` on hero `<Image>`, serve WebP via Cloudinary transforms, consider blur placeholder |
| Admin panel without feedback on actions | Admin creates service, nothing happens visually | Toast notifications for all CRUD operations, optimistic UI updates |
| No 404 page customization | Generic Next.js 404 breaks professional appearance | Custom `not-found.tsx` matching site design with navigation back to home |
| No mobile navigation | 60%+ of visitors on mobile cannot navigate | Responsive hamburger menu from day one, test on real mobile devices |

## "Looks Done But Isn't" Checklist

- [ ] **proxy.ts:** Protects `/admin/*` routes AND verifies admin role (not just auth) -- test with a non-admin Clerk account
- [ ] **Contact form:** Has honeypot field, rate limiting, Zod validation, AND success/error states -- test by submitting 10 times rapidly
- [ ] **Cookie banner:** Actually blocks analytics scripts until consent is given (not just cosmetic) -- verify in Network tab that no tracking requests fire before consent
- [ ] **Privacy policy:** Lists the specific data this site collects (name, email, message from contact form, cookies) -- not a generic template
- [ ] **Cloudinary images:** All images use transformations (f_auto, q_auto, w_XXX) -- check Network tab for image sizes
- [ ] **Admin CRUD:** Delete operations have confirmation dialogs -- test that accidental clicks don't destroy data
- [ ] **Environment variables:** `.env.example` exists with ALL required keys (placeholder values) -- clone repo fresh and verify setup works with just `.env.example` as guide
- [ ] **SEO metadata:** Each public page has unique title, description, and OG image -- check with `<head>` inspector
- [ ] **WhatsApp button:** Links to correct number with pre-filled message -- test on mobile (not just desktop)
- [ ] **Responsive design:** All pages tested at 375px, 768px, and 1440px -- not just "looks okay on my laptop"
- [ ] **Docker dev parity:** `docker-compose up` produces same result as `vercel dev` -- test both before first deploy

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Secret committed to public repo | HIGH | 1. Rotate ALL affected keys immediately (Clerk, Cloudinary, Neon). 2. Use `git filter-repo` to scrub history. 3. Force-push cleaned history. 4. Notify GitHub to purge cached copies. 5. Install pre-commit hooks to prevent recurrence |
| Wrong Prisma import path (from v6 template) | LOW | Update generator block in schema.prisma, run `prisma generate`, update all imports project-wide with find-and-replace |
| middleware.ts instead of proxy.ts | LOW | Rename file, rename exported function, run Next.js codemod. Test auth flows (especially sign-out) after migration |
| LGPD non-compliance discovered post-launch | MEDIUM | 1. Add cookie banner immediately. 2. Draft privacy policy and terms. 3. Add consent checkbox to contact form. 4. Audit stored data for retention compliance. 5. Implement data deletion in admin panel |
| Contact form spam flood | LOW | 1. Add honeypot field (immediate, no dependencies). 2. Add rate limiting. 3. Bulk-delete spam from admin panel. 4. Add Cloudflare Turnstile for persistent spam |
| Neon connection pool exhaustion | MEDIUM | 1. Add `connection_limit` param to connection string. 2. Implement Prisma singleton pattern. 3. Check for missing `$disconnect()` in scripts. 4. Consider upgrading Neon plan if free tier limits are the bottleneck |
| Cloudinary storage abuse (exposed preset) | MEDIUM | 1. Delete unsigned upload preset. 2. Switch to signed uploads only. 3. Review and delete unauthorized uploads from Cloudinary dashboard. 4. Monitor usage going forward |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| proxy.ts not middleware.ts | Phase 1 (Scaffolding) | File is named `proxy.ts`, no deprecation warnings in console |
| Prisma 7 config + import path | Phase 1 (Scaffolding) | `prisma generate` succeeds, TypeScript resolves `PrismaClient` |
| Neon connection pooling | Phase 1 (Scaffolding) | Pooled URL in DATABASE_URL, direct URL in DIRECT_URL, singleton in `prisma.ts` |
| Secrets in public repo | Phase 1 (Scaffolding) | `.gitignore` includes all env files, `.env.example` exists, no secrets in git log |
| Docker/Vercel env parity | Phase 1 (Scaffolding) | `docker-compose.yml` uses `env_file`, both environments connect to same Neon DB |
| Clerk admin role enforcement | Phase 2 (Admin Panel) | Non-admin Clerk user gets 403 on `/admin/*`, server actions reject unauthorized calls |
| Contact form spam protection | Phase 2-3 (Public Features) | Honeypot test fails bot submission, rate limit blocks rapid submissions |
| LGPD compliance (banner + policies) | Phase 3-4 (Compliance) | Cookie banner blocks scripts until consent, privacy policy matches actual data collection |
| Cloudinary image optimization | Phase 2-3 (Content) | All served images are < 200KB, use `f_auto,q_auto` transforms |
| Contact form validation + security | Phase 2-3 (Public Features) | Zod schema validates all inputs, XSS payloads are sanitized, error messages are generic |

## Sources

- [Clerk middleware/proxy.ts docs](https://clerk.com/docs/reference/nextjs/clerk-middleware) -- HIGH confidence
- [Next.js 16 middleware-to-proxy migration](https://nextjs.org/docs/messages/middleware-to-proxy) -- HIGH confidence
- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) -- HIGH confidence
- [Neon connection pooling docs](https://neon.com/docs/connect/connection-pooling) -- HIGH confidence
- [Neon + Prisma guide](https://neon.com/docs/guides/prisma) -- HIGH confidence
- [Prisma 7 upgrade guide](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7) -- HIGH confidence
- [Prisma 7 + Neon adapter issue #29145](https://github.com/prisma/prisma/issues/29145) -- HIGH confidence (known bug)
- [Cloudinary credential protection guide](https://cloudinary.com/blog/protecting-cloudinary-credentials-enterprise) -- HIGH confidence
- [Cloudinary unsigned upload security considerations](https://support.cloudinary.com/hc/en-us/articles/360018796451) -- HIGH confidence
- [LGPD cookie compliance (CookieYes)](https://www.cookieyes.com/blog/brazils-data-protection-law-lgpd/) -- MEDIUM confidence
- [LGPD compliance guide](https://policygen.dev/blog/lgpd-compliance-guide) -- MEDIUM confidence
- [GitGuardian env secrets best practices](https://blog.gitguardian.com/secure-your-secrets-with-env/) -- HIGH confidence
- [Clerk basic RBAC with metadata](https://clerk.com/docs/guides/secure/basic-rbac) -- HIGH confidence
- [Tailwind CSS v4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide) -- HIGH confidence
- [Next.js 16 proxy.ts migration with auth (DEV Community)](https://dev.to/beyondit/nextjs-161-migration-refactoring-middlewarets-to-proxyts-without-breaking-auth-3kbh) -- MEDIUM confidence
- [Neon pricing/free tier 2026](https://vela.simplyblock.io/articles/neon-serverless-postgres-pricing-2026/) -- MEDIUM confidence
- [Next.js server actions security (MakerKit)](https://makerkit.dev/blog/tutorials/secure-nextjs-server-actions) -- MEDIUM confidence

---
*Pitfalls research for: Primor Holding institutional consulting website*
*Researched: 2026-03-11*
