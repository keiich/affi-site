// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tsukuru-note.com',
  // 静的サイトとして出力し、Cloudflare Workers の静的アセットで配信する
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // 小さな CSS は HTML にインライン化してリクエスト数を減らす
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
