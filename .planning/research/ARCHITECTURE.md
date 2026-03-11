# Architecture Patterns

**Domain:** Institutional consulting website with CMS-driven content
**Researched:** 2026-03-11
**Overall confidence:** HIGH

## Recommended Architecture

### High-Level Overview

```
                    +-------------------+
                    |    Cloudinary      |
                    |   (Image CDN)      |
                    +---------+---------+
                              |
+----------+    +-------------+-------------+    +----------------+
|  Visitor |    |       Next.js 16 App       |    |   Neon (PG)    |
| (Public) |--->|  (Vercel / Docker local)   |--->|   Serverless   |
+----------+    |                            |    |   PostgreSQL   |
                |  +--------+  +---------+   |    +----------------+
+----------+    |  | (site) |  | /admin  |   |
|  Admin   |--->|  | Public |  | Clerk   |   |
| (Clerk)  |    |  | pages  |  | protect |   |
+----------+    |  +--------+  +---------+   |
                +----------------------------+
```

The architecture is a single Next.js 16 application with two distinct zones:

1. **Public site** -- Server Components rendering CMS-driven content. No auth. Fully cacheable.
2. **Admin panel** -- Clerk-protected CRUD interface for managing services, testimonials, blog posts, contacts, and site settings.

Both zones share the same Prisma client, database, and Cloudinary integration. The boundary is enforced by `proxy.ts` (Next.js 16 renamed `middleware.ts` to `proxy.ts`).

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **Public Site** `(site)` route group | Render landing page sections, legal pages, contact form | Prisma (read), Cloudinary (images via URL), WhatsApp (external link) |
| **Admin Panel** `/admin` | CRUD for Services, Testimonials, Blog, Contacts, Settings | Prisma (read/write), Cloudinary (upload/delete), Clerk (auth) |
| **Proxy** `proxy.ts` | Route protection for `/admin/**`, security headers | Clerk SDK, NextResponse |
| **Server Actions** `src/actions/` | All data mutations (create, update, delete) | Prisma, Cloudinary |
| **API Routes** `src/app/api/` | Contact form submission (optional), webhooks | Prisma |
| **Prisma Client** `src/lib/prisma.ts` | Database access singleton with Neon adapter | Neon PostgreSQL |
| **Cloudinary** `src/lib/cloudinary.ts` | Image upload/delete operations | Cloudinary API |
| **Docker Compose** `docker-compose.yml` | Local PostgreSQL for development | PostgreSQL container |

### Data Flow

**Public page render (e.g., Services section):**
```
1. Visitor requests /
2. proxy.ts: no admin route -> apply security headers -> NextResponse.next()
3. (site)/page.tsx (Server Component): calls getServices() from actions/
4. getServices() -> prisma.service.findMany({ where: { active: true } })
5. Neon returns data over WebSocket (via @prisma/adapter-neon)
6. Server Component renders HTML with Cloudinary image URLs
7. HTML streamed to client. No JS needed for static content.
```

**Admin creates a service:**
```
1. Admin navigates to /admin/services/new
2. proxy.ts: /admin route -> Clerk auth.protect() -> verify role
3. Admin fills form, uploads image
4. Form submission triggers Server Action createService()
5. createService():
   a. Validates with Zod
   b. Uploads image to Cloudinary -> gets URL
   c. prisma.service.create({ data: { ..., imageUrl } })
   d. revalidatePath("/") to bust cache on public pages
   e. Returns success
6. Admin redirected to /admin/services
```

**Contact form submission:**
```
1. Visitor fills form on (site)/contato/page.tsx
2. Client Component submits via Server Action submitContact()
3. submitContact():
   a. Validates with Zod (name, email, message)
   b. prisma.contact.create({ data })
   c. Optional: send notification email
   d. Returns success message
```

## Route Structure (App Router)

```
src/
  proxy.ts                          # Auth + security headers (replaces middleware.ts)
  app/
    layout.tsx                      # Root layout: <html>, fonts, metadata
    globals.css                     # Tailwind v4 imports + theme
    not-found.tsx                   # Custom 404
    error.tsx                       # Error boundary
    icon.svg                        # Favicon (file-based)
    robots.ts                       # robots.txt generation
    sitemap.ts                      # sitemap.xml generation

    (site)/                         # PUBLIC route group
      layout.tsx                    # Navbar + Footer + WhatsAppFab + CookieBanner
      page.tsx                      # Landing page (Hero + Sobre + Servicos + Depoimentos + Contato)
      contato/
        page.tsx                    # Dedicated contact page
      politica-de-privacidade/
        page.tsx                    # LGPD privacy policy
      termos-de-uso/
        page.tsx                    # Terms of service

    (auth)/                         # CLERK AUTH route group
      sign-in/
        [[...sign-in]]/
          page.tsx                  # Clerk sign-in (admin only)

    admin/                          # ADMIN PANEL (Clerk-protected)
      layout.tsx                    # Admin sidebar + header
      page.tsx                      # Dashboard (contacts count, quick stats)
      services/
        page.tsx                    # List services
        new/page.tsx                # Create service
        [id]/page.tsx               # Edit service
      testimonials/
        page.tsx                    # List testimonials
        new/page.tsx                # Create testimonial
        [id]/page.tsx               # Edit testimonial
      blog/
        page.tsx                    # List blog posts (admin-only v1)
        new/page.tsx                # Create post
        [id]/page.tsx               # Edit post
      contacts/
        page.tsx                    # View contact form submissions
        [id]/page.tsx               # View individual contact
      settings/
        page.tsx                    # Site settings (hero text, WhatsApp number, etc.)

    api/                            # API ROUTES
      contact/
        route.ts                    # POST: contact form (if not using Server Action)
```

### Route Group Rationale

- **`(site)`**: Groups all public pages under a shared layout (Navbar, Footer, WhatsAppFab, CookieBanner). The parentheses make it invisible in the URL -- visitors see `/contato`, not `/(site)/contato`.
- **`(auth)`**: Clerk sign-in pages with a minimal layout (no Navbar/Footer). Only admin users ever see this.
- **`admin/`**: NOT a route group (no parentheses) because the `/admin` path is meaningful for proxy protection. Has its own layout with admin sidebar navigation.

## Proxy Setup (Next.js 16)

Next.js 16 renames `middleware.ts` to `proxy.ts`. The proxy runs on Node.js runtime (NOT Edge). Clerk v7 supports this convention.

```typescript
// src/proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export function proxy(request: Request) {
  return clerkMiddleware(async (auth, req) => {
    const url = new URL(req.url);

    // Admin routes: require Clerk auth + admin role
    if (url.pathname.startsWith("/admin")) {
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
  })(request);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

**IMPORTANT**: If Clerk v7 does not yet fully support the `proxy` export name at implementation time, keep `middleware.ts` with the `middleware` export. Next.js 16 still accepts it (with a deprecation warning). The developer's existing projects (AltheiaSite, EmporioSite) both run Next.js 16 with `middleware.ts` successfully. Validate Clerk compatibility before committing to `proxy.ts`.

## Prisma 7 + Neon Setup

Prisma 7 introduces breaking changes from Prisma 6. Based on the developer's proven pattern in EmporioSite:

### Schema (`prisma/schema.prisma`)
```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

// Models here...
```

Note: No `url` in the datasource block. Connection string is provided via `prisma.config.ts` for CLI operations and via the adapter at runtime.

### Config (`prisma.config.ts`)
```typescript
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config({ path: ".env.local" });
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    // CLI uses DIRECT_URL (bypasses pgBouncer) for migrations/push
    url: process.env["DIRECT_URL"] || process.env["DATABASE_URL"],
  },
});
```

### Client Singleton (`src/lib/prisma.ts`)
```typescript
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

### Required Packages
```bash
pnpm add @prisma/client @prisma/adapter-neon
pnpm add -D prisma
```

### Import Convention
Always import from the generated path, NOT from `@prisma/client`:
```typescript
import { PrismaClient } from "@/generated/prisma/client";
// NOT: import { PrismaClient } from "@prisma/client";  <-- Prisma 6 pattern
```

## Docker Compose (Local Dev Only)

Docker is used ONLY for local development -- providing a PostgreSQL instance without requiring Neon in dev. Production deploys to Vercel with Neon.

### `docker-compose.yml`
```yaml
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

### `.env.local` (Development)
```bash
# Docker PostgreSQL (local dev)
DATABASE_URL="postgresql://primor:primor_dev@localhost:5432/primor_holding"
DIRECT_URL="postgresql://primor:primor_dev@localhost:5432/primor_holding"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

### `.env.local` (Production via Vercel env vars)
```bash
# Neon PostgreSQL
DATABASE_URL="postgresql://...@...neon.tech/primor_holding?sslmode=require"  # pooled
DIRECT_URL="postgresql://...@...neon.tech/primor_holding?sslmode=require"    # direct (no -pooler)
```

### Development Workflow
```bash
docker compose up -d                    # Start PostgreSQL
pnpm prisma db push                     # Apply schema to local DB
pnpm prisma generate                    # Generate client
pnpm dev                                # Start Next.js dev server
```

**NOTE**: When using Docker locally, the Prisma client does NOT need the Neon adapter since it connects via standard TCP. However, for consistency with production, we use the same `PrismaNeon` adapter everywhere. The Neon adapter works with any PostgreSQL connection string, not just Neon-hosted databases. This avoids separate code paths for dev vs prod.

## Prisma Schema (Data Models)

```prisma
// ─── Site Settings (singleton) ──────────────────────
model SiteSettings {
  id             String  @id @default("default")
  siteName       String  @default("Primor Holding")
  heroTitle      String  @default("Consultoria Empresarial de Excelencia")
  heroSubtitle   String  @default("")
  heroImageUrl   String?
  aboutTitle     String  @default("Sobre Nos")
  aboutText      String  @default("")
  founderName    String  @default("Joao Antonio Lopes Correa")
  founderPhotoUrl String?
  whatsappNumber String  @default("")
  instagramUrl   String  @default("")
  linkedinUrl    String  @default("")
  email          String  @default("")
  cnpj           String  @default("")
  updatedAt      DateTime @updatedAt

  @@map("site_settings")
}

// ─── Services ───────────────────────────────────────
model Service {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  description String
  icon        String?        // Lucide icon name or image URL
  imageUrl    String?
  active      Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([active, order])
  @@map("services")
}

// ─── Testimonials ───────────────────────────────────
model Testimonial {
  id         String   @id @default(uuid())
  name       String
  company    String?
  role       String?
  content    String
  photoUrl   String?
  rating     Int      @default(5)
  active     Boolean  @default(true)
  order      Int      @default(0)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([active, order])
  @@map("testimonials")
}

// ─── Blog Posts (admin-managed, no public page v1) ──
model BlogPost {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  excerpt     String?
  content     String        // Markdown or rich text
  imageUrl    String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([published, publishedAt])
  @@map("blog_posts")
}

// ─── Contact Submissions ────────────────────────────
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

## Patterns to Follow

### Pattern 1: Server Actions for All Mutations
**What:** All data writes go through Server Actions in `src/actions/`, never through API routes.
**When:** Always -- creating, updating, or deleting any record.
**Why:** Colocation with forms, automatic revalidation, type safety end-to-end.
```typescript
// src/actions/admin.ts
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ServiceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  // ...
});

async function requireAdmin() {
  const { userId, sessionClaims } = await auth();
  if (!userId) throw new Error("Not authenticated");
  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;
  if (role !== "admin") throw new Error("Not authorized");
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const data = ServiceSchema.parse(Object.fromEntries(formData));
  // ... create in DB, revalidatePath
}
```

### Pattern 2: Server Components for Public Pages
**What:** All public-facing pages are Server Components. No "use client" unless interactivity is needed.
**When:** Any page that just displays data.
**Why:** Zero JS shipped for static content, faster load, better SEO.
```typescript
// src/app/(site)/page.tsx -- Server Component (default)
import { getServices } from "@/actions/public";
import { getSiteSettings } from "@/actions/admin";

export default async function HomePage() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);
  return (
    <>
      <HeroSection settings={settings} />
      <ServicesSection services={services} />
      {/* ... */}
    </>
  );
}
```

### Pattern 3: Split Server/Client Components
**What:** Keep server data-fetching in the page, pass serialized data to client components.
**When:** A section needs interactivity (animations, form state, carousel).
```
ContactSection.tsx (Server) -> fetches nothing, just renders
  ContactForm.tsx ("use client") -> manages form state, calls Server Action
```

### Pattern 4: SiteSettings Singleton
**What:** One row in `SiteSettings` table with `id = "default"`. All site-wide content is editable.
**When:** Hero text, WhatsApp number, founder info, social links.
**Why:** Admin can change any text without code deploys. Proven pattern from EmporioSite and AltheiaSite.

### Pattern 5: Cloudinary for Admin-Uploaded Images
**What:** Images uploaded through admin go to Cloudinary, stored as URLs in the database.
**When:** Founder photo, service images, testimonial photos, blog cover images.
```typescript
// src/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File, folder = "primor"): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    ).end(buffer);
  });
}

export async function deleteImage(url: string): Promise<void> {
  const publicId = extractPublicId(url);
  if (publicId) await cloudinary.uploader.destroy(publicId);
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: API Routes for CRUD
**What:** Creating REST API endpoints (`/api/services`, `/api/testimonials`) for admin operations.
**Why bad:** Unnecessary abstraction. Server Actions provide the same functionality with less boilerplate, automatic CSRF protection, and type safety.
**Instead:** Use Server Actions in `src/actions/admin.ts`. Only use API routes for external webhooks or third-party integrations.

### Anti-Pattern 2: Client-Side Data Fetching on Public Pages
**What:** Using `useEffect` + `fetch` to load services/testimonials on the landing page.
**Why bad:** Waterfall loading, poor SEO (content not in initial HTML), unnecessary client JS.
**Instead:** Fetch in Server Components. Data is in the HTML from the first byte.

### Anti-Pattern 3: Separate Dev/Prod Prisma Client Code
**What:** Having different `prisma.ts` files for Docker (local) vs Neon (prod).
**Why bad:** Code divergence, different bugs in different environments.
**Instead:** Use `PrismaNeon` adapter everywhere. It works with any PostgreSQL connection string, including Docker-hosted PostgreSQL.

### Anti-Pattern 4: Storing Images in the Database
**What:** Storing image binary data or base64 in PostgreSQL.
**Why bad:** Bloats database, slow queries, no CDN benefits.
**Instead:** Upload to Cloudinary, store URL string in the database.

### Anti-Pattern 5: Dynamic Imports in Proxy
**What:** Using `await import()` in `proxy.ts`.
**Why bad:** Can crash at runtime depending on the module being imported.
**Instead:** Always use static imports in `proxy.ts`. This is a known Clerk requirement.

## File Structure Overview

```
PrimorHolding/
  docker-compose.yml              # PostgreSQL for local dev
  prisma.config.ts                # Prisma 7 CLI config
  next.config.ts                  # Next.js 16 config
  .env.local                      # Secrets (gitignored)
  .env.example                    # Template for .env.local (committed)

  prisma/
    schema.prisma                 # Database models
    migrations/                   # Prisma migrations

  src/
    proxy.ts                      # Auth + security headers (Next.js 16)

    app/
      layout.tsx                  # Root: ClerkProvider, fonts, metadata
      globals.css                 # Tailwind v4 + theme vars
      not-found.tsx
      error.tsx
      icon.svg
      robots.ts
      sitemap.ts

      (site)/                     # Public pages
        layout.tsx                # Navbar + Footer + WhatsAppFab + CookieBanner
        page.tsx                  # Landing (Hero + About + Services + Testimonials + Contact)
        contato/page.tsx
        politica-de-privacidade/page.tsx
        termos-de-uso/page.tsx

      (auth)/                     # Clerk sign-in
        sign-in/[[...sign-in]]/page.tsx

      admin/                      # Protected admin panel
        layout.tsx                # Sidebar + admin header
        page.tsx                  # Dashboard
        services/                 # CRUD
        testimonials/             # CRUD
        blog/                     # CRUD (posts prepared, no public page v1)
        contacts/                 # View submissions
        settings/page.tsx         # Site settings

      api/                        # Minimal API routes
        contact/route.ts          # Optional: external form submission

    actions/
      public.ts                   # Read-only queries for public pages
      admin.ts                    # Protected CRUD operations
      contact.ts                  # Contact form submission

    components/
      ui/                         # Shared UI components (Button, Input, Card, etc.)
      layout/                     # Navbar, Footer, WhatsAppFab, CookieBanner
      home/                       # HeroSection, AboutSection, ServicesSection, etc.
      admin/                      # AdminSidebar, AdminHeader, form components

    lib/
      prisma.ts                   # Prisma client singleton + Neon adapter
      cloudinary.ts               # Image upload/delete
      utils.ts                    # Shared utilities (slugify, formatDate, cn)
      constants.ts                # Theme colors, company info
      animations.ts               # framer-motion shared variants

    types/
      index.ts                    # TypeScript type definitions

    schemas/
      contact.ts                  # Zod schema for contact form
      service.ts                  # Zod schema for service CRUD
      testimonial.ts              # Zod schema for testimonial CRUD
      blog.ts                     # Zod schema for blog post CRUD
```

## Suggested Build Order

Based on component dependencies:

### Phase 1: Foundation
Build order matters -- each item depends on the previous.

1. **Project scaffold** -- `create-next-app`, Tailwind v4, TypeScript, pnpm
2. **Docker Compose** -- PostgreSQL container for local dev
3. **Prisma setup** -- schema, `prisma.config.ts`, generated client, Neon adapter
4. **Proxy** -- security headers (no Clerk yet, add later)
5. **Root layout** -- fonts, metadata, theme colors

### Phase 2: Public Site
The landing page is the core deliverable.

1. **`(site)` layout** -- Navbar, Footer
2. **Landing page sections** -- Hero, About, Services, Testimonials, Contact form
3. **WhatsApp floating button**
4. **Legal pages** -- Privacy policy, terms of use
5. **Cookie banner** (LGPD)
6. **SEO** -- `robots.ts`, `sitemap.ts`, `metadata`

### Phase 3: Admin Panel
Depends on Prisma schema and Clerk setup.

1. **Clerk integration** -- sign-in page, proxy auth, admin role setup
2. **Admin layout** -- sidebar, header, navigation
3. **SiteSettings CRUD** -- admin can edit all public text
4. **Services CRUD** -- with Cloudinary image upload
5. **Testimonials CRUD** -- with photo upload
6. **Contacts viewer** -- list + detail with read/unread
7. **Blog posts CRUD** -- admin-only, no public page v1

### Phase 4: Polish
Non-blocking improvements.

1. **Animations** -- framer-motion on scroll
2. **Loading states** -- Suspense boundaries
3. **Error handling** -- error.tsx, not-found.tsx
4. **Performance** -- image optimization, caching

## Scalability Considerations

| Concern | Current (MVP) | At 1K visits/day | At 10K visits/day |
|---------|--------------|-------------------|-------------------|
| Database | Neon free tier | Neon free tier (sufficient) | Neon Pro if needed |
| Images | Cloudinary free tier | Cloudinary free tier (sufficient) | Monitor bandwidth |
| Caching | Next.js default | Add `"use cache"` to public data fetches | Add ISR or cache headers |
| Contact form | Direct DB insert | Direct DB insert | Add rate limiting |

This is a low-traffic institutional site. Scalability is not a primary concern. Neon free tier and Cloudinary free tier will handle the expected load comfortably.

## Sources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) -- proxy.ts rename, Turbopack default, async APIs (HIGH confidence)
- [Clerk clerkMiddleware Reference](https://clerk.com/docs/reference/nextjs/clerk-middleware) -- proxy.ts support confirmed (HIGH confidence)
- [Prisma 7 Upgrade Guide](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7) -- prisma.config.ts, driver adapters, generated client path (HIGH confidence)
- [Neon + Prisma Guide](https://neon.com/docs/guides/prisma) -- adapter-neon setup, connection strings (HIGH confidence)
- [Prisma Docker Guide](https://www.prisma.io/docs/guides/docker) -- Docker Compose patterns (MEDIUM confidence)
- Developer's existing projects (EmporioSite, AltheiaSite) -- proven patterns with identical stack (HIGH confidence)
