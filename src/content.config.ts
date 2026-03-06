import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reports = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/reports' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    ogImage: z.string().optional(),
    category: z.string(),
    date: z.string(),
    pages: z.number(),
    readTime: z.string(),
    pdfFile: z.string(),
    slug: z.string(),
    sections: z.array(z.object({
      id: z.string(),
      label: z.string(),
    })),
  }),
});

export const collections = { reports };
