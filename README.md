# Primor Holding — Site Institucional

Site institucional da **PRIMOR PARTNERSHIP HOLDING LTDA** (CNPJ 59.120.382/0001-30), consultoria empresarial liderada por Joao Antonio Lopes Correa.

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Estilo:** Tailwind CSS v4 (CSS-first, sem tailwind.config.js)
- **Banco de dados:** PostgreSQL via Neon (prod) / Docker (dev) + Prisma 7
- **Autenticacao:** Clerk v7 (apenas area admin)
- **Upload de imagens:** Cloudinary
- **Animacoes:** framer-motion
- **Deploy:** Vercel

## Funcionalidades

- Pagina inicial com secoes Hero, Sobre, Servicos, Depoimentos e Contato
- Formulario de contato com honeypot anti-spam
- Botao flutuante de WhatsApp
- Banner de consentimento de cookies (LGPD)
- Paginas legais: Politica de Privacidade e Termos de Uso
- Painel admin (protegido por Clerk): CRUD de servicos, depoimentos, posts de blog, visualizador de contatos
- SEO completo: meta tags, OpenGraph, sitemap.xml, robots.txt

## Configuracao Local

### Pre-requisitos

- Node.js 20+ (recomendado via [nvm](https://github.com/nvm-sh/nvm))
- pnpm: `npm install -g pnpm`
- Docker Desktop (para o PostgreSQL local)

### Instalacao

```bash
# 1. Clone o repositorio
git clone https://github.com/00sTh/primorholding.git
cd primorholding

# 2. Instale as dependencias
pnpm install

# 3. Copie o arquivo de variaveis de ambiente
cp .env.example .env.local
# Preencha os valores em .env.local

# 4. Suba o banco de dados local
docker compose up -d

# 5. Aplique o schema ao banco
pnpm db:push

# 6. Popule com dados iniciais
pnpm db:seed

# 7. Inicie o servidor de desenvolvimento
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variaveis de Ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variavel | Descricao |
|----------|-----------|
| `DATABASE_URL` | URL do banco de dados PostgreSQL (pooled para Neon) |
| `DIRECT_URL` | URL direta do banco (sem pooler, para migrations) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Chave publica do Clerk |
| `CLERK_SECRET_KEY` | Chave secreta do Clerk |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/admin` |
| `CLOUDINARY_CLOUD_NAME` | Nome do cloud no Cloudinary |
| `CLOUDINARY_API_KEY` | API Key do Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret do Cloudinary |
| `NEXT_PUBLIC_SITE_URL` | URL do site em producao (ex: `https://primorholding.vercel.app`) |

## Deploy no Vercel

1. Faca push para o GitHub (`git push origin main`)
2. Importe o repositorio no [Vercel](https://vercel.com/new)
3. Configure todas as variaveis de ambiente no painel Vercel (Settings -> Environment Variables)
4. Deploy sera feito automaticamente a cada push para `main`
5. Apos o primeiro deploy, execute o seed no banco de producao:
   ```bash
   DIRECT_URL="<sua-neon-direct-url>" DATABASE_URL="<neon-pooled-url>" pnpm db:seed
   ```

## Comandos Uteis

```bash
pnpm dev          # Servidor de desenvolvimento
pnpm build        # Build de producao
pnpm type-check   # Verificacao de tipos TypeScript
pnpm db:push      # Aplica schema ao banco
pnpm db:seed      # Popula banco com dados iniciais
pnpm db:studio    # Abre Prisma Studio (UI do banco)
```

## Licenca

Projeto proprietario — PRIMOR PARTNERSHIP HOLDING LTDA. Todos os direitos reservados.
