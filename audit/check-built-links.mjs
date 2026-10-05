// Verifies that every internal href in the built site (dist/) points to a built page. Run after `npm run build`.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';

const dist = 'dist';
const pages = new Set(['/']);
(function walk(d) {
  for (const f of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name === 'index.html') pages.add('/' + relative(dist, dirname(p)).split(sep).join('/') + '/');
  }
})(dist);

const bad = new Set();
let total = 0;
for (const p of pages) {
  const html = readFileSync(join(dist, p === '/' ? '' : p, 'index.html'), 'utf8');
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const u = m[1];
    if (u.startsWith('/_astro') || /\.\w+$/.test(u)) continue;
    total++;
    if (!pages.has(u.endsWith('/') ? u : u + '/')) bad.add(`${p} -> ${u}`);
  }
}
console.log(`pages ${pages.size}, internal hrefs ${total}, unresolved ${bad.size}`);
console.log([...bad].slice(0, 30).join('\n'));
