import fs from 'fs';
const d = 'src/content/blog/';
const rows = [];
for (const f of fs.readdirSync(d)) {
  if (!f.endsWith('.md')) continue;
  const t = fs.readFileSync(d + f, 'utf8').split('\r').join('');
  const end = t.indexOf('\n---', 4);
  const fm = t.slice(4, end), body = t.slice(end + 4);
  const g = k => { const m = fm.match(new RegExp('^' + k + ':\s*(.*)$', 'm')); return m ? m[1].replace(/^["']|["']$/g, '') : ''; };
  const words = body.split(/\s+/).length;
  const ext = [...body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map(x => x[1]);
  const dom = [...new Set(ext.map(u => new URL(u).hostname.replace('www.', '')))];
  rows.push({
    f: f.replace('.md', ''), title: g('title').length, desc: g('description').length, words,
    ext: ext.length, dom: dom.join(','), srcSec: /^## Sources/m.test(body), rel: /^## Related Reading/m.test(body),
    h1: (body.match(/^# /gm) || []).length, imgAlt: !!g('imageAlt'), img: !!g('image'), upd: !!g('updated'),
    date: g('date').slice(0, 10), cat: g('category'),
  });
}
console.log('n', rows.length);
const L = (l, fn, fmt = r => r.f) => console.log(l, rows.filter(fn).map(fmt).join(' | '));
L('TITLE>60', r => r.title > 60, r => `${r.f}(${r.title})`);
L('TITLE<30', r => r.title < 30, r => `${r.f}(${r.title})`);
L('DESC>160', r => r.desc > 160, r => `${r.f}(${r.desc})`);
L('DESC<110', r => r.desc < 110, r => `${r.f}(${r.desc})`);
L('noSources', r => !r.srcSec);
L('noRelated', r => !r.rel);
L('h1 body', r => r.h1 > 0);
L('noImgAlt', r => r.img && !r.imgAlt);
L('noImage', r => !r.img);
L('<900w', r => r.words < 900, r => `${r.f}:${r.words}`);
L('ext<3', r => r.ext < 3, r => `${r.f}:${r.ext}`);
L('noUpdated', r => !r.upd, r => `${r.f}:${r.date}`);
const cnt = {};
rows.forEach(r => r.dom.split(',').filter(Boolean).forEach(x => cnt[x] = (cnt[x] || 0) + 1));
console.log(Object.entries(cnt).sort((a, b) => b[1] - a[1]).map(x => x.join(':')).join(' '));
const cats = {}; rows.forEach(r => cats[r.cat] = (cats[r.cat] || 0) + 1); console.log(cats);
