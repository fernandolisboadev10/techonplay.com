---
title: "Copilot in Excel: 8 Features That Replaced the Old Hacks [Sept Update]"
description: "See what changed in Copilot in Excel for 2026, from Agent Mode and the COPILOT function to Python support and self-updating Canvas dashboards."
category: "Guides"
date: 2026-09-24
updated: 2026-09-24
readingTime: "11 min"
image: "./images/copilot.webp"
imageAlt: "Copilot in Excel"
---

Microsoft rebuilt **Copilot in Excel** twice this year, and most of the “hacks” advice still floating around online describes a tool that no longer exists. Agent Mode now builds full workbooks on its own, a new COPILOT function turns a prompt into a live formula, and Python runs inside a sheet without switching apps.

Here’s why that matters right now. Microsoft made Agent Mode the default across Office at Build 2026, shipped the COPILOT worksheet function in beta, added Python execution to Edit with Copilot in August, and is rolling out an AI dashboard builder called Canvas through early October. If the last thing you read about Copilot in Excel was a screenshot of a chat pane, you’re missing the features that actually save hours.

This guide walks through what changed since January, eight features worth learning today, what each one costs to access, and where the free tier still holds up against the paid plans.

## What Changed in Copilot in Excel Since January

Five updates reshaped the tool between April and September:

📅 **April 22:** Agent Mode reaches general availability in Word, Excel, and PowerPoint, letting Copilot act instead of only suggesting. 📅 **June 2:** Microsoft makes Agent Mode the default experience at Build 2026; the older chat-and-approve mode becomes optional. 📅 **August 25:** Edit with Copilot adds Python execution, so a request like “clean this column” runs real code inside the sheet. 📅 **September 5:** Canvas starts rolling out, turning a workbook into an interactive dashboard that updates itself when the data changes. 📅 **September 22:** Personalization, Workbook Rules, Copilot Skills, and connected data sources ship together. 📅 **September 23:** The Show Changes pane starts labeling which edits came from Copilot versus a person.

📊 Rollouts land in phases across Windows, Mac, and web, so two people on the same team can see different feature sets for a few weeks.

## 1\. Let Agent Mode Build the Workbook, Not Just Suggest Edits

Until this year, Copilot in Excel worked like a suggestion box. You asked, it proposed a formula or chart, and you approved each step one at a time.

Agent Mode flips that. Since June 2, 2026, it’s the default way Copilot works inside Excel, Word, and PowerPoint. Point it at a raw table and describe what you want built, and it explores the data, writes the formulas, assembles the table, and generates the chart without asking for approval at every step.

You can still switch back to the older suggestion-based mode from the Copilot pane if you’d rather review each change. Agent Mode needs a Microsoft 365 Copilot license or Microsoft 365 Premium, and larger organizations need Agent 365, Microsoft’s governance layer, configured first.

✅ Explores data and executes a full request on its own ✅ Works across Word and PowerPoint too, so a workbook change can trigger a slide update ❌ Requires a paid Copilot license; no free-tier access ❌ Managed tenants need Agent 365 turned on before rollout

## 2\. Write Natural-Language Formulas With the COPILOT Function

The new `=COPILOT()` function turns a plain instruction into a working formula. Type `=COPILOT("classify these as positive, neutral, or negative", B2:B50)` and it returns a value or a spilled range, the same way FILTER or UNIQUE would.

It’s built for the jobs that used to mean nesting IF statements or adding a helper column: standardizing company names, pulling one detail out of a messy text field, or scoring feedback for sentiment. Microsoft has it in beta with hourly call limits and a cap on rows per request, so it isn’t meant for processing an entire dataset in one formula yet.

✅ Reads like a real formula, so it updates when the source cell changes ✅ Handles classification, extraction, and standardization without a helper column ❌ Beta status means call limits and row caps apply ❌ Still requires a Copilot license to use

Related: our guide to [ChatGPT’s free automation options](https://techonplay.com/chatgpt-free-automations-guide/) covers a no-license alternative for similar cleanup work.

## 3\. Run Python Inside the Workbook, No Copy-Paste Required

Since August 25, Edit with Copilot executes Python in place. Ask it to summarize a trend, clean a column, or build a visualization, and it writes and runs the code, then drops the result straight into the workbook.

That matters most if you’ve been alt-tabbing to a notebook to do analysis Excel’s native functions can’t handle: multi-step reshaping, statistical tests, or a chart type the ribbon doesn’t offer.

✅ Runs real Python, not a formula approximation ✅ Output lands directly in the sheet, no export or import step ❌ Gated behind a Copilot license on Windows, Mac, and web ❌ Complex scripts can take longer to run than a native formula

## 4\. Turn a Raw Table Into a Dashboard That Updates Itself

Canvas started rolling out on September 5, with most users expected to have it by early October. Ask Copilot to build a dashboard, and it assembles charts, metrics, and insights into one interactive view, then stays connected to the workbook so the dashboard changes when the data does.

That replaces the old routine of manually rebuilding pivot tables and charts every time a report refreshes.

✅ Auto-updates when the source data changes, no manual rebuild ✅ Combines charts, KPIs, and commentary in one interactive view ❌ Still rolling out; not everyone has access as of late September ❌ Results still depend on starting from a clean, well-structured table

## 5\. Teach Copilot the Rules of This Specific Workbook

Workbook Rules live in a hidden `.Rules` worksheet and hold file-specific instructions, like defining what “net margin” means in this budget or which calculation method to use. Personalization is different: it stores account-level preferences, like formatting habits or naming conventions, that apply across every workbook you open.

Use Personalization for how you generally like Copilot to work, and Workbook Rules for facts specific to one file, so a coworker who opens it gets the same context you built in.

✅ File-specific context survives even when you’re not the one prompting ✅ Personalization applies your preferences across every workbook automatically ❌ Requires deliberately setting up the `.Rules` sheet or personalization pane first ❌ Rules in one file don’t carry over unless you add them elsewhere too

## 6\. Save a Prompt Once as a Copilot Skill

Skills are reusable automation templates, either built-in or custom text files (SKILL.md) stored in OneDrive. Instead of rewriting the same five-step prompt every Monday for the same weekly report, save it once as a Skill and call it by name or @mention.

✅ Turns a recurring five-step prompt into a one-word command ✅ Custom skills are plain text files, easy to edit or share with a team ❌ Building a good custom Skill takes upfront setup time ❌ Works best for tasks you genuinely repeat, not one-off requests

Related: our [ChatGPT productivity cheat sheet](https://techonplay.com/chatgpt-cheat-sheet-productivity/) has more reusable-prompt patterns worth adapting into a Skill.

## 7\. Pull In Data Copilot Didn’t Already Have

Connected data sources now cover the public web, Microsoft 365 work content, Power BI reports, and third-party business connectors. Ask Copilot to cross-reference your sales table with a live web search or a connected Power BI report, and it does the join without a manual export first.

✅ Removes the export and import step between tools ✅ Covers web search, Power BI, and third-party connectors, not only other M365 apps ❌ Availability depends on which connectors your organization enabled ❌ Corporate data governance rules apply to whatever gets connected

## 8\. See Exactly What Copilot Changed, Not Just That It Did

When Agent Mode makes edits without asking first, knowing what changed matters more, not less. Since September 23, chat responses carry clickable links that jump straight to the sheet, table, or chart Copilot just touched, and the Show Changes pane now labels which edits came from Copilot versus a person.

✅ Clickable links jump straight to the exact change, no manual hunting ✅ On-card attribution shows who, or what, made each edit ❌ Still requires opening the Show Changes pane; it isn’t automatic ❌ Most useful once Agent Mode is already making unsupervised edits

## Copilot in Excel: Feature Comparison

Here’s how the eight features stack up on what they do, what they require, and how ready they are today.

| 🛠 Feature | 📅 Shipped | 🎯 Best For | 🔓 Requires | 📊 Status |
| --- | --- | --- | --- | --- |
| Agent ModeDefault experience | Jun 2, 2026 | Full multi-step builds: tables, formulas, and charts together | Copilot Pro / Business / Enterprise | Generally Available |
| COPILOT Function\=COPILOT(prompt, range) | 2026 | Classifying, extracting, or standardizing data in one cell | Copilot license | Beta (call/row limits) |
| Python in Edit with CopilotWindows, Mac, Web | Aug 25, 2026 | Data cleaning, stats, and custom charts beyond native formulas | Copilot license | Generally Available |
| CanvasAI dashboard builder | Sep 5, 2026 | Auto-updating dashboards from a raw table | Copilot license | Rolling Out (by Oct) |
| Workbook Rules.Rules worksheet | Sep 22, 2026 | File-specific context, like calculation methods or definitions | Copilot license | Generally Available |
| PersonalizationAccount-level | Sep 22, 2026 | Formatting habits and naming rules applied across every workbook | Copilot license | Generally Available |
| Copilot SkillsSKILL.md in OneDrive | Sep 22, 2026 | Turning a recurring multi-step prompt into a saved command | Copilot license + OneDrive | Generally Available |
| Connected Data SourcesWeb, M365, Power BI, connectors | Sep 22, 2026 | Pulling in outside data without a manual export/import step | Copilot license + enabled connectors | Generally Available |
| Show Changes AttributionCopilot vs. manual edits | Sep 23, 2026 | Tracking exactly what Agent Mode changed and where | Copilot license | Generally Available |

Data as of September 24, 2026. Rollouts land in phases across Windows, Mac, and web, so availability can vary by account for a few weeks after a listed ship date. Pricing and feature access change often, check Microsoft’s Copilot release notes before budgeting for a specific tier.

## Which Copilot in Excel Plan Do You Actually Need?

The free Copilot chat panel still works inside Excel for quick questions, but it skips Agent Mode, the COPILOT function, and Canvas. Those need a paid seat:

✅ Copilot Pro at $20 a month bundles into Microsoft 365 Personal or Family, a fit for individual use ✅ Microsoft 365 Copilot Business runs $21 a month billed annually, or $25 month to month, on top of a qualifying business license ✅ Microsoft 365 Copilot Enterprise starts at $30 a month annually, on top of an E3 or E5 license, and is the tier IT teams need to turn on Agent 365 governance ❌ None of the paid tiers are cheap once the required base license gets added, so plan for roughly $33 to $87 a month per seat depending on the plan

## FAQ

### What is the COPILOT function in Excel?

_It’s a worksheet function, `=COPILOT(prompt, range)`, that turns a plain-language instruction into a live formula result. It classifies, extracts, or standardizes data the way FILTER or UNIQUE return a spilled range, and it’s currently in beta with limits on calls and rows per request._

### Is Copilot in Excel free to use?

_A basic chat panel is free, but Agent Mode, the COPILOT function, Python execution, and Canvas all require a paid Copilot seat, either Copilot Pro for individuals or Microsoft 365 Copilot Business or Enterprise for organizations._

### What’s the difference between Agent Mode and the COPILOT function?

_Agent Mode plans and executes a full multi-step task on its own, building tables, formulas, and charts together. The COPILOT function is a single formula you place in one cell, closer to a smarter version of a native Excel function._

### Does Copilot in Excel work as well as Gemini in Google Sheets?

_Both now offer prompt-driven formulas and multi-step autonomous edits, so the better fit usually comes down to which suite your organization already runs. See our roundup of [the best Google AI tools of 2026](https://techonplay.com/best-google-ai-tools-2026/) if you’re weighing Gemini’s side of that comparison._

### Do I need to know Python to use the new Python feature?

_No. You describe the task in plain language, such as “clean this column” or “chart the trend,” and Copilot writes and runs the Python for you, then places the result in the workbook._

## The Bottom Line

Copilot in Excel isn’t the “ask a chatbot to write a formula” tool it was in January. Agent Mode now runs multi-step tasks unsupervised, the COPILOT function puts natural language inside a single cell, and Canvas turns a table into a dashboard that keeps itself current.

Pick one feature from this list, most likely Agent Mode or the COPILOT function, and try it on a workbook you touch every week. The upgrade only pays off once it replaces an old habit.

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
