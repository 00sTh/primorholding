# Primor Holding

## What This Is

Site institucional de consultoria empresarial da Primor Holding, liderada por João Antônio Lopes Corrêa. O site serve como vitrine profissional da empresa e canal de captação de leads — visitantes descobrem os serviços, conhecem a história do fundador e entram em contato via formulário ou WhatsApp.

## Core Value

O visitante deve sair com credibilidade suficiente para entrar em contato — o site precisa transmitir autoridade e facilitar o contato.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Site institucional com layout profissional em azul escuro
- [ ] Seção Hero com apresentação da Primor Holding
- [ ] Seção "Sobre" com história e foto de João Antônio Lopes Corrêa
- [ ] Seção de Serviços com cards dinâmicos
- [ ] Seção de Depoimentos de clientes
- [ ] Formulário de contato (nome, email, mensagem)
- [ ] Botão flutuante de WhatsApp
- [ ] Painel Admin autenticado via Clerk com CRUD completo
- [ ] Admin: gerenciar Serviços, Depoimentos, Posts de Blog, Contatos recebidos
- [ ] Compliance LGPD: política de privacidade, termos de uso, banner de cookies
- [ ] Site público no GitHub (00sth), sem exposição de envs

### Out of Scope

- Blog público (página pública de artigos) — v2, não há demanda imediata
- Área de cliente logado — não é objetivo da plataforma
- E-commerce / pagamentos — fora do escopo de consultoria institucional
- App mobile — web-first

## Context

- **Empresa:** Primor Holding — consultoria empresarial (estratégia, gestão, reestruturação)
- **Fundador/Dono:** João Antônio Lopes Corrêa
- **CNPJ:** A ser fornecido pelo usuário (necessário para rodapé e páginas legais)
- **Deploy:** Vercel (projeto simples, sem necessidade de infra complexa)
- **Repositório:** GitHub público em conta 00sth — nenhuma env deve ser commitada
- **Stack decidida:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma + Neon (PostgreSQL), Clerk v7 (admin auth), Cloudinary (imagens), Docker (dev local)
- **Inspirações:** Sites de holdings e consultorias de alto padrão (McKinsey, Kearney, BCG estética)
- **Projetos similares do dev:** EmporioSite, AltheiaSite — mesma stack, padrões reutilizáveis

## Constraints

- **Tech Stack:** Next.js 16 + Prisma + Neon + Clerk + Cloudinary + Tailwind v4 — stack decidida
- **Deploy:** Vercel — sem Docker em produção, apenas dev local
- **Repo público:** Nenhuma secret, env ou dado sensível no código — apenas .env.local + .env.example
- **LGPD:** Site precisa de banner de cookies, política de privacidade, termos de uso
- **Auth:** Apenas admin usa autenticação (Clerk) — visitantes são sempre anônimos
- **CNPJ pendente:** Páginas legais precisam do CNPJ para serem finalizadas

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Clerk apenas para admin | Site de consultoria não precisa de área de cliente | — Pending |
| Blog sem página pública v1 | Conteúdo pode ser preparado antes de publicar | — Pending |
| Docker apenas dev | Vercel gerencia produção, Docker evita inconsistências locais | — Pending |
| Neon (serverless PostgreSQL) | Compatível com Vercel, free tier generoso, Prisma first-class | — Pending |
| Cloudinary para imagens | Foto do fundador + imagens de serviços precisam de CDN | — Pending |

---
*Last updated: 2026-03-11 after initialization*
