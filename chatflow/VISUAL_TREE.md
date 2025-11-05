# ChatFlow - Visual Directory Tree

```
chatflow/
│
├── 📄 Configuration & Documentation
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── next-env.d.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   ├── README.md
│   ├── FOLDER_STRUCTURE.md
│   ├── PROJECT_SUMMARY.md
│   ├── PAGE_MAP.md
│   ├── FILE_LIST.md
│   └── VISUAL_TREE.md
│
├── 📱 app/ (Next.js App Router)
│   │
│   ├── 🔐 (auth)/ - Authentication Pages
│   │   ├── login/
│   │   │   └── page.tsx ..................... Login page
│   │   └── signup/
│   │       └── page.tsx ..................... Signup page
│   │
│   ├── 📊 (dashboard-layout)/ - Dashboard Pages
│   │   ├── analytics/
│   │   │   └── page.tsx ..................... Global analytics
│   │   ├── chatbots/
│   │   │   ├── [id]/
│   │   │   │   └── analytics/
│   │   │   │       └── page.tsx ............. Individual chatbot analytics
│   │   │   └── new/
│   │   │       └── page.tsx ................. Create chatbot form
│   │   ├── dashboard/
│   │   │   └── page.tsx ..................... Main chatbot dashboard
│   │   ├── integrations/
│   │   │   └── page.tsx ..................... Integrations page
│   │   ├── onboarding/
│   │   │   └── page.tsx ..................... Welcome screen
│   │   └── settings/
│   │       └── page.tsx ..................... Settings page
│   │
│   ├── 🔌 api/ - API Routes
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts ................. POST /api/auth/login
│   │   │   └── signup/
│   │   │       └── route.ts ................. POST /api/auth/signup
│   │   └── chatbots/
│   │       ├── [id]/
│   │       │   └── route.ts ................. DELETE, PATCH /api/chatbots/[id]
│   │       └── route.ts ..................... GET, POST /api/chatbots
│   │
│   ├── favicon.ico
│   ├── globals.css .......................... Global styles & CSS variables
│   ├── layout.tsx ........................... Root layout with Providers
│   └── page.tsx ............................. Home page (redirects to /login)
│
├── 🧩 components/ - React Components
│   │
│   ├── ui/ - shadcn/ui Components
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   └── textarea.tsx
│   │
│   ├── dashboard-layout.tsx ................. Sidebar layout wrapper
│   ├── empty-state.tsx ...................... Empty state component
│   └── success-dialog.tsx ................... Success popup dialog
│
├── 📚 lib/ - Utilities & Hooks
│   │
│   ├── hooks/
│   │   ├── use-auth.ts ...................... Authentication hooks
│   │   └── use-chatbots.ts .................. Chatbot CRUD hooks
│   │
│   ├── providers.tsx ........................ TanStack Query provider
│   └── utils.ts ............................. Utility functions
│
└── 🖼️ public/ - Static Assets
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
```

---

## 📊 Directory Statistics

### Top-Level Directories
```
app/            22 files    (Pages, API routes, layouts)
components/     14 files    (UI components, custom components)
lib/            4 files     (Hooks, utilities, providers)
public/         5 files     (Static assets)
Root            12 files    (Config, documentation)
```

### File Distribution by Type
```
TypeScript/TSX  35 files    67%
Documentation   5 files     10%
Configuration   9 files     17%
Assets          5 files     10%
CSS             1 file      2%
```

### Component Breakdown
```
Pages           9 files
API Routes      4 files
UI Components   11 files
Custom Comps    3 files
Hooks           2 files
Utilities       2 files
```

---

## 🎯 Key Directories Explained

### `/app` - Next.js App Router
The heart of the application. Contains all pages, layouts, and API routes.

**Route Groups**:
- `(auth)` - Authentication pages without sidebar
- `(dashboard-layout)` - Dashboard pages with sidebar
- `api` - Backend API endpoints

### `/components` - React Components
Reusable UI components and custom components.

**Subdirectories**:
- `ui/` - shadcn/ui components (11 files)
- Root - Custom components (3 files)

### `/lib` - Utilities & Logic
Business logic, hooks, and utility functions.

**Subdirectories**:
- `hooks/` - TanStack Query hooks
- Root - Providers and utilities

### `/public` - Static Assets
Images, icons, and other static files served directly.

---

## 🔍 File Relationships

### Authentication Flow
```
Login Page → use-auth.ts → /api/auth/login → Dashboard
   ↓
Providers (TanStack Query)
   ↓
Dashboard Layout → Dashboard Page
```

### Chatbot Creation Flow
```
Dashboard → Create Button → /chatbots/new
   ↓
Form Submission → use-chatbots.ts → /api/chatbots
   ↓
Success Dialog → Dashboard (with new chatbot)
```

### Component Dependencies
```
Page Components
   ↓
Dashboard Layout (sidebar)
   ↓
UI Components (buttons, cards, etc.)
   ↓
Utility Functions (cn, etc.)
```

---

## 📁 Folder Organization Principles

### 1. Route-Based Structure
- Pages are organized by their URL structure
- Route groups for shared layouts
- Dynamic routes with `[id]` folders

### 2. Component Separation
- UI components in `components/ui/`
- Custom components in `components/`
- Shared layouts in `components/`

### 3. Logic Separation
- Hooks in `lib/hooks/`
- Utilities in `lib/`
- Providers in `lib/`

### 4. API Organization
- Grouped by resource (auth, chatbots)
- RESTful naming conventions
- Separate files for different HTTP methods

---

## 🎨 Visual Hierarchy

```
┌─────────────────────────────────────────┐
│           Root Layout                    │
│  (Providers, Fonts, Dark Theme)         │
└─────────────────────────────────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼────┐      ┌───────▼────────┐
│  Auth  │      │   Dashboard    │
│ Pages  │      │     Layout     │
│        │      │   (Sidebar)    │
└────────┘      └────────────────┘
                        │
            ┌───────────┼───────────┐
            │           │           │
        ┌───▼───┐   ┌───▼───┐   ┌──▼──┐
        │ Dash  │   │Create │   │ Ana │
        │ board │   │ Bot   │   │lytics│
        └───────┘   └───────┘   └─────┘
```

---

## 🗂️ Naming Conventions

### Files
- **Pages**: `page.tsx`
- **Layouts**: `layout.tsx`
- **API Routes**: `route.ts`
- **Components**: `kebab-case.tsx`
- **Hooks**: `use-*.ts`
- **Utilities**: `kebab-case.ts`

### Folders
- **Route Groups**: `(group-name)`
- **Dynamic Routes**: `[param]`
- **Regular Routes**: `lowercase`
- **Components**: `lowercase`

---

## 📦 Module Boundaries

### Clear Separation
```
app/          → Pages & API (Next.js specific)
components/   → UI & Presentation (React)
lib/          → Logic & Utilities (Pure TS)
public/       → Static Assets (No code)
```

### Import Rules
```
✅ app/ can import from components/ and lib/
✅ components/ can import from lib/
✅ lib/ should not import from app/ or components/
✅ Use absolute imports with @/ prefix
```

---

## 🚀 Scalability

### Easy to Add
- ✅ New pages (add to app/)
- ✅ New components (add to components/)
- ✅ New hooks (add to lib/hooks/)
- ✅ New API routes (add to app/api/)

### Organized Growth
- Route groups keep related pages together
- Component folders can be nested
- Hooks can be grouped by feature
- API routes follow resource structure

---

## 🎯 Quick Navigation

### Find Authentication Code
```
app/(auth)/login/page.tsx
app/(auth)/signup/page.tsx
app/api/auth/
lib/hooks/use-auth.ts
```

### Find Dashboard Code
```
app/(dashboard-layout)/dashboard/page.tsx
components/dashboard-layout.tsx
lib/hooks/use-chatbots.ts
```

### Find UI Components
```
components/ui/
components/dashboard-layout.tsx
components/empty-state.tsx
components/success-dialog.tsx
```

### Find API Implementation
```
app/api/auth/
app/api/chatbots/
```

---

## ✨ Highlights

### Well-Organized
- Clear separation of concerns
- Logical folder structure
- Consistent naming conventions

### Scalable
- Easy to add new features
- Modular architecture
- Reusable components

### Maintainable
- Self-documenting structure
- Clear dependencies
- Minimal coupling

### Professional
- Industry best practices
- Next.js conventions
- TypeScript throughout
