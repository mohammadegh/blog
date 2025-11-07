# Developer Blog

A clean, minimal Astro blog designed for software developers to share experiences and code snippets.

## Features

- 📝 Markdown-based blog posts with frontmatter
- 💻 Syntax highlighting for code blocks
- 🏷️ Tag system for categorizing posts
- 📅 Publication dates and author info
- 🎨 Clean, responsive design
- ⚡ Fast performance with Astro

## Getting Started

### Development

```bash
pnpm dev
```

Visit `http://localhost:4321` to see your blog.

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Creating Blog Posts

Create new posts in `src/content/blog/` as Markdown files:

```markdown
---
title: "Your Post Title"
description: "A brief description"
pubDate: 2024-11-07
author: "Your Name"
tags: ["javascript", "tutorial"]
draft: false
---

Your content here with code blocks:

\`\`\`javascript
console.log('Hello, World!');
\`\`\`
```

## Project Structure

```
/
├── public/
├── src/
│   ├── components/
│   │   └── BlogCard.astro
│   ├── content/
│   │   ├── blog/
│   │   │   └── *.md
│   │   └── config.ts
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       └── blog/
│           └── [...slug].astro
├── astro.config.mjs
└── package.json
```

## Customization

- Edit `src/layouts/Layout.astro` for global styles
- Modify `src/components/BlogCard.astro` for post card styling
- Update `src/pages/blog/[...slug].astro` for individual post layout
- Change syntax highlighting theme in `astro.config.mjs`

## Deployment

Deploy to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Build command: `pnpm build`
Output directory: `dist`
