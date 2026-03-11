# Research Summary: Primor Holding

**Domain:** Institutional consulting/holding website
**Researched:** 2026-03-11
**Overall confidence:** HIGH

## Executive Summary

Primor Holding is an institutional website for a Brazilian consulting firm (estrategia, gestao, reestruturacao empresarial) led by Joao Antonio Lopes Correa. The site serves as a professional showcase and lead capture channel -- visitors discover services, build trust through the founder's credibility and client testimonials, then convert via contact form or WhatsApp. There is no e-commerce, no client login, and no complex interactive features. The admin panel enables the owner to manage all content without developer assistance.

The technology stack is fully decided and aligns with the developer's proven toolkit across four existing projects (AltheiaSite, EmporioSite, ProjetoElearning, ProjetoSiteRelogios). The primary research finding is that all chosen technologies have recent major versions (Next.js 16, Prisma 7, Clerk v7, Tailwind v4, Zod v4) with breaking changes from their predecessors. The developer's most recent project (EmporioSite) already runs the exact versions recommended here -- Next.js 16.1.6, Prisma 7.4.2, Zod 4.3.6 -- providing battle-tested reference implementations.

The highest-risk area is the Next.js 16 `proxy.ts` rename (from `middleware.ts`) combined with Clerk v7's very recent release (March 11, 2026). The developer's existing projects still use `middleware.ts` with Clerk v6. For this greenfield project, using `proxy.ts` from day one is the correct approach, with a documented fallback to `middleware.ts` + Clerk v6.39 if v7 shows instability.

The simplest dimension is infrastructure: Neon free tier, Vercel Hobby, Cloudinary free tier, and Resend free tier are all more than sufficient for a consulting firm website. Scalability is a non-concern. The site will have tens of database rows, not millions.

## Key Findings

**Stack:** Next.js 16.1.6 + Prisma 7.4 (Neon adapter) + Clerk v7 + Tailwind v4 + Cloudinary + Resend + Zod v4 + framer-motion 12.x + Docker dev / Vercel prod. All versions proven in dev's recent projects except Clerk v7 (very new).

**Architecture:** Single Next.js app with two route groups: `(site)` for public pages (Server Components, zero client JS for static content) and `admin/` for Clerk-protected CMS (Server Actions for all mutations). SiteSettings singleton pattern for editable global content.

**Critical pitfall:** `proxy.ts` vs `middleware.ts` naming in Next.js 16 + Clerk v7 compatibility. Start with `proxy.ts`, have `middleware.ts` fallback documented. Second critical pitfall: Prisma 7 import path and `prisma.config.ts` -- must be correct from first commit.

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Foundation & Scaffolding** - Set up project, Docker, Prisma 7, Clerk v7, proxy.ts, theme config
   - Addresses: Project setup, database schema, auth, Docker dev environment
   - Avoids: Prisma 7 config mistakes, secret exposure in public repo, proxy.ts confusion
   - This phase has the most pitfalls. Get it right and everything else is straightforward.

2. **Public Site** - Build all public-facing pages with Server Components
   - Addresses: Hero, About, Services, Testimonials, Contact form, WhatsApp button, legal pages, cookie banner, SEO
   - Avoids: Client-side data fetching anti-pattern, Prisma serialization issues
   - Largest feature surface. Data comes from seed or hardcoded defaults until admin panel is ready.

3. **Admin Panel** - Clerk-protected CMS for managing all content
   - Addresses: Services CRUD, Testimonials CRUD, Contacts viewer, Blog posts CRUD, Site settings, Cloudinary image upload
   - Avoids: Server Action auth bypass, unsigned Cloudinary uploads
   - Depends on Foundation phase for Clerk setup and Prisma schema.

4. **Polish & Compliance** - Animations, performance, LGPD finalization, deploy
   - Addresses: framer-motion animations, Core Web Vitals, cookie consent enforcement, final privacy policy (needs CNPJ), error handling
   - Avoids: LGPD non-compliance, poor performance scores
   - CNPJ is pending per PROJECT.md -- legal pages must be finalized when available.

**Phase ordering rationale:**
- Foundation first because every other phase depends on the database, auth, and project config being correct. Prisma 7 and proxy.ts are the riskiest unknowns.
- Public site before admin panel because the public pages are the primary deliverable (the owner needs a website visible to clients). Admin CMS enhances the site but is not the first thing visitors see.
- Admin panel after public site because the admin CRUD depends on understanding exactly what fields each public section needs. Building the admin first risks mismatched schemas.
- Polish last because animations and fine-tuning should happen on a functional site, not on scaffolding.

**Research flags for phases:**
- Phase 1: Needs careful validation of Clerk v7 + proxy.ts compatibility. If it fails, documented fallback exists.
- Phase 2: Standard patterns, well-documented in Next.js docs. Low risk.
- Phase 3: Admin panel patterns proven in AltheiaSite and EmporioSite. Medium risk only from Clerk v7 role checking.
- Phase 4: LGPD compliance needs real legal review (not just dev implementation). CNPJ dependency blocks legal page finalization.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies verified in dev's existing projects. Versions confirmed via npm and official docs. Only Clerk v7 is new (released today). |
| Features | HIGH | Requirements clearly defined in PROJECT.md. Feature landscape is simple for an institutional site. |
| Architecture | HIGH | Patterns directly borrowed from EmporioSite (Prisma 7, Neon) and AltheiaSite (Clerk, admin panel). Proven at this exact stack. |
| Pitfalls | HIGH | Most pitfalls sourced from dev's existing project gotchas (CLAUDE.md, MEMORY.md) + official migration guides. |
| LGPD Compliance | MEDIUM | Technical implementation is clear, but legal content (privacy policy wording, data retention periods) needs legal review. CNPJ is pending. |
| Clerk v7 Stability | LOW | Released today (March 11, 2026). No production track record. Fallback to v6.39 documented. |

## Gaps to Address

- **Clerk v7 proxy.ts integration:** Needs hands-on validation during Phase 1. No community reports exist yet since v7 was released today.
- **CNPJ for legal pages:** Pending from client. Privacy policy and terms of use cannot be finalized without it.
- **Resend email templates:** Specific email design for contact form notifications not researched. Standard react-email patterns apply.
- **Google Analytics integration:** Deferred to v2. When added, must be gated behind LGPD cookie consent.
- **next-cloudinary version:** Listed as ^7.x based on npm search. Exact API for Next.js 16 compatibility should be verified during implementation.
- **Docker hot-reload with Next.js:** The Docker compose setup provides PostgreSQL only (not the Next.js app). `pnpm dev` runs on the host. If full Docker dev is desired later, volume mounting and node_modules isolation need research.
