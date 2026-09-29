// Exporta posts, páginas, categorias, tags, autores e mídia do WordPress para o Astro.
// Uso: npm run migrate
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import he from 'he';

const SITE = 'https://techonplay.com';
const API = `${SITE}/wp-json/wp/v2`;
const UA = { 'User-Agent': 'Mozilla/5.0' };
const BLOG = 'src/content/blog';
const IMAGES = `${BLOG}/images`;
// URLs removidas do Google (Search Console) — nunca migrar
const EXCLUDE = new Set([
  "ai-agents-trend-2026-united-states",
  "specialized-ai-models",
  "fix-iphone-darksword-ios-18-guide",
  "meta-reality-labs-layoffs-2026-end-of-metaverse",
  "ram-storage-shortage-2026-forecast",
  "diablo-4-lord-of-hatred-release-time-guide",
]);
const RAW = 'migration/raw';

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
td.use(gfm);
td.remove(['script', 'style']);

async function getAll(endpoint) {
  const items = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${API}/${endpoint}${endpoint.includes('?') ? '&' : '?'}per_page=100&page=${page}`, { headers: UA });
    if (res.status === 400) break;
    if (!res.ok) throw new Error(`${endpoint}: HTTP ${res.status}`);
    const batch = await res.json();
    items.push(...batch);
    if (batch.length < 100) break;
  }
  return items;
}

const downloaded = new Map();
async function download(url) {
  if (downloaded.has(url)) return downloaded.get(url);
  const name = decodeURIComponent(path.basename(new URL(url).pathname)).replace(/[^\w.-]+/g, '-');
  const dest = path.join(IMAGES, name);
  if (!existsSync(dest)) {
    const res = await fetch(url, { headers: UA });
    if (!res.ok) { console.warn(`  ! imagem falhou (${res.status}): ${url}`); downloaded.set(url, null); return null; }
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  }
  downloaded.set(url, name);
  return name;
}

const q = (s) => JSON.stringify(s ?? '');
const text = (html) => he.decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

await rm(BLOG, { recursive: true, force: true });
await mkdir(IMAGES, { recursive: true });
await mkdir(RAW, { recursive: true });
await mkdir('migration/pages', { recursive: true });

console.log('Buscando dados do WordPress...');
const [allPosts, pages, categories, tags, users, media] = await Promise.all([
  getAll('posts?_embed'), getAll('pages'), getAll('categories'), getAll('tags'), getAll('users'), getAll('media'),
]);
const posts = allPosts.filter((p) => !EXCLUDE.has(p.slug));
for (const [name, data] of Object.entries({ posts, pages, categories, tags, users, media })) {
  await writeFile(`${RAW}/${name}.json`, JSON.stringify(data, null, 2));
  console.log(`  ${name}: ${data.length}`);
}

const catName = Object.fromEntries(categories.map((c) => [c.id, he.decode(c.name)]));
const tagName = Object.fromEntries(tags.map((t) => [t.id, he.decode(t.name)]));

async function toMarkdown(html) {
  const urls = [...new Set(html.match(/https?:\/\/[^"'\s)]+\/wp-content\/uploads\/[^"'\s)]+\.(?:webp|png|jpe?g|gif|svg|avif)/gi) ?? [])];
  let out = html;
  for (const url of urls) {
    const name = await download(url);
    if (name) out = out.split(url).join(`./images/${name}`);
  }
  out = out.replace(/\s(?:srcset|sizes)="[^"]*"/g, '');
  return td.turndown(out).replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

const redirects = [];
for (const p of posts) {
  const featured = p._embedded?.['wp:featuredmedia']?.[0];
  const title = text(p.title.rendered);
  const description = p.yoast_head_json?.description || text(p.excerpt.rendered);
  const category = (p.categories.map((id) => catName[id]).find((n) => n !== 'Sem categoria')) ?? 'Uncategorized';
  const postTags = p.tags.map((id) => tagName[id]).filter(Boolean);
  const body = await toMarkdown(p.content.rendered);
  const words = body.split(/\s+/).length;
  const cover = featured?.source_url ? await download(featured.source_url) : null;

  const fm = [
    '---',
    `title: ${q(title)}`,
    `description: ${q(description)}`,
    `category: ${q(category)}`,
    `date: ${p.date.slice(0, 10)}`,
    `updated: ${p.modified.slice(0, 10)}`,
    `readingTime: ${q(`${Math.max(1, Math.round(words / 200))} min`)}`,
    ...(postTags.length ? [`tags: ${JSON.stringify(postTags)}`] : []),
    ...(cover ? [`image: ${q(`./images/${cover}`)}`, `imageAlt: ${q(featured.alt_text || title)}`] : []),
    '---',
    '',
  ].join('\n');

  await writeFile(`${BLOG}/${p.slug}.md`, fm + '\n' + body);
  redirects.push(`${new URL(p.link).pathname} -> /${p.slug}/`);
  console.log(`  ok  ${p.slug}`);
}

for (const pg of pages) {
  const fm = `---\ntitle: ${q(text(pg.title.rendered))}\nslug: ${q(pg.slug)}\nlink: ${q(pg.link)}\n---\n\n`;
  await writeFile(`migration/pages/${pg.slug}.md`, fm + (await toMarkdown(pg.content.rendered)));
}

await writeFile('migration/urls.txt', redirects.join('\n') + '\n');
console.log(`\nConcluído: ${posts.length} posts, ${pages.length} páginas, ${downloaded.size} imagens.`);

// --- Extras: biblioteca de mídia completa, comentários e configurações do site ---
const UPLOADS = 'public/wp-content/uploads';
let mirrored = 0;
for (const m of media) {
  const urls = [m.source_url, ...Object.values(m.media_details?.sizes ?? {}).map((s) => s.source_url)];
  for (const url of new Set(urls)) {
    const dest = path.join('public', decodeURIComponent(new URL(url).pathname));
    if (existsSync(dest)) continue;
    const res = await fetch(url, { headers: UA });
    if (!res.ok) continue;
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    mirrored++;
  }
}
const comments = await getAll('comments').catch(() => []);
const site = await fetch(`${SITE}/wp-json/`, { headers: UA }).then((r) => r.json());
await writeFile(`${RAW}/comments.json`, JSON.stringify(comments, null, 2));
await writeFile(`${RAW}/site.json`, JSON.stringify({ name: site.name, description: site.description, url: site.url, home: site.home }, null, 2));
console.log(`Mídia espelhada em ${UPLOADS}: ${mirrored} arquivos. Comentários: ${comments.length}. Site: ${site.name}`);
