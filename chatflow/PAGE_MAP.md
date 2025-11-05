# ChatFlow - Complete Page Map

## 🗺️ Application Routes

```
┌─────────────────────────────────────────────────────────────────┐
│                         ChatFlow App                             │
│                    http://localhost:3000                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ├─ / (Home)
                              │  └─ Redirects to /login
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
   [AUTH PAGES]                              [DASHBOARD PAGES]
   (No Sidebar)                              (With Sidebar)
        │                                           │
        ├─ /login                                   ├─ /dashboard
        │  • Email/password form                    │  • Chatbot list (grid/list view)
        │  • OAuth buttons                          │  • Search & filter
        │  • Tab to signup                          │  • Empty state (first-time users)
        │  • Forgot password link                   │  • Create new chatbot button
        │  • Responsive split layout                │  • Quick actions (edit, delete)
        │                                           │
        └─ /signup                                  ├─ /onboarding
           • Company name input                     │  • Welcome message
           • Email/password fields                  │  • 3-step guide cards
           • Password confirmation                  │  • "Create My First Chatbot" CTA
           • OAuth buttons                          │
           • Tab to login                           ├─ /chatbots/new
           • Responsive split layout                │  • Breadcrumb navigation
                                                    │  • Avatar selection (A, B, C, D)
                                                    │  • Chatbot name input
                                                    │  • Welcome message textarea
                                                    │  • Tone selector dropdown
                                                    │  • Base prompt textarea
                                                    │  • Helpful hints (lightbulb icons)
                                                    │  • Success dialog on submit
                                                    │
                                                    ├─ /chatbots/[id]/analytics
                                                    │  • Chatbot name & status badge
                                                    │  • Date range selector
                                                    │  • Export data button
                                                    │  • Key metrics (4 cards)
                                                    │  • Conversations chart
                                                    │  • Top queries list
                                                    │  • Response time distribution
                                                    │
                                                    ├─ /analytics
                                                    │  • Global analytics overview
                                                    │  • Aggregate metrics
                                                    │  • Performance trends
                                                    │
                                                    ├─ /integrations
                                                    │  • Integration cards
                                                    │  • Connect buttons
                                                    │  • Coming soon badges
                                                    │
                                                    └─ /settings
                                                       • Workspace settings
                                                       • Account settings
                                                       • Email preferences
```

## 📄 Page Details

### Authentication Pages

#### `/login`
**Purpose**: User authentication  
**Layout**: Split layout (branding left, form right)  
**Features**:
- Email input
- Password input with visibility toggle
- "Forgot Password?" link
- Log In button
- OAuth buttons (Google, Microsoft)
- Tab navigation to switch to signup
- Terms of Service & Privacy Policy links

**Mobile**: Single column, form only

---

#### `/signup`
**Purpose**: New user registration  
**Layout**: Split layout (branding left, form right)  
**Features**:
- Company name input
- Email input
- Password input with visibility toggle
- Confirm password input with visibility toggle
- Create Account button
- OAuth buttons (Google, Microsoft)
- Tab navigation to switch to login
- Terms of Service & Privacy Policy links

**Mobile**: Single column, form only

---

### Dashboard Pages (With Sidebar)

#### Sidebar Navigation
**Always visible on desktop, collapsible on mobile**

**Top Section**:
- Workspace avatar (teal circle with "B")
- Company name: "BotPlatform Inc."
- Workspace label

**Navigation Items**:
- 🏠 Dashboard
- 📊 Analytics
- 🧩 Integrations
- ⚙️ Settings

**Bottom Section**:
- ❓ Help Center
- 🚪 Logout

---

#### `/dashboard`
**Purpose**: Main chatbot management hub  
**Features**:
- Page title: "My Chatbots"
- Description text
- "Create New Chatbot" button (top right)
- Search bar (with search icon)
- Filter button
- View toggle (Grid/List icons)

**Chatbot Cards** (Grid View):
- Avatar (colored circle with letter)
- Chatbot name
- Status badge (Active/Inactive/Draft)
- Metrics:
  - Conversations count
  - Active users count
  - Resolution percentage
- Last updated timestamp
- Edit button (pencil icon)
- Delete button (trash icon)

**Chatbot Cards** (List View):
- Same info as grid, but horizontal layout
- More compact spacing

**Empty State**:
- Dashed border card
- Plus icon in circle
- "Create a New Chatbot" heading
- Description text
- Click to create

---

#### `/onboarding`
**Purpose**: Welcome new users  
**Features**:
- Large heading: "Welcome to ChatFlow, Alex! 👋"
- Subtitle: "Let's set up your first chatbot in a few easy steps."
- 3 cards in a row:
  1. **Choose Its Purpose** (💡 Lightbulb icon, blue)
     - Description about defining chatbot goal
  2. **Personalize Tone & Greeting** (👥 Users icon, purple)
     - Description about customizing personality
  3. **Review & Go Live** (🚀 Rocket icon, teal)
     - Description about activation
- "Create My First Chatbot" button (large, centered)

---

#### `/chatbots/new`
**Purpose**: Create new chatbot  
**Features**:

**Breadcrumb**: Dashboard / Chatbots / Create New

**Header**:
- Title: "Create a New Chatbot"
- Description
- "Skip Hints" button

**Basic Information Card**:
- Section title & description
- Avatar selection:
  - Upload button (camera icon)
  - 4 default avatars (A, B, C, D in different colors)
  - Hint: "Give your chatbot a face!"
- Chatbot name input
  - Hint: "This is how your team will recognize this chatbot"
- Welcome message textarea
  - Hint: "A great welcome message makes a strong first impression"

**Personality & Behavior Card**:
- Section title & description
- Tone dropdown (Professional, Friendly, Casual, Formal)
  - Hint: "Pick a personality to match your brand's voice"
- Base prompt textarea
  - Hint: "Provide clear instructions for the AI to follow"

**Action Buttons**:
- Cancel (outline)
- Create Chatbot (primary)

**Success Dialog** (appears after creation):
- Green checkmark icon
- "Chatbot Created Successfully!" heading
- "[Chatbot Name] is ready..." message
- "View Dashboard" button (outline)
- "Open Analytics" button (primary)

---

#### `/chatbots/[id]/analytics`
**Purpose**: Detailed chatbot analytics  
**Features**:

**Header**:
- Chatbot name: "Customer Support Bot"
- Status badge (Active/green)
- Date range selector dropdown
- "Export Data" button

**Metrics Cards** (4 in a row):
1. Total Conversations: 12,834 (+3.2% ↑)
2. Avg. Session Duration: 3m 45s (-1.5% ↓)
3. User Satisfaction (CSAT): 92% (+2.1% ↑)
4. Resolution Rate: 85% (+3.0% ↑)

**Conversations Over Time Chart**:
- Large card with chart placeholder
- Line graph visualization area

**Additional Metrics** (2 cards side-by-side):
- **Top User Queries**:
  - List of 5 most common questions
  - Count for each query
- **Response Time Distribution**:
  - 4 time ranges with percentages
  - Progress bars for each

---

#### `/analytics`
**Purpose**: Global analytics overview  
**Features**:
- Page title: "Analytics"
- Description
- 4 metric cards:
  - Total Conversations
  - Active Users
  - Avg Resolution Rate
  - Total Chatbots
- "Detailed Analytics" card with chart placeholder

---

#### `/integrations`
**Purpose**: Connect external platforms  
**Features**:
- Page title: "Integrations"
- Description
- Grid of integration cards (3 columns):
  - Slack 💬 (Available)
  - WhatsApp 📱 (Available)
  - Facebook Messenger 📘 (Available)
  - Telegram ✈️ (Coming Soon)
  - Discord 🎮 (Coming Soon)
  - Microsoft Teams 👥 (Coming Soon)
- Each card has:
  - Icon
  - Name
  - Description
  - Connect button or Coming Soon badge

---

#### `/settings`
**Purpose**: Account and workspace configuration  
**Features**:
- Page title: "Settings"
- Description
- **Workspace Settings Card**:
  - Workspace name input
  - Save Changes button
- **Account Settings Card**:
  - Email input
  - Update Email button

---

## 🔄 User Flow Diagrams

### First-Time User Journey
```
1. Visit site (/)
   ↓
2. Redirect to /login
   ↓
3. Click "Sign Up" tab
   ↓
4. Fill signup form (/signup)
   ↓
5. Submit → Redirect to /onboarding
   ↓
6. Click "Create My First Chatbot"
   ↓
7. Fill chatbot form (/chatbots/new)
   ↓
8. Submit → Success dialog appears
   ↓
9. Click "View Dashboard"
   ↓
10. See chatbot in list (/dashboard)
```

### Returning User Journey
```
1. Visit site (/)
   ↓
2. Redirect to /login
   ↓
3. Enter credentials
   ↓
4. Submit → Redirect to /dashboard
   ↓
5. View chatbot list
   ↓
6. Options:
   - Create new chatbot → /chatbots/new
   - Edit chatbot → (future: /chatbots/[id]/edit)
   - View analytics → /chatbots/[id]/analytics
   - Delete chatbot → Confirmation dialog
```

### Analytics Flow
```
1. From /dashboard
   ↓
2. Click chatbot card
   ↓
3. View /chatbots/[id]/analytics
   ↓
4. Change date range
   ↓
5. View updated metrics
   ↓
6. Click "Export Data"
   ↓
7. Download CSV (future feature)
```

## 📊 Component Hierarchy

```
App Layout (root)
├── Providers (TanStack Query)
│
├── Auth Pages (no sidebar)
│   ├── Login Page
│   │   ├── Logo
│   │   ├── Tabs (Login/Signup)
│   │   ├── Form
│   │   │   ├── Email Input
│   │   │   ├── Password Input
│   │   │   └── Submit Button
│   │   └── OAuth Buttons
│   │
│   └── Signup Page
│       ├── Logo
│       ├── Tabs (Login/Signup)
│       ├── Form
│       │   ├── Company Name Input
│       │   ├── Email Input
│       │   ├── Password Input
│       │   ├── Confirm Password Input
│       │   └── Submit Button
│       └── OAuth Buttons
│
└── Dashboard Layout (with sidebar)
    ├── Sidebar
    │   ├── Workspace Info
    │   ├── Navigation Items
    │   └── Bottom Actions
    │
    └── Main Content Area
        ├── Dashboard Page
        │   ├── Header
        │   ├── Search & Filters
        │   ├── Chatbot Grid/List
        │   └── Empty State
        │
        ├── Onboarding Page
        │   ├── Welcome Header
        │   ├── Step Cards (3)
        │   └── CTA Button
        │
        ├── Create Chatbot Page
        │   ├── Breadcrumb
        │   ├── Form Cards (2)
        │   ├── Action Buttons
        │   └── Success Dialog
        │
        ├── Analytics Pages
        │   ├── Metrics Cards
        │   ├── Charts
        │   └── Data Tables
        │
        ├── Integrations Page
        │   └── Integration Cards Grid
        │
        └── Settings Page
            └── Settings Cards
```

## 🎨 Visual Hierarchy

### Color Usage
- **Primary Blue**: CTA buttons, links, active states
- **Green**: Success messages, active status, positive trends
- **Yellow**: Warning hints, draft status
- **Red**: Delete actions, error states, negative trends
- **Gray**: Inactive elements, borders, muted text

### Typography Scale
- **3xl (30px)**: Page titles
- **2xl (24px)**: Dialog titles
- **xl (20px)**: Card titles
- **lg (18px)**: Section headings
- **base (16px)**: Body text
- **sm (14px)**: Helper text
- **xs (12px)**: Timestamps, labels

### Spacing System
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

## 📱 Responsive Behavior

### Mobile (< 768px)
- Sidebar hidden (hamburger menu future)
- Single column layouts
- Stacked forms
- Full-width cards
- Reduced padding

### Tablet (768px - 1023px)
- Sidebar visible
- 2-column grids
- Optimized spacing
- Readable line lengths

### Desktop (1024px+)
- Full sidebar
- 3-4 column grids
- Maximum content width
- Comfortable spacing
