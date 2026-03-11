# Phase 1: Foundation & Scaffolding - Research

**Researched:** 2026-03-11
**Domain:** Next.js 16 project scaffolding, Prisma 7 + Neon, Clerk v7, Docker dev, Tailwind v4 theming
**Confidence:** HIGH

## Summary

Phase 1 establishes the entire development foundation for PrimorHolding -- a Brazilian consulting firm's institutional website. Every subsequent phase depends on the decisions and configurations made here: the project scaffold, database schema, auth protection, Docker dev environment, .gitignore for the public repo, and the visual design system.

The stack is fully decided and proven across the developer's existing projects. The primary sources of truth are EmporioSite (Next.js 16.1.6, Prisma 7.4.2, Neon adapter, Tailwind v4) and AltheiaSite (Clerk v6 + admin panel + security headers). This phase must combine patterns from both while adopting two changes: (1) Clerk v7 instead of v6, and (2) `proxy.ts` instead of `middleware.ts`.

The highest risk in this phase is the Clerk v7 + `proxy.ts` integration. Clerk v7 was released on March 11, 2026 -- the same day research was conducted. The official Clerk docs confirm `proxy.ts` support with `export default clerkMiddleware()`, but no community production experience exists yet. A documented fallback to `middleware.ts` + Clerk v6.39 is essential.

**Primary recommendation:** Follow EmporioSite patterns exactly for Prisma 7, Neon adapter, and Tailwind v4. Use `proxy.ts` with `export default clerkMiddleware()` for Clerk v7 auth. Create `.gitignore` as the very first file before any other content.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Next.js 16 scaffolded with TypeScript, Tailwind v4, Prisma 7, Docker Compose (PostgreSQL local) | Standard Stack section: exact versions, installation commands, Docker Compose config, Prisma 7 config files. All verified from EmporioSite working project. |
| FOUND-02 | .gitignore configured before any commit -- no env, secret, or API key leaks in public repo | Pitfalls section (Pitfall 4): comprehensive .gitignore template, .env.example pattern, prisma.config.ts safety. |
| FOUND-03 | .env.example with all required fields (no real values) and CLAUDE.md documented | Standard Stack section: full .env.example template. Architecture Patterns: CLAUDE.md structure based on existing project conventions. |
| FOUND-04 | proxy.ts configured with Clerk v7 protecting /admin/* routes | Architecture Patterns (Proxy Setup): verified proxy.ts API from official Next.js 16 docs + Clerk docs. Fallback to middleware.ts documented. |
| FOUND-05 | Prisma schema with models: Service, Testimonial, BlogPost, Contact, SiteSettings | Architecture Patterns (Prisma Schema): complete schema with indexes, table mappings, and field types. Verified against EmporioSite Prisma 7 patterns. |
| FOUND-06 | Visual theme configured -- dark blue (#0A1628), professional typography, base components (Button, Card, Section) | Architecture Patterns (Theme & Components): Tailwind v4 CSS-first config, CVA-based component patterns from AltheiaSite. |
</phase_requirements>

## Standard Stack

### Core (Phase 1 Only)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | Full-stack React framework | Exact version from EmporioSite. App Router, React 19.2, Turbopack default. |
| react | 19.2.3 | UI library | Ships with Next.js 16.1.6. |
| react-dom | 19.2.3 | DOM renderer | Ships with Next.js 16.1.6. |
| typescript | ^5.9 | Type safety | Strict mode. Next.js 16 TypeScript-first defaults. |
| @clerk/nextjs | ^7.0.4 | Admin auth protection | Latest version, supports proxy.ts. Released 2026-03-11. |
| @prisma/adapter-neon | ^7.4.2 | Neon serverless adapter | Prisma 7 driver adapter for Neon PostgreSQL. Pin to 7.4.2 (EmporioSite proven). |
| @neondatabase/serverless | ^1.0.2 | Neon WebSocket driver | Underlying driver for Prisma adapter. |
| dotenv | ^17.3.1 | Env vars in prisma.config.ts | Prisma 7 requires explicit dotenv loading. |
| tailwindcss | ^4.2 | Utility-first CSS | CSS-first config (no tailwind.config.js). |
| @tailwindcss/postcss | ^4.2 | PostCSS integration | Required for Next.js + Tailwind v4 pipeline. |
| class-variance-authority | ^0.7.1 | Component variants | Type-safe variant management for Button, Card. |
| clsx | ^2.1.1 | Class merging | Conditional class joining. |
| tailwind-merge | ^3.5.0 | Tailwind class conflict resolution | Prevents conflicting Tailwind classes in component APIs. |
| lucide-react | ^0.577.0 | Icons | Tree-shakable icon set. Used across all dev projects. |

### Dev Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| prisma | ^7.4.2 | Prisma CLI (generate, db push) |
| @types/node | ^20 | Node.js type definitions |
| @types/react | ^19 | React type definitions |
| @types/react-dom | ^19 | React DOM type definitions |
| tsx | ^4.21.0 | TypeScript execution for seed scripts |
| sharp | ^0.34 | Image optimization (Next.js requirement) |

### NOT Needed in Phase 1

| Library | When to Add | Why Deferred |
|---------|-------------|--------------|
| framer-motion | Phase 2 (SITE-12) | No animations in scaffolding |
| cloudinary / next-cloudinary | Phase 3 (ADMIN-03) | No image uploads until admin panel |
| resend / @react-email/components | Phase 2 (SITE-07) | No contact form in Phase 1 |
| zod | Phase 2 (SITE-07) | No form validation in Phase 1 |
| sonner | Phase 2+ | No toast notifications in scaffolding |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @clerk/nextjs ^7.0.4 | @clerk/nextjs ^6.39.0 | v6.39 is battle-tested with Next.js 16 (AltheiaSite). Requires middleware.ts not proxy.ts. Use as fallback if v7 shows instability. |
| proxy.ts | middleware.ts | middleware.ts still works in Next.js 16 with deprecation warning. Use as fallback. |
| PrismaNeon adapter everywhere | Direct PrismaClient for Docker dev | PrismaNeon works with any PostgreSQL connection string, including Docker. One code path for dev and prod is cleaner than maintaining two. |

**Installation:**
```bash
# Initialize project
pnpm create next-app@16.1.6 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack

# Database
pnpm add @prisma/adapter-neon@^7.4.2 @neondatabase/serverless@^1.0.2 dotenv@^17.3.1

# Auth
pnpm add @clerk/nextjs@^7.0.4

# Styling & UI utilities
pnpm add class-variance-authority@^0.7.1 clsx@^2.1.1 tailwind-merge@^3.5.0 lucide-react@^0.577.0

# Dev dependencies
pnpm add -D prisma@^7.4.2 tsx@^4.21.0 sharp@^0.34 @types/node@^20 @types/react@^19 @types/react-dom@^19
```

## Architecture Patterns

### Project Structure (Phase 1 Scope)

```
PrimorHolding/
  .gitignore                        # FIRST FILE -- before any content
  .env.example                      # Template for .env.local (committed)
  .env.local                        # Secrets (gitignored)
  CLAUDE.md                         # Project documentation for Claude
  docker-compose.yml                # PostgreSQL for local dev
  prisma.config.ts                  # Prisma 7 CLI config
  next.config.ts                    # Next.js 16 config
  postcss.config.mjs                # PostCSS + Tailwind v4
  tsconfig.json                     # TypeScript (strict)
  package.json                      # Dependencies + scripts

  prisma/
    schema.prisma                   # Database models (5 models)

  src/
    proxy.ts                        # Clerk v7 auth + security headers

    app/
      layout.tsx                    # Root: ClerkProvider, fonts, metadata
      globals.css                   # Tailwind v4 + theme variables
      page.tsx                      # Placeholder landing page (theme demo)
      not-found.tsx                 # Custom 404

      (site)/                       # Route group (stub layout for Phase 2)
        layout.tsx                  # Stub: will hold Navbar + Footer later

      admin/                        # Protected admin routes
        page.tsx                    # Stub: "Admin Dashboard coming soon"

    components/
      ui/                           # Base UI components
        button.tsx                  # Button with CVA variants
        card.tsx                    # Card component
        section.tsx                 # Section wrapper component

    lib/
      prisma.ts                     # Prisma client singleton + Neon adapter
      utils.ts                      # cn(), slugify(), formatDate()
      constants.ts                  # Theme colors, company info

    generated/
      prisma/                       # Prisma generated client (gitignored)
```

### Pattern 1: proxy.ts with Clerk v7

**What:** Auth protection using Next.js 16 proxy.ts convention with Clerk v7's `clerkMiddleware`.
**When:** Every request. Admin routes require authentication + admin role.
**Verified:** Next.js 16 official docs confirm `proxy.ts` accepts both named `proxy` export and default export. Clerk docs confirm `export default clerkMiddleware()` works in `proxy.ts`.

```typescript
// src/proxy.ts
// Source: https://clerk.com/docs/reference/nextjs/clerk-middleware
//       + https://nextjs.org/docs/app/api-reference/file-conventions/proxy
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  return response;
}

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return withSecurityHeaders(
        NextResponse.redirect(new URL("/sign-in?redirect_url=/admin", req.url))
      );
    }
    const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;
    if (role !== "admin") {
      return withSecurityHeaders(
        NextResponse.redirect(new URL("/", req.url))
      );
    }
  }
  return withSecurityHeaders(NextResponse.next());
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

**FALLBACK:** If Clerk v7 fails during implementation:
1. Install `@clerk/nextjs@^6.39.0` instead
2. Keep `proxy.ts` filename and `export default clerkMiddleware()` (same API)
3. If Vercel deploy fails, rename to `middleware.ts` (AltheiaSite proven pattern)

### Pattern 2: Prisma 7 Configuration (Proven from EmporioSite)

**What:** Three files required for Prisma 7: `prisma.config.ts`, `prisma/schema.prisma`, `src/lib/prisma.ts`.
**Verified:** Exact pattern copied from `/home/sth/EmporioSite/` -- working in production.

```typescript
// prisma.config.ts (project root)
// Source: EmporioSite/prisma.config.ts (working)
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

```typescript
// src/lib/prisma.ts
// Source: EmporioSite/src/lib/prisma.ts (working)
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL!;
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

// 5 models: SiteSettings, Service, Testimonial, BlogPost, Contact
```

### Pattern 3: Tailwind v4 CSS-First Theme

**What:** All theme tokens defined in `globals.css` using `@theme` directive. No `tailwind.config.js`.
**Verified:** EmporioSite uses identical pattern with different colors.

```css
/* src/app/globals.css */
@import "tailwindcss";

@font-face {
  font-family: "Playfair Display";
  font-style: normal;
  font-weight: 400 900;
  font-display: swap;
  src: url("https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTXtfA.woff2")
    format("woff2");
}

:root {
  --navy-dark: #0A1628;
  --navy: #0F2443;
  --navy-light: #1A3A66;
  --gold: #C9A227;
  --gold-light: #D4B84A;
  --cream: #FBF8F1;
  --white: #FFFFFF;
  --slate: #94A3B8;
  --border-gold: rgba(201, 162, 39, 0.2);
}

@theme inline {
  --color-background: var(--navy-dark);
  --color-foreground: var(--cream);
  --color-navy-dark: var(--navy-dark);
  --color-navy: var(--navy);
  --color-navy-light: var(--navy-light);
  --color-gold: var(--gold);
  --color-gold-light: var(--gold-light);
  --color-cream: var(--cream);
  --color-slate: var(--slate);
  --font-sans: "Geist Sans", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Playfair Display", Georgia, serif;
}

body {
  background-color: var(--navy-dark);
  color: var(--cream);
  font-family: "Geist Sans", ui-sans-serif, system-ui, sans-serif;
}

.font-serif {
  font-family: "Playfair Display", Georgia, serif;
}

.text-gradient-gold {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gold-glow {
  box-shadow: 0 0 20px rgba(201, 162, 39, 0.15),
    0 0 60px rgba(201, 162, 39, 0.05);
}

::selection {
  background-color: rgba(201, 162, 39, 0.3);
  color: var(--cream);
}
```

### Pattern 4: CVA-Based UI Components (No shadcn/ui)

**What:** Build Button, Card, and Section components with CVA. No component library.
**Why:** STACK.md explicitly excludes shadcn/ui and Radix primitives. Simple institutional site needs only 3-5 components.
**Adapted from:** AltheiaSite's button.tsx but simplified (no Radix Slot dependency).

```typescript
// src/components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gold text-navy-dark hover:bg-gold-light font-semibold",
        secondary: "border border-gold/30 text-gold hover:bg-gold/10",
        ghost: "text-cream hover:bg-white/5",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-base",
        lg: "h-13 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
```

### Pattern 5: Docker Compose (PostgreSQL Only)

**What:** Docker provides only PostgreSQL. Next.js runs on host with `pnpm dev`.
**Why:** Avoids volume mounting complexity and node_modules platform-specific binary issues.

```yaml
# docker-compose.yml
services:
  db:
    image: postgres:17-alpine
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: primor
      POSTGRES_PASSWORD: primor_dev
      POSTGRES_DB: primor_holding
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### Pattern 6: Root Layout with ClerkProvider

**What:** Root layout wraps entire app with ClerkProvider. Fonts loaded via next/font.
**Adapted from:** AltheiaSite's layout.tsx.

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Primor Holding - Consultoria Empresarial",
    template: "%s | Primor Holding",
  },
  description: "Consultoria empresarial de excelencia. Estrategia, gestao e reestruturacao para impulsionar o crescimento do seu negocio.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Primor Holding",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body className="font-sans antialiased">{/* ClerkProvider wraps children */}
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
```

### Anti-Patterns to Avoid

- **API routes for CRUD:** Use Server Actions in `src/actions/`. API routes only for external webhooks.
- **Client-side data fetching on public pages:** Fetch in Server Components. Data is in HTML from first byte.
- **Separate dev/prod Prisma client code:** PrismaNeon adapter works with any PostgreSQL (Docker included). One code path.
- **Dynamic imports in proxy.ts:** Always static imports for Clerk. Known Clerk requirement.
- **Storing images in database:** Upload to Cloudinary, store URL string (not in Phase 1 but sets precedent).
- **middleware.ts in a greenfield Next.js 16 project:** Use proxy.ts from day one.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Class merging with Tailwind conflicts | Custom class merger | `cn()` via `clsx` + `tailwind-merge` | Handles `bg-blue bg-red` conflicts, conditional classes |
| Component variant management | Manual className strings | `class-variance-authority` (CVA) | Type-safe, prevents invalid variant combinations |
| Prisma connection management in serverless | Manual connection pool | PrismaNeon adapter + globalThis singleton | Handles WebSocket pooling, connection reuse, hot-reload safety |
| Auth session management | Custom cookie/JWT auth | Clerk v7 | Hosted auth UI, session management, role-based access in 10 lines |
| PostCSS + Tailwind integration | Manual PostCSS config | `@tailwindcss/postcss` plugin | Automatic content detection, CSS-first config |

## Common Pitfalls

### Pitfall 1: proxy.ts Export Name Confusion

**What goes wrong:** The developer exports `function proxy()` as a named export, but Clerk's `clerkMiddleware()` is meant to be the default export. Or the developer copies AltheiaSite's `export default clerkMiddleware(...)` in a file named `middleware.ts`.
**Why it happens:** Next.js 16 docs show `export function proxy()`. Clerk docs show `export default clerkMiddleware()`. Both are valid -- Next.js accepts default OR named `proxy`. But mixing patterns is confusing.
**How to avoid:** Use `export default clerkMiddleware(...)` in `proxy.ts`. This is what Clerk's official docs demonstrate for Next.js 16. The file is named `proxy.ts`, the export is a default.
**Warning signs:** Console deprecation warning about `middleware.ts`. Clerk error: "auth() was called but Clerk can't detect usage of clerkMiddleware()".

### Pitfall 2: Prisma 7 Generator Provider Name

**What goes wrong:** Using `provider = "prisma-client-js"` (Prisma 6 name) instead of `provider = "prisma-client"` (Prisma 7 name). The `prisma generate` command fails silently or produces incorrect output.
**Why it happens:** Every Prisma tutorial before 2026, and the developer's older projects, use `prisma-client-js`.
**How to avoid:** Copy generator block verbatim from EmporioSite's working schema. Verify `prisma generate` succeeds and `src/generated/prisma/` directory is populated.
**Warning signs:** `prisma generate` fails. TypeScript cannot resolve `PrismaClient` type from `@/generated/prisma/client`.

### Pitfall 3: Secrets in Public Repository

**What goes wrong:** Accidentally committing `.env.local`, `prisma.config.ts` with hardcoded URLs, or any Clerk/Cloudinary secret to the public GitHub repo.
**Why it happens:** `.gitignore` not created before the first `git add .`. New project setup is the highest-risk moment.
**How to avoid:** `.gitignore` must be the FIRST file created, before any other file. Include: `.env*`, `!.env.example`, `src/generated/`, `node_modules/`, `.next/`. Verify with `git status` before every commit.
**Warning signs:** `.env.local` appears in `git status`. GitHub secret scanning alert email.

### Pitfall 4: Missing prisma.config.ts

**What goes wrong:** Without `prisma.config.ts`, Prisma 7 CLI cannot find the database URL. `prisma db push` and `prisma generate` fail. The developer then hardcodes the URL in `schema.prisma` (which is committed to the public repo).
**Why it happens:** `prisma.config.ts` is new in Prisma 7. No older project has it.
**How to avoid:** Create `prisma.config.ts` at project root. It reads from `process.env` only (never hardcoded values). It loads `.env.local` via dotenv before accessing env vars. Do NOT add `url` to the `datasource` block in `schema.prisma`.
**Warning signs:** `prisma db push` error: "datasource url not found". Developer adds `url = env("DATABASE_URL")` to schema.prisma (wrong in Prisma 7 with adapter pattern).

### Pitfall 5: Docker PostgreSQL vs Neon Connection Strings

**What goes wrong:** Developer uses Docker locally with `postgresql://primor:primor_dev@localhost:5432/primor_holding` but the PrismaNeon adapter expects a Neon connection string format. Or developer uses Neon URLs locally and Docker is unused.
**Why it happens:** Confusion about which connection string goes where and whether PrismaNeon works with non-Neon databases.
**How to avoid:** PrismaNeon adapter works with ANY PostgreSQL connection string. Use Docker URL for local dev. Use Neon URLs for production (via Vercel env vars). Same `prisma.ts` code for both.
**Warning signs:** "PrismaNeon: failed to connect" with Docker URL (should not happen -- if it does, check that Docker is running).

### Pitfall 6: Tailwind v4 Config Confusion

**What goes wrong:** Developer creates `tailwind.config.js` or `tailwind.config.ts` (Tailwind v3 pattern). Tailwind v4 ignores these files. Theme tokens don't work.
**Why it happens:** Every Tailwind tutorial before v4 uses config files. v4 uses CSS-first `@theme` directive in `globals.css`.
**How to avoid:** No config file. All theme customization in `globals.css` using `@theme inline { ... }`. PostCSS config uses `@tailwindcss/postcss` plugin only.
**Warning signs:** Custom colors like `bg-navy-dark` don't resolve. Tailwind classes work but custom theme tokens don't.

## Code Examples

### PostCSS Config (Tailwind v4)

```javascript
// postcss.config.mjs
// Source: EmporioSite/postcss.config.mjs (working)
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### next.config.ts

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
```

### Utility Functions

```typescript
// src/lib/utils.ts
// Source: EmporioSite/src/lib/utils.ts (working)
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
```

### .gitignore (Comprehensive for Public Repo)

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files
.env*
!.env.example

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# prisma generated client
/src/generated/prisma
```

### .env.example

```bash
# Database (Neon in production, Docker PostgreSQL in local dev)
DATABASE_URL="postgresql://primor:primor_dev@localhost:5432/primor_holding"
DIRECT_URL="postgresql://primor:primor_dev@localhost:5432/primor_holding"

# Clerk (admin auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxx"
CLERK_SECRET_KEY="sk_test_xxx"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/admin"

# Cloudinary (admin image uploads)
CLOUDINARY_CLOUD_NAME="xxx"
CLOUDINARY_API_KEY="xxx"
CLOUDINARY_API_SECRET="xxx"

# Email (contact form notifications)
RESEND_API_KEY="re_xxx"
CONTACT_EMAIL="contato@primorholding.com.br"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "type-check": "tsc --noEmit",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "postinstall": "prisma generate"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

### Prisma Schema (Complete for Phase 1)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

// --- Site Settings (singleton) ---
model SiteSettings {
  id              String   @id @default("default")
  siteName        String   @default("Primor Holding")
  heroTitle       String   @default("Consultoria Empresarial de Excelencia")
  heroSubtitle    String   @default("")
  heroImageUrl    String?
  aboutTitle      String   @default("Sobre Nos")
  aboutText       String   @default("")
  founderName     String   @default("Joao Antonio Lopes Correa")
  founderPhotoUrl String?
  whatsappNumber  String   @default("")
  instagramUrl    String   @default("")
  linkedinUrl     String   @default("")
  email           String   @default("")
  cnpj            String   @default("")
  updatedAt       DateTime @updatedAt

  @@map("site_settings")
}

// --- Services ---
model Service {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  description String
  icon        String?
  imageUrl    String?
  active      Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([active, order])
  @@map("services")
}

// --- Testimonials ---
model Testimonial {
  id        String   @id @default(uuid())
  name      String
  company   String?
  role      String?
  content   String
  photoUrl  String?
  rating    Int      @default(5)
  active    Boolean  @default(true)
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([active, order])
  @@map("testimonials")
}

// --- Blog Posts ---
model BlogPost {
  id          String    @id @default(uuid())
  title       String
  slug        String    @unique
  excerpt     String?
  content     String
  imageUrl    String?
  published   Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([published, publishedAt])
  @@map("blog_posts")
}

// --- Contact Submissions ---
model Contact {
  id        String   @id @default(uuid())
  name      String
  email     String
  phone     String?
  company   String?
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([read, createdAt])
  @@map("contacts")
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `middleware.ts` + `export function middleware()` | `proxy.ts` + `export default` or `export function proxy()` | Next.js 16.0 (Feb 2026) | Must rename file for greenfield projects |
| `prisma-client-js` generator | `prisma-client` generator + `prisma.config.ts` | Prisma 7.0 (2025) | New config file, new import path, new generator name |
| `tailwind.config.js` | CSS-first `@theme` in globals.css | Tailwind v4.0 (Dec 2024) | No config file, all tokens in CSS |
| `@prisma/client` import | `@/generated/prisma/client` import | Prisma 7.0 | Output directory is explicit, not in node_modules |
| Edge Runtime for middleware | Node.js Runtime for proxy | Next.js 16.0 | Proxy defaults to Node.js. Runtime config not available. |

**Deprecated/outdated:**
- `middleware.ts`: Still works with deprecation warning. Will be removed in future Next.js version.
- `prisma-client-js` generator: Will not work with Prisma 7+.
- `tailwind.config.js`: Ignored by Tailwind v4. CSS-first is the only config method.
- `url = env("DATABASE_URL")` in schema.prisma datasource: Prisma 7 uses `prisma.config.ts` for connection URL.

## Open Questions

1. **Clerk v7 auth.protect() vs manual check in proxy**
   - What we know: Clerk docs show `await auth.protect()` which auto-redirects to sign-in. Also show manual `auth()` to read claims.
   - What's unclear: For admin role checking, `auth.protect()` only checks authentication, not authorization (role). Manual claim reading is needed for role check.
   - Recommendation: Use manual `auth()` + role check pattern (as shown in code examples). Do NOT rely solely on `auth.protect()` for admin routes.

2. **Clerk v7 stability**
   - What we know: Published 2026-03-11 (today). Version 7.0.4 on npm. Clerk docs already updated for proxy.ts.
   - What's unclear: No community production experience. Potential undiscovered bugs.
   - Recommendation: Proceed with v7. If bugs appear, fall back to `@clerk/nextjs@^6.39.0` (AltheiaSite proven). Test sign-in AND sign-out flows thoroughly.

3. **Playfair Display font loading strategy**
   - What we know: EmporioSite loads Playfair Display via `@font-face` in CSS pointing to fonts.gstatic.com. AltheiaSite uses `next/font/google` (Playfair_Display import).
   - What's unclear: Which approach is better for this project.
   - Recommendation: Use `@font-face` in CSS (EmporioSite pattern) for consistency with Tailwind v4 CSS-first approach. Avoid `next/font/google` for Playfair since it adds JS overhead for a display font.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Next.js built-in + TypeScript compiler |
| Config file | tsconfig.json (strict mode) |
| Quick run command | `source ~/.nvm/nvm.sh && cd /home/sth/PrimorHolding && pnpm type-check` |
| Full suite command | `source ~/.nvm/nvm.sh && cd /home/sth/PrimorHolding && pnpm type-check && pnpm build` |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | Project runs with Docker + dev server responds | smoke | `docker compose up -d && pnpm dev` (manual verify localhost:3000) | -- Wave 0 |
| FOUND-02 | .gitignore blocks env files and secrets | smoke | `git status` shows no .env files after setup | -- Wave 0 |
| FOUND-03 | .env.example has all fields, CLAUDE.md exists | smoke | `test -f .env.example && test -f CLAUDE.md` | -- Wave 0 |
| FOUND-04 | /admin without auth redirects to sign-in | smoke | `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/admin` returns 307 | -- Wave 0 |
| FOUND-05 | Prisma schema has 5 models, db push succeeds | unit | `pnpm prisma db push && pnpm prisma generate` (exit code 0) | -- Wave 0 |
| FOUND-06 | Base UI components render with dark blue theme | smoke | `pnpm type-check` (components compile) + visual check | -- Wave 0 |

### Sampling Rate

- **Per task commit:** `pnpm type-check`
- **Per wave merge:** `pnpm type-check && pnpm build`
- **Phase gate:** Full suite green + manual verification of all 6 success criteria

### Wave 0 Gaps

- [ ] No test framework beyond TypeScript compiler -- adequate for Phase 1 (scaffolding)
- [ ] No Playwright/smoke tests yet -- to be added in Phase 2+ when there are pages to test
- [ ] Manual verification required for FOUND-01 (Docker + dev server), FOUND-04 (redirect behavior), FOUND-06 (visual theme)

## Sources

### Primary (HIGH confidence)
- [Next.js 16 proxy.ts file convention](https://nextjs.org/docs/app/api-reference/file-conventions/proxy) - Complete proxy API, export patterns, matcher config, migration guide
- [Clerk clerkMiddleware() reference](https://clerk.com/docs/reference/nextjs/clerk-middleware) - proxy.ts setup, route protection, createRouteMatcher
- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) - proxy rename, Turbopack default, breaking changes
- EmporioSite (`/home/sth/EmporioSite/`) - Prisma 7.4.2, Neon adapter, Tailwind v4, PostCSS config, utilities -- all working production code
- AltheiaSite (`/home/sth/AltheiaSite/`) - Clerk v6 + admin panel + security headers + CVA components -- proven patterns

### Secondary (MEDIUM confidence)
- [Clerk Next.js quickstart](https://clerk.com/docs/nextjs/getting-started/quickstart) - Basic setup, ClerkProvider, environment variables
- [@clerk/nextjs on npm](https://www.npmjs.com/package/@clerk/nextjs) - Version 7.0.4 published, changelog
- [Prisma config reference](https://www.prisma.io/docs/orm/reference/prisma-config-reference) - prisma.config.ts format
- [Tailwind CSS v4 docs](https://tailwindcss.com/blog/tailwindcss-v4) - CSS-first config, @theme directive

### Tertiary (LOW confidence)
- Clerk v7 production stability - No community reports yet (released 2026-03-11). Fallback to v6.39 documented.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All versions verified from EmporioSite package.json and npm
- Architecture: HIGH - Patterns proven in EmporioSite (Prisma 7, Neon) and AltheiaSite (Clerk, admin auth)
- Pitfalls: HIGH - Sourced from official migration guides + developer's existing project gotchas
- Clerk v7 integration: MEDIUM - Official docs confirm support, but no production track record
- Theme/Components: HIGH - Exact Tailwind v4 pattern from EmporioSite, CVA from AltheiaSite

**Research date:** 2026-03-11
**Valid until:** 2026-04-11 (stable stack, only Clerk v7 may need reassessment if issues arise)
