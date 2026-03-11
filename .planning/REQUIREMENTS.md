# Requirements: Primor Holding

**Defined:** 2026-03-11
**Core Value:** O visitante deve sair com credibilidade suficiente para entrar em contato — o site precisa transmitir autoridade e facilitar o contato.

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Projeto Next.js 16 scaffoldado com TypeScript, Tailwind v4, Prisma 7 e Docker Compose (PostgreSQL local)
- [ ] **FOUND-02**: `.gitignore` configurado antes de qualquer commit — nenhuma env, secret ou chave de API pode vazar no repo público
- [ ] **FOUND-03**: `.env.example` com todos os campos necessários (sem valores reais) e CLAUDE.md do projeto documentado
- [ ] **FOUND-04**: `proxy.ts` configurado com Clerk v7 protegendo rotas `/admin/*`
- [ ] **FOUND-05**: Schema Prisma com modelos: Service, Testimonial, BlogPost, Contact, SiteSettings
- [ ] **FOUND-06**: Tema visual configurado — azul escuro (#0A1628 ou similar), tipografia profissional, componentes base (Button, Card, Section)

### Public Site

- [ ] **SITE-01**: Navbar fixa com logo Primor Holding, links âncora para seções, e botão CTA de contato
- [ ] **SITE-02**: Seção Hero com headline impactante, subtítulo descritivo e CTA para contato
- [ ] **SITE-03**: Footer com nome da empresa, CNPJ (placeholder até fornecido), links para páginas legais e redes sociais
- [ ] **SITE-04**: Seção "Sobre" com história detalhada de João Antônio Lopes Corrêa e sua foto profissional
- [ ] **SITE-05**: Seção "Serviços" com cards dinâmicos puxados do banco (título, descrição, ícone/imagem)
- [ ] **SITE-06**: Seção "Depoimentos" com grid ou carrossel de depoimentos puxados do banco
- [ ] **SITE-07**: Seção/página "Contato" com formulário (Nome, Email, Telefone opcional, Mensagem) com validação e proteção anti-spam (honeypot)
- [ ] **SITE-08**: Botão flutuante de WhatsApp visível em todas as páginas, com número configurável
- [ ] **SITE-09**: Página de Política de Privacidade conforme LGPD (com placeholder de CNPJ)
- [ ] **SITE-10**: Página de Termos de Uso (com placeholder de CNPJ)
- [ ] **SITE-11**: Banner/modal de consentimento de cookies conforme LGPD — com opção de aceitar/recusar, persistência da escolha
- [ ] **SITE-12**: Animações de entrada com framer-motion — elementos aparecem ao rolar a página

### Admin Panel

- [ ] **ADMIN-01**: Página de sign-in admin (`/admin/sign-in`) via Clerk, com redirect para dashboard após login
- [ ] **ADMIN-02**: Dashboard admin com resumo: total de serviços, depoimentos, posts, contatos não lidos
- [ ] **ADMIN-03**: CRUD completo de Serviços — criar, editar, remover serviços com upload de imagem via Cloudinary
- [ ] **ADMIN-04**: CRUD completo de Depoimentos — criar, editar, remover depoimentos com foto do cliente via Cloudinary
- [ ] **ADMIN-05**: CRUD completo de Posts de Blog — criar, editar, rascunho/publicado, sem página pública em v1
- [ ] **ADMIN-06**: Visualizador de Contatos — lista de mensagens do formulário, marcar como lido/não lido, ver detalhes

### Deploy & Infrastructure

- [ ] **DEPLOY-01**: Repositório GitHub público criado na conta `00sth` com README descritivo — sem secrets, sem .env
- [ ] **DEPLOY-02**: Deploy funcional no Vercel com todas as variáveis de ambiente configuradas no painel Vercel
- [ ] **DEPLOY-03**: Meta tags SEO (title, description, keywords), OpenGraph para compartilhamento em redes sociais
- [ ] **DEPLOY-04**: `sitemap.xml` e `robots.txt` gerados automaticamente pelo Next.js
- [ ] **DEPLOY-05**: Seed do banco com dados iniciais — 3 serviços modelo, 1 depoimento de exemplo, SiteSettings padrão

## v2 Requirements

### Blog Público

- **BLOG-01**: Página pública `/blog` listando posts publicados
- **BLOG-02**: Página individual de post `/blog/[slug]` com SEO otimizado
- **BLOG-03**: Compartilhamento em redes sociais por post

### Melhorias de Contato

- **CONT-01**: Notificação por email (Resend) quando novo contato chega — enviada para o admin
- **CONT-02**: Rate limiting robusto no formulário de contato

### Analytics & Conversão

- **ANLT-01**: Google Analytics gateado por consentimento LGPD
- **ANLT-02**: Tracking de conversões (cliques em WhatsApp, envio de formulário)

### Finalizações Legais

- **LEG-01**: Páginas legais finalizadas com CNPJ real, endereço e dados completos da empresa

## Out of Scope

| Feature | Reason |
|---------|--------|
| Área de cliente logado | Não é objetivo — site institucional sem serviço digital |
| E-commerce / pagamentos | Fora do escopo de consultoria institucional |
| App mobile | Web-first; mobile é responsividade, não app nativo |
| Chat em tempo real | Complexidade desnecessária — WhatsApp cumpre o papel |
| Multi-idioma | Mercado brasileiro, português apenas |
| Busca de conteúdo | Poucos itens, não justifica infraestrutura de busca |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Pending |
| FOUND-06 | Phase 1 | Pending |
| SITE-01 | Phase 2 | Pending |
| SITE-02 | Phase 2 | Pending |
| SITE-03 | Phase 2 | Pending |
| SITE-04 | Phase 2 | Pending |
| SITE-05 | Phase 2 | Pending |
| SITE-06 | Phase 2 | Pending |
| SITE-07 | Phase 2 | Pending |
| SITE-08 | Phase 2 | Pending |
| SITE-09 | Phase 3 | Pending |
| SITE-10 | Phase 3 | Pending |
| SITE-11 | Phase 3 | Pending |
| SITE-12 | Phase 3 | Pending |
| ADMIN-01 | Phase 3 | Pending |
| ADMIN-02 | Phase 3 | Pending |
| ADMIN-03 | Phase 3 | Pending |
| ADMIN-04 | Phase 3 | Pending |
| ADMIN-05 | Phase 3 | Pending |
| ADMIN-06 | Phase 3 | Pending |
| DEPLOY-01 | Phase 4 | Pending |
| DEPLOY-02 | Phase 4 | Pending |
| DEPLOY-03 | Phase 4 | Pending |
| DEPLOY-04 | Phase 4 | Pending |
| DEPLOY-05 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 29 total
- Mapped to phases: 29
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-11*
*Last updated: 2026-03-11 after initial definition*
