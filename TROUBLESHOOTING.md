# Deployment Troubleshooting

## Common Issues and Solutions

### 1. "YOUR_USERNAME" or "YOUR_REPO_NAME" Not Replaced

**Problem:** The config still has placeholder values.

**Solution:** Edit `astro.config.mjs`:

```javascript
// Replace these lines:
const site = 'https://YOUR_USERNAME.github.io';
const base = '/YOUR_REPO_NAME';

// With your actual values:
const site = 'https://johndoe.github.io';  // Your GitHub username
const base = '/astroblog';                  // Your repository name
```

### 2. Build Fails with "Cannot find module"

**Problem:** Dependencies not installed properly.

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### 3. GitHub Actions Workflow Not Running

**Problem:** Workflow file not detected or permissions issue.

**Solution:**
1. Check file is at `.github/workflows/deploy.yml`
2. Go to repo Settings → Actions → General
3. Set "Workflow permissions" to "Read and write permissions"
4. Enable "Allow GitHub Actions to create and approve pull requests"

### 4. Pages Not Enabled

**Problem:** GitHub Pages source not configured.

**Solution:**
1. Go to Settings → Pages
2. Under "Build and deployment"
3. Source: Select **GitHub Actions** (not "Deploy from a branch")

### 5. 404 Error After Deployment

**Problem:** Base path mismatch.

**Solution:**

If your repo is `username.github.io`:
```javascript
const site = 'https://username.github.io';
const base = '/';  // Use root path
```

If your repo is anything else (e.g., `my-blog`):
```javascript
const site = 'https://username.github.io';
const base = '/my-blog';  // Must match repo name
```

### 6. Styles Not Loading

**Problem:** Assets not loading due to incorrect base path.

**Solution:**
- Verify `base` in config matches your repo name exactly
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for 404 errors

### 7. Wrong Branch

**Problem:** Workflow expects `main` but you're using `master`.

**Solution:** Edit `.github/workflows/deploy.yml`:
```yaml
on:
  push:
    branches: [ master ]  # Change from 'main' to 'master'
```

## Quick Test Before Deploying

Run these commands locally to catch issues:

```bash
# Install dependencies
pnpm install

# Build the site
pnpm build

# Preview production build
pnpm preview
```

If these work locally, deployment should work too.

## Check Deployment Status

1. Go to your repo on GitHub
2. Click the **Actions** tab
3. Click on the latest workflow run
4. Check each step for errors
5. Look for red X marks indicating failures

## Still Having Issues?

1. Check the Actions log for specific error messages
2. Verify all files are committed and pushed
3. Make sure `package.json` has all dependencies
4. Try running `pnpm build` locally first

## Get the Error Log

To share the error:
1. Go to Actions tab
2. Click the failed workflow
3. Click on the failed job
4. Copy the error message from the logs
