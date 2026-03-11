# Requirements: Primor Holding

**Defined:** 2026-03-11
**Core Value:** O visitante deve sair com credibilidade suficiente para entrar em contato -- o site precisa transmitir autoridade e facilitar o contato.

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Projeto Next.js 16 scaffoldado com TypeScript, Tailwind v4, Prisma 7 e Docker Compose (PostgreSQL local)
- [x] **FOUND-02**: `.gitignore` configurado antes de qualquer commit -- nenhuma env, secret ou chave de API pode vazar no repo publico
- [x] **FOUND-03**: `.env.example` com todos os campos necessarios (sem valores reais) e CLAUDE.md do projeto documentado
- [x] **FOUND-04**: `proxy.ts` configurado com Clerk v7 protegendo rotas `/admin/*`
- [x] **FOUND-05**: Schema Prisma com modelos: Service, Testimonial, BlogPost, Contact, SiteSettings
- [x] **FOUND-06**: Tema visual configurado -- azul escuro (#0A1628 ou similar), tipografia profissional, componentes base (Button, Card, Section)

### Public Site

- [x] **SITE-01**: Navbar fixa com logo Primor Holding, links ancora para secoes, e botao CTA de contato
- [ ] **SITE-02**: Secao Hero com headline impactante, subtitulo descritivo e CTA para contato
- [x] **SITE-03**: Footer com nome da empresa, CNPJ (placeholder ate fornecido), links para paginas legais e redes sociais
- [ ] **SITE-04**: Secao "Sobre" com historia detalhada de Joao Antonio Lopes Correa e sua foto profissional
- [ ] **SITE-05**: Secao "Servicos" com cards dinamicos puxados do banco (titulo, descricao, icone/imagem)
- [ ] **SITE-06**: Secao "Depoimentos" com grid ou carrossel de depoimentos puxados do banco
- [ ] **SITE-07**: Secao/pagina "Contato" com formulario (Nome, Email, Telefone opcional, Mensagem) com validacao e protecao anti-spam (honeypot)
- [x] **SITE-08**: Botao flutuante de WhatsApp visivel em todas as paginas, com numero configuravel
- [ ] **SITE-09**: Pagina de Politica de Privacidade conforme LGPD (com placeholder de CNPJ)
- [ ] **SITE-10**: Pagina de Termos de Uso (com placeholder de CNPJ)
- [x] **SITE-11**: Banner/modal de consentimento de cookies conforme LGPD -- com opcao de aceitar/recusar, persistencia da escolha
- [x] **SITE-12**: Animacoes de entrada com framer-motion -- elementos aparecem ao rolar a pagina

### Admin Panel

- [ ] **ADMIN-01**: Pagina de sign-in admin (`/admin/sign-in`) via Clerk, com redirect para dashboard apos login
- [ ] **ADMIN-02**: Dashboard admin com resumo: total de servicos, depoimentos, posts, contatos nao lidos
- [ ] **ADMIN-03**: CRUD completo de Servicos -- criar, editar, remover servicos com upload de imagem via Cloudinary
- [ ] **ADMIN-04**: CRUD completo de Depoimentos -- criar, editar, remover depoimentos com foto do cliente via Cloudinary
- [ ] **ADMIN-05**: CRUD completo de Posts de Blog -- criar, editar, rascunho/publicado, sem pagina publica em v1
- [ ] **ADMIN-06**: Visualizador de Contatos -- lista de mensagens do formulario, marcar como lido/nao lido, ver detalhes

### Deploy & Infrastructure

- [ ] **DEPLOY-01**: Repositorio GitHub publico criado na conta `00sth` com README descritivo -- sem secrets, sem .env
- [ ] **DEPLOY-02**: Deploy funcional no Vercel com todas as variaveis de ambiente configuradas no painel Vercel
- [ ] **DEPLOY-03**: Meta tags SEO (title, description, keywords), OpenGraph para compartilhamento em redes sociais
- [ ] **DEPLOY-04**: `sitemap.xml` e `robots.txt` gerados automaticamente pelo Next.js
- [ ] **DEPLOY-05**: Seed do banco com dados iniciais -- 3 servicos modelo, 1 depoimento de exemplo, SiteSettings padrao

## v2 Requirements

### Blog Publico

- **BLOG-01**: Pagina publica `/blog` listando posts publicados
- **BLOG-02**: Pagina individual de post `/blog/[slug]` com SEO otimizado
- **BLOG-03**: Compartilhamento em redes sociais por post

### Melhorias de Contato

- **CONT-01**: Notificacao por email (Resend) quando novo contato chega -- enviada para o admin
- **CONT-02**: Rate limiting robusto no formulario de contato

### Analytics & Conversao

- **ANLT-01**: Google Analytics gateado por consentimento LGPD
- **ANLT-02**: Tracking de conversoes (cliques em WhatsApp, envio de formulario)

### Finalizacoes Legais

- **LEG-01**: Paginas legais finalizadas com CNPJ real, endereco e dados completos da empresa

## Out of Scope

| Feature | Reason |
|---------|--------|
| Area de cliente logado | Nao e objetivo -- site institucional sem servico digital |
| E-commerce / pagamentos | Fora do escopo de consultoria institucional |
| App mobile | Web-first; mobile e responsividade, nao app nativo |
| Chat em tempo real | Complexidade desnecessaria -- WhatsApp cumpre o papel |
| Multi-idioma | Mercado brasileiro, portugues apenas |
| Busca de conteudo | Poucos itens, nao justifica infraestrutura de busca |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| SITE-01 | Phase 2 | Complete |
| SITE-02 | Phase 2 | Pending |
| SITE-03 | Phase 2 | Complete |
| SITE-04 | Phase 2 | Pending |
| SITE-05 | Phase 2 | Pending |
| SITE-06 | Phase 2 | Pending |
| SITE-07 | Phase 2 | Pending |
| SITE-08 | Phase 2 | Complete |
| SITE-09 | Phase 2 | Pending |
| SITE-10 | Phase 2 | Pending |
| SITE-11 | Phase 2 | Complete |
| SITE-12 | Phase 2 | Complete |
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
- Unmapped: 0

---
*Requirements defined: 2026-03-11*
*Last updated: 2026-03-11 after roadmap creation -- SITE-09/10/11/12 moved from Phase 3 to Phase 2*
