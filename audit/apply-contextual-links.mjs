// Content audit, phase 5b: hand-written contextual sentences with internal links, appended to the first
// prose paragraph under the named heading. Run from the repo root after apply-internal-links.mjs.
import { readFileSync, writeFileSync } from 'node:fs';

const L = (text, slug) => `[${text}](/${slug}/)`;
const ADD = {
  '3d-figurine-ai-trend-chatgpt': [
    ['Tips to Make the Figurine', `For more prompt formats beyond figurines, see our list of ${L('100 ChatGPT image prompts', 'chatgpt-image-prompts-visual-commands')}, and compare the tools in our ${L('best AI image generators of 2026', 'best-ai-image-generators-2026')}.`],
  ],
  '90s-ai-photo-trend-gemini-prompt': [
    ['Tips to Make the Result', `Want more prompt formats like these? Our guide to ${L('100 ChatGPT image prompts', 'chatgpt-image-prompts-visual-commands')} covers lighting, framing and camera angles, and our ${L('Grok Imagine 2.0 prompt formula', 'grok-imagine-2-0-prompts-guide')} works well for text-heavy scenes. For a wider comparison of tools, see the ${L('best AI image generators of 2026', 'best-ai-image-generators-2026')}.`],
  ],
  'ai-for-education-2026': [
    ['Risks Teachers', `Teachers who use AI to draft feedback or parent emails should also learn ${L('how to humanize AI content', 'how-to-humanize-ai-content-guide')} so the final text still sounds like them.`],
  ],
  'ai-ransomware-attacks': [
    ['Nvidia OpenShell and Sentry', `Agent safety is a wider problem. Our look at ${L('Moltbook', 'moltbook-ai-agent-platform-social-network')}, a network where autonomous agents talk to each other, shows how prompt injection can hijack a connected agent.`],
    ['What Unit 42 Found', `Defenders are getting new AI tools too. Google's ${L('Gemini 4 Argon', 'gemini-4-argon-release')} is restricted to vetted cyber defenders for exactly this reason.`],
  ],
  'artificial-intelligence-tools-2026': [
    ['Productivity and Work', `Google's lineup deserves its own breakdown, so see our ranking of the ${L('best Google AI tools', 'best-google-ai-tools-2026')} for details on Gemini, Flow and Antigravity.`],
  ],
  'artificial-movie-andrew-garfield-sam-altman': [
    ['Why Hollywood Keeps Making Movies', `The company at the center of the story keeps shipping. See what its newest model, ${L('GPT-6 Astra', 'gpt-6-astra-release')}, changes for developers.`],
    ['The Real Story Behind', `If the acronym in the story is new to you, our explainer on ${L('what GPT stands for', 'what-does-gpt-stand-for')} covers it in plain English, and our guide on ${L('how to use ChatGPT effectively', 'how-to-use-chatgpt-effectively')} shows what the product does today.`],
  ],
  'best-ai-image-generators-2026': [
    ['Which AI Image Generator Should You Pick', `Need video, voice or music too? Our roundup of ${L('artificial intelligence tools for every job', 'artificial-intelligence-tools-2026')} sorts the field by category.`],
  ],
  'best-ai-video-generators-of-2026': [
    ['Which of the Best AI Video Generators', `Most clips need audio, so pair a generator with one of the ${L('AI voice generators', 'how-to-use-ai-voice-generators')} we ranked, and see our ${L('AI tools guide', 'artificial-intelligence-tools-2026')} for the rest of the stack.`],
  ],
  'best-chatgpt-prompts-2026': [
    ['Best ChatGPT Prompts for Work', `For framework-based prompts such as SWOT and Porter's Five Forces, see our guide to ${L('ChatGPT prompts for business strategy', 'chatgpt-prompts-for-business-strategy')}.`],
    ['Best ChatGPT Prompts for Creativity', `Visual work gets its own list: ${L('100 ChatGPT image prompts', 'chatgpt-image-prompts-visual-commands')}.`],
    ['How to Adapt Any Prompt', `Pair good prompts with the habits in our guide on ${L('how to use ChatGPT effectively', 'how-to-use-chatgpt-effectively')}, and let ${L('scheduled tasks', 'chatgpt-free-automations-guide')} run your best prompts on autopilot.`],
  ],
  'best-gaming-pc-ai-and-gaming-2026': [
    ['Beyond the GPU', `Once the build is running, keep it stable with our fix for ${L('NVIDIA driver crashes', 'fix-nvidia-driver-crashing-2026')}. Headset shoppers can also read what iFixit found in the ${L('Steam Frame teardown', 'steam-frame-repairability')}.`],
    ['Why Your Gaming GPU', `Planning for the biggest release of the year? See what to expect in our ${L('GTA 6 system requirements', 'gta-6-system-requirements')} guide.`],
  ],
  'best-google-ai-tools-2026': [
    ['What Changed in Google AI Since May', `Google's newest and most powerful model, ${L('Gemini 4 Argon', 'gemini-4-argon-release')}, is not in this list because it is restricted to vetted cyber defenders for now.`],
  ],
  'best-vpn-for-ai-browsing': [
    ['Does a VPN Actually Stop', `A VPN covers your IP address, not what you type. For the settings that limit what chatbots store, read ${L('how to protect your data from AI chatbots', 'how-to-protect-your-data-from-ai-chatbots')}.`],
    ['How to Actually Use a VPN', `A VPN also does nothing against social engineering such as the ${L('fake blue screen scam', 'fake-blue-screen-scam')}, and your operating system matters too, as we cover in ${L('macOS vs Windows security', 'macos-vs-windows-security')}.`],
  ],
  'blackbox-ai': [
    ['Where Blackbox AI Falls Short', `Before pasting proprietary code into any assistant, review ${L('how to protect your data from AI chatbots', 'how-to-protect-your-data-from-ai-chatbots')}.`],
  ],
  'chatgpt-free-automations-guide': [
    ['Copy-Paste Prompt Automations', `Prompt quality decides whether a task works, so skim ${L('how to use ChatGPT effectively', 'how-to-use-chatgpt-effectively')} first.`],
    ['When Free Runs Out', `If you are deciding whether to pay for an assistant at all, see ${L('Perplexity Pro vs ChatGPT Plus', 'perplexity-pro-vs-chatgpt-plus-2026')}. Spreadsheet users can also automate work with ${L('Copilot in Excel', 'copilot-excel-hacks')}.`],
  ],
  'chatgpt-image-prompts-visual-commands': [
    ['How to Combine ChatGPT Image Prompts', `Want ready-made scenes? Try the ${L('3D figurine trend', '3d-figurine-ai-trend-chatgpt')} or the ${L('90s AI photo trend', '90s-ai-photo-trend-gemini-prompt')}.`],
    ['Why Generic Prompts Produce', `If ChatGPT is not the right tool for the job, compare it with the ${L('best AI image generators of 2026', 'best-ai-image-generators-2026')}. For text prompts, see our ${L('best ChatGPT prompts', 'best-chatgpt-prompts-2026')}.`],
  ],
  'chatgpt-prompts-for-business-strategy': [
    ['The 3-Line Prompt Upgrade', `For more templates beyond strategy, see the ${L('best ChatGPT prompts for 2026', 'best-chatgpt-prompts-2026')}, and learn the habits behind them in ${L('how to use ChatGPT effectively', 'how-to-use-chatgpt-effectively')}. Once a framework prompt works, you can ${L('schedule it as a recurring task', 'chatgpt-free-automations-guide')}.`],
  ],
  'claude-code-cli-tutorial': [
    ['Claude Code CLI vs GitHub Copilot CLI', `Prefer an editor to a terminal? See how ${L('Blackbox AI', 'blackbox-ai')} compares.`],
  ],
  'claude-sonnet-5-release': [
    ['Should You Upgrade', `To see how rivals compare, read our breakdown of ${L('GPT-6 Astra', 'gpt-6-astra-release')} and Google's restricted ${L('Gemini 4 Argon', 'gemini-4-argon-release')}.`],
  ],
  'copilot-excel-hacks': [
    ['Which Copilot in Excel Plan', `If you are weighing assistants more broadly, our ${L('Perplexity Pro vs ChatGPT Plus', 'perplexity-pro-vs-chatgpt-plus-2026')} comparison covers two other big $20 plans.`],
  ],
  'cursor-ai-review-2026': [
    ['Who Should Actually Use Cursor AI', `Terminal fans can try ${L('Claude Code', 'claude-code-cli-tutorial')} instead, and models like ${L('Claude Sonnet 5', 'claude-sonnet-5-release')} power much of this work.`],
  ],
  'deepseek-ai-2026-review': [
    ['Who Should Use DeepSeek AI', `To see how it stacks up against OpenAI's top model, read our ${L('GPT-6 Astra breakdown', 'gpt-6-astra-release')}.`],
  ],
  'deepseek-v4-vs-chatgpt-comparison': [
    ['Privacy and Control', `Whichever you choose, tighten your settings with our guide on ${L('how to protect your data from AI chatbots', 'how-to-protect-your-data-from-ai-chatbots')}.`],
    ['Who Should Pick Which', `If you land on ChatGPT, ${L('nine prompting rules', 'how-to-use-chatgpt-effectively')} will get more out of it.`],
  ],
  'fake-blue-screen-scam': [
    ['How the Fake Blue Screen Scam Works', `ClickFix attacks often end in ransomware, and AI is speeding that up: ${L('AI ransomware attacks', 'ai-ransomware-attacks')} now finish in under 10 hours.`],
    ['Actionable Defense', `Your operating system changes the risk, as we cover in ${L('macOS vs Windows security', 'macos-vs-windows-security')}. Another social-engineering threat is covered in ${L('how to detect deepfakes', 'how-to-detect-deepfakes-guide')}.`],
  ],
  'fix-nvidia-driver-crashing-2026': [
    ['How to Avoid Installing a Bad Driver', `Shopping for a new rig? See our ${L('best gaming PC for AI and gaming', 'best-gaming-pc-ai-and-gaming-2026')} builds.`],
  ],
  'gemini-4-argon-release': [
    ['What Should You Do Until Argon Is Public', `Developers can compare publicly available options in our ${L('Claude Sonnet 5 benchmark breakdown', 'claude-sonnet-5-release')}.`],
  ],
  'google-ai-plus-for-students': [
    ['Is There a Cheaper Bundle', `Students who want a non-Google option should read ${L('Perplexity for students', 'perplexity-for-students-2026')}.`],
  ],
  'google-flow-camera-commands': [
    ['What Google Flow Camera Commands Actually Do', `To see how Flow's video model compares, read our ranking of the ${L('best AI video generators', 'best-ai-video-generators-of-2026')}, and for the rest of Google's stack see the ${L('best Google AI tools', 'best-google-ai-tools-2026')}.`],
    ['Common Mistakes', `Still images need different commands, so see the ${L('best AI image generators', 'best-ai-image-generators-2026')}.`],
  ],
  'google-gemini-pro-students': [
    ['Build a Backup AI Stack', `Good backups include ${L('Perplexity for students', 'perplexity-for-students-2026')} and, inside Google's own stack, ${L('Gemini Notebook', 'how-to-use-notebooklm')}. Teachers can see more in ${L('AI for education', 'ai-for-education-2026')}.`],
  ],
  'gpt-6-astra-release': [
    ['Should You Switch After', `For a price-focused comparison, see ${L('DeepSeek V4 vs ChatGPT', 'deepseek-v4-vs-chatgpt-comparison')}. Rivals include ${L('Claude Sonnet 5', 'claude-sonnet-5-release')} and Google's restricted ${L('Gemini 4 Argon', 'gemini-4-argon-release')}.`],
    ['What the GPT-6 Astra Release Actually Changes', `New to the acronym? Here is ${L('what GPT stands for', 'what-does-gpt-stand-for')}.`],
  ],
  'grok-imagine-2-0-prompts-guide': [
    ['Common Mistakes That Waste', `Compare it with rivals in our ${L('best AI image generators', 'best-ai-image-generators-2026')} ranking, and borrow lighting and framing ideas from ${L('100 ChatGPT image prompts', 'chatgpt-image-prompts-visual-commands')}. The ${L('3D figurine trend', '3d-figurine-ai-trend-chatgpt')} also makes a fun test for any image model.`],
  ],
  'gta-6-system-requirements': [
    ['What to Upgrade First', `If you are building new, see our ${L('best gaming PC for AI and gaming', 'best-gaming-pc-ai-and-gaming-2026')}. Console players should read about ${L('PS5 QSSR', 'ps5-qssr-ai-upscaling-explained')}.`],
  ],
  'how-to-detect-deepfakes-guide': [
    ['Voice Call From', `Limit what scammers can learn about you by following ${L('how to protect your data from AI chatbots', 'how-to-protect-your-data-from-ai-chatbots')}.`],
  ],
  'how-to-humanize-ai-content-guide': [
    ['Editorial Skill', `Better inputs help too. See ${L('how to use ChatGPT effectively', 'how-to-use-chatgpt-effectively')} and our ${L('best ChatGPT prompts', 'best-chatgpt-prompts-2026')}. Teachers can apply the same ideas, as covered in ${L('AI for education', 'ai-for-education-2026')}.`],
  ],
  'how-to-protect-your-data-from-ai-chatbots': [
    ['Practical Habits', `A VPN closes one gap, covered in the ${L('best VPN for AI browsing', 'best-vpn-for-ai-browsing')}. Some providers add extra risk, as our ${L('DeepSeek review', 'deepseek-ai-2026-review')} explains. Attackers use AI too, as in ${L('AI ransomware attacks', 'ai-ransomware-attacks')}, and fake media is covered in ${L('how to detect deepfakes', 'how-to-detect-deepfakes-guide')}.`],
  ],
  'how-to-use-ai-voice-generators': [
    ['Getting the Most Out of', `Cloned voices also fuel scams, so learn ${L('how to detect deepfakes', 'how-to-detect-deepfakes-guide')}. For the other categories, see our ${L('AI tools by job', 'artificial-intelligence-tools-2026')} guide.`],
  ],
  'how-to-use-chatgpt-effectively': [
    ['Rule 9', `Ready to automate? Read our guide to ${L('ChatGPT free automations', 'chatgpt-free-automations-guide')}.`],
    ['Rule 1: Match the Mode', `Deciding between plans? See ${L('Perplexity Pro vs ChatGPT Plus', 'perplexity-pro-vs-chatgpt-plus-2026')}. If you want the basics first, read ${L('what GPT stands for', 'what-does-gpt-stand-for')}.`],
  ],
  'how-to-use-notebooklm': [
    ['Where Notebook LM Still Falls Short', `US college students can get a free year of Google AI Pro. See ${L('Gemini Pro for students', 'google-gemini-pro-students')}.`],
  ],
  'iphone-duo-review': [
    ['Is the iPhone Duo Worth It', `Samsung's pricing is moving too, as covered in our ${L('Galaxy S26 price increase', 'samsung-galaxy-s26-price-increase')} report.`],
  ],
  'is-linux-more-secure-than-windows-2026': [
    ['How to Actually Harden', `Hardening does not stop social engineering such as the ${L('fake blue screen scam', 'fake-blue-screen-scam')}. If you are studying for a certification, see our ${L('Security+ passing score', 'security-plus-passing-score')} guide.`],
  ],
  'moltbook-ai-agent-platform-social-network': [
    ['Is Moltbook Actually Safe to Join', `Agents can be turned against victims too, as in ${L('AI ransomware attacks', 'ai-ransomware-attacks')}. The same sandboxing logic applies to coding agents like ${L('Claude Code', 'claude-code-cli-tutorial')}, and our guide on ${L('how to protect your data from AI chatbots', 'how-to-protect-your-data-from-ai-chatbots')} covers the personal side.`],
  ],
  'perplexity-for-students-2026': [
    ['The Mistake That Gets Students', `Teachers face the same questions, as covered in ${L('AI for education', 'ai-for-education-2026')}.`],
  ],
  'perplexity-pro-vs-chatgpt-plus-2026': [
    ['Which Plan Should You Buy', `Whichever plan you pick, ${L('nine rules for using ChatGPT effectively', 'how-to-use-chatgpt-effectively')} improve results, and ${L('DeepSeek V4 vs ChatGPT', 'deepseek-v4-vs-chatgpt-comparison')} shows the cheaper alternative.`],
  ],
  'ps5-qssr-ai-upscaling-explained': [
    ['Why PS5 QSSR Matters', `See our ${L('GTA 6 system requirements', 'gta-6-system-requirements')} guide for the release everyone is waiting on. PC players can check the ${L('best gaming PC for AI and gaming', 'best-gaming-pc-ai-and-gaming-2026')}.`],
  ],
  'samsung-galaxy-s26-price-increase': [
    ['What Should You Do Before You Buy', `Hardware prices are a theme this fall. See the ${L('Steam Frame', 'steam-frame-repairability')} headset's price and repairability, or our ${L('iPhone Duo review', 'iphone-duo-review')}.`],
  ],
  'security-plus-passing-score': [
    ['Focus on the Highest-Weight Domains', `Threat topics stick better with real cases: see ${L('AI ransomware attacks', 'ai-ransomware-attacks')}. For OS hardening basics, read ${L('macOS vs Windows security', 'macos-vs-windows-security')} and ${L('Is Linux more secure than Windows', 'is-linux-more-secure-than-windows-2026')}.`],
  ],
  'steam-frame-repairability': [
    ['Should Repairability Change', `Other hardware news: see ${L('PS5 QSSR', 'ps5-qssr-ai-upscaling-explained')} and the ${L('iPhone Duo review', 'iphone-duo-review')}.`],
  ],
  'tripo-ai-review': [
    ['What Tripo AI Does in 2026', `For other generators, see our ${L('artificial intelligence tools guide', 'artificial-intelligence-tools-2026')} and the ${L('best AI image generators', 'best-ai-image-generators-2026')}. Heavy 3D work also benefits from a strong GPU, so see our ${L('best gaming PC for AI and gaming', 'best-gaming-pc-ai-and-gaming-2026')} builds.`],
  ],
  'what-does-gpt-stand-for': [
    ['GPT vs. ChatGPT', `Ready to use it? Read ${L('how to use ChatGPT effectively', 'how-to-use-chatgpt-effectively')}, and for a rival see ${L('DeepSeek V4 vs ChatGPT', 'deepseek-v4-vs-chatgpt-comparison')}.`],
  ],
};

const unplaced = [];
for (const [slug, items] of Object.entries(ADD)) {
  const path = `src/content/blog/${slug}.md`;
  let lines = readFileSync(path, 'utf8').replaceAll('\r\n', '\n').split('\n');
  for (const [heading, sentence] of items) {
    const h = lines.findIndex(l => /^#{2,4}\s/.test(l) && l.includes(heading));
    if (h < 0) { unplaced.push(`${slug}: heading "${heading}" not found`); continue; }
    if (lines.some(l => l.includes(sentence))) continue;
    let placed = false;
    for (let i = h + 1; i < lines.length && !/^#{1,4}\s/.test(lines[i]); i++) {
      if (lines[i].length > 80 && /^[A-Z“"\[]/.test(lines[i]) && !/^\[Editorial/.test(lines[i])) {
        lines[i] = lines[i] + ' ' + sentence; placed = true; break;
      }
    }
    if (!placed) {
      // section holds only lists or tables: add a short standalone paragraph at its end
      let end = h + 1;
      while (end < lines.length && !/^#{1,4}\s/.test(lines[end])) end++;
      while (end > h + 1 && lines[end - 1].trim() === '') end--;
      lines.splice(end, 0, '', sentence);
    }
  }
  writeFileSync(path, lines.join('\n'));
}

// footer cleanups for two weak related links
for (const [slug, drop] of [['iphone-duo-review', 'best-vpn-for-ai-browsing'], ['samsung-galaxy-s26-price-increase', 'google-gemini-pro-students']]) {
  const path = `src/content/blog/${slug}.md`;
  const t = readFileSync(path, 'utf8').split('\n').filter(l => !l.includes(`(/${drop}/)`) || !l.startsWith('- ')).join('\n');
  writeFileSync(path, t);
}
console.log(unplaced.length ? unplaced.join('\n') : 'all placed');
