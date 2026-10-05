// Checks every external link in the posts. 2xx/3xx = ok, 403/429 = blocked for bots (review), else broken.
import { readdirSync, readFileSync } from 'node:fs';
const dir = 'src/content/blog/';
const urls = new Map();
for (const f of readdirSync(dir).filter(f => f.endsWith('.md'))) {
  const t = readFileSync(dir + f, 'utf8');
  for (const m of t.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) { if (!/techonplay\.com/.test(m[1])) { (urls.get(m[1]) ?? urls.set(m[1], []).get(m[1])).push(f); } }
}
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const out = { ok: [], blocked: [], broken: [] };
const list = [...urls.keys()];
async function check(u) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const r = await fetch(u, { method, redirect: 'follow', headers: { 'user-agent': UA, accept: 'text/html' }, signal: AbortSignal.timeout(20000) });
      if (r.status < 400) return ['ok', r.status];
      if (method === 'GET' || r.status !== 405) { if (method === 'GET' || r.status === 404) { if (r.status === 403 || r.status === 429) return ['blocked', r.status]; if (method === 'GET') return ['broken', r.status]; } }
    } catch (e) { if (method === 'GET') return ['broken', String(e.cause?.code || e.message)]; }
  }
  return ['broken', '?'];
}
let i = 0;
await Promise.all(Array.from({ length: 8 }, async () => { while (i < list.length) { const u = list[i++]; const [k, s] = await check(u); out[k].push(`${s} ${u} <- ${[...new Set(urls.get(u))].join(',')}`); } }));
console.log(`total ${list.length} ok ${out.ok.length} blocked ${out.blocked.length} broken ${out.broken.length}`);
console.log('--- BROKEN'); console.log(out.broken.join('\n'));
console.log('--- BLOCKED (bot protection, needs manual look)'); console.log(out.blocked.join('\n'));
