# Roadmap: Primor Holding

## Overview

Primor Holding is an institutional consulting website that needs to convey authority and make it easy for visitors to get in touch. The roadmap moves from project scaffolding (database, auth, theme) through the public-facing site (the primary deliverable), then the admin CMS (so the owner can manage content without a developer), and finally deploy with SEO optimization. Four phases, each delivering a coherent, verifiable capability.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Scaffolding** - Project setup with Next.js 16, Prisma 7, Clerk v7, Docker, and visual theme (completed 2026-03-11)
- [x] **Phase 2: Public Site** - All public-facing pages, sections, contact flow, legal pages, and animations (completed 2026-03-11)
- [x] **Phase 3: Admin Panel** - Clerk-protected CMS with CRUD for services, testimonials, blog posts, and contacts (completed 2026-03-11)
- [ ] **Phase 4: Deploy & SEO** - GitHub repo, Vercel deploy, SEO meta tags, sitemap, and seed data

## Phase Details

### Phase 1: Foundation & Scaffolding
**Goal**: Developer can run the project locally with Docker, database is ready, admin routes are protected, and the visual identity is established
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06
**Success Criteria** (what must be TRUE):
  1. Running `docker compose up` starts PostgreSQL and the dev server responds at localhost with the base theme applied
  2. The `.gitignore` blocks all env files and secrets -- `git status` shows no sensitive files after initial setup
  3. Prisma schema has all five models (Service, Testimonial, BlogPost, Contact, SiteSettings) and `prisma db push` succeeds
  4. Navigating to `/admin` without authentication redirects to sign-in -- proxy.ts with Clerk v7 protects all admin routes
  5. Base UI components (Button, Card, Section wrapper) render with the dark blue theme and professional typography
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md -- Project scaffold, .gitignore, dependencies, Docker, config files, env template, CLAUDE.md
- [x] 01-02-PLAN.md -- Prisma schema (5 models), Clerk v7 proxy.ts, base UI components (Button, Card, Section)

### Phase 2: Public Site
**Goal**: A visitor can land on the site, learn about Primor Holding and its founder, browse services and testimonials, submit a contact form or tap WhatsApp, and find legal/privacy pages -- all with polished animations
**Depends on**: Phase 1
**Requirements**: SITE-01, SITE-02, SITE-03, SITE-04, SITE-05, SITE-06, SITE-07, SITE-08, SITE-09, SITE-10, SITE-11, SITE-12
**Success Criteria** (what must be TRUE):
  1. A visitor can scroll through the full homepage (Hero, Sobre, Servicos, Depoimentos, Contato) with smooth entrance animations as sections appear on scroll
  2. The contact form validates inputs, prevents spam via honeypot, saves to the database, and shows a success confirmation to the user
  3. A floating WhatsApp button is visible on every page and opens WhatsApp with the configured phone number
  4. Legal pages (Politica de Privacidade, Termos de Uso) are accessible from the footer, and a cookie consent banner appears on first visit with accept/reject that persists the choice
  5. Navigation bar is fixed at top with logo, anchor links to each section, and a CTA button that scrolls to contact
**Plans**: 3 plans

Plans:
- [ ] 02-01-PLAN.md -- Dependencies (framer-motion, zod), seed data, motion wrapper, Navbar, Footer, WhatsApp button, cookie banner, site layout
- [ ] 02-02-PLAN.md -- Homepage sections: HeroSection, AboutSection, ServicesSection, TestimonialsSection, page.tsx
- [ ] 02-03-PLAN.md -- Contact Server Action, ContactSection, legal pages (/privacidade, /termos), wire ContactSection into page.tsx

### Phase 3: Admin Panel
**Goal**: The site owner can sign in and manage all dynamic content (services, testimonials, blog posts, contacts) without developer help
**Depends on**: Phase 1, Phase 2
**Requirements**: ADMIN-01, ADMIN-02, ADMIN-03, ADMIN-04, ADMIN-05, ADMIN-06
**Success Criteria** (what must be TRUE):
  1. Admin can sign in at `/admin/sign-in` via Clerk and is redirected to a dashboard showing counts of services, testimonials, posts, and unread contacts
  2. Admin can create, edit, and delete services with image upload via Cloudinary -- changes are immediately visible on the public site
  3. Admin can create, edit, and delete testimonials with client photo upload -- changes are immediately visible on the public site
  4. Admin can create and edit blog posts with draft/published status (no public page in v1, content prepared for v2)
  5. Admin can view contact form submissions, see details, and mark messages as read/unread
**Plans**: 2 plans

Plans:
- [ ] 03-01-PLAN.md -- Cloudinary helper, admin layout + sign-in + dashboard, Services CRUD, Testimonials CRUD
- [ ] 03-02-PLAN.md -- Blog posts CRUD (draft/published), Contacts viewer with read/unread toggle

### Phase 4: Deploy & SEO
**Goal**: The site is live on Vercel, discoverable by search engines, and populated with initial content
**Depends on**: Phase 3
**Requirements**: DEPLOY-01, DEPLOY-02, DEPLOY-03, DEPLOY-04, DEPLOY-05
**Success Criteria** (what must be TRUE):
  1. GitHub repo at `00sth` is public with a descriptive README and zero secrets in the commit history
  2. The site is live on a Vercel URL with all environment variables configured and all pages loading correctly
  3. Sharing the site URL on social media shows correct OpenGraph preview (title, description, image)
  4. `/sitemap.xml` and `/robots.txt` are accessible and correctly generated by Next.js
  5. The database is seeded with 3 example services, 1 example testimonial, and default SiteSettings so the site looks complete on first deploy
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Scaffolding | 2/2 | Complete    | 2026-03-11 |
| 2. Public Site | 3/3 | Complete    | 2026-03-11 |
| 3. Admin Panel | 2/2 | Complete   | 2026-03-11 |
| 4. Deploy & SEO | 0/1 | Not started | - |
