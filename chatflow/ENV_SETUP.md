# Environment Variables Setup Guide

This guide explains how to set up environment variables for the ChatFlow application.

## Quick Start

1. **Copy the template file:**
   ```bash
   cp env.example .env.local
   ```

2. **Edit `.env.local`** with your actual values

3. **Restart the development server** to apply changes

## Required Variables

### Minimum Configuration for Development

For basic local development, you only need:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

The application will work with mock data and simulated features.

## Optional Configurations

### Database (PostgreSQL)

If you want to use a real database instead of mock data:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/chatflow
```

**Setup PostgreSQL:**
```bash
# Install PostgreSQL (macOS)
brew install postgresql

# Start PostgreSQL
brew services start postgresql

# Create database
createdb chatflow
```

### Authentication

For production-ready authentication:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret-here
```

**Generate secrets:**
```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

### AI/Chatbot Features

To enable real AI-powered chatbots:

```env
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-3.5-turbo
```

**Get OpenAI API Key:**
1. Sign up at https://platform.openai.com
2. Navigate to API Keys section
3. Create a new secret key

### Email Service

For sending emails (password reset, notifications):

**Option 1: SMTP (Gmail)**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@chatflow.com
```

**Gmail App Password Setup:**
1. Enable 2-factor authentication on your Google account
2. Go to Google Account > Security > App passwords
3. Generate an app password for "Mail"

**Option 2: SendGrid**
```env
SENDGRID_API_KEY=your-sendgrid-api-key
```

### File Storage

For avatar uploads and file attachments:

**Option 1: AWS S3**
```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=chatflow-uploads
```

**Option 2: Cloudinary**
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Analytics

**Google Analytics:**
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Sentry (Error Tracking):**
```env
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

### Payment Processing

For subscription/payment features:

```env
STRIPE_PUBLISHABLE_KEY=pk_test_your-key
STRIPE_SECRET_KEY=sk_test_your-key
STRIPE_WEBHOOK_SECRET=whsec_your-secret
```

## Environment Files

### File Hierarchy

Next.js loads environment variables in this order (later files override earlier ones):

1. `.env` - Default values for all environments
2. `.env.local` - Local overrides (gitignored)
3. `.env.development` - Development-specific
4. `.env.production` - Production-specific

### Which File to Use?

- **`.env.local`** - Your personal development settings (recommended)
- **`.env`** - Shared default values (committed to git)
- **`.env.production`** - Production deployment settings

## Public vs Private Variables

### Public Variables (`NEXT_PUBLIC_*`)

- Exposed to the browser
- Can be used in client-side code
- Example: `NEXT_PUBLIC_APP_URL`

```tsx
// Can use in client components
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
```

### Private Variables

- Only available on the server
- Never exposed to the browser
- Example: `DATABASE_URL`, `OPENAI_API_KEY`

```tsx
// Only use in server components or API routes
const dbUrl = process.env.DATABASE_URL;
```

## Security Best Practices

### ✅ DO:
- Use `.env.local` for local development
- Add `.env.local` to `.gitignore`
- Use different secrets for dev/staging/production
- Rotate secrets regularly
- Use environment-specific values

### ❌ DON'T:
- Commit `.env.local` to git
- Share secrets in chat/email
- Use production secrets in development
- Hardcode secrets in code
- Expose private keys to the browser

## Deployment

### Vercel

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable from `.env.local`
4. Set appropriate environment (Production/Preview/Development)

### Other Platforms

Most platforms (Netlify, Railway, Render) have similar environment variable settings in their dashboards.

## Troubleshooting

### Variables not loading?

1. **Restart dev server** - Changes require restart
   ```bash
   npm run dev
   ```

2. **Check file name** - Must be `.env.local` (with dot)

3. **Check syntax** - No spaces around `=`
   ```env
   # ✅ Correct
   API_KEY=abc123
   
   # ❌ Wrong
   API_KEY = abc123
   ```

4. **Public variables** - Must start with `NEXT_PUBLIC_`

### Still not working?

- Clear `.next` folder: `rm -rf .next`
- Check for typos in variable names
- Verify the variable is in the correct file
- Check if the variable is being used correctly (public vs private)

## Example Configurations

### Minimal (Mock Data)
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Full Development
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/chatflow
NEXTAUTH_SECRET=your-secret
OPENAI_API_KEY=sk-your-key
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
```

### Production
```env
NEXT_PUBLIC_APP_URL=https://chatflow.com
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-host:5432/chatflow
NEXTAUTH_SECRET=production-secret
OPENAI_API_KEY=sk-prod-key
REDIS_URL=redis://prod-redis:6379
SENTRY_DSN=https://sentry-dsn
```

## Additional Resources

- [Next.js Environment Variables Docs](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [dotenv Documentation](https://github.com/motdotla/dotenv)
