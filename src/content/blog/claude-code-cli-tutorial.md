---
title: "How to Install Claude Code CLI: Complete Setup Guide (2026)"
description: "Install Claude Code CLI the right way: prerequisites, CLAUDE.md setup, and the new Auto Mode permission system explained for 2026."
category: "Tools"
date: 2026-09-18
updated: 2026-09-18
readingTime: "8 min"
image: "./images/Claude-Code-CLI.webp"
imageAlt: "Claude Code CLI"
---

It is 2026, and most developers still install AI coding tools the same way they did two years ago: one npm command, then guesswork. The **Claude Code CLI** deserves better than that. It is not a chatbot living in your terminal, it is an agent that plans, edits, and debugs multi-file projects with very little hand-holding. [If the term “agentic” is still fuzzy, our guide to what agentic AI actually means](https://techonplay.com/agentic-ai-explained-autonomous-systems-2026/) covers the basics before you go further.

The bigger story this year is not the install command itself. Anthropic quietly changed how much autonomy the CLI gets by default, moving paid accounts away from a binary “ask every time” or “skip every check” choice and into a middle ground built around a safety classifier. Most install guides published before mid-2026 never mention this, and readers following them are running an outdated permission setup without knowing it.

This guide covers the real prerequisites, the one-line install, the CLAUDE.md file that gives the agent project context, and every permission mode you can choose between today, including the one that is now the default. It ends with an honest comparison against GitHub Copilot CLI, which caught up on autonomy faster than most people realize.

## What You Need Before You Install Claude Code CLI

Most installation failures trace back to a missing dependency, not the tool itself. Claude Code CLI leans on your local environment to read and search your project.

✅ **Node.js 18 or later** – the runtime the CLI runs on. ✅ **Git** – required for the agent to track changes and produce diffs. ✅ **Ripgrep (`rg`)** – powers the fast codebase search the agent relies on for context.

⏱️ **Quick check**

Run these three commands in your terminal before anything else:

```
node -v
git --version
rg --version
```

If any of them error out, fix that first. Skipping this step is the single most common reason people think the CLI is “broken” on first run.

## Install Claude Code CLI With One npm Command

Once the prerequisites check out, installation is a single line using the official Anthropic package:

```
npm install -g @anthropic-ai/claude-code
```

If you hit a “permission denied” error, do not reach for `sudo`. Fix your npm global-install permissions instead, or switch to a version manager like `nvm`, which sidesteps the problem entirely.

### Authenticate the CLI

From your project directory, start the agent:

```
claude
```

This opens a browser window for login with your Anthropic account. Once authenticated, the CLI runs on [Claude Sonnet 5](https://techonplay.com/claude-sonnet-5-release-2026/) \[verify this is the live published URL before publishing, the slug may still be mid-migration\], Anthropic’s current mid-tier model tuned specifically for this kind of agentic, multi-step work. \[Pro tip: a Pro, Max, or Team plan removes the rate-limit friction that a free account runs into fast once the agent starts working autonomously.\]

## Give Claude Code Real Project Context With CLAUDE.md

This is the step most new users skip, and it is the one that separates a mediocre first session from a genuinely useful one. Claude Code CLI works out of the box, but it works far better once it knows your stack, your conventions, and how to run your tests.

Create a `CLAUDE.md` file in your project root. Think of it as a system prompt scoped to that one repository. A short file covering commands, style rules, and architecture is enough to change the quality of every suggestion that follows.

**Example CLAUDE.md:**

```
# Project Context
- Stack: Next.js 15, Tailwind, Supabase
- Tests: Run `npm run test` before committing.

# Coding Standards
- Prefer functional components.
- strict: true in tsconfig.
```

Once this file exists, every session you start in that folder automatically picks it up. No extra flag required.

## Choose the Right Permission Mode (This Changed in 2026)

Older guides describe Claude Code CLI as having two modes: a safe one that asks before every action, and a “YOLO” flag that skips all checks. That description is no longer accurate, and using it today means missing the mode most paid accounts now start in automatically.

### Manual Mode: Review Every Action

This is the original safe default. Claude proposes a plan and a specific file edit or command, you approve it, and only then does it run.

```
Prompt: "Refactor auth.ts to use OAuth."
Claude: proposes the plan.
You: approve, and it executes.
```

Good for sensitive codebases or when you are still learning what the agent tends to do.

### Auto Mode: The New Default on Pro, Max, and Team Plans

Since Anthropic rolled this out, paid accounts now start sessions in Auto Mode by default instead of Manual. A second model, a classifier, reviews each action instead of stopping to ask you. It runs a fast filter on every tool call, then a deeper chain-of-thought review on anything flagged as risky, while a separate input-side check screens file reads, web fetches, and shell output for injected instructions before they reach the agent’s context.

The result is far fewer interruptions without the blind trust that full permission-skipping requires. You can switch to it, or out of it, mid-session by pressing `Shift+Tab` to cycle permission modes.

### Bypass Permissions: Full Autonomy, Container Only

The flag many people call “YOLO mode” still exists:

```
claude --dangerously-skip-permissions
```

This removes every guardrail, including the classifier. It belongs inside an isolated container or VM only, never on a machine with credentials or production access nearby. For most day-to-day work, Auto Mode now covers the “let it run” use case more safely than this flag ever did.

## Claude Code CLI vs GitHub Copilot CLI: How They Really Compare Now

Developers keep asking whether switching from Copilot is worth it. The honest answer changed in 2026: GitHub Copilot CLI reached general availability and became genuinely agentic too, with its own plan mode (also on `Shift+Tab`, coincidentally), an autopilot mode, and specialized sub-agents for exploring code, running builds, and reviewing diffs.

The real difference today is less about “can it act on its own” and more about where each tool fits in your workflow. Claude Code CLI is terminal-first and model-agnostic about your stack. GitHub Copilot CLI leans into the GitHub ecosystem, including a `&` prefix that hands a task to a background cloud agent while your terminal stays free.

| Feature | 🤖 Claude Code CLI | 🐙 GitHub Copilot CLI |
| --- | --- | --- |
| Core Function | Agentic: plans, edits, and executes across your whole repo | Agentic: plans, edits, and executes via specialized sub-agents |
| ⏱️ Default Autonomy (2026) | Auto Mode with safety classifierPro / Max / Team | Manual approval by defaultAutopilot optional |
| File Access | Reads and edits the full working directory | Reads and edits the full working directory |
| Terminal Control | ✅ Runs shell commands, tests, and git workflows | ✅ Runs shell commands, tests, and git workflows |
| ☁️ Cloud Delegation | Switch permission mode mid-session (\`Shift+Tab\`) | \`&\` prefix hands a task to a background cloud agent |
| 📊 Best For | Terminal-first, platform-agnostic workflows | Teams already built around the GitHub ecosystem |
| 💰 Pricing Model | Usage-based via Anthropic plans | Bundled with GitHub Copilot subscription tiers |

Feature availability changes fast on both tools. Verify current plan limits and default permission behavior directly in each product’s docs before publishing time-sensitive claims.

If your team already lives inside GitHub Issues and pull requests, Copilot CLI’s cloud delegation fits naturally into that flow. If you want a terminal-first agent that is not tied to any single platform, Claude Code CLI is the more direct fit. If you would rather stay inside an IDE than a terminal, [our Cursor AI review 2026](https://techonplay.com/cursor-ai-review-2026/) covers how Claude models perform there day to day.

## FAQ

**Do I need a paid plan to use Claude Code CLI?**

_No, a free account works, but it hits rate limits fast once the agent runs multi-step tasks. A Pro, Max, or Team plan removes most of that friction and unlocks Auto Mode by default._

**What does Auto Mode actually check before running a command?**

_A classifier model reviews each action in two passes, a quick filter and a deeper review for anything flagged as risky, while a separate check screens tool output for injected instructions before Claude sees it._

**Is `--dangerously-skip-permissions` still necessary in 2026?**

_Rarely. Auto Mode now covers most “let it run” scenarios with an active safety layer. Reach for the skip-permissions flag only inside an isolateda container, never on a machine with real credentials nearby._

**Does CLAUDE.md work automatically, or do I need to load it manually?**

_It loads automatically. Any session started inside a folder containing a `CLAUDE.md` file picks it up without a flag or command._

**Is GitHub Copilot CLI a real alternative to Claude Code CLI now?**

_Yes, for teams built around GitHub. Copilot CLI reached general availability in 2026 with its own agentic execution and cloud delegation. Claude Code CLI remains the more terminal-first, platform-agnostic option._

## The Real Skill Is Managing the Agent, Not Installing It

Running the install command takes thirty seconds. Getting real value out of Claude Code CLI means writing a CLAUDE.md file that actually describes your project, and picking a permission mode that matches how much you trust the task in front of you.

**Your next step:** create a CLAUDE.md file in your current project root today, and start your next session paying attention to which permission mode it opens in. That one detail tells you more about how the agent will behave than any flag you could set manually.

-   ![How to Use ChatGPT Effectively](./images/How-to-Use-ChatGPT-Effectively-150x150.webp)
    
    [How to Use ChatGPT Effectively: 9 Rules That Actually Work \[2026\]](https://techonplay.com/how-to-use-chatgpt-effectively/)
-   ![](./images/o-que-significa-gpt-150x150.webp)
    
    [What Does GPT Stand For? The Acronym Everyone Uses but Few Understand](https://techonplay.com/what-does-gpt-stand-for/)
-   ![Perplexity Pro vs ChatGPT Plus](./images/Perplexity-Pro-vs-ChatGPT-Plus-150x150.webp)
    
    [Perplexity Pro vs ChatGPT Plus 2026: The Real Fight Is Who Finishes the Work](https://techonplay.com/perplexity-pro-vs-chatgpt-plus-2026/)
-   ![Notebook LM](./images/Google-2-150x150.webp)
    
    [Notebook LM Is Now Gemini Notebook: What Changed in 2026](https://techonplay.com/how-to-use-notebooklm/)
-   ![iPhone Duo Review](./images/iPhone-Duo-Review-150x150.webp)
    
    [iPhone Duo Review: Is Apple’s First Foldable Worth $1,999?](https://techonplay.com/iphone-duo-review/)
