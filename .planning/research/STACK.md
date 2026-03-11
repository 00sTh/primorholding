# Technology Stack

**Project:** Primor Holding -- Institutional Consulting Website
**Researched:** 2026-03-11

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js | 16.1.6 | Full-stack React framework | App Router, React 19.2, "use cache", React Compiler stable, Turbopack default. Already used in EmporioSite at this exact version. | HIGH |
| React | 19.2.x | UI library | Ships with Next.js 16. View Transitions, useEffectEvent, Activity API available. | HIGH |
| TypeScript | ^5.9 | Type safety | Strict mode. Next.js 16 has TypeScript-first defaults. | HIGH |
| Node.js | >=20.x | Runtime | Required by Next.js 16 + Clerk 7. Node 18 is minimum but 20+ recommended for LTS. | HIGH |

### Styling & UI

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Tailwind CSS | ^4.2 | Utility-first CSS | CSS-first configuration (no tailwind.config.js), automatic content detection, 70% smaller CSS output than v3. Already used in EmporioSite at v4. | HIGH |
| @tailwindcss/postcss | ^4.2 | PostCSS integration | Required for Next.js + Tailwind v4 pipeline. | HIGH |
| framer-motion | ^12.35 | Animations | Smooth scroll animations, page transitions, hover effects. Used across all dev's projects. De facto React animation library. | HIGH |
| lucide-react | ^0.577 | Icons | Consistent, tree-shakable icon set. Already used in all dev's projects. | HIGH |
| class-variance-authority | ^0.7.1 | Component variants | Type-safe variant management for buttons, cards, badges. Used in all dev's projects. | HIGH |
| clsx | ^2.1 | Class merging | Conditional class joining. Lightweight. | HIGH |
| tailwind-merge | ^3.5 | Tailwind class conflict resolution | Prevents `bg-blue bg-red` conflicts in component APIs. | HIGH |

### Database

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Prisma ORM | ^7.4 | Database ORM + migrations | New `prisma-client` generator, `prisma.config.ts` for connection config, type-safe queries. Proven in EmporioSite at 7.4.2. | HIGH |
| @prisma/adapter-neon | ^7.4 | Neon serverless adapter | Driver adapter connecting Prisma to Neon's serverless PostgreSQL. Required for Vercel serverless functions. | HIGH |
| @neondatabase/serverless | ^1.0 | Neon WebSocket driver | Underlying driver for Prisma adapter. Enables connection pooling over WebSockets on serverless. | HIGH |
| Neon PostgreSQL | -- (service) | Database | Serverless PostgreSQL. Free tier: 0.5 GB storage, autosuspend. Pooled + direct URLs. First-class Prisma support. | HIGH |

### Authentication

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @clerk/nextjs | ^7.0.4 | Admin-only auth | Hosted auth with pre-built UI, session management, role-based access. v7 is latest (released March 2026), supports Next.js 16 proxy.ts. | MEDIUM |

**IMPORTANT NOTE on @clerk/nextjs version:** Clerk v7 (7.0.4) was published very recently (March 2026). The dev's AltheiaSite uses @clerk/nextjs ^6.12.0 (resolves to 6.39.0) with Next.js 16 and still uses `middleware.ts` instead of `proxy.ts`. For PrimorHolding (greenfield), start with `@clerk/nextjs@^7.0` since it was designed for Next.js 16. If v7 shows instability during development, fall back to `@clerk/nextjs@^6.39` which is battle-tested with Next.js 16 on Vercel.

**Admin-only setup:** Only admin users authenticate. Public visitors are always anonymous. Configure in Clerk Dashboard:
- Public metadata: `{ "role": "admin" }` on admin user(s)
- JWT template: `{ "metadata": "{{user.public_metadata}}" }` in Sessions
- Protect `/admin/*` routes, leave everything else public

### Image Management

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| cloudinary | ^2.9 | Server-side upload SDK | Upload founder's photo, service images from admin panel. Direct URL storage in DB. | HIGH |
| next-cloudinary | ^7.x | CldImage component | Replaces next/image for Cloudinary-hosted images. Automatic format optimization, responsive sizes, no double-optimization. | MEDIUM |

**Upload pattern:** Admin uploads image via form -> Server Action calls `cloudinary.v2.uploader.upload_stream()` -> Store returned URL in database -> Render with `<CldImage>` or standard `<Image>`.

### Email (Contact Form)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| resend | ^4.x | Transactional email API | Simple API, React Email integration, 3,000 free emails/month. Contact form submissions sent to owner's email. | HIGH |
| @react-email/components | ^1.x | Email templates | Write email templates as React components. Type-safe, styled. | HIGH |

**Alternative considered:** nodemailer. Rejected because Resend has better DX, no SMTP config needed, and the free tier is generous enough for a consulting contact form (likely <100 emails/month).

### Form Validation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| zod | ^4.3.6 | Schema validation | 14x faster string parsing vs v3, 57% smaller bundle. Zod Mini available at ~1.9KB gzipped. Used in EmporioSite at v4.3.6. | HIGH |

**Note:** Zod v4 is a major version with breaking changes from v3. The dev's EmporioSite already uses v4.3.6. AltheiaSite uses v3.24.1. For this new project, use v4 from the start.

### Toast Notifications

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| sonner | ^2.0 | Toast notifications | Minimal API (no hooks needed), accessible (ARIA + keyboard), smooth animations, works with Server Components. | HIGH |

### LGPD Compliance

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Custom implementation | -- | Cookie consent banner | Build a lightweight cookie consent component in-house. Third-party SaaS solutions (CookieYes, SecurePrivacy) are overkill for a consulting site with minimal cookies. | MEDIUM |

**LGPD requirements for this site:**
1. **Cookie consent banner** -- Granular consent per category (essential, analytics, marketing). Cannot force acceptance. Opt-out must be as easy as opt-in.
2. **Privacy policy page** (`/privacidade`) -- What data is collected, why, how long retained, who has access, data subject rights.
3. **Terms of use page** (`/termos`) -- Site usage terms.
4. **Contact form disclosure** -- Inform what happens with submitted data.
5. **Data retention** -- Contact form submissions should have a defined retention period.

**Cookies this site will use:**
- Essential: Clerk session (admin only), LGPD consent preference
- Analytics: Google Analytics (if added later -- v2)
- Marketing: None planned

Since the site only sets essential cookies for admin auth (Clerk) and consent preference, the consent banner is straightforward. Build it as a React component with localStorage to remember preference. No third-party consent library needed.

### Infrastructure & Dev Tools

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Docker Compose | -- | Local dev environment | PostgreSQL + pgAdmin locally. Eliminates "works on my machine" issues. Only for dev, NOT for production (Vercel handles that). | HIGH |
| pnpm | ^9.x | Package manager | Faster installs, strict dependency resolution, disk-efficient. Used across all dev's projects. | HIGH |
| sharp | ^0.34 | Image optimization | Required by Next.js for production image optimization. Auto-installed on Vercel but needed locally. | HIGH |
| dotenv | ^17.x | Environment variables | Load .env.local in prisma.config.ts. Prisma 7 needs explicit dotenv loading in config file. | HIGH |
| tsx | ^4.21 | TypeScript execution | Run seed scripts and utilities without compiling. `prisma/seed.ts` execution. | HIGH |

### Deployment

| Technology | Purpose | Why | Confidence |
|------------|---------|-----|------------|
| Vercel | Hosting + CDN | Native Next.js 16 support, automatic deployments from GitHub, preview deploys per PR, edge network. Zero config for Next.js. | HIGH |
| GitHub (public repo) | Source control | Public repo under 00sth account. All secrets in Vercel env vars + .env.local (gitignored). | HIGH |

## Critical Configuration Details

### proxy.ts (NOT middleware.ts)

Next.js 16 renamed `middleware.ts` to `proxy.ts` and the exported function from `middleware` to `proxy`. This is a breaking change. The old name still works but is deprecated and will be removed.

**For PrimorHolding (greenfield):** Use `proxy.ts` from the start. Do NOT copy the `middleware.ts` pattern from AltheiaSite.

```typescript
// src/proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export function proxy(request) {
  // Clerk handles auth
  return clerkMiddleware((auth, req) => {
    if (isAdminRoute(req)) {
      auth().protect(); // Requires sign-in
    }
  })(request);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc|__clerk)(.*)",
  ],
};
```

**CAVEAT:** AltheiaSite's CLAUDE.md says "keep as `src/middleware.ts` -- renaming breaks Vercel deploy." This was likely true for their specific Clerk v6 setup. For Clerk v7 + new project, `proxy.ts` is the correct choice. If Vercel deploy issues arise, this is the first thing to check.

### Prisma 7 Configuration

**prisma.config.ts** (project root):
```typescript
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config({ path: ".env.local" });
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    url: process.env["DIRECT_URL"] || process.env["DATABASE_URL"],
  },
});
```

**schema.prisma** (generator):
```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

**Import path:** Always `@/generated/prisma/client` (NOT `@prisma/client`).

**Neon URLs:**
- `DATABASE_URL` = pooled connection (with `-pooler` in hostname) -- for the app
- `DIRECT_URL` = direct connection (without `-pooler`) -- for Prisma CLI (migrate, push)

### Tailwind v4 CSS-First Config

No `tailwind.config.js`. Configure in `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-navy: #0F2443;
  --color-navy-light: #1A3A66;
  --color-navy-dark: #0A1628;
  --color-gold: #C9A227;
  --color-gold-light: #D4B84A;
  --color-cream: #FBF8F1;
  --color-white: #FFFFFF;
  --font-heading: "Playfair Display", serif;
  --font-body: "Geist Sans", sans-serif;
}
```

### Docker Compose (dev only)

```yaml
version: "3.8"
services:
  postgres:
    image: postgres:17
    environment:
      POSTGRES_USER: primor
      POSTGRES_PASSWORD: primor_dev
      POSTGRES_DB: primor_holding
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@primor.dev
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres

volumes:
  pgdata:
```

When using Docker locally, set `DATABASE_URL=postgresql://primor:primor_dev@localhost:5432/primor_holding` and `DIRECT_URL` to the same value (no pooler needed locally).

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 16 | Astro, Remix | Stack is decided. Next.js 16 is the team's expertise across 4 projects. |
| ORM | Prisma 7 | Drizzle ORM | Stack is decided. Prisma 7 with Neon adapter is proven in EmporioSite. Drizzle has better raw SQL ergonomics but dev has 4 projects of Prisma expertise. |
| Auth | Clerk v7 | NextAuth/Auth.js, Lucia | Stack is decided. Clerk provides hosted UI, admin roles via metadata, minimal setup. Admin-only auth means Clerk's free tier (10K MAU) is more than enough. |
| CSS | Tailwind v4 | CSS Modules, styled-components | Stack is decided. Tailwind v4 is faster, smaller, and the team standard. |
| Email | Resend | nodemailer, SendGrid | Resend: modern DX, React Email templates, generous free tier. nodemailer requires SMTP server config. SendGrid has worse DX for simple use cases. |
| Validation | Zod v4 | Valibot, Yup | Zod v4 is 14x faster, 57% smaller. De facto standard in Next.js ecosystem. Already used in dev's projects. |
| Toast | sonner | react-hot-toast, radix-toast | sonner: simplest API, no hook setup, accessible by default. react-hot-toast is lighter but less accessible. radix-toast requires more boilerplate. |
| Cookie Consent | Custom | CookieYes, Osano, SecurePrivacy | SaaS consent managers are overkill for a site with 1-2 cookie categories. Custom component is ~50 lines of code with localStorage. |
| Images | Cloudinary | Vercel Blob, uploadthing | Stack is decided. Cloudinary has CDN + transformations. Vercel Blob requires public store for public images (gotcha from AltheiaSite). |
| Animations | framer-motion | GSAP, CSS transitions | framer-motion: React-native API, layout animations, exit animations. GSAP has licensing concerns for commercial use. CSS transitions lack orchestration. |

## What NOT to Use

| Technology | Reason |
|------------|--------|
| shadcn/ui | Adds unnecessary complexity for an institutional site. Build 4-5 custom components (Button, Card, Input, Dialog) instead of importing a component library. The site has ~10 pages with simple layouts -- not a complex app. |
| Radix UI primitives | Same reasoning. The admin panel needs basic CRUD forms, not complex accessible widgets. Keep dependencies minimal. |
| next-themes | Only useful for dark/light mode toggle. An institutional consulting site should have ONE consistent professional theme. No toggle. |
| @prisma/accelerate | Adds caching layer. Unnecessary for a low-traffic consulting site. Neon's pooler handles connection management. |
| Stripe/payment libs | Out of scope per PROJECT.md. No e-commerce. |
| next-intl | No internationalization needed. Portuguese-only site. |
| next-auth / Auth.js | Clerk is decided. Don't mix auth solutions. |
| React Query / SWR | Server Components + Server Actions handle all data fetching. No client-side data fetching needed for this site. |

## Installation

```bash
# Core
pnpm add next@16.1.6 react@19.2.3 react-dom@19.2.3

# Database
pnpm add @prisma/adapter-neon@^7.4 @neondatabase/serverless@^1.0 dotenv@^17

# Auth
pnpm add @clerk/nextjs@^7.0

# Styling & UI
pnpm add framer-motion@^12.35 lucide-react@^0.577 class-variance-authority@^0.7.1 clsx@^2.1 tailwind-merge@^3.5

# Images
pnpm add cloudinary@^2.9 next-cloudinary@^7

# Email
pnpm add resend@^4 @react-email/components@^1

# Validation & UX
pnpm add zod@^4.3 sonner@^2.0

# Dev dependencies
pnpm add -D prisma@^7.4 tailwindcss@^4 @tailwindcss/postcss@^4 @types/node@^20 @types/react@^19 @types/react-dom@^19 typescript@^5.9 tsx@^4.21 sharp@^0.34
```

## Environment Variables (.env.example)

```bash
# Database (Neon)
DATABASE_URL="postgresql://user:pass@host-pooler.neon.tech/dbname?sslmode=require"
DIRECT_URL="postgresql://user:pass@host.neon.tech/dbname?sslmode=require"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/admin/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/admin/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/admin"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/admin"

# Cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Email (Resend)
RESEND_API_KEY=""
CONTACT_EMAIL=""  # Where contact form submissions go

# Site
NEXT_PUBLIC_SITE_URL="https://primorholding.com.br"
```

## Sources

### Official Documentation
- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16)
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js proxy.ts Migration](https://nextjs.org/docs/messages/middleware-to-proxy)
- [Clerk Next.js Quickstart](https://clerk.com/docs/nextjs/getting-started/quickstart)
- [Clerk Middleware Reference](https://clerk.com/docs/reference/nextjs/clerk-middleware)
- [Prisma Config Reference](https://www.prisma.io/docs/orm/reference/prisma-config-reference)
- [Neon + Prisma Guide](https://neon.com/docs/guides/prisma)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4)
- [Cloudinary Next.js Upload Tutorial](https://cloudinary.com/documentation/upload_assets_in_nextjs_tutorial)
- [Resend + Next.js](https://resend.com/docs/send-with-nextjs)
- [Zod v4 Release Notes](https://zod.dev/v4)

### Community / Secondary
- [Prisma 7 Configuration Guide (Medium)](https://medium.com/@gargdev010300/how-i-configured-prisma-7-new-changes-issues-and-how-i-solved-them-d5ca728c5b9f)
- [LGPD Cookie Banner Requirements](https://secureprivacy.ai/blog/lgpd-cookie-banner-requirements)
- [LGPD Compliance for Websites](https://lawwwing.com/en/is-your-website-lgpd-compliant-a-guide-for-digital-businesses-in-brazil/)
- [Next.js 16 proxy.ts Migration Guide](https://www.rabinarayanpatra.com/blogs/hello-proxy-ts-nextjs-16)

### Dev's Existing Projects (proven patterns)
- EmporioSite: Next.js 16.1.6, Prisma 7.4.2, Zod 4.3.6, Tailwind v4, Cloudinary, framer-motion 12.35.2
- AltheiaSite: Next.js 16.x, Prisma 6.x, Clerk 6.39.0, Zod 3.24.1, Tailwind v4, Cloudinary, framer-motion 12.34.3
