# Relatório da auditoria, 2026-10-04

## Resultado em números

| Métrica | Antes | Depois |
|---|---|---|
| Artigos | 51 | 49 |
| Links internos quebrados | 26 (14 URLs mortas) | 0 |
| Artigos órfãos (0 links de entrada) | 17 | 0 |
| Mínimo de artigos que apontam para cada post | 0 | 3 |
| Artigos sem nenhum link externo | 28 | 1 (Tripo AI) |
| Links externos verificados (HTTP) | n/d | 113, sendo 111 abertos, 1 bloqueado por bot (Dark Reading, funciona no navegador) e 1 falso alarme (gemini.google.com) |
| Links internos no HTML final | n/d | 1.293 verificados, 0 sem destino |

## Vereditos

| Veredito | Artigos |
|---|---|
| DELETE + 301 | `free-ai-tools-2026-hidden-gems` para `/artificial-intelligence-tools-2026/`. Citava Gemini 2.0 e Claude 3.7, misturava DeepSeek V4 com data de dezembro de 2025, tinha 8 links mortos e links soltos na tabela. |
| MERGE + 301 | `90s-ai-photo-trend-chatgpt` fundido em `90s-ai-photo-trend-gemini-prompt`, que agora traz os dois prompts, tabela comparativa e FAQ unificado. |
| REESCRITO | `iphone-duo-review`: tratava como lançado, com "reviews de compradores", um aparelho que só chega em 23 de outubro. Virou guia pré-lançamento com fatos confirmados por TechCrunch e Engadget, aviso de página falsa de pré-venda e nota editorial dizendo que não há teste prático. |
| ATUALIZADO (fatos) | `claude-sonnet-5-release` (Sonnet 5.5 e Opus 5.5 já saíram, preço de lançamento era promocional até 31/08), `cursor-ai-review-2026` (valuation de US$ 29,3 bi virou compra de US$ 60 bi pela SpaceX, receita acima de US$ 2 bi), `how-to-use-ai-voice-generators` (ElevenLabs v4 saiu em 28/09), `best-chatgpt-prompts-2026` (família GPT-6), `macos-vs-windows-security` e `moltbook-...` (notas editoriais e promessas de link que ficaram no texto publicado), `chatgpt-prompts-for-business-strategy` (seção duplicada da migração do WordPress removida). |
| KEEP + linkagem | Os demais 40 artigos. |

## Lista de observação (sem dados do Search Console, decidir em 60 a 90 dias)

Se depois de 90 dias estes continuarem com impressões próximas de zero no Search Console, fundir ou apagar com 301:

- `3d-figurine-ai-trend-chatgpt` (trend com vida curta, menos de 1.000 palavras)
- `how-to-humanize-ai-content-guide` (tema genérico, concorrência alta)
- `security-plus-passing-score` (fora do nicho principal de IA)
- `tripo-ai-review` (nicho pequeno, sem fonte externa de grande portal)
- `google-ai-plus-for-students` (canibaliza parcialmente `google-gemini-pro-students`, mas atende a busca "Google AI Plus", por isso foi mantido e interligado)

## O que mudou na linkagem

- O bloco fixo de 5 artigos que aparecia no fim de todo post foi removido (era a única fonte de links de entrada dos 5 posts mais antigos).
- Cada artigo ganhou "Related Reading" com 3 a 6 posts do mesmo tema (clusters: ferramentas de IA, ChatGPT, modelos e notícias de IA, programação com IA, Google e estudantes, imagem e trends, segurança, games, hardware).
- Frases contextuais escritas à mão levam a posts relacionados dentro do corpo do texto.
- Links internos passaram a usar caminho relativo (`/slug/`).
- Seção "Sources" com TechCrunch, CNBC, Engadget, 9to5Google, 9to5Mac, Variety, Deadline, PC Gamer, Tom's Hardware, BleepingComputer e fontes oficiais.

## Ajustes técnicos

- JSON-LD dos posts agora usa o campo `updated` em `dateModified`.
- Redirects 301 em `astro.config.mjs` para as duas URLs aposentadas.
- 5 miniaturas do bloco antigo e 5 arquivos de imagem de posts apagados removidos.

## Scripts (repetíveis)

- `scripts/audit-inventory.mjs` e `scripts/audit-links.mjs`: inventário e grafo de links internos.
- `audit/check-external.mjs`: status HTTP de todos os links externos.
- `audit/check-built-links.mjs`: confere os links internos no HTML de `dist/` depois do build.
- `audit/apply-*.mjs`, `audit/boost-inbound.mjs`: aplicaram as mudanças desta auditoria, guardados para consulta.

## Limites desta auditoria

- Sem dados do Search Console, o descarte foi por conteúdo, atualidade e duplicidade, não por impressões.
- Afirmações que dependem de páginas oficiais (preços de planos, specs) foram confrontadas com TechCrunch, CNBC e Engadget. Onde as fontes divergiram (preço do Sonnet 5 após 31/08, câmeras do iPhone Duo), o texto agora diz isso em vez de afirmar um lado.
- Não foi possível abrir Wired, CNET, Reuters, The Verge, Ars Technica e IGN com as ferramentas desta sessão, então esses portais ficaram fora dos novos links.
