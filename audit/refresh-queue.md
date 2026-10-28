# Refresh queue (private working file, not served by the site)

Built 2026-10-25. Search Console data NOT available: Supermetrics GSC connector is authenticated, but the trial expired on 2026-09-26 (data_query returns TRIAL_EXPIRED). No traffic numbers were invented. Ranking uses content signals only: freshness sensitivity (version/price/date density), time since last edit, thin content, missing external sources, imminent real-world events.

Facts: 50 posts, all dated 2026-08 to 2026-10 (except tripo-ai-review, 2026-02). The site is ~2 months old, so "declining impressions" is unlikely to apply yet. Priority 1 and 2 are empty until GSC returns.

Rule per run: one article, verify every fact from open sources, change `updated` only if the edit is substantial, run `node scripts/audit-links.mjs`, `npm run build`, `node audit/check-built-links.mjs`. No push without owner approval.

## Priority 3: freshness-sensitive (do first)
1. iphone-duo-review (launch was 2026-10-23, post is still a pre-launch guide)
2. claude-sonnet-5-release
3. best-google-ai-tools-2026 (32 external links, 3,425 words: trim to the 3-link body rule, move rest to Sources)
4. deepseek-ai-2026-review
5. artificial-intelligence-tools-2026
6. best-ai-video-generators-of-2026
7. gpt-6-astra-release
8. best-ai-image-generators-2026
9. cursor-ai-review-2026
10. tesla-roadster-price-specs-release-date
11. meta-muse-wonder-frontier-model
12. surface-laptop-ultra-rtx-spark-price
13. how-to-use-notebooklm
14. perplexity-pro-vs-chatgpt-plus-2026
15. claude-code-cli-tutorial
16. ps5-qssr-ai-upscaling-explained
17. best-gaming-pc-ai-and-gaming-2026
18. gta-6-system-requirements
19. perplexity-for-students-2026
20. google-ai-plus-for-students, ai-for-education-2026, how-to-use-ai-voice-generators, best-chatgpt-prompts-2026, how-to-use-chatgpt-effectively

## Priority 4: evergreen, weak intent coverage or structure
macos-vs-windows-security, is-linux-more-secure-than-windows-2026, best-vpn-for-ai-browsing, how-to-protect-your-data-from-ai-chatbots, how-to-detect-deepfakes-guide, copilot-excel-hacks, chatgpt-free-automations-guide, chatgpt-prompts-for-business-strategy, chatgpt-image-prompts-visual-commands, google-flow-camera-commands, grok-imagine-2-0-prompts-guide, fix-nvidia-driver-crashing-2026, blackbox-ai, moltbook-ai-agent-platform-social-network, steam-frame-repairability, ai-ransomware-attacks, ghostface-ai-photo-trend-prompts, split-face-ai-family-trend-prompt, 90s-ai-photo-trend-gemini-prompt

## Priority 5: thin or low-value
what-does-gpt-stand-for (780 words), fake-blue-screen-scam (1,000), 3d-figurine-ai-trend-chatgpt (1,066), how-to-humanize-ai-content-guide, security-plus-passing-score, tripo-ai-review (0 external sources)
Watch list from audit/REPORT.md: decide merge/delete only with GSC data.

## Log
(append: date, slug, what changed, build result)
- 2026-10-25 | iphone-duo-review | Converted pre-launch guide to post-launch: on sale Oct 23, added early-review section (Engadget hands-on, The National), weight/thickness/crease/battery findings, supply note, trimmed body to 3 external links (rest in Sources), set `updated`. Facts checked against Engadget and The National; Tom's Guide and Cult of Mac were not readable. Build OK, audit-links ran, check-built-links 0 unresolved.
- 2026-10-25 | claude-sonnet-5-release | Minor: added Sonnet 5.5 pricing note ($2/$10, Sonnet 5 now legacy per claude.com/pricing), dated the pricing check, fixed a garbled sentence; `updated` unchanged (not substantial). Image alt/name still says Sonnet 4.6 (not touched). Verified vs TechCrunch, Engadget, claude.com/pricing. Build OK, audit-links ran, check-built-links 0 unresolved.
- 2026-10-26 | best-google-ai-tools-2026 | Substantial: added Gemini 4 Argon (GA in Gemini app Oct 13 for AI Pro/Ultra) and the Oct 9 model-access change (Free = Flash-Lite, Plus = Flash), updated plan lists/FAQ/timeline/title, removed stale 'Argon restricted' claim, trimmed body external links 32 to 3, removed duplicated table, added Sources block, set `updated`. Verified vs gemini.google/subscriptions, Google blog, Android Police, LDS (Oct 3, citing Google Help). Not re-verified: May-Sept items (Spark, Omni, Pics, Stitch, AI Studio price). Image alt still generic (not touched). Build OK, audit-links ran, check-built-links 0 unresolved.
- 2026-10-26 | deepseek-ai-2026-review | Substantial: rechecked pricing page (prices unchanged), added V4.1-Flash-1017 (deepseek-flash now served by it; legacy flash names retired; Oct 17 date per CometAPI only, DeepSeek page gives no date), V4-Pro-0813, Flash-only vision, V4.1-Pro still no launch date (Oct 26), Search/Fetch fee from Nov 1, refreshed as-of dates/title, added official pricing link and 2 Sources and 2 Related Reading links, set `updated`. Benchmarks not re-verified (vendor Sept figures, labeled). Image alt is a stale long title (not touched). Build OK, audit-links ran, check-built-links 0 unresolved, 'Updated' present in dist.
- 2026-10-26 | artificial-intelligence-tools-2026 | Substantial: added Eleven v4/v4 Turbo (Sept 28; 90+ languages, 10s cloning, retraining caveat; verified vs TechCrunch + search coverage) to timeline and ElevenLabs section, replaced stale Notion model list (GPT-5.2/Opus 4.5/Gemini 3) with provider-level wording, refreshed as-of dates, set `updated`. Midjourney prices matched secondary sources only; other vendor prices/leaderboard Elo not re-verified. Image alt is a stale long title (not touched). Build OK, audit-links ran, check-built-links 0 unresolved, 'Updated' present in dist.
- 2026-10-26 | best-ai-video-generators-of-2026 | Substantial: leaderboard re-read (Wan 3.0 now #1 at 1174; Omni Flash 1.1 #10; Seedance 2.5 #5; MiniMax H3 #3/#7; Kling 3.0 and Veo 3.1 outside top 15; board re-scored so old Elo removed), Sora API shutdown tense fixed (was scheduled Sept 24; final shutdown not confirmed by a readable OpenAI page, 403), Runway prices rechecked on runway.com (unchanged, added monthly rates), Seedance US availability rechecked (CapCut Jul 31 list still excludes US), Grok Imagine rank added, title/as-of dates to Oct, CapCut source added, set `updated`. Not verified: Kling plan prices (pricing page showed no figures), Gemini plan prices, Omni 1.1 40s claim, MiniMax/Veo API prices. Image alt is generic (not touched). Build OK, audit-links ran, check-built-links 0 unresolved, 'Updated' present in dist.
- 2026-10-27 | gpt-6-astra-release | Substantial: launch-day tense fixed (launched Sept 3), Gemini 4 Argon no longer 'restricted' (GA mid-Oct), added Plus access caveat (Work/Codex only per OpenAI Developer Community thread + quoted Help Center line; no OpenAI confirmation of Chat), Daybreak tiers (Forklog via search), FAQ updated, set `updated`. openai.com pages returned 403 so benchmark/price figures rest on earlier CNBC/TechCrunch/Engadget sourcing plus search snippets (pricing $10/$50 and fast mode 2x matched Forklog/MindStudio); Claude rival prices not re-verified. Image alt generic (not touched). Build OK, audit-links ran, check-built-links 0 unresolved, 'Updated' present in dist.
- 2026-10-27 | best-ai-image-generators-2026 | Substantial: leaderboard re-read Oct 27 (Sunburst 1222 #1, Flare 1207, Nano Banana 2.1 #4 1176, MAI-2.6 and Grok 2.0 1166, Muse 1127; Midjourney/Ideogram outside top 15), added Nano Banana 2.1 (Oct 6, via Artlist; no Google page readable), Canva Craft (Oct 22, TechCrunch), Ideogram 4.5 mention (no official notes), FLUX 3 Image status (BFL post still only promises early access; AA lists it), table/FAQ/dates/title to Oct, 2 Sources added, set `updated`. Reve score not rechecked (Sept figure labeled); vendor prices not re-verified. Image alt generic (not touched). Build OK, audit-links ran, check-built-links 0 unresolved, 'Updated' present in dist.
- 2026-10-27 | cursor-ai-review-2026 | Substantial: pricing rewritten for Oct 12 X Subscription (Free/Plus $8/Premium $30/Super $100/Ultra $200, Teams from $30, weekly pool, third-party models at API price, annual prices per docs, legacy Pro/Pro+ kept for existing subscribers), SpaceX $60B deal kept as 'agreed' (close only reported by one secondary source, not stated), removed external links from intro, added Sources, FAQ/pros-cons/dates updated, set `updated`. Not verified: 72% acceptance rate, 32% design-to-code, Copilot/Windsurf prices (unchanged, not rechecked); The New Stack article unreadable. Image alt 'Curso AI' is poor (not touched). Build OK, audit-links ran, check-built-links 0 unresolved, 'Updated' present in dist.
