# 🚀 Quick Deploy to Vercel (5 Minutes)

Follow these simple steps to deploy ChatFlow to Vercel.

---

## Step 1: Go to Vercel

Open your browser and go to: **https://vercel.com**

---

## Step 2: Sign Up / Log In

1. Click **"Sign Up"** (or "Log In" if you have an account)
2. Choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub

---

## Step 3: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find **"duana-se-assessment"** in the list
3. Click **"Import"**

---

## Step 4: Configure Root Directory

⚠️ **IMPORTANT**: Your Next.js app is in a subfolder!

1. Look for **"Root Directory"**
2. Click **"Edit"**
3. Type: `chatflow`
4. Click **"Continue"**

---

## Step 5: Deploy!

1. Leave all other settings as default
2. Click **"Deploy"**
3. Wait 2-3 minutes ⏱️
4. ✅ Done! Your app is live!

---

## Step 6: View Your Live Site

After deployment completes:

1. Click **"Visit"** or **"Go to Dashboard"**
2. Your app will be at: `https://[your-project-name].vercel.app`
3. Share your URL! 🎉

---

## Optional: Add Environment Variables Later

If you want to enable OAuth (Google/Microsoft login):

1. Go to your project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add these variables:
   ```
   NEXTAUTH_SECRET=your-secret-here
   NEXTAUTH_URL=https://your-app.vercel.app
   ```
4. See [OAUTH_SETUP.md](./OAUTH_SETUP.md) for Google/Microsoft credentials
5. Click **"Redeploy"** after adding variables

---

## Automatic Updates

Every time you push to GitHub, Vercel will automatically:
- Build your app
- Deploy the new version
- Update your live site

No manual deployment needed! 🎯

---

## Need Help?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions and troubleshooting.

---

**That's it! Your ChatFlow app is now live on the internet! 🌐**
