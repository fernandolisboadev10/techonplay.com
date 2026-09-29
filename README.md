# techonplay.com — projeto Astro

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:4321`.

## Publicar um post novo

Crie um arquivo `.md` em `src/content/blog/`, seguindo o frontmatter dos exemplos:

```markdown
---
title: "Post title"
description: "One-line summary, used in cards and SEO."
category: "Prompt Engineering"   # or: AI Coding Tools, Tutorials, AI News, Case Studies
date: 2026-09-10
readingTime: "5 min"
---

Regular markdown content here.
```

Site e posts são em inglês (público-alvo: EUA). No momento não há posts
publicados — os 3 exemplos originais em português foram removidos; a lista
de 15 artigos novos (com pesquisa de palavras-chave) ainda está por definir.

## Gerar build de produção

```bash
npm run build
```

Isso gera a pasta `dist/` com HTML puro.

## Deploy (GitHub Pages)

O repo já tem `.github/workflows/deploy.yml` configurado com a action oficial
do Astro. Falta só:

1. Criar o repositório no GitHub e dar push neste código na branch `main`.
2. Em **Settings → Pages**, mudar "Source" pra **GitHub Actions**.
3. Configurar o domínio na Hostinger (onde o domínio está registrado) apontando
   pro GitHub Pages: registro `A` pros 4 IPs do GitHub Pages (ou `ALIAS`/`ANAME`
   se o provedor de DNS suportar) + `CNAME` de `www` pro domínio do usuário no
   `github.io`. Só na hora da troca, crie `public/CNAME` contendo `techonplay.com`
   (antes disso o WordPress continua no ar).
4. Marcar "Enforce HTTPS" em Settings → Pages depois que o DNS propagar.

## Pendências antes de ir pro ar

- **Newsletter form** (`src/components/NewsletterForm.astro`): o `action` aponta
  pra um endpoint fictício. Troque pelo endpoint real do seu serviço de e-mail
  (ConvertKit, Mailchimp, Beehiiv, etc.)
- **Contact form** (`src/pages/contact.astro`): mesma coisa, aponta pra um
  Formspree fictício — troque pelo ID real ou pelo serviço que preferir.
- **Favicon**: `public/favicon.svg` ainda é o placeholder padrão do Astro.

## Estrutura

- `src/content/blog/` — posts em markdown
- `src/content.config.ts` — schema/categorias válidas dos posts
- `src/layouts/` — layout base e layout de post
- `src/components/` — Header, Footer, PostCard, VaultCTA, NewsletterForm
- `src/pages/` — todas as rotas do site
- `src/styles/global.css` — tokens de cor/tipografia (lilás pastel + gradiente)
