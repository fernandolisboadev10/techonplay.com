import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      date: z.date(),
      updated: z.date().optional(),
      tags: z.array(z.string()).optional(),
      updated: z.date().optional(),
      tags: z.array(z.string()).optional(),
      readingTime: z.string().optional(),
      draft: z.boolean().optional().default(false),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

export const collections = { blog };
