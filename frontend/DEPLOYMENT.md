# Deployment Guide

## Deploy to GitHub Pages

### Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: WellCampus frontend"
```

2. Add your GitHub repository as remote:
```bash
git remote add origin https://github.com/yourusername/wellcampus.git
```

3. Push to main branch:
```bash
git branch -M main
git push -u origin main
```

### Step 2: Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. In the **Build and deployment** section:
   - **Source**: Select "GitHub Actions"
4. The workflow will automatically deploy on push to main

### Step 3: Verify Deployment

1. Go to **Actions** tab in your repository
2. Watch the **Deploy to GitHub Pages** workflow run
3. Once complete, your site will be available at:
   - `https://yourusername.github.io/wellcampus/`

### Update Repository Name

If your repository name is different from `wellcampus`, update the `base` path in `vite.config.js`:

```javascript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

## Manual Deployment

If you prefer to build and deploy manually:

1. Build the project:
```bash
npm run build
```

2. The `dist/` folder contains your production-ready files

3. Deploy using any static hosting service (Netlify, Vercel, etc.)

## Environment Configuration

For production, update your `.env.local` with production API URLs:

```env
VITE_API_URL=https://api.your-domain.com
```

## Custom Domain

To use a custom domain:

1. Update `.github/workflows/deploy.yml` to uncomment and set your domain:
```yaml
cname: yourdomain.com
```

2. Add DNS CNAME record pointing to `yourusername.github.io`

3. GitHub will automatically create a CNAME file during deployment

## Troubleshooting

### Build fails with "Module not found"
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`

### Blank page after deployment
- Check that `base` path in `vite.config.js` matches your repository name
- Verify GitHub Pages is enabled in repository settings

### API calls failing
- Ensure `VITE_API_URL` environment variable points to correct backend
- Check CORS configuration on backend API

### Deployment workflow not running
- Ensure `.github/workflows/deploy.yml` is in the correct location
- Check workflow is not disabled in Actions tab

## Production Best Practices

1. **Never commit `.env` files** - Use `.env.example` as template
2. **Update base path** for your repository
3. **Test production build locally**: `npm run preview`
4. **Monitor application performance** with browser DevTools
5. **Keep dependencies updated**: `npm outdated` and `npm update`
6. **Run security audit**: `npm audit`

## Backend API Configuration

Update your backend API URL in environment variables:

```bash
# Development
VITE_API_URL=http://localhost:5000

# Production
VITE_API_URL=https://api.yourdomain.com
```

## Build Output

The `dist/` folder contains:
- `index.html` - Main HTML file
- `assets/` - CSS and JavaScript bundles (hashed for caching)

All assets are minified and optimized for production.
