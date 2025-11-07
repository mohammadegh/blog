// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages configuration
// Your site: https://mohammadegh.github.io/blog
const site = 'https://mohammadegh.github.io';
const base = '/blog';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
