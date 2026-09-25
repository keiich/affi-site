import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // src/content/blog 配下の .md / .mdx を記事として読み込む
  loader: glob({ base: './src/content/blog', pattern: '**/[^_]*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      // 記事ファイルからの相対パス（例: ../../assets/blog/xxx.png）
      heroImage: image().optional(),
      // true にすると一覧・サイトマップ・RSS に出さない（下書き）
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
