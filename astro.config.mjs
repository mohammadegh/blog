// @ts-check
import { defineConfig } from 'astro/config';

// IMPORTANT: Update these values before deploying!
// Example: If your GitHub is github.com/johndoe/my-blog
// Then: site = 'https://johndoe.github.io' and base = '/my-blog'
const site = 'https://YOUR_USERNAME.github.io';
const base = '/YOUR_REPO_NAME';

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
