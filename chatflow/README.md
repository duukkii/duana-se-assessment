# ChatFlow - Multi-Tenant Chatbot Management Platform

A responsive frontend web application for managing chatbots across multiple companies. Built with Next.js 14, shadcn/ui, TailwindCSS, and TanStack Query.

## Features

- **Authentication & Onboarding**
  - Login and signup flows with email/password
  - OAuth integration UI (Google, Microsoft)
  - Welcome screen for new users with 3-step onboarding checklist

- **Chatbot Dashboard**
  - Overview dashboard showing all chatbots for logged-in client
  - List/grid view toggle for chatbots
  - Search and filter functionality
  - Quick actions (create, edit, delete)
  - Key metrics display (conversations, active users, resolution rate)

- **Chatbot Creation**
  - Form to create new chatbots with:
    - Name and description
    - Avatar/logo upload or selection
    - Initial greeting message
    - Bot personality/tone settings
    - Base prompt configuration
  - Form validation and error handling

- **Analytics & Settings**
  - Analytics page with performance metrics
  - Settings page for workspace and account management

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Components**: shadcn/ui
- **Styling**: TailwindCSS
- **State Management**: TanStack Query (useQuery, useMutation)
- **Icons**: Lucide React
- **API**: Next.js API Routes with hardcoded responses

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chatflow
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
chatflow/
├── app/
│   ├── (auth)/                    # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard-layout)/        # Dashboard pages with sidebar
│   │   ├── dashboard/
│   │   ├── onboarding/
│   │   ├── chatbots/
│   │   │   └── new/
│   │   ├── analytics/
│   │   └── settings/
│   ├── api/                       # API routes with hardcoded responses
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   └── chatbots/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                        # shadcn/ui components
│   └── dashboard-layout.tsx       # Shared dashboard layout
├── lib/
│   ├── hooks/                     # TanStack Query hooks
│   │   ├── use-auth.ts
│   │   └── use-chatbots.ts
│   ├── providers.tsx              # Query client provider
│   └── utils.ts
└── public/
```

## Pages

### Authentication
- `/login` - Login page with email/password and OAuth options
- `/signup` - Signup page with company name, email, and password

### Dashboard
- `/dashboard` - Main chatbot dashboard with list/grid view
- `/onboarding` - Welcome screen for new users
- `/chatbots/new` - Create new chatbot form
- `/analytics` - Analytics and metrics page
- `/settings` - Account and workspace settings

## API Routes

All API routes return hardcoded responses for demonstration purposes:

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/chatbots` - Get all chatbots
- `POST /api/chatbots` - Create new chatbot
- `DELETE /api/chatbots/[id]` - Delete chatbot
- `PATCH /api/chatbots/[id]` - Update chatbot

## Documentation

For detailed information, see:
- **[DESIGN.md](./DESIGN.md)** - Design system, colors, typography, components
- **[UX-DECISIONS.md](./UX-DECISIONS.md)** - User personas, flows, UX principles
- **[ANALYTICS.md](./ANALYTICS.md)** - PostHog integration and event tracking
- **[OAUTH_SETUP.md](./OAUTH_SETUP.md)** - Google/Microsoft OAuth setup guide
- **[ENV_SETUP.md](./ENV_SETUP.md)** - Environment variables configuration
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete feature overview

## Development

### Building for Production

```bash
npm run build
```

### Running Production Build

```bash
npm start
```

### Linting

```bash
npm run lint
```

## Notes

- All backend API responses are hardcoded in Next.js API routes
- User authentication state is stored in localStorage
- No actual database or backend integration required
- The application demonstrates frontend functionality and UI/UX design
