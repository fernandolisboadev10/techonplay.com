// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig, fontProviders } from 'astro/config';
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
  // URLs herdadas do WordPress (categorias, autor, feed e sitemaps do Yoast)
  redirects: {
    '/about': '/about-us',
    '/contact': '/contact-us',
    '/category/artificial-intelligence': '/blog?category=AI',
    '/category/gaming': '/blog?category=Gaming',
    '/category/guides': '/blog?category=Guides',
    '/category/reviews': '/blog?category=Reviews',
    '/category/security': '/blog?category=Security',
    '/category/tools': '/blog?category=Tools',
    '/category/trends': '/blog?category=Trends',
    '/category/sem-categoria': '/blog',
    '/author/fernandolisboa-devgmail-com': '/about-us',
    '/feed': '/rss.xml',
    '/sitemap_index.xml': '/sitemap-index.xml',
    '/wp-sitemap.xml': '/sitemap-index.xml',
    '/post-sitemap.xml': '/sitemap-0.xml',
    '/page-sitemap.xml': '/sitemap-0.xml',
    '/category-sitemap.xml': '/sitemap-index.xml',
  },
  // Self-hosted fonts: no Google Fonts round trips, preloaded and with metric-matched fallbacks.
  fonts: [
    { provider: fontProviders.google(), name: 'Inter', cssVariable: '--f-inter', weights: [400, 500, 600, 700], styles: ['normal'], subsets: ['latin'], fallbacks: ['sans-serif'] },
    { provider: fontProviders.google(), name: 'Fraunces', cssVariable: '--f-fraunces', weights: [400, 500, 600], styles: ['normal'], subsets: ['latin'], fallbacks: ['serif'] },
    { provider: fontProviders.google(), name: 'Lexend', cssVariable: '--f-lexend', weights: [300, 400], styles: ['normal'], subsets: ['latin'], fallbacks: ['sans-serif'] },
    { provider: fontProviders.google(), name: 'IBM Plex Mono', cssVariable: '--f-plex-mono', weights: [400, 500], styles: ['normal'], subsets: ['latin'], fallbacks: ['monospace'] },
  ],
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
