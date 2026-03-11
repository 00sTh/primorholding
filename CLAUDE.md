# Primor Holding - Consultoria Empresarial

## Project

- **Path:** `/home/sth/PrimorHolding`
- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma 7 + Neon, Clerk v7, Cloudinary, Docker (dev), Vercel (prod)
- **Package manager:** pnpm
- **Node:** via nvm (`source /home/sth/.nvm/nvm.sh`)

## Company

- **Name:** PRIMOR PARTNERSHIP HOLDING LTDA
- **Founder:** Joao Antonio Lopes Correa
- **CNPJ:** 59.120.382/0001-30

## Theme

- **Colors:** Navy Dark #0A1628 (background), Navy #0F2443, Gold #C9A227 (accent/CTA), Gold Light #D4B84A, Cream #FBF8F1 (text), Slate #94A3B8
- **Fonts:** Playfair Display (serif, headings via @font-face), Geist Sans (body via next/font/google)
- **CSS utilities:** `.text-gradient-gold`, `.gold-glow`, `.font-serif`
- **Tailwind v4:** CSS-first config in `src/app/globals.css` using `@theme inline` -- NO tailwind.config.js

## Auth

- **Provider:** Clerk v7 -- admin only, visitors are anonymous
- **File:** `src/proxy.ts` (NOT middleware.ts -- Next.js 16 convention)
- **Protected routes:** `/admin/*` requires authenticated user with `role: "admin"` in public metadata
- **Sign-in:** `/sign-in` via Clerk hosted components

## Database

- **ORM:** Prisma 7 with `prisma-client` generator (NOT prisma-client-js)
- **Import:** `import { PrismaClient } from "@/generated/prisma/client"`
- **Config:** `prisma.config.ts` at project root -- loads `.env.local` via dotenv
- **Dev:** Docker PostgreSQL (`docker compose up -d`)
- **Prod:** Neon serverless PostgreSQL via `@prisma/adapter-neon`
- **Schema:** `prisma/schema.prisma`

## Commands

```bash
# Verification
source /home/sth/.nvm/nvm.sh && cd /home/sth/PrimorHolding && pnpm type-check

# Build
pnpm build

# Dev
docker compose up -d && pnpm dev

# Database
pnpm db:push      # push schema to database
pnpm db:seed      # run seed script
pnpm db:studio    # open Prisma Studio

# After install (auto via postinstall)
pnpm prisma generate
```

## Conventions

- **Server Components by default** -- `"use client"` only when needed
- **Server Actions for CRUD** -- no API routes except external webhooks
- **Prices calculated server-side** -- never trust client data
- **Import paths:** `@/` maps to `src/`
- **Utilities:** `cn()` from `@/lib/utils` for class merging, `slugify()` for URL slugs

## Gotchas

- `proxy.ts` NOT `middleware.ts` -- Next.js 16 renamed the convention
- `prisma-client` NOT `prisma-client-js` -- Prisma 7 changed the generator name
- Tailwind v4 CSS-first -- no `tailwind.config.js`, all theme tokens in `globals.css`
- PrismaNeon adapter works with Docker PostgreSQL too -- one code path for dev and prod
- Import `@/generated/prisma/client` NOT `@prisma/client` -- Prisma 7 explicit output path
- After `pnpm install`, run `pnpm approve-builds` if new dependencies with build scripts appear
- `.env.local` is gitignored -- `.env.example` is the template for contributors
