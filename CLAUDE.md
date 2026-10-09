## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Editorial routine (since 2026-10-09)

This site is managed from the central project `C:\Users\Fernando\Desktop\Blog Inteligente` (repo `blog-inteligente`), together with techonplay.com.br. Do not publish on your own: the central routine only proposes topics, and a post is written after the owner approves one.

**Weekly calendar (all times America/New_York, DST handled by the date offset).** Quality over volume, 4 posts a week:

| Day | Post | Slot |
|---|---|---|
| Monday | **News** (category `News`, topic in `tags`) | 09:00 |
| Tuesday | **Article**, a hot topic in any other category | 09:00 |
| Thursday | **Article**, a hot topic in any other category | 09:00 |
| Saturday | **News** | 09:00 |

Rotate the article categories in proportion to what the site already has (AI, Security, Tools, Reviews, Gaming, Guides, Trends). Black Friday is on 2026-11-27, so plan a preparation article the week before. Write each post natively for a US audience, never as a translation of the Brazilian site.

**How a topic is chosen.** A GitHub Action in the central repo runs the radar every day at 06:30 Brasília time and saves `radar/latest.md` (US feeds, Hacker News and Google Trends US, with a "today's agenda" header). The local Claude scheduled task `radar-pautas-7h` (about 07:12 Brasília time, runs when the Claude app is open) reads it and proposes one main topic and one backup for the post due that day. Pick the biggest story with the most independent sources, a US angle, and no existing coverage on the site; if the topic is already covered, update that post and set `updated` instead of duplicating it.

**Writing.** After the owner approves a topic, write the post in `src/content/blog/<slug>.md` following the rules below. Open every source first and never state an unverified fact. Attribute contested claims to the people or outlets that made them.

**Cover image.** `npm run image -- --name <slug> --prompt "<editorial photo scene, no logos, no readable text>" --quality medium`. The output is 1200x800 WebP (3:2) and costs about $0.042, paid from the OpenRouter balance reserved for images only. Open the result and check it before using it.

**Scheduling and publishing.** Set `date` to the slot with its offset (for example `2026-10-09T09:00:00-04:00`). A post goes live on the first deploy after its `date` (`isPublished` in `src/utils/posts.ts`). The deploy cron runs in UTC every hour from 13:02 to 23:02 (09:02-19:02 EDT), because GitHub often delays or skips scheduled runs; a skipped run then delays a post by at most an hour. If a post is still missing after its slot, push an empty commit to trigger a deploy. Push only after the build and audits pass and the owner has approved.

The old local task `techonplay-morning-posts` (2 posts a day with an automatic push) is disabled. The old `schtasks` radar job pointed at `Desktop\techonplay.com`, a path that no longer exists, so do not recreate it. For a manual run, `npm run radar -- --hours=48 --top=30` still works here and writes `radar/radar-YYYY-MM-DD.md` (git-ignored).

## Internal links and sources (every new post)

Added after the 2026-10 content audit (`audit/REPORT.md`). Before publishing a post:

- Link to 3 to 6 related posts inside the body with descriptive anchors, using relative paths (`/slug/`), and link back from 2 or 3 existing posts of the same topic so the new post is never an orphan.
- Finish with `## Sources` (2 to 4 links to big US outlets such as TechCrunch, CNBC, Engadget, 9to5Mac, 9to5Google, Tom's Hardware, Variety) and `## Related Reading` (3 to 6 same-topic posts). Open every external URL first; never invent one.
- Never state a future event as past. If the product is not on sale yet, write a pre-release guide.
- After editing, run `node scripts/audit-links.mjs` (broken links, inbound counts), `npm run build`, then `node audit/check-built-links.mjs`. Run `node audit/check-external.mjs` now and then to catch dead external links.
- When a post's facts go stale (new model, new price), update it and set `updated`; the JSON-LD `dateModified` now follows that field.
