// Content audit: gives every post at least 3 distinct posts linking to it, using topical neighbours only.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
const dir = 'src/content/blog/';
const slugs = readdirSync(dir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''));
const read = s => readFileSync(dir + s + '.md', 'utf8').replaceAll('\r\n', '\n');
const title = s => read(s).match(/^title:\s*"(.*)"\s*$/m)[1].replace(/\\"/g, '"');
const NEIGH = {
  'artificial-movie-andrew-garfield-sam-altman': ['gpt-6-astra-release','what-does-gpt-stand-for','how-to-use-chatgpt-effectively','claude-sonnet-5-release'],
  'tripo-ai-review': ['artificial-intelligence-tools-2026','best-ai-image-generators-2026','best-gaming-pc-ai-and-gaming-2026','best-ai-video-generators-of-2026'],
  'chatgpt-prompts-for-business-strategy': ['best-chatgpt-prompts-2026','how-to-use-chatgpt-effectively','chatgpt-free-automations-guide','perplexity-pro-vs-chatgpt-plus-2026'],
  'copilot-excel-hacks': ['chatgpt-free-automations-guide','best-chatgpt-prompts-2026','perplexity-pro-vs-chatgpt-plus-2026','how-to-use-chatgpt-effectively'],
  'google-ai-plus-for-students': ['google-gemini-pro-students','perplexity-for-students-2026','ai-for-education-2026','how-to-use-notebooklm'],
  'moltbook-ai-agent-platform-social-network': ['ai-ransomware-attacks','how-to-protect-your-data-from-ai-chatbots','claude-code-cli-tutorial','gemini-4-argon-release'],
  'samsung-galaxy-s26-price-increase': ['iphone-duo-review','steam-frame-repairability','best-gaming-pc-ai-and-gaming-2026','ps5-qssr-ai-upscaling-explained'],
  'security-plus-passing-score': ['is-linux-more-secure-than-windows-2026','macos-vs-windows-security','ai-ransomware-attacks','fake-blue-screen-scam'],
  '90s-ai-photo-trend-gemini-prompt': ['3d-figurine-ai-trend-chatgpt','chatgpt-image-prompts-visual-commands','grok-imagine-2-0-prompts-guide','best-ai-image-generators-2026'],
  'best-vpn-for-ai-browsing': ['how-to-protect-your-data-from-ai-chatbots','macos-vs-windows-security','fake-blue-screen-scam','deepseek-ai-2026-review'],
  'blackbox-ai': ['cursor-ai-review-2026','claude-code-cli-tutorial','claude-sonnet-5-release','artificial-intelligence-tools-2026'],
  'deepseek-ai-2026-review': ['deepseek-v4-vs-chatgpt-comparison','how-to-protect-your-data-from-ai-chatbots','gpt-6-astra-release','best-vpn-for-ai-browsing'],
  'fix-nvidia-driver-crashing-2026': ['best-gaming-pc-ai-and-gaming-2026','gta-6-system-requirements','steam-frame-repairability','ps5-qssr-ai-upscaling-explained'],
  'grok-imagine-2-0-prompts-guide': ['best-ai-image-generators-2026','chatgpt-image-prompts-visual-commands','3d-figurine-ai-trend-chatgpt','90s-ai-photo-trend-gemini-prompt'],
  'how-to-humanize-ai-content-guide': ['how-to-use-chatgpt-effectively','best-chatgpt-prompts-2026','ai-for-education-2026','chatgpt-prompts-for-business-strategy'],
  'iphone-duo-review': ['samsung-galaxy-s26-price-increase','steam-frame-repairability','best-gaming-pc-ai-and-gaming-2026'],
  'is-linux-more-secure-than-windows-2026': ['macos-vs-windows-security','fake-blue-screen-scam','security-plus-passing-score','best-vpn-for-ai-browsing'],
  'ps5-qssr-ai-upscaling-explained': ['gta-6-system-requirements','best-gaming-pc-ai-and-gaming-2026','steam-frame-repairability','fix-nvidia-driver-crashing-2026'],
  '3d-figurine-ai-trend-chatgpt': ['90s-ai-photo-trend-gemini-prompt','chatgpt-image-prompts-visual-commands','best-ai-image-generators-2026','grok-imagine-2-0-prompts-guide'],
  'cursor-ai-review-2026': ['blackbox-ai','claude-code-cli-tutorial','claude-sonnet-5-release','artificial-intelligence-tools-2026'],
  'google-flow-camera-commands': ['best-ai-video-generators-of-2026','best-google-ai-tools-2026','best-ai-image-generators-2026','artificial-intelligence-tools-2026'],
  'gta-6-system-requirements': ['best-gaming-pc-ai-and-gaming-2026','fix-nvidia-driver-crashing-2026','ps5-qssr-ai-upscaling-explained','steam-frame-repairability'],
  'how-to-use-ai-voice-generators': ['best-ai-video-generators-of-2026','artificial-intelligence-tools-2026','how-to-detect-deepfakes-guide','google-flow-camera-commands'],
  'what-does-gpt-stand-for': ['gpt-6-astra-release','how-to-use-chatgpt-effectively','deepseek-v4-vs-chatgpt-comparison','artificial-movie-andrew-garfield-sam-altman'],
};
function inbound() {
  const m = Object.fromEntries(slugs.map(s => [s, new Set()]));
  for (const s of slugs) for (const x of read(s).matchAll(/\]\(\/([^/)]+)\/\)/g)) if (m[x[1]] && x[1] !== s) m[x[1]].add(s);
  return m;
}
let inb = inbound();
for (const t of Object.keys(NEIGH)) {
  for (const src of NEIGH[t]) {
    if (inb[t].size >= 3) break;
    if (src === t || inb[t].has(src)) continue;
    const path = dir + src + '.md';
    const txt = read(src);
    if (txt.includes(`(/${t}/)`)) continue;
    writeFileSync(path, txt.replace(/\n+$/, '\n') + `- [${title(t)}](/${t}/)\n`);
    inb[t].add(src);
  }
}
console.log(Object.entries(inbound()).filter(([, v]) => v.size < 3).map(([k, v]) => `${v.size} ${k}`).join('\n') || 'every post has 3+ inbound links');
