// Topic radar for techonplay.com (US audience): finds subjects trending across tech feeds
// and suggests post ideas with a publishing slot in America/New_York.
// Usage: node scripts/radar.mjs [--hours=48] [--top=25] [--now=2026-07-15T12:00:00Z]
// Writes radar/radar-YYYY-MM-DD.md (date in New York time).
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const HOURS = Number(args.hours ?? 48);
const TOP = Number(args.top ?? 25);
const NOW = args.now ? new Date(args.now) : new Date(); // --now only exists to test DST
const BLOG_DIR = 'src/content/blog';
const HEADERS = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36' };

const FEEDS = [
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
  { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' },
  { name: 'Engadget', url: 'https://www.engadget.com/rss.xml' },
  { name: 'Wired', url: 'https://www.wired.com/feed/rss' },
  { name: '9to5Mac', url: 'https://9to5mac.com/feed/' },
  { name: '9to5Google', url: 'https://9to5google.com/feed/' },
  { name: 'CNET', url: 'https://www.cnet.com/rss/news/' },
  { name: 'Reddit r/technology', url: 'https://www.reddit.com/r/technology/top.rss?t=day' },
];

// ---- time (America/New_York with DST; offsets are never hard-coded)
const ET = 'America/New_York';
const PT = 'America/Los_Angeles';
// Two posts a day: news in the US morning, a deeper piece (evergreen or tutorial) in the evening.
const SLOTS = { news: [9, 0], quick: [18, 0], evergreen: [18, 0] };

const parts = (d, tz) =>
  Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
      .formatToParts(d)
      .map((p) => [p.type, p.value]),
  );
const offsetMin = (d, tz) => {
  const p = parts(d, tz);
  return Math.round((Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(d / 1000) * 1000) / 60000);
};
const fmtOffset = (min) => `${min < 0 ? '-' : '+'}${String(Math.abs(min / 60) | 0).padStart(2, '0')}:${String(Math.abs(min) % 60).padStart(2, '0')}`;
// Wall-clock time in `tz` -> instant. Second pass re-reads the offset in case the guess crossed a DST change.
const wallToInstant = (tz, y, m, d, h, mi) => {
  const guess = Date.UTC(y, m - 1, d, h, mi);
  const first = guess - offsetMin(new Date(guess), tz) * 60000;
  return new Date(guess - offsetMin(new Date(first), tz) * 60000);
};
const isoET = (d) => {
  const p = parts(d, ET);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:00${fmtOffset(offsetMin(d, ET))}`;
};
// Next occurrence of an ET slot, at least 30 minutes from now.
function nextSlot([h, mi], from = NOW) {
  const p = parts(from, ET);
  let at = wallToInstant(ET, +p.year, +p.month, +p.day, h, mi);
  if (at.getTime() < from.getTime() + 30 * 60000) {
    const next = new Date(Date.UTC(+p.year, +p.month - 1, +p.day + 1));
    at = wallToInstant(ET, next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate(), h, mi);
  }
  return at;
}
const clock = (d, tz) => new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(d);
const slotInfo = (key) => {
  const at = nextSlot(SLOTS[key]);
  return { at, date: isoET(at), label: `${clock(at, ET)} / ${clock(at, PT)}` };
};

// ---- text helpers
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const decode = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .trim();
const tag = (block, name) => decode(block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`))?.[1] ?? '');

async function get(url, tries = 3) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(25000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (err) {
      if (i >= tries) throw err;
    }
  }
}

// Handles both RSS (<item>) and Atom (<entry>).
async function readFeed({ name, url }) {
  const xml = await get(url);
  const blocks = [...xml.matchAll(/<(item|entry)[\s>]([\s\S]*?)<\/\1>/g)].map((m) => m[2]);
  if (!blocks.length) throw new Error('no items in feed');
  return blocks.map((b) => ({
    source: name,
    title: tag(b, 'title'),
    link: tag(b, 'link') || b.match(/<link[^>]*href="([^"]+)"/)?.[1] || '',
    date: new Date(tag(b, 'pubDate') || tag(b, 'published') || tag(b, 'updated')),
  }));
}

async function readHackerNews() {
  const json = JSON.parse(await get('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=40'));
  return json.hits.map((h) => ({
    source: 'Hacker News',
    title: h.title,
    link: `https://news.ycombinator.com/item?id=${h.objectID}`,
    date: new Date(h.created_at),
  }));
}

async function readTrends() {
  const xml = await get('https://trends.google.com/trending/rss?geo=US');
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => ({
    term: norm(tag(m[1], 'title')),
    traffic: tag(m[1], 'ht:approx_traffic'),
    context: norm([...m[1].matchAll(/<ht:news_item_title>([\s\S]*?)<\/ht:news_item_title>/g)].map((x) => decode(x[1])).join(' ')),
  }));
}

// ---- topic extraction (English, Title Case aware)
// Capitalized words that are not entities. Title Case headlines capitalize these, so they must break runs.
const COMMON = new Set(
  `a an the and or but nor for so yet of to in on at by with from into onto over under about after before during between against without within up down out off as is are was were be been being am do does did has have had can could will would should may might must shall not no yes it its it's this that these those here there then than now just still only also even very more most less least much many some any all each every both either other another such own same too again once ever never always often soon already
how why what when where who whom whose which whether new best top worst first last next latest big small good great better real full free fast easy hard high low long short old young
you your yours we our ours they their them he she his her i my me us
get gets got getting make makes made making take takes took bring brings brought give gives gave go goes went going come comes came see sees saw show shows showed use uses used using try tries tried need needs want wants let lets keep keeps put puts say says said tell tells told ask asks asked add adds added
launches launch launched announces announce announced unveils unveil unveiled reveals reveal revealed releases release released debuts debut debuted drops drop dropped rolls roll rolled lands land landed adds finally officially reportedly report reports reportedly leak leaks leaked rumor rumors confirms confirmed confirm
review reviews guide guides tips tip tricks trick tutorial deal deals sale sales discount price prices cheap hands-on hands on vs versus compared comparison explained explainer opinion analysis breaking update updates updated week weeks day days today tonight tomorrow yesterday month months year years hour hours minutes time times thing things way ways people users user company companies million billion thousand percent
one two three four five six seven eight nine ten
mr mrs ms dr inc corp ltd llc co ceo cfo cto
    january february march april may june july august september october november december monday tuesday wednesday thursday friday saturday sunday`
    .split(/\s+/),
);
// Real entities, but too generic to be a topic by themselves.
const BROAD = new Set(['google', 'apple', 'samsung', 'amazon', 'microsoft', 'meta', 'android', 'iphone', 'ios', 'us', 'usa', 'u.s.', 'america', 'american', 'united', 'states', 'ai', 'tech', 'internet', 'reddit', 'trump', 'black', 'friday', 'prime', 'day', 'pro', 'max', 'plus', 'ultra', 'mini', 'app', 'apps', 'gb', 'tb', 'mac', 'pc', 'tv', 'india', 'china', 'japan', 'europe', 'uk', 'korea', 'brazil', 'russia', 'canada', 'ukraine', 'israel', 'home', 'air', 'music', 'ev', 'store', 'cloud', 'data', 'security', 'chrome', 'watch', 'series', 'fbi']);
// Known names that deserve a single-word topic with only 2 sources.
const KNOWN = new Set(['nvidia', 'openai', 'anthropic', 'chatgpt', 'gemini', 'claude', 'grok', 'deepseek', 'perplexity', 'copilot', 'tesla', 'spacex', 'nintendo', 'playstation', 'xbox', 'steam', 'valve', 'rockstar', 'fortnite', 'minecraft', 'roblox', 'intel', 'amd', 'qualcomm', 'tiktok', 'whatsapp', 'instagram', 'spotify', 'netflix', 'youtube', 'discord', 'starlink', 'verizon', 'at&t', 't-mobile', 'fcc', 'ftc', 'doj', 'macbook', 'airpods', 'pixel', 'galaxy', 'ps5', 'ps6', 'switch', 'gta', 'windows', 'macos', 'linux', 'waymo', 'palantir', 'oracle', 'snapchat', 'ebay', 'walmart', 'cybertruck', 'vision']);

function grams(title) {
  const cleaned = title.replace(/['’]s\b/g, '').replace(/[“”"':?!,;()\[\]|—–]| - /g, ' | ');
  const words = cleaned.split(/\s+/).filter(Boolean);
  const out = new Map(); // normalized topic -> name as written in the headline
  let run = [];
  const flush = () => {
    while (run.length && run.at(-1).toLowerCase() === 'of') run.pop(); // a connector cannot end a name
    for (let i = 0; i < run.length; i++) {
      for (let n = 1; n <= 3 && i + n <= run.length; n++) {
        const p = run.slice(i, i + n).map(norm);
        if (/^\d+$/.test(p[0]) || p[0] === 'of' || p[0].startsWith('$')) continue; // numbers and prices are not topics
        if (n === 1 && (p[0].length < 2 || BROAD.has(p[0]) || /^\d+$/.test(p[0]))) continue;
        if (n > 1 && p.every((w) => BROAD.has(w) || /^\d+$/.test(w))) continue;
        out.set(p.join(' '), run.slice(i, i + n).join(' '));
      }
    }
    run = [];
  };
  for (const w of words) {
    if (w === '|') {
      flush();
      continue;
    }
    const clean = w.replace(/^[^\p{L}\p{N}$]+|[^\p{L}\p{N}+#&.-]+$/gu, '');
    if (!clean) continue;
    // Capitalized, ALL CAPS, has a digit, or camelCase brands (iPhone, macOS, eBay).
    const entityShape = /^\p{Lu}/u.test(clean) || /\d/.test(clean) || /^[a-z]+\p{Lu}/u.test(clean);
    if (clean === 'of' && run.length) run.push(clean);
    else if (entityShape && !COMMON.has(clean.toLowerCase())) run.push(clean);
    else flush();
  }
  flush();
  return out;
}

// ---- categories and US angle
const CATEGORIES = {
  AI: ['chatgpt', 'openai', 'gemini', 'claude', 'anthropic', 'copilot', 'ai', 'grok', 'deepseek', 'llm', 'gpt', 'agent', 'agents', 'nvidia', 'sora', 'midjourney', 'perplexity', 'llama', 'model', 'models', 'chatbot'],
  Gaming: ['game', 'games', 'gaming', 'steam', 'playstation', 'ps5', 'ps6', 'xbox', 'nintendo', 'switch', 'gta', 'fortnite', 'valve', 'epic', 'minecraft', 'roblox', 'rockstar', 'esports', 'gpu'],
  Security: ['hack', 'hacked', 'hackers', 'breach', 'ransomware', 'malware', 'vulnerability', 'security', 'privacy', 'scam', 'scams', 'phishing', 'cyberattack', 'zero-day', 'exploit', 'fbi', 'encryption', 'vpn', 'passkey', 'leak', 'leaked', 'surveillance'],
  Reviews: ['review', 'hands-on', 'tested', 'vs', 'versus', 'iphone', 'galaxy', 'pixel', 'macbook', 'laptop', 'smartphone', 'headphones', 'airpods', 'camera', 'watch', 'tablet', 'ipad', 'oled', 'best'],
  Tools: ['app', 'apps', 'software', 'extension', 'chrome', 'browser', 'plugin', 'editor', 'vscode', 'cursor', 'tool', 'tools', 'whatsapp', 'instagram', 'spotify', 'netflix', 'youtube', 'slack', 'zoom', 'notion', 'windows', 'macos', 'linux', 'android', 'ios'],
  Guides: ['how', 'guide', 'tutorial', 'tips', 'fix', 'setup', 'install', 'explained', 'enable', 'disable'],
  Trends: ['viral', 'trend', 'trending', 'meme', 'challenge'],
};
const FALLBACK_CATEGORY = 'News';

// Returns the reason a US reader cares, or null when the headlines show none.
const US_ANGLES = [
  [/verizon|t-mobile|at&t|\bcarrier/i, 'US carrier availability and deals (Verizon, T-Mobile, AT&T)'],
  [/\bfcc\b|\bftc\b|\bdoj\b|congress|senate|supreme court|tariff|antitrust|\bban\b|lawsuit|\bfbi\b|\bnist\b/i, 'US regulation and legal impact (FCC, FTC, DOJ)'],
  [/black friday|cyber monday|prime day|super bowl|back[- ]to[- ]school|thanksgiving|labor day|holiday/i, 'US seasonal shopping angle'],
  [/amazon|best buy|walmart|target|costco/i, 'US retailer pricing (Amazon, Best Buy, Walmart)'],
  [/\$\s?\d|\bprice|\busd\b|dollar/i, 'US price in dollars and availability'],
];
const NON_US = /\b(india|indian|u\.?k\.?|britain|british|europe|european|\beu\b|china|chinese|japan|japanese|korea|korean|brazil|australia|germany|france|russia|taiwan)\b/i;

function categorize(text) {
  const words = new Set(norm(text).replace(/[^a-z0-9$+\-\s]/g, ' ').split(/\s+/));
  const flat = norm(text);
  let best = [FALLBACK_CATEGORY, 0];
  for (const [cat, keys] of Object.entries(CATEGORIES)) {
    const score = keys.filter((k) => (k.includes(' ') ? flat.includes(k) : words.has(k))).length;
    if (score > best[1]) best = [cat, score];
  }
  return best[0];
}

async function loadPosts() {
  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith('.md'));
  return Promise.all(
    files.map(async (f) => {
      const text = await readFile(path.join(BLOG_DIR, f), 'utf8');
      const title = text.match(/^title:\s*"?(.*?)"?\s*$/m)?.[1] ?? f;
      const tags = text.match(/^tags:\s*\[(.*)\]/m)?.[1] ?? '';
      return { slug: f.replace(/\.md$/, ''), words: new Set(norm(`${title} ${tags} ${f}`).split(/[^a-z0-9]+/)) };
    }),
  );
}

// ---- collect (a failing source never stops the run; it goes into the report)
const sources = [...FEEDS.map((f) => ({ name: f.name, run: () => readFeed(f) })), { name: 'Hacker News', run: readHackerNews }, { name: 'Google Trends US', run: readTrends }];
const results = await Promise.allSettled(sources.map((s) => s.run()));
const failed = [];
const ok = [];
let items = [];
let trends = [];
results.forEach((r, i) => {
  const name = sources[i].name;
  if (r.status === 'rejected') return failed.push(`${name} (${r.reason?.cause?.code ?? r.reason?.message ?? r.reason})`);
  ok.push(name);
  if (name === 'Google Trends US') trends = r.value;
  else items.push(...r.value);
});

const cutoff = NOW.getTime() - HOURS * 3600 * 1000;
const seen = new Set();
items = items.filter((i) => i.title && !/coupon|promo code|discount code/i.test(i.title) && !Number.isNaN(i.date.getTime()) && i.date.getTime() >= cutoff && i.date.getTime() <= NOW.getTime() + 3600 * 1000)
  .filter((i) => !seen.has(norm(i.title)) && seen.add(norm(i.title))); // aggregators repeat headlines; count the first source only

// ---- score topics
const topics = new Map();
for (const item of items) {
  for (const [g, shown] of grams(item.title)) {
    if (!topics.has(g)) topics.set(g, { term: g, name: shown, items: [], sources: new Set() });
    const t = topics.get(g);
    if (!t.items.some((x) => x.link === item.link)) t.items.push(item);
    t.sources.add(item.source);
  }
}

const trendHaystack = trends.map((t) => `${t.term} ${t.context}`);
const wordHit = (hay, term) => new RegExp(`(^|[^a-z0-9])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`).test(hay);
let dropped = 0;
const ranked = [...topics.values()]
  .filter((t) => t.sources.size >= (t.term.includes(' ') || KNOWN.has(t.term) ? 2 : 3))
  .map((t) => {
    const words = t.term.split(' ');
    const trendHit = t.term.length > 3 && trendHaystack.some((h) => wordHit(h, t.term));
    const known = words.some((w) => KNOWN.has(w));
    const hasNumber = words.some((w) => /\d/.test(w));
    const score = t.sources.size * 3 + t.items.length + (words.length === 2 ? 2 : 0) + (hasNumber ? 2 : 0) + (known ? 2 : 0) + (trendHit ? 4 : 0);
    return { ...t, score, trendHit };
  })
  .filter((t) => {
    // Global-only stories need a US angle (price, carriers, regulation...) or a US trend to be worth a post.
    const text = t.items.map((i) => i.title).join(' | ');
    const foreign = t.items.filter((i) => NON_US.test(i.title)).length / t.items.length >= 0.5;
    const keep = !foreign || t.trendHit || US_ANGLES.some(([re]) => re.test(text));
    if (!keep) dropped++;
    return keep;
  })
  .sort((a, b) => b.score - a.score);

// Drop topics swallowed by a higher-ranked one that covers the same headlines.
const picked = [];
const hasPhrase = (outer, inner) => ` ${outer} `.includes(` ${inner} `);
for (const t of ranked) {
  const key = new Set(t.items.map((i) => i.link));
  const dup = picked.some((p) => {
    const inter = p.items.filter((i) => key.has(i.link)).length;
    return inter / key.size >= 0.6 || hasPhrase(p.term, t.term) || hasPhrase(t.term, p.term);
  });
  if (!dup) picked.push(t);
  if (picked.length >= TOP) break;
}

// ---- compare with the blog
const posts = await loadPosts();
const covered = (term) => posts.filter((p) => term.split(' ').every((w) => p.words.has(w))).map((p) => p.slug);

// ---- suggestions
const range = (a, b) => `${a}-${b} words`;

// Picks post type, category, working title, search term, slot and US angle for a topic.
function suggest(t, detected, isCovered) {
  const raw = t.items.map((i) => i.title).join(' | ');
  const heads = norm(raw);
  const name = t.name;
  const angle = US_ANGLES.find(([re]) => re.test(raw))?.[1];
  const howTo = /\bhow to\b|step[- ]by[- ]step|\bguide\b|tutorial|set ?up|\binstall|\benable|\bdisable/.test(heads);
  const price = /\bprice|\$\s?\d|release date|pre-?order|\bdeals?\b|discount|\bcosts?\b/.test(heads);
  const review = /review|hands-on|\bvs\.?\b|compared|worth it|\bbest\b/.test(heads);
  const explainer = /what is|explained|explainer|why/.test(heads);
  const base = { angle: angle ?? 'what it means for US users' };

  if (isCovered) return { ...base, type: 'Update', slot: 'quick', category: detected, title: `Update the existing post on ${name}`, search: `${t.term} update`, note: 'edit the post and set `updated`' };
  if (howTo || detected === 'Guides') return { ...base, type: 'Quick tutorial', slot: 'quick', category: detected === 'News' ? 'Guides' : detected, title: `How to Use ${name}: Step-by-Step Guide`, search: `how to ${t.term}`, note: `${range(800, 1200)}, numbered steps` };
  if (review) return { ...base, type: 'Evergreen', slot: 'evergreen', category: detected === 'News' ? 'Reviews' : detected, title: `Is ${name} Worth It? What Changed and Who It's For`, search: `${t.term} worth it`, note: `${range(1000, 1800)}, verdict up top` };
  if (price) return { ...base, angle: angle ?? 'US price in dollars and availability', type: 'News', slot: 'news', category: 'News', title: `${name}: US Price, Release Date and Where to Buy`, search: `${t.term} price us`, note: `${range(500, 800)}, price in the first paragraph, topic in tags` };
  if (explainer) return { ...base, type: 'Evergreen', slot: 'evergreen', category: detected, title: `${name}: What It Is and What It Means for US Readers`, search: `what is ${t.term}`, note: range(1000, 1800) };
  return { ...base, type: 'News', slot: 'news', category: 'News', title: `${name}: What We Know So Far`, search: t.term, note: `${range(300, 500)}, topic in tags` };
}

// ---- report
const etDay = (() => {
  const p = parts(NOW, ET);
  return `${p.year}-${p.month}-${p.day}`;
})();
const lines = [`# Topic radar ${etDay}`, '', `Now: ${clock(NOW, ET)} / ${clock(NOW, PT)}`, '', 'Next publishing slots (ET / PT):'];
for (const [key, label] of [['news', 'Morning (news)'], ['evergreen', 'Evening (evergreen or tutorial)']]) {
  const s = slotInfo(key);
  lines.push(`- ${label}: ${s.label} → \`date: ${s.date}\``);
}
lines.push('', `Window: last ${HOURS}h · ${items.length} headlines from ${new Set(items.map((i) => i.source)).size} sources.`);
lines.push(`Sources OK: ${ok.join(', ') || 'none'}`);
lines.push(failed.length ? `Sources FAILED: ${failed.join('; ')}` : 'Sources FAILED: none');
if (dropped) lines.push(`Skipped ${dropped} global-only topic(s) with no US angle.`);
if (trends.length) lines.push('', `Google Trends US now: ${trends.slice(0, 10).map((t) => `${t.term} (${t.traffic})`).join(', ')}`);

const byCat = {};
for (const t of picked) {
  const own = covered(t.term);
  const detected = categorize(t.items.map((i) => i.title).join(' '));
  const s = suggest(t, detected, own.length > 0);
  (byCat[s.category] ??= []).push({ t, own, s });
}

for (const cat of [...Object.keys(CATEGORIES), FALLBACK_CATEGORY]) {
  if (!byCat[cat]) continue;
  lines.push('', `## ${cat}`);
  for (const { t, own, s } of byCat[cat]) {
    const status = own.length ? `already covered: ${own.map((x) => `/${x}/`).join(', ')} (consider updating)` : 'no post on the site';
    const slot = slotInfo(s.slot);
    lines.push('', `### ${t.term}${t.trendHit ? ' 🔥' : ''}`, `${t.sources.size} sources · ${t.items.length} headlines · ${status}`);
    lines.push(`**Suggestion:** ${s.type} · category: ${s.category} · title: "${s.title}" · search: \`${s.search}\` · ${s.note}`);
    lines.push(`**US angle:** ${s.angle}`);
    lines.push(`**Slot:** ${slot.label} · \`date: ${slot.date}\``);
    for (const i of t.items.slice(0, 4)) lines.push(`- ${i.source}: [${i.title}](${i.link})`);
  }
}

// ---- daily picks: the hottest uncovered News topic and the hottest topic for another category.
// The radar ranks; whoever writes the posts makes the final call among the top candidates.
const cands = Object.values(byCat).flat().filter((c) => !c.own.length && c.s.type !== 'Update').sort((a, b) => b.t.score - a.t.score);
const pickBlock = (title, list, slotKey) => {
  const slot = slotInfo(slotKey);
  const out = [`## ${title}`, '', `Slot: ${slot.label} · \`date: ${slot.date}\``];
  if (!list.length) out.push('', 'No candidate today.');
  list.forEach(({ t, s }, i) => {
    out.push('', `### ${i + 1}. ${t.name} (${t.sources.size} sources, score ${t.score})`, `Type: ${s.type} · category: ${s.category} · working title: "${s.title}" · search: \`${s.search}\` · ${s.note}`, `US angle: ${s.angle}`);
    for (const it of t.items.slice(0, 5)) out.push(`- ${it.source}: [${it.title}](${it.link})`);
  });
  return out;
};
const picks = [
  `# Daily picks ${etDay}`,
  '',
  `Generated ${clock(NOW, ET)} / ${clock(NOW, PT)}. Pick 1 News post and 1 post for another category from the top candidates below.`,
  '',
  ...pickBlock('News (1 post)', cands.filter((c) => c.s.category === 'News').slice(0, 3), 'news'),
  '',
  ...pickBlock('Other category (1 post)', cands.filter((c) => c.s.category !== 'News').slice(0, 3), 'evergreen'),
];

await mkdir('radar', { recursive: true });
const out = path.join('radar', `radar-${etDay}.md`);
const picksOut = path.join('radar', `picks-${etDay}.md`);
await writeFile(out, lines.join('\n') + '\n');
await writeFile(picksOut, picks.join('\n') + '\n');
console.log(lines.join('\n'));
console.log(`\nSaved to ${out} and ${picksOut}`);
