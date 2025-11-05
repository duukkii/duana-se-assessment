# OAuth Setup Guide - Google & Microsoft Login

This guide will help you set up Google and Microsoft OAuth authentication for ChatFlow.

## Prerequisites

- A Google account (for Google OAuth)
- A Microsoft account (for Microsoft OAuth)
- Your ChatFlow application running locally or deployed

## Quick Start

1. **Install dependencies** (already done if you ran `npm install`)
   ```bash
   npm install next-auth
   ```

2. **Copy environment template**
   ```bash
   cp env.example .env.local
   ```

3. **Set up OAuth providers** (follow sections below)

4. **Add credentials to `.env.local`**

5. **Restart your development server**
   ```bash
   npm run dev
   ```

---

## Google OAuth Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `ChatFlow` (or your preferred name)
4. Click "Create"

### Step 2: Enable Google+ API

1. In your project, go to **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click on it and press "Enable"

### Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** (unless you have a Google Workspace)
3. Click "Create"
4. Fill in the required fields:
   - **App name**: ChatFlow
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click "Save and Continue"
6. **Scopes**: Click "Add or Remove Scopes"
   - Add: `userinfo.email`
   - Add: `userinfo.profile`
7. Click "Save and Continue"
8. **Test users** (for development):
   - Add your email address
9. Click "Save and Continue"

### Step 4: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click "+ CREATE CREDENTIALS" → "OAuth client ID"
3. Select **Application type**: Web application
4. **Name**: ChatFlow Web Client
5. **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://yourdomain.com (for production)
   ```
6. **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google (for production)
   ```
7. Click "Create"
8. **Copy the Client ID and Client Secret**

### Step 5: Add to Environment Variables

Add to your `.env.local`:

```env
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

---

## Microsoft OAuth Setup (Azure AD)

### Step 1: Register an Application

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to **Azure Active Directory** (or **Microsoft Entra ID**)
3. Click **App registrations** → **New registration**
4. Fill in the details:
   - **Name**: ChatFlow
   - **Supported account types**: Accounts in any organizational directory and personal Microsoft accounts
   - **Redirect URI**: 
     - Platform: Web
     - URI: `http://localhost:3000/api/auth/callback/azure-ad`
5. Click "Register"

### Step 2: Get Application (Client) ID

1. On the app overview page, copy the **Application (client) ID**
2. Also copy the **Directory (tenant) ID** (use `common` for multi-tenant)

### Step 3: Create Client Secret

1. Go to **Certificates & secrets**
2. Click **+ New client secret**
3. **Description**: ChatFlow Secret
4. **Expires**: Choose your preferred expiration (24 months recommended)
5. Click "Add"
6. **Important**: Copy the secret **Value** immediately (you won't be able to see it again!)

### Step 4: Configure API Permissions

1. Go to **API permissions**
2. Click **+ Add a permission**
3. Select **Microsoft Graph**
4. Select **Delegated permissions**
5. Add these permissions:
   - `User.Read`
   - `email`
   - `openid`
   - `profile`
6. Click "Add permissions"
7. (Optional) Click "Grant admin consent" if you're an admin

### Step 5: Add Redirect URIs for Production

1. Go to **Authentication**
2. Under **Platform configurations** → **Web**
3. Add production redirect URI:
   ```
   https://yourdomain.com/api/auth/callback/azure-ad
   ```
4. Click "Save"

### Step 6: Add to Environment Variables

Add to your `.env.local`:

```env
MICROSOFT_CLIENT_ID=your-application-client-id
MICROSOFT_CLIENT_SECRET=your-client-secret-value
MICROSOFT_TENANT_ID=common
```

**Note**: Use `common` for multi-tenant (personal + work accounts), or your specific tenant ID for single-tenant.

---

## Testing OAuth Login

### Local Testing

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Navigate to login page**:
   ```
   http://localhost:3000/login
   ```

3. **Click "Google" or "Microsoft" button**

4. **You should be redirected** to the OAuth provider's login page

5. **After successful login**, you'll be redirected back to `/onboarding`

### Troubleshooting

**Error: "redirect_uri_mismatch"**
- Check that your redirect URI in the OAuth provider matches exactly
- Make sure there are no trailing slashes
- Verify the protocol (http vs https)

**Error: "invalid_client"**
- Double-check your Client ID and Client Secret
- Make sure there are no extra spaces in your `.env.local`
- Verify the credentials are for the correct project

**Error: "access_denied"**
- For Google: Make sure you added your email as a test user
- For Microsoft: Check API permissions are granted

**Session not persisting**
- Make sure `NEXTAUTH_SECRET` is set in `.env.local`
- Clear your browser cookies and try again

---

## Production Deployment

### Update Environment Variables

When deploying to production (Vercel, Netlify, etc.):

1. **Add all OAuth credentials** to your hosting platform's environment variables

2. **Update redirect URIs** in both Google and Microsoft consoles to include your production domain

3. **Set NEXTAUTH_URL**:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   ```

### Vercel Deployment

1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add each variable:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `MICROSOFT_CLIENT_ID`
   - `MICROSOFT_CLIENT_SECRET`
   - `MICROSOFT_TENANT_ID`

4. Redeploy your application

### Security Checklist

✅ Never commit `.env.local` to git  
✅ Use different OAuth credentials for dev/staging/production  
✅ Rotate client secrets periodically  
✅ Enable 2FA on your Google/Microsoft accounts  
✅ Review OAuth consent screen regularly  
✅ Monitor OAuth usage in provider dashboards  
✅ Set appropriate session expiration times  

---

## How It Works

### Authentication Flow

1. **User clicks OAuth button** (Google or Microsoft)
2. **NextAuth redirects** to provider's login page
3. **User authenticates** with their provider account
4. **Provider redirects back** to your callback URL
5. **NextAuth creates a session** with user info
6. **User is redirected** to `/onboarding` or `/dashboard`

### Session Management

- Sessions are stored as **JWT tokens** (no database required)
- Default expiration: **30 days**
- Sessions are **httpOnly cookies** (secure)
- Automatic session refresh on page load

### User Data Stored

From OAuth providers, we store:
- **Email address**
- **Name**
- **Profile picture** (optional)
- **Provider** (google or azure-ad)
- **User ID** from provider

---

## Additional Resources

### Google OAuth
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)

### Microsoft OAuth
- [Microsoft Identity Platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/)
- [Azure Portal](https://portal.azure.com/)

### NextAuth.js
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [NextAuth.js Providers](https://next-auth.js.org/providers/)

---

## Support

If you encounter issues:

1. Check the browser console for errors
2. Check the terminal/server logs
3. Verify all environment variables are set correctly
4. Ensure redirect URIs match exactly
5. Try clearing cookies and cache

For more help, refer to the [NextAuth.js documentation](https://next-auth.js.org/getting-started/introduction).
