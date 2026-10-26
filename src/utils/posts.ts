import type { CollectionEntry } from 'astro:content';

// Scheduling rule: a post goes live once its `date` has passed. The site is static, so a scheduled
// workflow must rebuild it at the publishing hours; posts dated in the future stay out of every
// listing, page, feed and sitemap until that rebuild happens after their date.
export const isPublished = ({ data }: Pick<CollectionEntry<'blog'>, 'data'>): boolean =>
  !data.draft && data.date.getTime() <= Date.now();

// Ordering key for listings: the later of publication and last edit, so refreshed posts rise to the top.
export const lastTouched = ({ data }: Pick<CollectionEntry<'blog'>, 'data'>): number =>
  Math.max(data.date.getTime(), data.updated?.getTime() ?? 0);
