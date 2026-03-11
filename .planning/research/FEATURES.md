# Feature Landscape

**Domain:** Institutional consulting/holding website (lead generation + credibility)
**Researched:** 2026-03-11
**Overall confidence:** HIGH

---

## Table Stakes

Features visitors expect from a professional consulting firm website. Missing any of these makes the site feel incomplete, amateur, or untrustworthy. A consulting firm that cannot present itself well online will not be trusted to advise businesses.

| # | Feature | Why Expected | Complexity | Notes |
|---|---------|--------------|------------|-------|
| 1 | **Hero section with clear value proposition** | Visitors decide in 5 seconds if the site is worth their time. The hero must communicate who Primor Holding is, what they do, and for whom -- immediately. | Low | Dark blue background, strong headline, subtle animation (fade-in text via framer-motion). Single CTA button "Fale Conosco" or "Agende uma Conversa". |
| 2 | **Navigation bar (sticky, professional)** | Standard UX pattern. Users expect to jump between sections. Consulting firms like McKinsey/BCG use minimal, clean navbars. | Low | Logo left, nav links center/right, mobile hamburger. Links: Inicio, Sobre, Servicos, Depoimentos, Blog, Contato. Sticky on scroll with slight backdrop blur. |
| 3 | **About / Founder section** | Trust is the product. Visitors need to see who is behind the firm. Joao Antonio's personal story + photo creates human connection and authority. | Low | Photo of founder, short biography, professional trajectory. "Challenge -> Solution -> Result" narrative style. Should feel personal yet authoritative. |
| 4 | **Services section with dynamic cards** | The core offer must be visible and scannable. Cards allow admin to add/edit services without code changes. | Medium | Icon + title + short description per card. Click to expand or navigate to detail page. Admin CRUD via panel. Order/position field for sorting. |
| 5 | **Testimonials / Social proof section** | 92% of consumers trust peer recommendations over advertising. Anonymous or missing testimonials destroy credibility. | Medium | Client name, company (optional), role, quote, optional photo. Carousel or grid layout. Admin CRUD. 5 strong testimonials > 30 generic ones. |
| 6 | **Contact form** | Primary conversion mechanism. Research shows reducing form fields from 11 to 4 boosts conversion by 120%. | Low | Fields: Nome, Email, Telefone (optional), Mensagem. Server-side validation with Zod + email notification to admin. Saves to DB for admin panel viewing. CTA button text: "Enviar Mensagem" (not generic "Enviar"). |
| 7 | **WhatsApp floating button** | Brazil-specific table stake. WhatsApp is on 99% of Brazilian smartphones and is the dominant business communication channel. Banco Mercantil saw 40% of total sales driven via WhatsApp. Absence feels like the business is unreachable. | Low | Fixed position bottom-right, green WhatsApp icon, opens `wa.me/{number}?text=` with pre-filled message. Subtle entrance animation. LGPD-safe (user initiates contact). |
| 8 | **Responsive / mobile-first design** | 48% of website visits are mobile, 50% of B2B inquiries happen on mobile. In Brazil, mobile internet access is predominant. A non-responsive consulting site looks amateurish. | Medium | Tailwind v4 handles this natively. Test all sections at 375px, 768px, 1024px, 1440px. Hamburger menu on mobile. Touch-friendly tap targets (min 44px). |
| 9 | **LGPD compliance: Cookie consent banner** | Legal requirement in Brazil. ANPD can fine non-compliant sites up to 2% of revenue or R$50M. Consent must be specific per category, not pre-ticked. | Medium | Banner with categories (Necessarios, Analitica, Marketing). Must identify each third party by name (e.g., Google Analytics). Options: "Aceitar Todos", "Rejeitar", "Personalizar". Consent stored in cookie. Plain language, clearly visible. |
| 10 | **LGPD compliance: Privacy Policy page** | Legal requirement. Must explain what data is collected, purposes, legal basis, third parties, data subject rights (access, rectification, deletion, portability), DPO contact, retention period. | Low | Static page with dynamic CNPJ/company info from SiteSettings. Must be comprehensive but in plain language (LGPD requirement). |
| 11 | **LGPD compliance: Terms of Use page** | Standard legal page expected by any professional website. Covers intellectual property, liability, governing law. | Low | Static content with dynamic company info. |
| 12 | **Footer with company info** | Standard element. Brazilian visitors specifically check CNPJ in footer to verify legitimacy. Missing CNPJ = potential scam perception. | Low | Logo, CNPJ (when provided -- use placeholder until client provides), email, phone, social links (LinkedIn, Instagram), legal page links (Privacidade, Termos), copyright year. |
| 13 | **Admin panel: Authentication** | Admin content management must be protected. Clerk v7 provides this without building custom auth. | Low | Clerk sign-in for admin. Only admin role can access /admin/*. No public user registration. Role check via Clerk public metadata `{ "role": "admin" }`. |
| 14 | **Admin panel: Services CRUD** | Content must be manageable without developer intervention. The business owner needs to add/edit/remove services as offerings evolve. | Medium | Fields: title, slug (auto-generated), description (text), icon name or image (Cloudinary), order/position (drag or number), active/inactive toggle. List view with reorder capability. |
| 15 | **Admin panel: Testimonials CRUD** | Admin adds real client testimonials. Social proof must be fresh -- research recommends updating quarterly. | Low | Fields: client name, role/title, company (optional), quote text, photo (optional via Cloudinary), featured toggle, display order. |
| 16 | **Admin panel: Contacts received** | Admin needs to see and manage inbound leads. This is the business's inbox for the site. | Low | List view with read/unread status, date filter, search. Mark as read. Delete. Email notification on new contact (see Differentiators). |
| 17 | **SEO fundamentals** | Consulting firms live on Google visibility. Without basic SEO, the site is invisible to potential clients searching for "consultoria empresarial". | Medium | Meta tags per page (title, description, og:image). Semantic HTML (h1-h6 hierarchy). Sitemap.xml via next-sitemap. robots.txt. Alt text on all images. Canonical URLs. |
| 18 | **Performance (Core Web Vitals)** | Google penalizes slow pages in rankings. A consulting firm whose own site is slow undermines its credibility message about operational excellence. | Low | Next.js 16 SSR/SSG handles this well. Cloudinary image optimization (format auto, quality auto, responsive widths). Lazy load below-fold content. Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms. |

---

## Differentiators

Features that set Primor Holding apart from generic consulting firm websites. Not expected by visitors, but create competitive advantage, premium perception, and deeper engagement.

| # | Feature | Value Proposition | Complexity | Notes |
|---|---------|-------------------|------------|-------|
| 1 | **Scroll-triggered animations (framer-motion)** | Creates a premium, polished feel that distinguishes from template sites. McKinsey/BCG-level sites use subtle motion to guide attention and create engagement. Most Brazilian consulting firms use static pages. | Medium | Use `whileInView` with `once: true` from framer-motion. Staggered children animations for card grids. Keep subtle: 200-400ms duration, ease-out curve. MUST respect `prefers-reduced-motion` media query. |
| 2 | **Methodology / Process section** | Explaining HOW the firm works (not just WHAT services) builds trust and differentiates from firms that just list offerings. Shows structured thinking -- exactly what clients want from a consultant. | Low | 3-5 step visual timeline or horizontal stepper: Diagnostico -> Planejamento -> Estrategia -> Implementacao -> Acompanhamento. Icon + title + short description per step. Static content in v1, no admin CRUD needed. |
| 3 | **Impact metrics / Numbers section** | Quantifiable results are more convincing than words. Animated counters create engagement. "15+ anos de experiencia", "200+ empresas atendidas", "+30% crescimento medio dos clientes". | Low | 3-4 key metrics with animated counter on scroll (framer-motion `useMotionValue` or simple CSS counter). Hardcoded in v1, admin-editable via SiteSettings in v2. Only use real numbers -- never fabricate metrics. |
| 4 | **Blog admin CRUD (content preparation)** | Content marketing is the #1 lead generation strategy for consulting firms. Having admin infrastructure ready means v2 public blog launch requires only a page component, not a data layer rebuild. | Medium | Admin CRUD: title, slug (auto-gen), content (markdown), excerpt, featured image (Cloudinary), category/tag, status (draft/published), author, SEO meta description, publishedAt date. No public blog page in v1 per PROJECT.md. |
| 5 | **Service detail pages** | Instead of just cards on homepage, clicking a service opens a dedicated page with full description, benefits, use cases, and a CTA. Shows depth of expertise per area. Improves SEO with service-specific keywords. | Medium | Dynamic route `/servicos/[slug]`. Content: headline, rich description, key benefits list, ideal client profile, related testimonial (if any), CTA to contact form/WhatsApp. Requires slug field on Service model. |
| 6 | **Client logo strip ("Brag bar")** | Visual shorthand for credibility. Even 4-5 recognizable logos instantly elevate perceived authority. Research shows client logos are one of the most effective social proof elements. | Low | Horizontal strip of grayscale logos, subtle opacity or color animation on hover. Admin can upload via Cloudinary. CRITICAL: Only use logos with explicit client permission. If no permission exists, skip this section entirely -- never use fake or unauthorized logos. |
| 7 | **JSON-LD structured data** | Enhances Google search appearance with rich snippets. Organization schema shows company info, logo, and contact directly in search results. ProfessionalService schema categorizes the business correctly. | Low | JSON-LD in root layout: Organization (name, logo, url, contactPoint, sameAs for social profiles), LocalBusiness (address, phone, geo coordinates), ProfessionalService. Add Article schema to blog posts when they go public in v2. |
| 8 | **Email notification on new contact** | Admin gets instant alert when a lead submits the form. Without this, leads sit in the DB unseen for hours/days. Speed of response directly correlates with conversion rate. | Low | Use Resend (already familiar from other projects). Simple HTML email with contact name, email, phone, message preview, and link to admin panel. Rate-limited to prevent abuse. |
| 9 | **Page/section transition animations** | Smooth transitions create an app-like feel that distinguishes from standard multi-page sites. Premium consulting firms invest in motion design. | Low | framer-motion `AnimatePresence` for page transitions (fade, 200ms). Section entry animations with `whileInView`. Keep all transitions under 300ms to avoid feeling sluggish. |
| 10 | **Dark premium aesthetic (the theme itself)** | Brazilian consulting market is flooded with generic white/light-blue WordPress template sites. A dark navy background with cream/gold accents immediately communicates premium positioning, exclusivity, and seriousness. | Low | Already in scope per project context. Ensure WCAG AA contrast ratios on all text. Text on dark: cream (#F5F0E6) or white, never medium gray. Gold/amber accents for CTAs and highlights. Playfair Display for headings (serif = authority). |
| 11 | **SiteSettings admin management** | Centralized configuration for site-wide values (company name, CNPJ, phone, email, WhatsApp number, social links, SEO defaults). Avoids hardcoding business details. | Medium | Single-row DB table. Admin form to edit. Used by footer, legal pages, meta tags, WhatsApp button, contact email. Essential for maintainability. |

---

## Anti-Features

Features to explicitly NOT build in v1. Including these would add complexity without proportional value, distract from core conversion goals, or damage the premium user experience.

| # | Anti-Feature | Why Avoid | What to Do Instead |
|---|--------------|-----------|-------------------|
| 1 | **Public blog / articles page** | PROJECT.md explicitly marks this as v2. No content exists yet. Empty blog pages hurt credibility more than no blog. Building it now means maintaining and designing pages with zero content to show. | Build admin CRUD for posts so content can be prepared offline. Launch public page in v2 when 5+ quality posts exist. |
| 2 | **Client login / portal area** | A consulting firm's website is a brochure and lead-gen tool, not a client portal. Client areas add auth complexity, session management, and security surface for zero lead-gen value. Consulting is high-touch. | Keep auth Clerk-only for admin. Clients interact via WhatsApp, email, phone, and in-person meetings. |
| 3 | **E-commerce / payments** | Consulting services are high-ticket, relationship-based sales (R$10k-500k+ engagements). Nobody buys strategy consulting via shopping cart checkout. Payment processing adds PCI compliance burden. | Contact form + WhatsApp is the conversion path. Proposals and invoicing happen offline via traditional business processes. |
| 4 | **Live chat / chatbot** | Adds maintenance burden (someone must respond in real-time or chatbot gives bad answers), third-party dependency, monthly costs, and can feel cheap/impersonal on a premium institutional site. | WhatsApp floating button serves the same purpose -- instant messaging -- but is more natural in Brazil and the client already uses WhatsApp for business. |
| 5 | **Newsletter signup** | Requires ongoing email content creation commitment. An empty or infrequent newsletter kills credibility faster than no newsletter. Needs blog content to have anything to send. | Defer to v2 when blog is active and content pipeline exists. Contact form captures leads effectively for now. |
| 6 | **Multi-language (i18n)** | Target audience is 100% Brazilian businesses. English adds translation maintenance, doubles content management effort, and has near-zero ROI for a local consulting firm. | Build entirely in pt-BR. Set `lang="pt-BR"` on `<html>`. All content, error messages, meta tags, alt text in Portuguese. If international expansion happens, add i18n as a dedicated project. |
| 7 | **Complex rich text editor (WYSIWYG)** | TipTap, Slate, or similar editors add 50-100KB of JS, significant complexity, and edge-case bugs for blog content that doesn't exist yet and won't be public in v1. | Use markdown/textarea for blog post content in admin. Render with a lightweight markdown library (react-markdown) when blog goes public. Simple, reliable, maintainable. |
| 8 | **Custom analytics dashboard in admin** | Reinventing Google Analytics or Plausible. Building charts, tracking, session analysis is a product in itself. Zero value over existing free tools. | Add Google Analytics 4 or Plausible (privacy-focused, LGPD-friendly) via script tag. View analytics in their native, purpose-built dashboards. |
| 9 | **Appointment scheduling / calendar integration** | Requires Google Calendar API, timezone handling, availability management, conflict resolution, reminder emails. Massive complexity for a feature that a WhatsApp message handles in 30 seconds. | CTA leads to WhatsApp or contact form. The founder schedules meetings manually -- this is a small firm, not an enterprise with 200 consultants. |
| 10 | **Social media feed embed** | Instagram/LinkedIn embed APIs change frequently, break without warning, add external JS dependencies (slow), create layout shifts (CLS), and look dated quickly when feed content ages. | Link to social profiles in footer with icons. Let users visit the actual social pages where content is native and always current. |
| 11 | **Video background in hero** | Heavy bandwidth usage (2-10MB), poor mobile performance, accessibility issues (motion sensitivity), distracting from the value proposition text, and often looks corporate-generic rather than premium. | Use a strong static gradient or high-quality image with subtle framer-motion text animation. Lighter weight, equally impactful, more accessible. |
| 12 | **Case studies as separate content type** | With no public blog yet and likely few documented case studies available, building a separate data model, admin CRUD, and public pages is premature. Separate content types increase schema complexity and admin cognitive load. | Use testimonials with specific outcomes for social proof in v1. In v2, case studies can be a category of blog posts (same infrastructure), or a dedicated section if demand warrants it. |
| 13 | **Dark mode toggle** | An institutional site needs ONE authoritative visual identity. A toggle implies the brand doesn't know what it looks like. Premium firms (McKinsey, BCG) never offer theme toggles. The dark blue IS the brand. | Single professional dark navy theme. No toggle. Consistent brand identity across all pages. |

---

## Feature Dependencies

```
Navigation bar       --> All public sections (provides access to them)
Prisma schema + DB   --> All CRUD features + contact form + SiteSettings
Clerk auth setup     --> All admin panel features

Admin Auth (Clerk)
  |
  +--> SiteSettings CRUD   --> Footer (CNPJ, phone, email, social)
  |                         --> Legal pages (company info, DPO contact)
  |                         --> WhatsApp button (phone number)
  |                         --> SEO meta tags (default title, description)
  |
  +--> Services CRUD       --> Services section (homepage cards)
  |                         --> Service detail pages (/servicos/[slug])
  |
  +--> Testimonials CRUD   --> Testimonials section (homepage)
  |                         --> Service detail pages (related testimonial)
  |
  +--> Blog Posts CRUD     --> [Public blog in v2, not v1]
  |
  +--> Contacts list       <-- Contact form (public, saves to DB)
                            <-- Email notification (triggers on form submit)

Cloudinary setup     --> Founder photo (About section)
                     --> Service images (admin upload)
                     --> Testimonial photos (admin upload)
                     --> Client logos (brag bar, if used)

Cookie consent banner --> Privacy Policy page (banner links to it)
Privacy Policy page   --> SiteSettings (CNPJ, DPO contact info)

Contact form          --> Zod validation (server-side)
                      --> Resend email setup (notification)
                      --> Contact model in Prisma (persistence)

framer-motion         --> Scroll animations (all sections)
                      --> Page transitions
                      --> Impact counter animation
                      --> WhatsApp button entrance

SEO meta tags         --> SiteSettings (dynamic defaults)
                      --> Per-page overrides (title, description)
JSON-LD schema        --> SiteSettings (organization data)
                      --> Service model (for service page schema)
```

---

## MVP Recommendation

### Priority 1: Foundation (everything else depends on this)

1. **Prisma schema + Neon DB setup** -- Service, Testimonial, Contact, Post, SiteSettings models
2. **Admin auth (Clerk v7)** -- middleware protecting /admin/*, role check
3. **SiteSettings admin** -- centralized config for all dynamic site data
4. **Admin CRUD: Services** -- populate service cards
5. **Admin CRUD: Testimonials** -- populate social proof
6. **Admin CRUD: Contacts list** -- view submitted leads

### Priority 2: Public Site (the visible product)

7. **Layout shell: Nav + Footer** -- consistent structure across all pages
8. **Hero section** -- first impression, value proposition, primary CTA
9. **About / Founder section** -- trust and human connection
10. **Services section (homepage cards)** -- what the firm does
11. **Testimonials section** -- social proof
12. **Contact form + email notification** -- conversion mechanism
13. **WhatsApp floating button** -- secondary conversion path

### Priority 3: Compliance + Polish

14. **LGPD: Cookie banner** -- legal requirement
15. **LGPD: Privacy Policy + Terms of Use** -- legal pages
16. **SEO: Meta tags + JSON-LD + sitemap** -- discoverability
17. **Scroll animations (framer-motion)** -- premium feel
18. **Methodology/Process section** -- differentiation
19. **Impact metrics section** -- credibility numbers

### Priority 4: Content Depth

20. **Service detail pages (`/servicos/[slug]`)** -- deeper engagement per service
21. **Blog admin CRUD** -- prepare content pipeline for v2
22. **Client logo strip** -- only if real, authorized logos available

### Defer to v2

- Public blog pages (launch when 5+ posts ready)
- Newsletter signup (needs blog content pipeline)
- Case studies as dedicated content type
- Appointment scheduling
- Advanced analytics in admin

---

## Brazilian Market Specifics

| Aspect | Implication | Action |
|--------|-------------|--------|
| **WhatsApp dominance** | 99% of Brazilian smartphones have WhatsApp. It is THE primary business communication channel, not an alternative. Banco Mercantil saw 40% of total sales driven via WhatsApp. | Floating button is absolute table stakes. Pre-filled message: "Ola! Gostaria de saber mais sobre os servicos da Primor Holding." Position: bottom-right, always visible. |
| **LGPD enforcement (active)** | ANPD is actively enforcing since 2023. Fines up to 2% of revenue or R$50M per infraction. Cookie consent must be granular with specific party identification, not just "accept all". | Implement proper cookie banner with named categories and third-party identification. Privacy policy must include DPO contact, data subject rights, retention periods. Consent cannot use pre-ticked boxes. |
| **CNPJ as trust signal** | Brazilian visitors actively check CNPJ in footer to verify business legitimacy. Missing CNPJ raises fraud suspicion, especially for service businesses. | Display CNPJ prominently in footer. Store in SiteSettings. Use placeholder text ("CNPJ: A ser informado") until client provides the number. Never leave the field completely empty. |
| **Portuguese-only market** | Target market is 100% Brazilian businesses. English adds zero value and doubles maintenance. Error messages, validation text, date formats, currency -- everything must be Brazilian. | All content in pt-BR. Set `lang="pt-BR"` on `<html>`. Date format: dd/mm/yyyy. Currency: R$ with comma decimal. Phone format: (XX) XXXXX-XXXX. |
| **Dark/premium aesthetic gap** | Brazilian consulting market is saturated with generic white/light-blue WordPress template sites. A dark, premium aesthetic immediately differentiates and communicates high-end positioning. | Dark navy (#0F1B2D or similar) + cream/gold accents. High contrast for readability. Professional photography of founder, not stock photos. Serif font for headings (authority), sans-serif for body (clarity). |
| **Mobile-first reality** | Brazilian internet access is predominantly mobile. Many business owners browse on phones during commutes or between meetings. Desktop is secondary. | Every section must work flawlessly on mobile first. WhatsApp button is especially critical on mobile (opens native app directly). Contact form must be easy to fill on phone. No horizontal scrolling. |
| **Trust through formality** | Brazilian B2B culture values formal presentation. A consulting firm must look established, serious, and institutional. Casual design erodes confidence. | Use formal language (voce formal or third person), professional typography, structured layout. Avoid emoji, slang, or overly casual copy. The site should feel like walking into a high-end office. |

---

## Sources

- [Consulting Success - Building a Client-Generating Consulting Website](https://www.consultingsuccess.com/consulting-website) - HIGH confidence (industry authority, comprehensive guide)
- [Consulting Success - 45 Best Consulting Websites](https://www.consultingsuccess.com/best-consulting-websites) - HIGH confidence (curated examples with analysis)
- [Consulting Success - Consulting Testimonials and Case Studies](https://www.consultingsuccess.com/consulting-testimonials) - HIGH confidence (specific implementation guidance)
- [Knapsack Creative - Social Proof on Consulting Websites](https://knapsackcreative.com/blog-industry/consulting-website-social-proof) - MEDIUM confidence (practical placement strategies)
- [Freelance Cake - Consultant Website Examples](https://www.freelancecake.com/blog/consultant-website-examples) - MEDIUM confidence (pattern analysis across examples)
- [Captain Compliance - LGPD Compliance Checklist 2026](https://captaincompliance.com/education/lgpd-compliance-checklist/) - MEDIUM confidence (comprehensive checklist)
- [CookieYes - Brazil's LGPD Guide](https://www.cookieyes.com/blog/brazils-data-protection-law-lgpd/) - MEDIUM confidence (specific consent requirements)
- [Cookie Information - LGPD Regulations](https://cookieinformation.com/regulations/lgpd/) - MEDIUM confidence (cookie-specific LGPD requirements)
- [WPForms - Form Conversion Best Practices](https://wpforms.com/research-based-tips-to-improve-contact-form-conversions/) - MEDIUM confidence (research-backed conversion data)
- [Qualimero - WhatsApp Button for Website Guide](https://qualimero.com/en/blog/whatsapp-button-website-guide-html-generators-ai-strategy) - MEDIUM confidence (implementation patterns)
- [LGPD Brasil - WhatsApp e LGPD](https://lgpdbrasil.com.br/whatsapp-nas-empresas-e-a-adequacao-da-lgpd/) - MEDIUM confidence (Brazilian legal source)
- [Emergent - Best Website Builders for Consulting 2026](https://emergent.sh/learn/best-website-builders-for-consulting-businesses) - LOW confidence (general patterns only)
- [BlendB2B - Website Design Agencies for Consulting Firms](https://www.blendb2b.com/blog/best-website-design-agencies-management-consulting-firms) - LOW confidence (design agency perspective)
- BCG.com structural analysis (direct fetch) - HIGH confidence (first-party observation)
- PROJECT.md requirements - HIGH confidence (primary project document)
