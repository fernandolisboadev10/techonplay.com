---
title: "Mistral Large 4 'Le Chonk': 1T-Parameter Open-Weight Model Is Here"
description: "Mistral Large 4 is a 1-trillion-parameter model in public preview, with open weights due in late October. See pricing, benchmarks and how it compares."
category: "News"
date: 2026-10-06T16:00:00-04:00
readingTime: "7 min"
tags: ["Mistral", "Mistral Large 4", "open-weight AI", "AI models"]
image: "./images/mistral-large-4-le-chonk.webp"
imageAlt: "Dark data center aisle with server racks, a glowing amber status light and a technician in the distance, illustrating the Mistral Large 4 open-weight AI model"
---

France's Mistral just put a trillion-parameter model in developers' hands, and it plans to give away the weights. **Mistral Large 4**, nicknamed "Le Chonk," entered public preview on October 6, with the open-weight release promised for the end of the month.

The timing matters for US teams. Mistral says the model rivals closed systems like OpenAI's GPT-6 Astra on several tests, and it priced the API at $1.36 per million input tokens. [Editorial note: these numbers come from Mistral, and independent results are still pending, so check back for updates.]

Below you'll find the specs, the dollar pricing, Mistral's benchmark claims, how it stacks up against Google's new Gemini 4 Argon, and what to do before the weights land.

## What Is Mistral Large 4?

According to [Mistral's announcement](https://mistral.ai/news/mistral-large-4/), Large 4 is a "1 trillion-parameter natively multimodal model with 49 billion active parameters." That means a mixture-of-experts design: only a slice of the model runs for each request, which keeps it faster and cheaper than a dense model of the same size.

A few other specs from Mistral:

- 🌍 **Languages:** more than 160, including every official EU language.
- 🖼️ **Input:** text and images in one model.
- 🖥️ **Training hardware:** 3,800 Nvidia Grace Blackwell GPUs in Mistral's European data centers.

[TechCrunch's report](https://techcrunch.com/2026/10/06/mistrals-new-1t-model-aims-to-leapfrog-closed-and-open-rivals/) quotes Mistral saying it trained the model "entirely on Mistral's compute" with "only 4,000 Nvidia GPUs," which it describes as two to three times fewer than its Chinese competitors use. The two outlets round the GPU count differently, so treat "about 4,000" as the safe figure.

Mistral points the model at three areas: cybersecurity, finance, and chip design.

## When Can You Use Mistral Large 4?

You can try it today, with limits. The model is in public preview through Mistral's API and Mistral Studio, according to Testing Catalog's coverage.

The open weights are the bigger story, and they are not out yet:

- ⏱️ **Preview:** live since October 6.
- ⏱️ **Open weights:** end of October 2026, after safety testing. TechCrunch quotes "three weeks."
- ⏱️ **License:** Mistral's announcement page does not spell out the license terms, so read them before you build a product on the weights.

Until the weights ship, you're using a hosted preview, not a model you can run yourself.

## Mistral Large 4 Pricing in US Dollars

Mistral lists API pricing in dollars:

| 💰 Item | 📊 Price |
|---|---|
| ⬇️ Input tokens | $1.36 per million |
| ⬆️ Output tokens | $4.18 per million |

That undercuts Google's introductory rates for Gemini 4 Argon, which are $2 per million input tokens and $10 per million output tokens, as covered in our [Gemini 4 Argon report](/gemini-4-argon-release/). The two models are not equal on every test, so price alone doesn't decide this.

## How Do the Mistral Large 4 Benchmarks Look?

These are Mistral's own results. TechCrunch notes that benchmark results are still pending from independent testers.

| 🧪 Benchmark | 🎯 Result | 📝 What it measures |
|---|---|---|
| DeepSWE v1.1 | 61.7% | Real-world software engineering |
| Terminal Bench 4.0 | 28.3% | Command-line agent tasks |
| AutomationBench | 59.9% | Business workflow automation |
| Cybench | 93% | Cybersecurity challenges solved |
| AA Cyber Index | 82% | Vulnerability reproduction |
| Dense 200 | 42% | Visual grounding (GPT-6 Astra: 41%) |
| Lakera B3 | 93.3% | Resistance to attacks |

Mistral also says Large 4 beats GPT-6 Astra on the Harvey legal-agent and Finance Agent v2 benchmarks, and that it ranks among the top five models worldwide on the AA Cyber Index.

One honest caveat: on human evaluation by Surge AI, Mistral reports a 3.74 out of 5 score, which put it second among the five models tested. That is good, not dominant.

For a sense of the gap with closed rivals, Google claims Gemini 4 Argon scores 77.9% on the same DeepSWE v1.1 test. Large 4's 61.7% trails it, though the model costs far less and its weights are coming. For the OpenAI side, see our guide to [GPT-6 Astra](/gpt-6-astra-release/).

## Why the Open Weights Matter for US Teams

Open weights let you download a model and run it on your own servers. That means no per-token bill, no data leaving your network, and the freedom to fine-tune.

Until now, many of the strongest open-weight models came from Chinese labs. TechCrunch frames Large 4 as an attempt to leapfrog both closed and open rivals, and Mistral's own comparison is against Chinese competitors. If you've been weighing models like [DeepSeek](/deepseek-ai-2026-review/), a European alternative with comparable ambitions is worth watching.

Early testers on Hacker News gave a mixed first read. Some said the model's "high" reasoning setting barely differed from "none," while others praised its image understanding and its strength on security benchmarks. Take those as anecdotes, not a verdict.

## What About the Safety Risks?

A model that scores 93% on Cybench can find and reproduce security flaws, which cuts both ways. Mistral's safety team seems aware of it.

Pierre Stock, Mistral's VP of Science, told TechCrunch the company will "work with trusted partners and governments to make sure that the open source weights can be used to defend, but not to [perform] malicious attacks." Testing Catalog reports red-teaming with cybersecurity leaders is ongoing, and that a separate version with "reduced moderation and expanded cyber capabilities" exists for vetted partners.

That mirrors what Google did with Argon, which went first to trusted defenders. For the attacker side of the same technology, read our piece on [AI ransomware attacks](/ai-ransomware-attacks/).

## What Should You Do Before the Weights Drop?

You don't need to wait to prepare.

- ✅ **Developers:** test the preview in Mistral Studio on a real task, and log cost and quality against your current model.
- ✅ **Security teams:** run your own vulnerability-reproduction checks instead of trusting any vendor's Cybench number.
- ✅ **Startups:** compare Large 4's $1.36 and $4.18 pricing with your current bill, including cached-token discounts.
- ✅ **Everyone:** wait for independent benchmarks before switching a production workload.
- ❌ **Don't** download "Le Chonk" weights from random sites before Mistral publishes them. Anything posted earlier is not official.

## FAQ

### What is Mistral Large 4?

Mistral Large 4 is a 1-trillion-parameter, natively multimodal mixture-of-experts model from French AI company Mistral, with 49 billion active parameters. Nicknamed "Le Chonk," it entered public preview on October 6, 2026, supports more than 160 languages, and targets cybersecurity, finance, and chip design.

### Is Mistral Large 4 open source?

Not yet. Mistral says it will release the open weights at the end of October 2026, after safety testing. For now the model is only available through a hosted public preview. The announcement page does not state the license terms, so check them when the weights are published.

### How much does Mistral Large 4 cost?

Mistral lists API pricing of $1.36 per million input tokens and $4.18 per million output tokens during the public preview. That is below Google's introductory Gemini 4 Argon rates of $2 and $10, though the two models differ in capability and availability.

### Is Mistral Large 4 better than GPT-6 Astra?

Mistral says it beats GPT-6 Astra on some tests, including the Harvey legal-agent and Finance Agent v2 benchmarks, and scores 42% to Astra's 41% on Dense 200. These are Mistral's own claims, and TechCrunch notes independent benchmark results are still pending.

### Can I run Mistral Large 4 on my own computer?

Not at the moment, and probably not on a typical PC even later. A 1-trillion-parameter model needs data-center hardware. Mistral trained it on about 4,000 Nvidia GPUs. When the weights arrive, expect cloud and server deployments to be the practical route.

## The Bottom Line

Mistral Large 4 is a serious open-weight bet: a 1T-parameter model in preview today, priced at $1.36 and $4.18 per million tokens, with weights due by the end of October. The benchmark claims are strong, but they are Mistral's own.

Try the preview on your own workload now, then check the independent numbers when they land. We'll update this page when the weights go live and the license is clear.

## Sources

- [Mistral AI: Mistral Large 4 announcement](https://mistral.ai/news/mistral-large-4/)
- [TechCrunch: Mistral's new 1T model aims to leapfrog closed and open rivals](https://techcrunch.com/2026/10/06/mistrals-new-1t-model-aims-to-leapfrog-closed-and-open-rivals/)
- [Testing Catalog: Mistral launches Large 4 preview with 1T parameters](https://www.testingcatalog.com/mistral-launches-large-4-preview-with-1-t-parameters/)

## Related Reading

- [Gemini 4 Argon: Google's Most Powerful Model Is Locked to Cyber Defenders](/gemini-4-argon-release/)
- [GPT-6 Astra Release: What OpenAI's New Model Means for Developers](/gpt-6-astra-release/)
- [DeepSeek V4 vs ChatGPT: Which Is Better After GPT-6? [Sept 2026]](/deepseek-v4-vs-chatgpt-comparison/)
- [DeepSeek AI 2026 Review: V4.1-Flash, Pricing and Privacy [Sept Update]](/deepseek-ai-2026-review/)
- [Claude Sonnet 5 Release 2026: Full Benchmarks and Upgrade Verdict](/claude-sonnet-5-release/)
