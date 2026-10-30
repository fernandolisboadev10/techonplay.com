---
title: "How to Install Claude Code CLI: Complete Setup Guide (2026)"
seoTitle: "How to Install Claude Code CLI: Setup Guide (2026)"
description: "Install Claude Code CLI the right way: prerequisites, CLAUDE.md setup, and the new Auto Mode permission system explained for 2026."
category: "Guides"
date: 2026-09-18
updated: 2026-10-29T20:16:02-04:00
readingTime: "8 min"
image: "./images/Claude-Code-CLI.webp"
imageAlt: "Claude Code CLI"
---

It is 2026, and most developers still install AI coding tools the same way they did two years ago: one npm command, then guesswork. The **Claude Code CLI** deserves better than that. It is not a chatbot living in your terminal, it is an agent that plans, edits, and debugs multi-file projects with very little hand-holding. If the term “agentic” is still fuzzy, it means the tool plans multi-step work, uses tools on its own and checks the result with minimal supervision.

The bigger story this year is not the install command itself. Anthropic changed how much autonomy the CLI gets by default, replacing the binary “ask every time” or “skip every check” choice with a middle ground built around a safety classifier. Most install guides published before mid-2026 never mention this, and the install method itself has changed too: the recommended route is now a native installer, not npm.

This guide covers the real prerequisites, the install commands, the CLAUDE.md file that gives the agent project context, and every permission mode you can choose between today, including the one that is now the default. It ends with an honest comparison against GitHub Copilot CLI, which caught up on autonomy faster than most people realize.

## What You Need Before You Install Claude Code CLI

Less than you might expect. Per Anthropic's setup documentation, Claude Code runs on macOS 13+, Windows 10 (1809+), and recent Ubuntu, Debian, and Alpine releases, with at least 4 GB of RAM and an internet connection.

✅ **A paid account** – Claude Code requires a Pro, Max, Team, Enterprise, or Console account. The free claude.ai plan does not include it. ✅ **Git (recommended)** – the agent works best in a git repository, and on native Windows Git for Windows gives it a Bash shell (otherwise it uses PowerShell). ✅ **Node.js only for the npm route** – the native installer does not need it. Ripgrep is normally bundled.

⏱️ **Quick check**

```
git --version
```

If Git is missing, install it first. You do not need to install Node.js or ripgrep separately for the recommended install.

## Install Claude Code CLI With the Native Installer

Anthropic now lists the native installer as the recommended method. It also auto-updates in the background.

On macOS, Linux, or WSL:

```
curl -fsSL https://claude.ai/install.sh | bash
```

On Windows PowerShell:

```
irm https://claude.ai/install.ps1 | iex
```

Homebrew (`brew install --cask claude-code`) and WinGet (`winget install Anthropic.ClaudeCode`) also work, but those installs do not auto-update. When the installer finishes, open a new terminal and run `claude --version` to confirm it worked.

### Prefer npm?

npm is still supported. It installs the same native binary and needs Node.js 22 or later:

```
npm install -g @anthropic-ai/claude-code
```

If you hit a “permission denied” error, do not use `sudo`. Fix your npm global-install permissions or use a version manager like `nvm`.

### Authenticate the CLI

From your project directory, start the agent:

```
claude
```

This opens a browser window for login with your Anthropic account. Once authenticated, you can pick the model with `/model`. For how the current Sonnet generation performs on coding work, see our [Claude Sonnet 5 release breakdown](/claude-sonnet-5-release/). A Pro, Max, or Team plan is what lets you run the agent through longer autonomous tasks.

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

Older guides describe Claude Code CLI as having two modes: a safe one that asks before every action, and a “YOLO” flag that skips all checks. That description is no longer accurate. Anthropic's permission-modes documentation now lists six: Manual (`default`), Edit automatically (`acceptEdits`), Plan, Auto, `dontAsk` for locked-down CI, and Bypass permissions.

### Manual Mode: Review Every Action

This is the original safe default. Claude proposes a plan and a specific file edit or command, you approve it, and only then does it run.

```
Prompt: "Refactor auth.ts to use OAuth."
Claude: proposes the plan.
You: approve, and it executes.
```

Good for sensitive codebases or when you are still learning what the agent tends to do.

### Auto Mode: The New Default

Anthropic turned auto mode on by default for Pro, Max, and Team accounts from August 14, according to TechCrunch. Anthropic's docs now say that from Claude Code v2.1.283, Auto is the starting mode for interactive terminal and VS Code sessions on every plan and provider (HIPAA-configured organizations start in Manual), so check your version if yours opens differently. A second model, a classifier, reviews each action instead of stopping to ask you. It runs a fast filter on every tool call, then a deeper chain-of-thought review on anything flagged as risky, while a separate input-side check screens file reads, web fetches, and shell output for injected instructions before they reach the agent’s context.

The result is far fewer interruptions without the blind trust that full permission-skipping requires. Press `Shift+Tab` to cycle modes mid-session: Auto, Manual, Edit automatically, Plan, then back to Auto. Auto mode needs a supported model (for the Anthropic API: Opus 4.6+, Sonnet 4.6+, Haiku 5.5, or a Fable model), and admins on Team and Enterprise can turn it off.

### Bypass Permissions: Full Autonomy, Container Only

The flag many people call “YOLO mode” still exists:

```
claude --dangerously-skip-permissions
```

This removes the guardrails, including the classifier. The docs say to use it only in isolated environments such as containers or VMs, and it cannot be switched on mid-session: you must start the session with it. It never belongs on a machine with credentials or production access nearby. For most day-to-day work, Auto Mode now covers the “let it run” use case more safely than this flag ever did.

## Claude Code CLI vs GitHub Copilot CLI: How They Really Compare Now

Developers keep asking whether switching from Copilot is worth it. The honest answer changed in 2026: GitHub Copilot CLI became generally available on February 25, 2026 and is genuinely agentic too, with a plan mode (also on `Shift+Tab`), an autopilot mode, and built-in sub-agents for exploring code, running builds, and reviewing diffs, per GitHub's changelog. Prefer an editor to a terminal? See how [Blackbox AI](/blackbox-ai/) compares.

The real difference today is less about “can it act on its own” and more about where each tool fits in your workflow. Claude Code CLI is terminal-first and works with any language or stack. GitHub Copilot CLI leans into the GitHub ecosystem, including a `&` prefix that hands a task to a background cloud agent while your terminal stays free.

| Feature | 🤖 Claude Code CLI | 🐙 GitHub Copilot CLI |
| --- | --- | --- |
| Core Function | Agentic: plans, edits, and executes across your whole repo | Agentic: plans, edits, and executes via specialized sub-agents |
| ⏱️ Autonomy (2026) | Auto Mode with a safety classifier | You choose how much control to keep, from approving every action to autopilot |
| File Access | Reads and edits the full working directory | Reads and edits the full working directory |
| Terminal Control | ✅ Runs shell commands, tests, and git workflows | ✅ Runs shell commands, tests, and git workflows |
| ☁️ Mode Switching | Cycle permission modes mid-session with \`Shift+Tab\` | \`&\` prefix hands a task to a background cloud agent, plan mode on \`Shift+Tab\` |
| 📊 Best For | Terminal-first, platform-agnostic workflows | Teams already built around the GitHub ecosystem |
| 💰 Pricing Model | Usage-based via Anthropic plans | Bundled with GitHub Copilot subscription tiers |

Features change fast on both tools, so check each product’s docs for current plan limits and defaults.

If your team already lives inside GitHub Issues and pull requests, Copilot CLI’s cloud delegation fits naturally into that flow. If you want a terminal-first agent that is not tied to any single platform, Claude Code CLI is the more direct fit. If you would rather stay inside an IDE than a terminal, [our Cursor AI review 2026](/cursor-ai-review-2026/) covers how Claude models perform there day to day.

## FAQ

**Do I need a paid plan to use Claude Code CLI?**

_Yes. Anthropic's docs say Claude Code requires a Pro, Max, Team, Enterprise, or Console account (or a third-party provider such as Amazon Bedrock); the free claude.ai plan does not include it._

**What does Auto Mode actually check before running a command?**

_A classifier model reviews each action in two passes, a quick filter and a deeper review for anything flagged as risky, while a separate check screens tool output for injected instructions before Claude sees it._

**Is `--dangerously-skip-permissions` still necessary in 2026?**

_Rarely. Auto Mode now covers most “let it run” scenarios with an active safety layer. Reach for the skip-permissions flag only inside an isolated container, never on a machine with real credentials nearby._

**Does CLAUDE.md work automatically, or do I need to load it manually?**

_It loads automatically. Any session started inside a folder containing a `CLAUDE.md` file picks it up without a flag or command._

**Is GitHub Copilot CLI a real alternative to Claude Code CLI now?**

_Yes, for teams built around GitHub. Copilot CLI reached general availability in February 2026 with its own agentic execution and cloud delegation. Claude Code CLI remains the more terminal-first, platform-agnostic option._

## The Real Skill Is Managing the Agent, Not Installing It

Running the install command takes thirty seconds. Getting real value out of Claude Code CLI means writing a CLAUDE.md file that actually describes your project, and picking a permission mode that matches how much you trust the task in front of you.

**Your next step:** create a CLAUDE.md file in your current project root today, and note which permission mode your next session opens in. That one detail tells you more about how the agent will behave than any flag you could set manually.

## Sources

- [TechCrunch: Anthropic is turning Claude Code’s auto mode on by default](https://techcrunch.com/2026/08/09/anthropic-is-turning-claude-codes-auto-mode-on-by-default/)
- [Engadget: Anthropic releases safer Claude Code auto mode](https://www.engadget.com/ai/anthropic-releases-safer-claude-code-auto-mode-to-avoid-mass-file-deletions-and-other-ai-snafus-142500615.html)
- [Claude Code docs: Advanced setup](https://code.claude.com/docs/en/setup)
- [Claude Code docs: Permission modes](https://code.claude.com/docs/en/permission-modes)
- [GitHub changelog: Copilot CLI is now generally available](https://github.blog/changelog/2026-02-25-github-copilot-cli-is-now-generally-available/)
- [TechCrunch: Anthropic hands Claude Code more control, but keeps it on a leash](https://techcrunch.com/2026/03/24/anthropic-hands-claude-code-more-control-but-keeps-it-on-a-leash/)

## Related Reading

- [Claude Sonnet 5 Release 2026: Full Benchmarks and Upgrade Verdict](/claude-sonnet-5-release/)
- [Cursor AI Review 2026: Is the $29B Coding Tool Worth It?](/cursor-ai-review-2026/)
- [Blackbox AI Review 2026: Features, Pricing and the Real Verdict](/blackbox-ai/)
- [Moltbook AI Agent Network: Inside the Social Platform Built for Bots](/moltbook-ai-agent-platform-social-network/)
