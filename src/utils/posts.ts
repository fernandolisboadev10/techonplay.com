import type { CollectionEntry } from 'astro:content';

// Scheduling rule: a post goes live once its `date` has passed. The site is static, so a scheduled
// workflow must rebuild it at the publishing hours; posts dated in the future stay out of every
// listing, page, feed and sitemap until that rebuild happens after their date.
export const isPublished = ({ data }: Pick<CollectionEntry<'blog'>, 'data'>): boolean =>
  !data.draft && data.date.getTime() <= Date.now();
