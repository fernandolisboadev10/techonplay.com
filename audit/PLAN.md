# Plano de auditoria de conteúdo e links, techonplay.com

Data: 2026-10-04. Escopo: 50 artigos em `src/content/blog/`.

## Diagnóstico (medido por `scripts/audit-inventory.mjs` e `scripts/audit-links.mjs`)

- 26 links internos quebrados, apontando para 14 URLs que não existem mais (sobraram da migração e de posts apagados). Links quebrados desperdiçam rastreio e passam sinal ruim.
- Linkagem interna real quase não existe. Os 40 links que cada um dos 5 posts mais antigos recebe vêm de um bloco de "leia também" repetido em todo post. Fora isso, 17 artigos têm 0 links de entrada (órfãos) e 14 têm só 1.
- Links externos: 28 dos 50 artigos não têm nenhum link para fonte de grande portal dos EUA. Os que têm usam sobretudo fontes primárias de empresas, e poucos usam TechCrunch, The Verge, Ars Technica, Wired, CNET, Engadget.
- Todos os links internos usam URL absoluta com domínio. Funciona, mas o padrão do projeto passa a ser caminho relativo (`/slug/`).
- Bug técnico: o schema JSON-LD usa `dateModified: date` e ignora o campo `updated`.

## Regras de decisão por artigo

Cada artigo recebe um veredito, registrado em `audit/audit.md`:

| Veredito | Critério | Ação |
|---|---|---|
| KEEP | Fatos atuais, tema com busca própria, conteúdo único | Só linkagem |
| UPDATE | Bom tema, mas fatos datados, erros ou trechos fracos | Corrigir fatos, definir `updated`, linkagem |
| MERGE | Canibaliza outro artigo (mesma intenção de busca) | Fundir o melhor do fraco no forte, apagar o fraco, 301 |
| DELETE | Desatualizado sem recuperação, especulação desmentida, conteúdo fino sem busca | Apagar, 301 para o artigo mais próximo |

Fatos recentes (lançamentos, preços, vazamentos) são checados na web antes do veredito. Sem confirmação em fonte de peso, o fato é corrigido ou removido, nunca mantido por palpite.

## Fases (um commit por fase, push só no final com build verde)

1. Inventário e ranking: tabela com palavras, categoria, links de entrada e saída, domínios externos. Já feita.
2. Leitura completa dos 50 artigos, checagem de fatos datados e veredito de cada um.
3. Descartes: apagar arquivos DELETE e MERGE, adicionar 301 em `astro.config.mjs`, remover imagens órfãs.
4. Correção dos 26 links quebrados: trocar pelo artigo existente mais próximo ou remover o link.
5. Mapa de linkagem interna por clusters temáticos (hub e satélites). Meta: cada artigo com 3 a 6 links internos contextuais dentro do corpo, nenhum órfão, âncoras descritivas variadas, sem repetir o mesmo alvo duas vezes no mesmo texto.
6. Links externos: 2 a 4 por artigo para grandes portais dos EUA (TechCrunch, The Verge, Ars Technica, Wired, CNET, Engadget, Reuters, Bloomberg, NYT, CNBC, 9to5Mac, 9to5Google, The Hacker News, Krebs, BleepingComputer, IGN, PC Gamer, Tom's Hardware). Cada URL é aberta e verificada antes de entrar; nenhuma URL é inventada. Fontes primárias oficiais entram como complemento.
7. Ajustes técnicos: `dateModified` usando `updated`, atualização do bloco "leia também" para ser por categoria em vez de lista fixa.
8. Verificação: `npm run build`, varredura de links internos quebrados e de links externos (status HTTP), relatório final.

## Salvaguardas

- Regras de escrita do projeto continuam valendo (voz ativa, sem clichês, estrutura, frontmatter).
- Nenhum fato novo entra sem fonte verificada.
- Tudo reversível por git. Sem push antes do build passar.
