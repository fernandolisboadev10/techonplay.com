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
