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

## Topic radar

`npm run radar -- --hours=48 --top=30` collects recent headlines from US tech outlets, Hacker News and Google Trends US, ranks the topics, flags which ones the site already covers and suggests post type, category, US angle, search term and a ready-to-paste `date` (America/New_York, DST handled by `Intl`). The report is saved to `radar/radar-YYYY-MM-DD.md` (git-ignored). A failing source never stops the run; it is listed under "Sources FAILED".

Two posts a day (ET): 09:00 a hot **News** post (category `News`, topic in `tags`) and 18:00 a hot post for any other category. The radar also writes `radar/picks-YYYY-MM-DD.md` with the top 3 candidates for each slot.

The morning routine is the local Claude scheduled task `techonplay-morning-posts` (every day at 07:00 Brasília time; if the PC was off, it runs when the Claude app opens). It runs the radar, picks the two topics, writes and illustrates both posts, runs the build and audits, then commits and pushes. If the 09:00 ET slot already passed, the News post gets the current time as `date` so it goes live on the push deploy.

Schedule it locally (the scheduler uses the machine's clock, so convert 21:00 ET to local time):

- Windows: `schtasks /Create /SC DAILY /ST 22:00 /TN "techonplay-radar" /TR "cmd /c cd /d C:\Users\Fernando\Desktop\techonplay.com && npm run radar"`
- macOS/Linux: `crontab -e` and add `0 21 * * * cd /path/to/techonplay.com && npm run radar` (cron uses local time; set `CRON_TZ=America/New_York` on cron versions that support it).

## Internal links and sources (every new post)

Added after the 2026-10 content audit (`audit/REPORT.md`). Before publishing a post:

- Link to 3 to 6 related posts inside the body with descriptive anchors, using relative paths (`/slug/`), and link back from 2 or 3 existing posts of the same topic so the new post is never an orphan.
- Finish with `## Sources` (2 to 4 links to big US outlets such as TechCrunch, CNBC, Engadget, 9to5Mac, 9to5Google, Tom's Hardware, Variety) and `## Related Reading` (3 to 6 same-topic posts). Open every external URL first; never invent one.
- Never state a future event as past. If the product is not on sale yet, write a pre-release guide.
- After editing, run `node scripts/audit-links.mjs` (broken links, inbound counts), `npm run build`, then `node audit/check-built-links.mjs`. Run `node audit/check-external.mjs` now and then to catch dead external links.
- When a post's facts go stale (new model, new price), update it and set `updated`; the JSON-LD `dateModified` now follows that field.
