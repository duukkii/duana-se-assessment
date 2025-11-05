# Vercel Deployment Guide

This guide will walk you through deploying ChatFlow to Vercel.

---

## Prerequisites

- GitHub account with your code pushed
- Vercel account (sign up at https://vercel.com)
- Your repository: https://github.com/duukkii/duana-se-assessment

---

## Method 1: Deploy via Vercel Dashboard (Recommended for First Time)

### Step 1: Sign Up / Log In to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. Once logged in, click "Add New..." → "Project"
2. You'll see a list of your GitHub repositories
3. Find **"duana-se-assessment"** and click "Import"

### Step 3: Configure Project

**Root Directory:**
- Click "Edit" next to Root Directory
- Set to: `chatflow`
- This tells Vercel your Next.js app is in the chatflow folder

**Framework Preset:**
- Should auto-detect as "Next.js"
- If not, select "Next.js" from dropdown

**Build Settings:**
- Build Command: `npm run build` (auto-filled)
- Output Directory: `.next` (auto-filled)
- Install Command: `npm install` (auto-filled)

**Environment Variables:**
- Click "Add" to add environment variables
- Add these (optional for now, can add later):
  ```
  NEXTAUTH_SECRET=your-secret-here
  NEXTAUTH_URL=https://your-app.vercel.app
  ```

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll see a success screen with your live URL!

### Step 5: View Your Live Site

- Your app will be live at: `https://your-project-name.vercel.app`
- Vercel will show you the URL after deployment
- Click "Visit" to see your live application

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser to authenticate.

### Step 3: Deploy from Terminal

```bash
cd /Users/duanagoh/Documents/duana-se-assessment/chatflow
vercel
```

**Follow the prompts:**
1. "Set up and deploy?" → **Yes**
2. "Which scope?" → Select your account
3. "Link to existing project?" → **No** (first time)
4. "What's your project's name?" → **chatflow** (or your choice)
5. "In which directory is your code located?" → **./** (current directory)
6. "Want to override settings?" → **No**

### Step 4: Production Deployment

After the preview deployment works:

```bash
vercel --prod
```

This deploys to your production URL.

---

## Post-Deployment Configuration

### 1. Set Up Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 2. Add Environment Variables

1. Go to "Settings" → "Environment Variables"
2. Add the following variables:

**Required for OAuth:**
```
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=https://your-app.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
MICROSOFT_TENANT_ID=common
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

3. Click "Save"
4. Redeploy for changes to take effect

### 3. Update OAuth Redirect URIs

After deployment, update your OAuth provider settings:

**Google Cloud Console:**
- Add redirect URI: `https://your-app.vercel.app/api/auth/callback/google`

**Azure Portal:**
- Add redirect URI: `https://your-app.vercel.app/api/auth/callback/azure-ad`

See [OAUTH_SETUP.md](./OAUTH_SETUP.md) for detailed instructions.

---

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main` branch** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

### How It Works:

1. You push code to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. Vercel automatically:
   - Detects the push
   - Builds your app
   - Deploys to production
   - Sends you a notification

3. Check deployment status:
   - Vercel Dashboard
   - GitHub commit status checks
   - Email notifications

---

## Vercel Dashboard Features

### Deployments Tab
- View all deployments (production + previews)
- See build logs
- Rollback to previous deployments
- Promote preview to production

### Analytics Tab
- Page views
- Top pages
- Visitor countries
- Performance metrics

### Logs Tab
- Real-time function logs
- Error tracking
- Request logs

### Settings Tab
- Environment variables
- Domain configuration
- Build & development settings
- Git integration

---

## Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Solution: Ensure all dependencies are in package.json
cd chatflow
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: "Build exceeded maximum duration"**
```bash
# Solution: Optimize build
# Check for large dependencies
# Remove unused packages
```

### Environment Variables Not Working

1. Make sure variables are added in Vercel Dashboard
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)
4. For public variables, use `NEXT_PUBLIC_` prefix

### OAuth Not Working

1. Update redirect URIs in Google/Microsoft consoles
2. Use production URL, not preview URL
3. Check NEXTAUTH_URL matches your domain
4. Verify NEXTAUTH_SECRET is set

### Page Not Found (404)

1. Check Root Directory is set to `chatflow`
2. Verify build completed successfully
3. Check build logs for errors

---

## Performance Optimization

### 1. Enable Edge Functions (Optional)

In `next.config.ts`:
```typescript
export default {
  experimental: {
    runtime: 'edge',
  },
}
```

### 2. Image Optimization

Vercel automatically optimizes images using Next.js Image component.

### 3. Caching

Vercel automatically caches:
- Static assets
- API routes (with proper headers)
- Page builds

---

## Monitoring & Analytics

### Built-in Analytics

Vercel provides:
- Real-time analytics
- Web Vitals (Core Web Vitals)
- Audience insights

### Add PostHog (Optional)

See [ANALYTICS.md](./ANALYTICS.md) for PostHog integration.

---

## Cost & Limits

### Free Tier (Hobby)
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Preview deployments
- Edge Network

### Pro Tier ($20/month)
- 1 TB bandwidth/month
- Advanced analytics
- Team collaboration
- Password protection
- More build minutes

---

## Useful Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]

# Pull environment variables locally
vercel env pull

# Add environment variable
vercel env add [name]
```

---

## Next Steps After Deployment

1. ✅ Test all features on production
2. ✅ Set up OAuth providers with production URLs
3. ✅ Add custom domain (optional)
4. ✅ Configure environment variables
5. ✅ Set up monitoring/analytics
6. ✅ Share your live URL!

---

## Your Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Root directory set to `chatflow`
- [ ] First deployment successful
- [ ] Environment variables added
- [ ] OAuth redirect URIs updated
- [ ] Custom domain configured (optional)
- [ ] All features tested on production
- [ ] Analytics set up (optional)

---

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Support](https://vercel.com/support)

---

## Your Project URLs

After deployment, you'll have:

- **Production**: `https://chatflow.vercel.app` (or your custom domain)
- **Preview**: `https://chatflow-git-[branch].vercel.app`
- **Dashboard**: `https://vercel.com/[username]/chatflow`

---

**Ready to deploy? Let's go! 🚀**
