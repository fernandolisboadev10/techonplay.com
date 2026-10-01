---
title: "Gemini 4 Argon: Google's Most Powerful Model Is Locked to Cyber Defenders"
description: "Gemini 4 Argon is Google's new frontier model, but only vetted cyber defenders get it now. See the benchmarks, pricing in dollars, and when you can use it."
category: "News"
date: 2026-10-01T09:00:00-04:00
readingTime: "6 min"
tags: ["Gemini 4", "Google", "AI models", "cybersecurity"]
---

Google just announced its strongest AI model yet, and most people can't use it. **Gemini 4 Argon** launched on September 30 to a small group of vetted cyber defenders, with no public date for everyone else.

The announcement matters beyond Google's own products. Argon claims to beat OpenAI's GPT-6 Astra on several benchmarks, and Google is releasing a version with its cyber guardrails removed to trusted partners. [Editorial note: this story is still developing, and Google has not given a date for a wider release.]

Below you'll find what Gemini 4 Argon can do, who has access today, the dollar pricing Google published, how the benchmarks stack up, and what to do while you wait.

## What Is Gemini 4 Argon?

Argon is the first model in Google's Gemini 4 family. Koray Kavukcuoglu, Google DeepMind's SVP and Chief AI Architect, wrote in Google's announcement that it "delivers frontier performance in complex workflows across real-world software engineering, enterprise knowledge work like legal and finance, and cybersecurity defense."

In plain terms, Google built it for long, multi-step jobs. According to [TechCrunch's coverage](https://techcrunch.com/2026/09/30/google-releases-gemini-4-argon-called-its-most-powerful-model-yet/), it can autonomously find, validate, and patch critical software vulnerabilities. It also handles coding, codebase migrations, chart analysis, and long-form video.

Two specs stand out:

- 📏 **Output limit:** 1 million tokens, up from 64,000 in earlier models.
- 🎥 **Video:** it can pick out details from long videos and work from a series of documents.

## Who Can Use Gemini 4 Argon Right Now?

Only members of Google's Fairwind Program. Google launched Fairwind in early September as a limited-access program for governments, Google Cloud customers, and cybersecurity partners. [SecurityWeek reports](https://www.securityweek.com/google-launches-gemini-4-argon-with-guardrail-free-access-for-vetted-defenders/) it had more than 650 participating organizations at launch.

Fairwind members get Argon without its cyber guardrails. Google's own wording: "For trusted defenders and our own internal teams at Google, we'll be releasing Argon without cyber guardrails so they can leverage its full frontier-level cybersecurity defense capabilities."

Everyone else waits. Google says it will keep gathering feedback and tightening guardrails before offering Argon to developers, enterprises, and consumers "as soon as possible." [Engadget reports](https://www.engadget.com/2274263/google-gemini-4-model-argon/) that planned availability includes paid API customers and Google AI Ultra subscribers. No date has been given.

## Gemini 4 Argon Pricing in US Dollars

Google published API pricing even though the model isn't open yet:

| 💰 Item | 📊 Price |
|---|---|
| ⬇️ Input tokens (introductory) | $2 per million |
| ⬆️ Output tokens (introductory) | $10 per million |
| 🧾 Cached input tokens | 95% off the input price |
| 📈 Standard rate after the intro period | $4 per million input, $20 per million output |

The introductory rates are a launch discount. Budget for the standard rates if you plan to build on Argon long term.

## How Do the Gemini 4 Argon Benchmarks Compare?

Treat these numbers as Google's claims. Independent testing hasn't had access yet.

According to TechCrunch, Google says Argon scored higher than OpenAI's GPT-6 Astra and Anthropic's Fable and Opus models on several benchmarks, citing the Vals AI index, where it ranks first. Engadget adds a few more comparisons:

- ✅ Matches GPT-6 Astra's Intelligence Index score at 60% of the cost.
- ✅ Scores one point ahead of GPT-6.1 Sol on the same index.
- ✅ Posts a 15% hallucination rate, which Engadget describes as the lowest among leading models.
- ⏱️ Ties for first on the CWE-bench cybersecurity leaderboard with Grok 4.7 and GPT-6 Astra.

Google's own announcement lists these scores:

| 🧪 Benchmark | 🎯 Argon score | 📝 What it measures |
|---|---|---|
| DeepSWE v1.1 | 77.9% | Real-world software engineering |
| AutomationBench | 51.3% | Business tasks, from Zapier |
| LVBench | 91.7% | Long video understanding |
| CWE-bench v1 | 68% | Fixing software vulnerabilities (tied for first) |

Google also says Argon leads on Gray Swan's indirect prompt injection benchmark, meaning it resists hidden instructions planted in web pages and documents. That matters for any AI agent that browses or reads email for you.

For context on the rivals, see our look at [GPT-6 Astra](/gpt-6-astra-release/).

## What Google Says Argon Already Did Internally

Google shared several examples from its own engineering teams:

- 🧠 Freed more than 300 TiB of memory across its data centers.
- 🔧 Helped migrate over 800,000 lines of C and C++ to Rust in the Fuchsia Zircon kernel.
- ⚛️ Improved a quantum algorithm by 40% over the published baseline.

On security, Google says Argon found a previously unknown critical flaw in healthcare software used by hospitals worldwide, one that earlier frontier models had missed. Google did not name the software or say whether it has been fixed. Wiz is using the model for defense through its Scan for Good initiative.

## Safety: Why the Rollout Is So Restricted

Argon is good at finding holes in software, which is exactly what attackers want. That tension explains the gated release.

Google describes a phased approach with several layers. The model is trained to refuse requests that enable cyber or CBRN attacks while still supporting legitimate dual-use research. Google also monitors internal model activations for signs of misuse, watches chain-of-thought and actions for misalignment, and runs high-risk work in sandboxed environments. SecurityWeek notes Google takes part in the U.S. government's voluntary pre-release model vetting process.

The open question is the guardrail-free version. It stays with vetted partners and Google's own teams, but its existence shows how close frontier models are to dual-use territory. For more on how attackers already use AI agents, read our report on [AI ransomware attacks](/ai-ransomware-attacks/).

## What Should You Do Until Argon Is Public?

You can't use Argon yet, but you can prepare.

- ✅ **Developers:** keep your Gemini API setup current and watch Google's developer blog for the release date.
- ✅ **Security teams:** if your organization works with Google Cloud, ask your account rep about Fairwind eligibility.
- ✅ **Everyone else:** try the tools you already have access to. Our guide to the [best Google AI tools of 2026](/best-google-ai-tools-2026/) covers what's available today.
- ❌ **Don't** pay for third-party sites that claim to offer early Argon access. Google says it is limited to Fairwind.

## FAQ

### What is Gemini 4 Argon?

Gemini 4 Argon is Google's new frontier AI model and the first in its Gemini 4 family, announced September 30, 2026. It targets software engineering, enterprise work like legal and finance, and cybersecurity defense. It supports a 1 million token output limit and can analyze charts and long videos.

### Can I use Gemini 4 Argon today?

No. Right now only trusted cyber defenders in Google's Fairwind Program have access. Google plans to open it to developers, enterprises, and consumers "as soon as possible," but it has not published a date. Engadget lists paid API customers and Google AI Ultra subscribers in the planned rollout.

### How much does Gemini 4 Argon cost?

Google lists introductory API pricing of $2 per million input tokens and $10 per million output tokens. Cached input tokens cost 95% less. After the introductory period, the standard rate is $4 per million input tokens and $20 per million output tokens.

### Is Gemini 4 Argon better than GPT-6 Astra?

Google says yes on several benchmarks, and Engadget reports it matches GPT-6 Astra's Intelligence Index score at about 60% of the cost. On the CWE-bench cybersecurity test, Argon ties with GPT-6 Astra and Grok 4.7. These are Google's figures, and independent testing is still pending.

### Why is Google limiting access to Argon?

Because the model can autonomously find and patch serious software vulnerabilities, which attackers could also misuse. Google is rolling it out in phases, starting with vetted defenders, while it keeps testing guardrails, monitoring for misuse, and refining safeguards before a wider release.

## The Bottom Line

Gemini 4 Argon is a serious step up on paper, with strong benchmark claims and a clear price. But it's a defenders-only release for now, and the numbers come from Google itself.

Watch for the public launch date and for independent benchmark results. When they arrive, you'll know whether Argon earns a place in your workflow. Bookmark this page, because we'll update it as soon as Google opens access.

**Sources:** [Google's Gemini 4 Argon announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/), [TechCrunch](https://techcrunch.com/2026/09/30/google-releases-gemini-4-argon-called-its-most-powerful-model-yet/), [Engadget](https://www.engadget.com/2274263/google-gemini-4-model-argon/), [SecurityWeek](https://www.securityweek.com/google-launches-gemini-4-argon-with-guardrail-free-access-for-vetted-defenders/), [The Hacker News](https://thehackernews.com/2026/10/google-rolls-out-gemini-4-argon-to.html).
