// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeExternalLinks from 'rehype-external-links';

const blogDir = new URL('./src/content/blog/', import.meta.url);
const dateBySlug = new Map();

for (const file of readdirSync(blogDir)) {
  if (!file.endsWith('.md')) continue;
  const content = readFileSync(new URL(file, blogDir), 'utf-8');
  const match = content.match(/^date:\s*(\S+)/m);
  if (match) {
    dateBySlug.set(file.replace(/\.md$/, ''), new Date(match[1]));
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://techonplay.com',
  integrations: [
    sitemap({
      serialize(item) {
        const slug = new URL(item.url).pathname.replace(/^\/|\/$/g, '');
        const date = dateBySlug.get(slug);
        if (date) item.lastmod = date;
        return item;
      },
    }),
  ],
  markdown: {
    processor: unified({
      rehypePlugins: [
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      ],
    }),
  },
});
