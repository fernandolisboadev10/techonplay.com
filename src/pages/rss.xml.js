import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { isPublished } from '../utils/posts';

export async function GET(context) {
  const posts = (await getCollection('blog', isPublished)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: 'TechOnPlay',
    description: 'Tested AI prompts and workflows for developers.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.id}/`,
      categories: [post.data.category],
    })),
  });
}
