# Primor Holding - Consultoria Empresarial

## Project

- **Path:** `/home/sth/PrimorHolding`
- **URL:** `primorholdingp.com.br` ✅ | **Vercel:** `00sths-projects`
- **GitHub:** `00sTh/primorholding`
- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma 7 + Neon, JWT admin, pnpm
- **Node:** via nvm (`source /home/sth/.nvm/nvm.sh`)

## Company

- **Name:** PRIMOR PARTNERSHIP HOLDING LTDA
- **Founder:** João Antonio Lopes Corrêa
- **CNPJ:** 59.120.382/0001-30

## Theme

- **Colors:** Background `#09090F`, Gold `#C9A96E`, Text `#F0EBE1`, Muted `#8B8075`
- **Fonts:** Cormorant Garamond (serif, headings via @import url() in globals.css), Inter (body)
- **CSS utilities:** `.text-gradient-gold`, `.btn-gold`, `.btn-outline-gold`, `.glass`, `.glass-gold`, `.card-dark`, `.section-eyebrow`, `.section-title`, `.hero-gradient`
- **Tailwind v4:** design tokens em `app/globals.css` (unlayered component classes + @layer base)

## Auth

- **Provider:** JWT via jose + bcryptjs (sem Clerk)
- **File:** `proxy.ts` na raiz (Next.js 16 usa proxy.ts, não middleware.ts)
- **Cookie:** `admin-token` (httpOnly, 7d)
- **Admin:** `admin@primorholding.com.br` / `PrimorAdmin@2026`

## Database

- **ORM:** Prisma 7 com generator `prisma-client-js` (não `prisma-client`)
- **Import:** `import { PrismaClient } from "@/generated/prisma"` (sem /client)
- **Neon:** `ep-patient-surf-a4tvvr04`, banco `primor_holding`
- **Modelos:** `User` (admin) + `Lead` (formulário de contato)
- **Config:** `prisma.config.ts` na raiz com dotenv

## Commands

```bash
# Verification
source /home/sth/.nvm/nvm.sh && cd /home/sth/PrimorHolding && pnpm type-check

# Build
pnpm build  # roda prisma generate && next build

# Dev
pnpm dev

# Database
pnpm db:push      # push schema
pnpm db:seed      # seed admin user
pnpm db:studio    # Prisma Studio
```

## Gotchas

- `proxy.ts` com `export async function proxy()` -- Next.js 16 (não middleware.ts/middleware())
- generator `prisma-client-js` (não `prisma-client` -- mudança do Prisma 7 não se aplicou aqui)
- Import prisma: `from "@/generated/prisma"` (sem `/client`)
- @import url(...) fonts ANTES do `@import "tailwindcss"` no globals.css
- App router em `/app/` na raiz (não `/src/app/`)
- `@/* → ./src/*` no tsconfig (componentes em src/, rotas em app/)
