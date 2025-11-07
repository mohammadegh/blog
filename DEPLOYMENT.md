# Deploy to GitHub Pages

Follow these steps to deploy your blog to GitHub Pages.

## Step 1: Update Configuration

Edit `astro.config.mjs` and replace the placeholders:

```javascript
export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',
  base: '/YOUR_REPO_NAME',
  // ... rest of config
});
```

**Example:**
- If your GitHub username is `johndoe`
- And your repo is named `dev-blog`
- Then:
  - `site: 'https://johndoe.github.io'`
  - `base: '/dev-blog'`

**Note:** If you're using a custom domain or `username.github.io` as the repo name, set `base: '/'`

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository (e.g., `dev-blog`)
3. Don't initialize with README (we already have one)

## Step 3: Push Your Code

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. The workflow will automatically run and deploy your site

## Step 5: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. Watch the deployment workflow run
3. Once complete (green checkmark), your site is live!
4. Visit: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## Updating Your Blog

Every time you push to the `main` branch, GitHub Actions will automatically rebuild and deploy your site.

```bash
# Add a new blog post
# Create file in src/content/blog/my-new-post.md

git add .
git commit -m "Add new blog post"
git push
```

## Troubleshooting

### 404 Error
- Check that `site` and `base` in `astro.config.mjs` match your GitHub Pages URL
- Ensure GitHub Pages is enabled in repository settings

### Build Fails
- Check the Actions tab for error messages
- Ensure all dependencies are in `package.json`
- Test locally with `pnpm build` first

### Styles Not Loading
- Verify the `base` path in `astro.config.mjs` matches your repo name
- Clear browser cache and hard refresh (Ctrl+Shift+R)

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` folder with your domain
2. Update `astro.config.mjs`:
   ```javascript
   site: 'https://yourdomain.com',
   base: '/',
   ```
3. Configure DNS settings with your domain provider
4. In GitHub Settings → Pages, add your custom domain

## Local Testing

Before deploying, test the production build locally:

```bash
pnpm build
pnpm preview
```

This ensures everything works as expected before pushing to GitHub.
