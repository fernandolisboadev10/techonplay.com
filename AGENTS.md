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

Two posts a day (ET): 09:00 news, 18:00 evergreen or tutorial. Run the radar the night before, around 21:00 ET, so the 09:00 slot has fresh topics.

Schedule it locally (the scheduler uses the machine's clock, so convert 21:00 ET to local time):

- Windows: `schtasks /Create /SC DAILY /ST 22:00 /TN "techonplay-radar" /TR "cmd /c cd /d C:\Users\Fernando\Desktop\techonplay.com && npm run radar"`
- macOS/Linux: `crontab -e` and add `0 21 * * * cd /path/to/techonplay.com && npm run radar` (cron uses local time; set `CRON_TZ=America/New_York` on cron versions that support it).
