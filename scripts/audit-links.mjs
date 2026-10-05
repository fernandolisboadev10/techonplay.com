import { readdirSync, readFileSync } from 'node:fs';
const dir = 'src/content/blog/';
const slugs = new Set(readdirSync(dir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, '')));
const extra = new Set(['about-us','contact-us','blog','advertise','privacy-policy','terms-of-use','cookie-policy']);
const inbound = Object.fromEntries([...slugs].map(s => [s, new Set()]));
const broken = [];
for (const s of slugs) {
  const body = readFileSync(dir + s + '.md', 'utf8');
  for (const m of body.matchAll(/\]\(((?:https?:\/\/(?:www\.)?techonplay\.com)?\/[^)\s#?]*)/g)) {
    const t = m[1].replace(/^https?:\/\/(www\.)?techonplay\.com/, '').replace(/^\/|\/$/g, '');
    if (slugs.has(t)) { if (t !== s) inbound[t].add(s); }
    else if (!extra.has(t) && !t.startsWith('images')) broken.push(`${s} -> /${t}/`);
  }
}
console.log('BROKEN INTERNAL LINKS:', broken.length); broken.forEach(b => console.log(' ', b));
console.log('\nINBOUND COUNTS (ascending):');
Object.entries(inbound).sort((a,b)=>a[1].size-b[1].size).forEach(([s,v]) => console.log(String(v.size).padStart(3), s));
