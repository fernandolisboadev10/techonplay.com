// Content audit, phase 4/5: fixes broken internal links, replaces the repeated 5-post footer with a
// per-post "Related reading" block and adds contextual inline links. Run from the repo root.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const dir = 'src/content/blog/';
const files = readdirSync(dir).filter(f => f.endsWith('.md'));
const slugs = new Set(files.map(f => f.replace(/\.md$/, '')));

const RELATED = {
  'artificial-intelligence-tools-2026': ['best-ai-image-generators-2026','best-ai-video-generators-of-2026','how-to-use-ai-voice-generators','best-google-ai-tools-2026'],
  'best-google-ai-tools-2026': ['how-to-use-notebooklm','google-flow-camera-commands','gemini-4-argon-release','google-gemini-pro-students'],
  'best-ai-image-generators-2026': ['grok-imagine-2-0-prompts-guide','chatgpt-image-prompts-visual-commands','best-ai-video-generators-of-2026','artificial-intelligence-tools-2026'],
  'best-ai-video-generators-of-2026': ['google-flow-camera-commands','best-ai-image-generators-2026','how-to-use-ai-voice-generators','artificial-intelligence-tools-2026'],
  'how-to-use-ai-voice-generators': ['best-ai-video-generators-of-2026','artificial-intelligence-tools-2026','how-to-detect-deepfakes-guide'],
  'how-to-use-chatgpt-effectively': ['best-chatgpt-prompts-2026','chatgpt-free-automations-guide','perplexity-pro-vs-chatgpt-plus-2026','what-does-gpt-stand-for'],
  'best-chatgpt-prompts-2026': ['how-to-use-chatgpt-effectively','chatgpt-prompts-for-business-strategy','chatgpt-image-prompts-visual-commands','chatgpt-free-automations-guide'],
  'chatgpt-prompts-for-business-strategy': ['best-chatgpt-prompts-2026','how-to-use-chatgpt-effectively','chatgpt-free-automations-guide'],
  'chatgpt-free-automations-guide': ['how-to-use-chatgpt-effectively','best-chatgpt-prompts-2026','perplexity-pro-vs-chatgpt-plus-2026','copilot-excel-hacks'],
  'chatgpt-image-prompts-visual-commands': ['best-ai-image-generators-2026','3d-figurine-ai-trend-chatgpt','90s-ai-photo-trend-gemini-prompt','best-chatgpt-prompts-2026'],
  'what-does-gpt-stand-for': ['gpt-6-astra-release','how-to-use-chatgpt-effectively','deepseek-v4-vs-chatgpt-comparison'],
  'gpt-6-astra-release': ['deepseek-v4-vs-chatgpt-comparison','claude-sonnet-5-release','gemini-4-argon-release','what-does-gpt-stand-for'],
  'perplexity-pro-vs-chatgpt-plus-2026': ['how-to-use-chatgpt-effectively','perplexity-for-students-2026','deepseek-v4-vs-chatgpt-comparison','gpt-6-astra-release'],
  'deepseek-v4-vs-chatgpt-comparison': ['deepseek-ai-2026-review','gpt-6-astra-release','how-to-protect-your-data-from-ai-chatbots','how-to-use-chatgpt-effectively'],
  'deepseek-ai-2026-review': ['deepseek-v4-vs-chatgpt-comparison','how-to-protect-your-data-from-ai-chatbots','gpt-6-astra-release'],
  'claude-sonnet-5-release': ['claude-code-cli-tutorial','gpt-6-astra-release','cursor-ai-review-2026','gemini-4-argon-release'],
  'gemini-4-argon-release': ['gpt-6-astra-release','best-google-ai-tools-2026','claude-sonnet-5-release','ai-ransomware-attacks'],
  'claude-code-cli-tutorial': ['claude-sonnet-5-release','cursor-ai-review-2026','blackbox-ai'],
  'cursor-ai-review-2026': ['blackbox-ai','claude-code-cli-tutorial','claude-sonnet-5-release'],
  'blackbox-ai': ['cursor-ai-review-2026','claude-code-cli-tutorial','how-to-protect-your-data-from-ai-chatbots'],
  'google-gemini-pro-students': ['google-ai-plus-for-students','perplexity-for-students-2026','how-to-use-notebooklm','ai-for-education-2026'],
  'google-ai-plus-for-students': ['google-gemini-pro-students','perplexity-for-students-2026','best-google-ai-tools-2026'],
  'how-to-use-notebooklm': ['best-google-ai-tools-2026','ai-for-education-2026','perplexity-for-students-2026','google-gemini-pro-students'],
  'google-flow-camera-commands': ['best-ai-video-generators-of-2026','best-google-ai-tools-2026','best-ai-image-generators-2026'],
  'ai-for-education-2026': ['perplexity-for-students-2026','google-gemini-pro-students','how-to-use-notebooklm','how-to-humanize-ai-content-guide'],
  'perplexity-for-students-2026': ['perplexity-pro-vs-chatgpt-plus-2026','ai-for-education-2026','google-gemini-pro-students','how-to-use-notebooklm'],
  '90s-ai-photo-trend-gemini-prompt': ['3d-figurine-ai-trend-chatgpt','chatgpt-image-prompts-visual-commands','grok-imagine-2-0-prompts-guide','best-ai-image-generators-2026'],
  '3d-figurine-ai-trend-chatgpt': ['90s-ai-photo-trend-gemini-prompt','chatgpt-image-prompts-visual-commands','best-ai-image-generators-2026'],
  'grok-imagine-2-0-prompts-guide': ['best-ai-image-generators-2026','chatgpt-image-prompts-visual-commands','3d-figurine-ai-trend-chatgpt'],
  'how-to-protect-your-data-from-ai-chatbots': ['best-vpn-for-ai-browsing','deepseek-ai-2026-review','how-to-detect-deepfakes-guide','ai-ransomware-attacks'],
  'best-vpn-for-ai-browsing': ['how-to-protect-your-data-from-ai-chatbots','macos-vs-windows-security','fake-blue-screen-scam'],
  'how-to-detect-deepfakes-guide': ['how-to-use-ai-voice-generators','fake-blue-screen-scam','how-to-protect-your-data-from-ai-chatbots'],
  'ai-ransomware-attacks': ['fake-blue-screen-scam','moltbook-ai-agent-platform-social-network','how-to-protect-your-data-from-ai-chatbots','gemini-4-argon-release'],
  'fake-blue-screen-scam': ['ai-ransomware-attacks','macos-vs-windows-security','how-to-detect-deepfakes-guide'],
  'macos-vs-windows-security': ['is-linux-more-secure-than-windows-2026','fake-blue-screen-scam','best-vpn-for-ai-browsing'],
  'is-linux-more-secure-than-windows-2026': ['macos-vs-windows-security','fake-blue-screen-scam','security-plus-passing-score'],
  'security-plus-passing-score': ['is-linux-more-secure-than-windows-2026','macos-vs-windows-security','ai-ransomware-attacks'],
  'moltbook-ai-agent-platform-social-network': ['ai-ransomware-attacks','how-to-protect-your-data-from-ai-chatbots','claude-code-cli-tutorial'],
  'gta-6-system-requirements': ['best-gaming-pc-ai-and-gaming-2026','fix-nvidia-driver-crashing-2026','ps5-qssr-ai-upscaling-explained'],
  'best-gaming-pc-ai-and-gaming-2026': ['fix-nvidia-driver-crashing-2026','gta-6-system-requirements','steam-frame-repairability'],
  'fix-nvidia-driver-crashing-2026': ['best-gaming-pc-ai-and-gaming-2026','gta-6-system-requirements','steam-frame-repairability'],
  'ps5-qssr-ai-upscaling-explained': ['gta-6-system-requirements','best-gaming-pc-ai-and-gaming-2026','steam-frame-repairability'],
  'steam-frame-repairability': ['best-gaming-pc-ai-and-gaming-2026','ps5-qssr-ai-upscaling-explained','iphone-duo-review'],
  'iphone-duo-review': ['samsung-galaxy-s26-price-increase','steam-frame-repairability','best-vpn-for-ai-browsing'],
  'samsung-galaxy-s26-price-increase': ['iphone-duo-review','steam-frame-repairability','google-gemini-pro-students'],
  'copilot-excel-hacks': ['chatgpt-free-automations-guide','best-chatgpt-prompts-2026','perplexity-pro-vs-chatgpt-plus-2026'],
  'tripo-ai-review': ['artificial-intelligence-tools-2026','best-ai-image-generators-2026','best-gaming-pc-ai-and-gaming-2026'],
  'how-to-humanize-ai-content-guide': ['how-to-use-chatgpt-effectively','best-chatgpt-prompts-2026','ai-for-education-2026'],
  'artificial-movie-andrew-garfield-sam-altman': ['gpt-6-astra-release','what-does-gpt-stand-for','how-to-use-chatgpt-effectively'],
};

// Phrases (tried in order, case-insensitive) that may carry a link to each target.
const ANCHORS = {
  'artificial-intelligence-tools-2026': ['artificial intelligence tools', 'AI tools'],
  'best-google-ai-tools-2026': ['Google AI tools', 'best Google AI'],
  'best-ai-image-generators-2026': ['AI image generators', 'AI image generator', 'image generators'],
  'best-ai-video-generators-of-2026': ['AI video generators', 'AI video generator', 'video generators'],
  'how-to-use-ai-voice-generators': ['AI voice generators', 'AI voice generator', 'voice cloning'],
  'how-to-use-chatgpt-effectively': ['use ChatGPT effectively', 'prompting guide'],
  'best-chatgpt-prompts-2026': ['ChatGPT prompts'],
  'chatgpt-prompts-for-business-strategy': ['business strategy'],
  'chatgpt-free-automations-guide': ['scheduled tasks', 'ChatGPT automations'],
  'chatgpt-image-prompts-visual-commands': ['ChatGPT image prompts', 'image prompts'],
  'what-does-gpt-stand-for': ['Generative Pre-trained Transformer', 'what GPT stands for'],
  'gpt-6-astra-release': ['GPT-6 Astra'],
  'perplexity-pro-vs-chatgpt-plus-2026': ['Perplexity Pro vs ChatGPT Plus', 'Perplexity Pro'],
  'deepseek-v4-vs-chatgpt-comparison': ['DeepSeek V4 vs ChatGPT', 'DeepSeek vs ChatGPT'],
  'deepseek-ai-2026-review': ['DeepSeek'],
  'claude-sonnet-5-release': ['Sonnet 5'],
  'gemini-4-argon-release': ['Gemini 4 Argon', 'Argon'],
  'claude-code-cli-tutorial': ['Claude Code'],
  'cursor-ai-review-2026': ['Cursor AI', 'Cursor'],
  'blackbox-ai': ['Blackbox AI'],
  'google-gemini-pro-students': ['Gemini Pro for students', 'Google AI Pro'],
  'google-ai-plus-for-students': ['Google AI Plus'],
  'how-to-use-notebooklm': ['Gemini Notebook', 'NotebookLM', 'Notebook LM'],
  'google-flow-camera-commands': ['Google Flow'],
  'ai-for-education-2026': ['AI for education', 'AI in the classroom', 'teachers'],
  'perplexity-for-students-2026': ['Perplexity for students', 'Perplexity'],
  '90s-ai-photo-trend-gemini-prompt': ['90s AI photo trend'],
  '3d-figurine-ai-trend-chatgpt': ['3D figurine', 'figurine trend'],
  'grok-imagine-2-0-prompts-guide': ['Grok Imagine'],
  'how-to-protect-your-data-from-ai-chatbots': ['protect your data', 'privacy settings'],
  'best-vpn-for-ai-browsing': ['VPN'],
  'how-to-detect-deepfakes-guide': ['deepfakes', 'deepfake'],
  'ai-ransomware-attacks': ['ransomware'],
  'fake-blue-screen-scam': ['ClickFix', 'fake blue screen'],
  'macos-vs-windows-security': ['macOS vs Windows', 'macOS and Windows'],
  'is-linux-more-secure-than-windows-2026': ['Linux'],
  'security-plus-passing-score': ['Security+'],
  'moltbook-ai-agent-platform-social-network': ['Moltbook'],
  'gta-6-system-requirements': ['GTA 6'],
  'best-gaming-pc-ai-and-gaming-2026': ['gaming PC', 'gaming rig'],
  'fix-nvidia-driver-crashing-2026': ['NVIDIA driver', 'driver crash'],
  'ps5-qssr-ai-upscaling-explained': ['QSSR'],
  'steam-frame-repairability': ['Steam Frame'],
  'iphone-duo-review': ['iPhone Duo'],
  'samsung-galaxy-s26-price-increase': ['Galaxy S26'],
  'copilot-excel-hacks': ['Copilot in Excel'],
  'tripo-ai-review': ['Tripo'],
  'how-to-humanize-ai-content-guide': ['humanize AI content', 'humanize'],
  'artificial-movie-andrew-garfield-sam-altman': ['Artificial movie'],
};

// Dead URLs inherited from the WordPress era: retarget to the closest live post, or null to drop the link.
const BROKEN = {
  'perplexity-for-students': 'perplexity-for-students-2026',
  'chatgpt-cheat-sheet-productivity': 'best-chatgpt-prompts-2026',
  'strategic-prompts-for-chatgpt': 'chatgpt-prompts-for-business-strategy',
  'claude-sonnet-5-release-2026': 'claude-sonnet-5-release',
  'deepseek-v4-coding-guide': 'deepseek-ai-2026-review',
  'blackbox-ai-vs-github-copilot': 'blackbox-ai',
};

const frontTitle = raw => (raw.match(/^title:\s*"(.*)"\s*$/m) || [])[1].replace(/\\"/g, '"');
const titles = {};
const docs = {};
for (const f of files) {
  const s = f.replace(/\.md$/, '');
  docs[s] = readFileSync(dir + f, 'utf8').replaceAll('\r\n', '\n');
  titles[s] = frontTitle(docs[s]);
}

const report = [];
for (const s of Object.keys(docs)) {
  let raw = docs[s];
  const fmEnd = raw.indexOf('\n---', 4) + 4;
  let head = raw.slice(0, fmEnd);
  let body = raw.slice(fmEnd);

  // 1. old footer: image + link list at the end of the post (plus its heading)
  const lines = body.split('\n');
  let cut = -1;
  for (let i = Math.max(0, lines.length - 40); i < lines.length; i++) {
    if (/^-\s+!\[/.test(lines[i])) { cut = i; break; }
  }
  if (cut >= 0) {
    let end = cut;
    while (end > 0 && (/^\s*$/.test(lines[end - 1]) || /^#+\s.*Further Reading/i.test(lines[end - 1]))) end--;
    body = lines.slice(0, end).join('\n') + '\n';
  }
  body = body.replace(/^Copy Prompt\n\n?/gm, '');

  // 2. normalise internal links to relative paths; fix or drop the dead ones
  body = body.replace(/\[([^\]]+)\]\((?:https?:\/\/(?:www\.)?techonplay\.com)?\/([^)\s#?]*?)\/?\)/g, (m, text, path) => {
    if (!path || path.startsWith('images')) return m;
    if (slugs.has(path)) return `[${text}](/${path}/)`;
    if (['about-us', 'contact-us', 'blog', 'advertise'].includes(path)) return `[${text}](/${path}/)`;
    if (BROKEN[path] && BROKEN[path] !== s) return `[${text}](/${BROKEN[path]}/)`;
    return text;
  });

  // 3. contextual inline links toward related posts
  const have = new Set([...body.matchAll(/\]\(\/([^/)]+)\/\)/g)].map(m => m[1]));
  const want = RELATED[s] || [];
  const added = [], skipped = [];
  const faqAt = body.search(/\n#{2,3}\s+(FAQ|Frequently Asked)/i);
  const limit = faqAt > 0 ? faqAt : body.length;
  for (const t of want) {
    if (have.has(t) || t === s) continue;
    if (added.length + have.size >= 5) break;
    let done = false;
    for (const phrase of ANCHORS[t] || []) {
      const re = new RegExp(`(?<![\\w/\\[])(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![\\w\\]])`, 'i');
      let offset = 0;
      for (const line of body.slice(0, limit).split('\n')) {
        const lineStart = offset; offset += line.length + 1;
        if (line.length < 60 || /^(#|\||>|!|_|\*\*[^*]+\*\*\s*$|-\s+!)/.test(line)) continue;
        if (lineStart < 200 && !/^-/.test(line)) continue; // leave the lead paragraph alone
        const m = re.exec(line);
        if (!m) continue;
        const before = line.slice(0, m.index);
        if ((before.match(/\*\*/g) || []).length % 2 === 1) continue;
        if ((before.match(/\[/g) || []).length > (before.match(/\]/g) || []).length) continue;
        if (/\]\([^)]*$/.test(before)) continue;
        const newLine = before + `[${m[1]}](/${t}/)` + line.slice(m.index + m[1].length);
        body = body.slice(0, lineStart) + newLine + body.slice(lineStart + line.length);
        added.push(t); done = true; break;
      }
      if (done) break;
    }
    if (!done) skipped.push(t);
  }

  // 4. related-reading block
  const rel = want.filter(t => slugs.has(t) && t !== s);
  const block = `\n## Related Reading\n\n${rel.map(t => `- [${titles[t]}](/${t}/)`).join('\n')}\n`;
  body = body.replace(/\n+$/, '\n') + block;

  writeFileSync(dir + s + '.md', head + body);
  report.push(`${s}: inline+${added.length} (${added.join(',') || '-'}) footer-only[${skipped.join(',')}]`);
}
console.log(report.join('\n'));
