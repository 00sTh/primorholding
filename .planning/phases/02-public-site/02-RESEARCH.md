# Phase 02: Public Site - Research

**Researched:** 2026-03-11
**Domain:** Next.js 16 App Router public pages, framer-motion 12.x scroll animations, Server Actions + Zod v4 contact form, LGPD cookie consent
**Confidence:** HIGH

---

## Summary

Phase 2 builds all visitor-facing content for Primor Holding: one-page layout with Navbar, Hero, About, Services, Testimonials, and Contact sections, plus standalone legal pages and a cookie consent banner. The foundation from Phase 1 provides a solid starting point -- the route group `(site)/` exists, the layout is bare, Prisma models are in place, and the theme tokens are defined in globals.css.

The two new dependencies to install are `framer-motion` (v12.35.2, already at latest) and `zod` (v4.3.6, same version used in EmporioSite). No other packages are needed: the WhatsApp button is a custom component using an `<a>` tag (no library needed), cookie consent is plain localStorage (no library needed), and lucide-react is already installed for icons.

The biggest implementation decision is the framer-motion "use client" boundary. Motion components cannot be used directly in Server Components. The correct pattern is a thin wrapper file (`src/components/motion.tsx`) that re-exports typed `motion.div`, `motion.section`, etc. with `"use client"` -- Server Components import from this wrapper, not from `framer-motion` directly. This keeps data fetching in Server Components and animation in Client Components.

**Primary recommendation:** Build each section as a Server Component that fetches its own data, wraps animated children in the motion client wrapper. Contact form uses `useActionState` + Server Action + Zod v4 `safeParse`. Cookie consent uses a single Client Component writing to `localStorage.setItem("cookie-consent", "accepted"|"rejected")`.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SITE-01 | Navbar fixa com logo Primor Holding, links ancora para secoes, botao CTA de contato | Next.js sticky nav pattern, `scroll-padding-top` for fixed header offset, anchor `href="#section-id"` |
| SITE-02 | Secao Hero com headline impactante, subtitulo descritivo e CTA para contato | Hero is pure Server Component (no data needed), framer-motion enter animation on load |
| SITE-03 | Footer com nome da empresa, CNPJ, links para paginas legais e redes sociais | SiteSettings provides CNPJ, whatsapp, instagram, linkedin -- fetched server-side |
| SITE-04 | Secao "Sobre" com historia de Joao Antonio Lopes Correa e foto profissional | founderPhotoUrl + founderName + aboutText from SiteSettings singleton |
| SITE-05 | Secao "Servicos" com cards dinamicos puxados do banco | `prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } })` |
| SITE-06 | Secao "Depoimentos" com grid ou carrossel de depoimentos puxados do banco | `prisma.testimonial.findMany({ where: { active: true }, orderBy: { order: "asc" } })` |
| SITE-07 | Formulario de contato (Nome, Email, Telefone opcional, Mensagem) com validacao e honeypot | useActionState + Server Action + Zod v4 safeParse + hidden honeypot field |
| SITE-08 | Botao flutuante de WhatsApp visivel em todas as paginas, numero configuravel | Custom client component in site layout, fixed bottom-right, reads whatsappNumber from SiteSettings via prop |
| SITE-09 | Pagina Politica de Privacidade conforme LGPD | Static page at `(site)/privacidade/page.tsx`, CNPJ from constants.ts |
| SITE-10 | Pagina Termos de Uso com placeholder CNPJ | Static page at `(site)/termos/page.tsx`, CNPJ from constants.ts |
| SITE-11 | Banner de consentimento de cookies conforme LGPD, aceitar/recusar, persistencia | Client Component, localStorage key `"primor:cookie-consent"`, value `"accepted"|"rejected"` |
| SITE-12 | Animacoes de entrada com framer-motion -- elementos aparecem ao rolar a pagina | whileInView + viewport={{ once: true, amount: 0.2 }} pattern via motion.tsx wrapper |
</phase_requirements>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | 12.35.2 (latest) | Scroll-triggered animations, enter effects | Industry standard for React animations, used in AltheiaSite |
| zod | 4.3.6 (latest) | Server Action form validation | Used in EmporioSite at this exact version |
| lucide-react | 0.577.0 | Icons (already installed) | Already in package.json |
| next/image | built-in | Optimized images for founder photo, service cards | Automatic WebP, lazy loading |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react (useActionState) | 19.2.3 (already) | Contact form pending/error state | Contact form Client Component only |
| react-dom (useFormStatus) | 19.2.3 (already) | Submit button pending state | Submit button inside form |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom WhatsApp button | react-floating-whatsapp | External library adds bundle weight; custom `<a>` tag is 10 lines |
| Custom cookie banner | react-cookie-consent | External library; plain localStorage is 30 lines and has no external deps |
| useActionState | react-hook-form | RHF adds client-side complexity; for one simple contact form, useActionState is simpler |

**Installation:**
```bash
pnpm add framer-motion zod
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx          # SiteSettings fetch, Navbar + Footer + WhatsApp button
│   │   ├── page.tsx            # Home: Hero + About + Services + Testimonials + Contact
│   │   ├── privacidade/
│   │   │   └── page.tsx        # Privacy Policy (LGPD)
│   │   └── termos/
│   │       └── page.tsx        # Terms of Use
│   ├── actions/
│   │   └── contact.ts          # submitContact Server Action
│   └── globals.css             # (exists, no changes needed)
├── components/
│   ├── ui/                     # (exists: Button, Card, Section)
│   ├── motion.tsx              # "use client" wrapper re-exporting motion.*
│   ├── site/
│   │   ├── Navbar.tsx          # "use client" for mobile menu state
│   │   ├── Footer.tsx          # Server Component
│   │   ├── WhatsAppButton.tsx  # "use client" (fixed positioning)
│   │   ├── CookieBanner.tsx    # "use client" (localStorage)
│   │   ├── HeroSection.tsx     # Server Component (no data)
│   │   ├── AboutSection.tsx    # Server Component (receives SiteSettings props)
│   │   ├── ServicesSection.tsx # Server Component (receives services prop)
│   │   ├── TestimonialsSection.tsx # Server Component (receives testimonials prop)
│   │   └── ContactForm.tsx     # "use client" (useActionState)
└── lib/
    ├── prisma.ts               # (exists)
    ├── constants.ts            # (exists)
    └── utils.ts                # (exists)
```

### Pattern 1: Motion Wrapper (Critical for framer-motion + Server Components)

**What:** A single `"use client"` file that re-exports typed motion components so Server Components can use them without adding `"use client"` themselves.

**When to use:** Every time you want scroll animation on a Server Component's children.

**Example:**
```typescript
// src/components/motion.tsx
"use client";
export { motion, AnimatePresence } from "framer-motion";
```

Usage in a Server Component:
```tsx
// src/components/site/ServicesSection.tsx  (no "use client")
import { motion } from "@/components/motion";

// motion.div is a Client Component imported into a Server Component -- this is valid
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  viewport={{ once: true, amount: 0.2 }}
>
  {/* content */}
</motion.div>
```

### Pattern 2: Site Layout with SiteSettings Fetch

**What:** The `(site)/layout.tsx` fetches SiteSettings once and passes data as props to Navbar, Footer, and WhatsApp button.

**When to use:** Any data needed by layout-level components (nav, footer, floating button).

**Example:**
```typescript
// src/app/(site)/layout.tsx
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { CookieBanner } from "@/components/site/CookieBanner";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer settings={settings} />
      {settings?.whatsappNumber && <WhatsAppButton number={settings.whatsappNumber} />}
      <CookieBanner />
    </>
  );
}
```

### Pattern 3: Contact Form with useActionState

**What:** Client Component wraps a Server Action via useActionState. Server Action validates with Zod v4 safeParse and saves to DB.

**When to use:** Any form that needs to show errors, pending state, and success feedback.

**Example:**
```typescript
// src/app/actions/contact.ts
"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const ContactSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email invalido"),
  phone: z.string().optional(),
  message: z.string().min(10, "Mensagem muito curta"),
  honeypot: z.string().max(0, "Bot detected"), // hidden field must be empty
});

export type ContactState = {
  success?: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function submitContact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
    honeypot: formData.get("website") ?? "", // hidden field named "website"
  };

  const result = ContactSchema.safeParse(raw);
  if (!result.success) {
    // If honeypot triggered, silently succeed (don't tell bots)
    if (result.error.issues.some(i => i.path[0] === "honeypot")) {
      return { success: true };
    }
    return { errors: result.error.flatten().fieldErrors };
  }

  await prisma.contact.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      message: result.data.message,
    },
  });

  return { success: true, message: "Mensagem enviada com sucesso!" };
}
```

```tsx
// src/components/site/ContactForm.tsx
"use client";
import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";

const initialState: ContactState = {};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.success) {
    return <p className="text-gold text-center">Mensagem enviada! Retornaremos em breve.</p>;
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Hidden honeypot field -- MUST be visually hidden, not display:none (bots fill both) */}
      <input type="text" name="website" className="sr-only" tabIndex={-1} autoComplete="off" />
      {/* ... visible fields ... */}
      <Button type="submit" disabled={pending}>
        {pending ? "Enviando..." : "Enviar Mensagem"}
      </Button>
    </form>
  );
}
```

### Pattern 4: Cookie Consent Banner (LGPD)

**What:** Client Component shown if localStorage key is not set. Hides on accept or reject.

```tsx
// src/components/site/CookieBanner.tsx
"use client";
import { useState, useEffect } from "react";

const CONSENT_KEY = "primor:cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-gold/20 p-4">
      {/* content */}
    </div>
  );
}
```

### Pattern 5: WhatsApp Floating Button

**What:** Fixed `<a>` tag linking to `wa.me/{number}`. No library needed.

```tsx
// src/components/site/WhatsAppButton.tsx
"use client";

export function WhatsAppButton({ number }: { number: string }) {
  // Strip non-digits, ensure international format
  const clean = number.replace(/\D/g, "");
  return (
    <a
      href={`https://wa.me/${clean}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contato via WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BD5C] transition-colors"
    >
      {/* WhatsApp SVG icon */}
    </a>
  );
}
```

### Pattern 6: Anchor Navigation with Fixed Navbar Offset

**What:** `scroll-padding-top` on the `<html>` element compensates for the fixed navbar height.

**Example** (add to globals.css):
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* matches navbar height */
}
```

Navbar anchor links:
```tsx
<a href="/#servicos">Servicos</a>   // from other pages
<a href="#servicos">Servicos</a>    // from home page
```

### Anti-Patterns to Avoid

- **Fetching data in Client Components:** All Prisma queries must be in Server Components or Server Actions. Never `fetch("/api/services")` from a Client Component.
- **Importing framer-motion directly in Server Components:** Always use the `src/components/motion.tsx` wrapper with `"use client"`.
- **`display: none` honeypot:** Bots detect and skip `display:none` fields. Use `position: absolute; left: -9999px` or Tailwind's `sr-only` class (which uses `position: absolute; width: 1px; height: 1px`).
- **Serialization error from Prisma:** Never pass raw Prisma model objects directly as props across the Server/Client boundary when they contain `Date` objects. Convert dates to ISO strings or use `select` to pick only the fields needed.
- **SiteSettings fetch in every section:** Fetch once in layout, pass as props. Prisma connection pooling still limits the number of open connections.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Class merging | Custom merge function | `cn()` from `@/lib/utils` (already exists) | Handles Tailwind conflict resolution |
| Scroll animation | `IntersectionObserver` manual | framer-motion `whileInView` | Handles SSR hydration edge cases |
| Form pending state | Manual `useState(loading)` | `useActionState` third return value `pending` | React 19 built-in, handles concurrent mode |
| Image optimization | `<img>` with manual sizes | `next/image` | Automatic WebP, lazy loading, CLS prevention |
| Icon set | Custom SVG components | `lucide-react` (already installed) | 1000+ consistent icons, tree-shakeable |

**Key insight:** For a single contact form on an institutional site, `useActionState` + plain Server Action is simpler and less bundle weight than adding react-hook-form.

---

## Common Pitfalls

### Pitfall 1: Serialization Error Across Server/Client Boundary

**What goes wrong:** `Error: Only plain objects can be passed to Client Components from Server Components. Date objects are not supported.`

**Why it happens:** Prisma returns `Date` objects for `createdAt`/`updatedAt`. When you pass a full Prisma record as prop to a Client Component, Next.js rejects it.

**How to avoid:** Use Prisma `select` to pick only the string/number fields needed, or map records to plain objects: `services.map(s => ({ id: s.id, title: s.title, description: s.description, imageUrl: s.imageUrl }))`.

**Warning signs:** TypeScript types show `Date` in props; the component that receives the prop has `"use client"`.

### Pitfall 2: framer-motion Adds Large Bundle if Misused

**What goes wrong:** Every section adds `"use client"` to use `motion.div`, causing full sections to be hydrated client-side unnecessarily.

**Why it happens:** Developers add `"use client"` to the section component instead of creating a wrapper.

**How to avoid:** Use the `src/components/motion.tsx` wrapper. The section component itself remains a Server Component. Only the animated `<motion.div>` elements become client components.

**Warning signs:** `"use client"` appearing at the top of ServicesSection, TestimonialsSection, etc.

### Pitfall 3: Cookie Banner Flicker on Load

**What goes wrong:** The cookie banner briefly appears then disappears (or vice versa) during SSR hydration.

**Why it happens:** Server renders with `visible = false` (no localStorage access on server), client hydrates and reads localStorage. Brief mismatch.

**How to avoid:** Initialize state as `false` and only call `setVisible(true)` inside `useEffect`. This matches SSR output and avoids hydration mismatch. Do not initialize from localStorage during `useState` initialization.

**Warning signs:** Hydration error in console about banner; banner flashes on every page load.

### Pitfall 4: WhatsApp Number Format

**What goes wrong:** Link opens to wrong number or fails if number contains spaces, dashes, parentheses.

**Why it happens:** `wa.me` requires pure digits in international format (e.g., `5511999999999` for Brazil).

**How to avoid:** Strip all non-digits: `number.replace(/\D/g, "")`. Brazilian numbers: `55` (country code) + `11` (DDD) + 9-digit mobile.

### Pitfall 5: SiteSettings Returns null Before First DB Push

**What goes wrong:** `settings` is `null` if seed has not run; destructuring properties causes runtime error.

**Why it happens:** Phase 1 deferred `db:push` because Docker was unavailable in the execution environment.

**How to avoid:** Use optional chaining everywhere: `settings?.whatsappNumber`, `settings?.founderPhotoUrl`. Provide fallback values from `COMPANY` constants when settings is null.

### Pitfall 6: Smooth Scroll with Anchor Hash in Next.js App Router

**What goes wrong:** `<Link href="#servicos">` does not trigger smooth scroll, or scrolls to wrong position behind fixed navbar.

**Why it happens:** Next.js App Router has known issues with `scroll-behavior: smooth` and hash-only navigation.

**How to avoid:** Use plain `<a>` tags for same-page anchor navigation (not `<Link>`). Add `scroll-padding-top` to `html` in globals.css to account for fixed navbar height. For cross-page links (`/privacidade#section`), use `<Link>`.

---

## Code Examples

### Scroll-Reveal Animation (verified pattern from search results + motion.dev docs)
```tsx
// Staggered cards reveal
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {services.map((service, index) => (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Card hover>{/* ... */}</Card>
    </motion.div>
  ))}
</div>
```

### Section Heading Reveal
```tsx
<motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="font-serif text-3xl md:text-4xl text-center text-cream mb-4"
>
  Nossos Servicos
</motion.h2>
```

### Hero Section Entrance (on page load, not scroll)
```tsx
// For hero: animate on mount (no whileInView needed -- it's already visible)
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  {/* hero content */}
</motion.div>
```

### Zod v4 Contact Schema (verified via zod.dev)
```typescript
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),       // z.string().email() still works in v4
  phone: z.string().optional(),
  message: z.string().min(10),
  website: z.string().max(0),      // honeypot -- must be empty
});

// safeParse returns { success: true, data: ... } or { success: false, error: ZodError }
const result = ContactSchema.safeParse(Object.fromEntries(formData));
if (!result.success) {
  return { errors: result.error.flatten().fieldErrors };
}
```

**Note on Zod v4:** `z.string().email()` is deprecated but still works (backward-compat). The new `z.email()` is preferred. For this codebase, either works -- use `z.string().email()` for consistency with existing patterns.

### useActionState Signature (React 19 + Next.js 16)
```typescript
// Server Action: MUST accept prevState as first arg when used with useActionState
export async function submitContact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> { ... }

// Client Component
const [state, formAction, pending] = useActionState(submitContact, {});
```

### Prisma Queries for Public Sections
```typescript
// Services (in page.tsx or section component)
const services = await prisma.service.findMany({
  where: { active: true },
  orderBy: { order: "asc" },
  select: { id: true, title: true, description: true, icon: true, imageUrl: true },
});

// Testimonials
const testimonials = await prisma.testimonial.findMany({
  where: { active: true },
  orderBy: { order: "asc" },
  select: { id: true, name: true, company: true, role: true, content: true, photoUrl: true, rating: true },
});

// SiteSettings singleton
const settings = await prisma.siteSettings.findUnique({
  where: { id: "default" },
});
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `useFormState` (react-dom) | `useActionState` (react) | React 19 | Import from `"react"` not `"react-dom"` |
| `middleware.ts` | `proxy.ts` | Next.js 16 | Already handled in Phase 1 |
| Tailwind `tailwind.config.js` | `@theme inline` in CSS | Tailwind v4 | Already handled in Phase 1 |
| `z.string().email()` | `z.email()` (top-level) | Zod v4 | Both work; `z.string().email()` deprecated but not removed |
| Framer Motion `useViewportScroll` | `useScroll` | framer-motion v6+ | Use `useScroll` if parallax is needed |

**Deprecated/outdated:**
- `useFormState` from `react-dom`: Replaced by `useActionState` from `react` in React 19. The old hook still exists but shows deprecation warning.
- `z.string().email()`: Still works in Zod v4 but is deprecated. Prefer `z.email()` for new code.
- Direct framer-motion import in Server Components: Never works. Always use wrapper.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | TypeScript type-check (tsc --noEmit) |
| Config file | tsconfig.json |
| Quick run command | `pnpm type-check` |
| Full suite command | `pnpm type-check && pnpm build` |

No jest/vitest/playwright is installed in this project. The primary validation mechanism is TypeScript compilation + manual browser smoke testing. Given this is an institutional marketing site (not a payment system or auth-heavy app), the risk profile supports this approach.

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | Notes |
|--------|----------|-----------|-------------------|-------|
| SITE-01 | Navbar renders with links | smoke | `pnpm type-check` | Manual: verify anchor links scroll to sections |
| SITE-02 | Hero section displays headline and CTAs | smoke | `pnpm type-check` | Manual: verify animation plays |
| SITE-03 | Footer displays CNPJ and legal links | smoke | `pnpm type-check` | Manual: verify links navigate |
| SITE-04 | About section displays founder name and photo | smoke | `pnpm type-check` | Manual: verify null fallback when settings is null |
| SITE-05 | Services load from DB, show in grid | smoke | `pnpm type-check` | Manual: verify with seeded data |
| SITE-06 | Testimonials load from DB, show in grid | smoke | `pnpm type-check` | Manual: verify with seeded data |
| SITE-07 | Contact form validates, saves to DB, rejects honeypot | smoke | `pnpm type-check` | Manual: submit form, check honeypot, check DB |
| SITE-08 | WhatsApp button visible on all pages, links to correct number | smoke | `pnpm type-check` | Manual: verify link opens wa.me |
| SITE-09 | Privacy policy page renders with CNPJ | smoke | `pnpm type-check` | Manual: check page at /privacidade |
| SITE-10 | Terms of use page renders with CNPJ | smoke | `pnpm type-check` | Manual: check page at /termos |
| SITE-11 | Cookie banner shows once, hides on accept/reject, persists | smoke | `pnpm type-check` | Manual: clear localStorage, refresh |
| SITE-12 | Animations trigger on scroll | smoke | `pnpm type-check` | Manual: verify in browser |

### Sampling Rate
- **Per task commit:** `pnpm type-check`
- **Per wave merge:** `pnpm type-check && pnpm build`
- **Phase gate:** `pnpm build` must succeed with no errors before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `prisma/seed.ts` -- create seed with 3 services, 2 testimonials, SiteSettings defaults (needed for SITE-05, SITE-06, SITE-04 to show real data). The seed file path is declared in package.json but the file may not exist yet.

Check before starting:
```bash
ls prisma/seed.ts
```

---

## Open Questions

1. **SiteSettings null state during development**
   - What we know: Phase 1 deferred `db:push` + seed because Docker wasn't available in the execution environment
   - What's unclear: Will the seed file exist when Phase 2 starts? Will the Docker DB be running?
   - Recommendation: Every component that reads SiteSettings MUST use optional chaining. Show sensible defaults (company name from `COMPANY` constant) when settings is null. This also handles Vercel preview deploys before seed runs.

2. **Founder photo URL**
   - What we know: `SiteSettings.founderPhotoUrl` is nullable (`String?`). A Cloudinary URL will be provided later.
   - What's unclear: Will the photo be available during Phase 2 implementation?
   - Recommendation: Use `next/image` with the Cloudinary URL when provided. Show a placeholder avatar (gold background with initials "JA") when null.

3. **One-page vs multi-page layout**
   - What we know: Requirements say Hero, About, Services, Testimonials, Contact are all sections on the home page
   - What's unclear: Should Contact be a separate route (`/contato`) or just `/#contato`?
   - Recommendation: Single page with anchor sections for the main content. The CTA button scrolls to `#contato`. No separate `/contato` route needed in v1.

---

## Sources

### Primary (HIGH confidence)
- Next.js official docs (nextjs.org/docs/app/guides/forms) -- Server Actions, useActionState, form validation pattern. Verified version 16.1.6.
- Next.js official docs (nextjs.org/docs/app/getting-started/metadata-and-og-images) -- metadata export pattern
- React official docs (react.dev/reference/react/useActionState) -- useActionState signature
- npm registry -- framer-motion@12.35.2 (latest), zod@4.3.6 (latest) confirmed

### Secondary (MEDIUM confidence)
- zod.dev/v4/changelog -- Zod v4 breaking changes: `z.string().email()` deprecated, `z.email()` new top-level. Verified official source.
- motion.dev docs (search-verified) -- whileInView, viewport.once, viewport.amount props. Multiple sources agree on pattern.
- Next.js GitHub issues #51721, #54240 -- anchor scroll behavior with App Router. Known issues, workaround: plain `<a>` tags + `scroll-padding-top`.

### Tertiary (LOW confidence, flagged)
- Search results for cookie consent pattern -- pattern is simple enough that multiple implementations agree. LOW confidence on exact localStorage key naming convention (arbitrary).
- WhatsApp `wa.me` URL format -- widely documented but not verified against official WhatsApp Business docs.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all packages verified on npm, versions match EmporioSite
- Architecture: HIGH -- patterns from Next.js official docs, verified code examples
- Pitfalls: HIGH -- most sourced from actual project gotchas (Prisma serialization, framer-motion "use client") with official doc backing
- Animation patterns: MEDIUM -- framer-motion docs were inaccessible directly (CSS-only fetch), but patterns verified via multiple search results that agree

**Research date:** 2026-03-11
**Valid until:** 2026-04-11 (stable stack, 30-day window)
