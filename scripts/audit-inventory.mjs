import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
const dir = 'src/content/blog/';
const rows = [];
for (const f of readdirSync(dir).filter(f => f.endsWith('.md'))) {
  const raw = readFileSync(dir + f, 'utf8').replaceAll('\r\n', '\n');
  const fm = raw.match(/^---\n([\s\S]*?)\n---/)[1];
  const body = raw.slice(raw.indexOf('---', 4) + 3);
  const get = k => (fm.match(new RegExp('^' + k + ':\s*"?(.*?)"?\s*$', 'm')) || [])[1] || '';
  const links = [...body.matchAll(/\[[^\]]*\]\(([^)\s]+)/g)].map(m => m[1]);
  const internal = links.filter(l => l.startsWith('/') || l.includes('techonplay.com'));
  const external = links.filter(l => /^https?:/.test(l) && !l.includes('techonplay.com'));
  const domains = [...new Set(external.map(l => new URL(l).hostname.replace(/^www\./, '')))];
  rows.push({ slug: f.replace('.md',''), title: get('title'), cat: get('category'), date: get('date'), updated: get('updated'), words: body.split(/\s+/).filter(Boolean).length, draft: get('draft'), internal: internal.length, external: external.length, domains });
}
rows.sort((a,b)=>a.date.localeCompare(b.date));
writeFileSync('audit/inventory.json', JSON.stringify(rows, null, 1));
console.log('slug | cat | date | words | int | ext | domains');
for (const r of rows) console.log([r.slug, r.cat, r.date, r.words, r.internal, r.external, r.domains.join(',')].join(' | '));
