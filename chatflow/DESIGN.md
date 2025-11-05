# Design System Documentation

This document outlines the design decisions, patterns, and systems used in the ChatFlow application.

---

## Color Palette & Branding

### Brand Colors

**Primary Colors:**
- **Primary Blue**: `#3B82F6` (Tailwind `blue-500`)
  - Used for: Primary CTAs, active states, links, focus indicators
  - Rationale: Conveys trust, professionalism, and technology
  
- **Background Dark**: `#0A0A0A` (Near black)
  - Used for: Main backgrounds, cards, surfaces
  - Rationale: Modern, sleek aesthetic that reduces eye strain and emphasizes content

**Secondary Colors:**
- **Sidebar Background**: `#111827` (Tailwind `gray-900`)
  - Used for: Navigation sidebar, secondary surfaces
  - Rationale: Subtle differentiation from main content while maintaining dark theme

- **Border Gray**: `#1F2937` (Tailwind `gray-800`)
  - Used for: Dividers, card borders, input borders
  - Rationale: Subtle separation without harsh contrast

**Accent Colors:**
- **Success Green**: `#10B981` (Tailwind `emerald-500`)
  - Used for: Success states, active status badges, positive metrics
  
- **Warning Yellow**: `#F59E0B` (Tailwind `amber-500`)
  - Used for: Warning states, pending status, attention indicators
  
- **Error Red**: `#EF4444` (Tailwind `red-500`)
  - Used for: Error states, destructive actions, inactive status
  
- **Info Blue**: `#3B82F6` (Tailwind `blue-500`)
  - Used for: Informational messages, tooltips, help text

**Text Colors:**
- **Foreground**: `#FAFAFA` (Tailwind `gray-50`)
  - Primary text color for high contrast on dark backgrounds
  
- **Muted Foreground**: `#9CA3AF` (Tailwind `gray-400`)
  - Secondary text, descriptions, metadata
  - Rationale: Establishes visual hierarchy without overwhelming users

### Design Rationale

**Why Dark Theme?**
- Modern, professional aesthetic suitable for SaaS products
- Reduces eye strain during extended use
- Makes colorful elements (charts, badges, avatars) pop visually
- Aligns with developer and tech-savvy user preferences

**Why Blue as Primary?**
- Industry standard for trust and reliability
- High contrast against dark backgrounds
- Accessible and distinguishable for most users
- Conveys technology and innovation

**Placeholder for Custom Branding:**
```
[Add your custom brand colors here]
- Brand Primary: #______
- Brand Secondary: #______
- Brand Accent: #______

[Add your logo specifications]
- Logo dimensions
- Logo variations (light/dark)
- Logo usage guidelines
```

---

## Typography Scales

### Font Family

**Primary Font**: System Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
```

**Rationale:**
- Native system fonts provide optimal readability
- Fast loading (no external font files)
- Familiar to users on their respective platforms
- Excellent rendering across all devices

### Heading Styles

**H1 - Page Titles**
- Size: `3rem` (48px) on desktop, `2rem` (32px) on mobile
- Weight: `700` (Bold)
- Line Height: `1.2`
- Usage: Main page headings (e.g., "My Chatbots", "Analytics")
- Class: `text-3xl md:text-4xl lg:text-5xl font-bold`

**H2 - Section Headings**
- Size: `2.25rem` (36px) on desktop, `1.5rem` (24px) on mobile
- Weight: `700` (Bold)
- Line Height: `1.3`
- Usage: Major section dividers (e.g., "Your Chatbots", "Performance Metrics")
- Class: `text-2xl md:text-3xl font-bold`

**H3 - Subsection Headings**
- Size: `1.5rem` (24px)
- Weight: `600` (Semibold)
- Line Height: `1.4`
- Usage: Card titles, form sections
- Class: `text-xl font-semibold`

**H4 - Component Titles**
- Size: `1.125rem` (18px)
- Weight: `600` (Semibold)
- Line Height: `1.5`
- Usage: Small component headers, list items
- Class: `text-lg font-semibold`

### Body Text Styles

**Body Large**
- Size: `1rem` (16px)
- Weight: `400` (Regular)
- Line Height: `1.5`
- Usage: Primary content, form labels, descriptions
- Class: `text-base`

**Body Regular**
- Size: `0.875rem` (14px)
- Weight: `400` (Regular)
- Line Height: `1.5`
- Usage: Secondary content, metadata, helper text
- Class: `text-sm`

**Body Small**
- Size: `0.75rem` (12px)
- Weight: `400` (Regular)
- Line Height: `1.5`
- Usage: Captions, timestamps, fine print
- Class: `text-xs`

**Body Muted**
- Same sizes as above
- Color: `text-muted-foreground`
- Usage: Less important information, placeholders

### Typography Rationale

- **Consistent scale**: Uses Tailwind's default type scale for predictability
- **Responsive sizing**: Headings scale down on mobile for better readability
- **Readable line heights**: 1.5 for body text ensures comfortable reading
- **Weight hierarchy**: Bold for headings, semibold for emphasis, regular for body

---

## Component Patterns

### shadcn/ui Components Used

**1. Button Component**
- **Variants**: Default, Outline, Ghost, Destructive
- **Sizes**: Small, Default, Large, Icon
- **Usage**: CTAs, form submissions, actions
- **Why**: Consistent interaction patterns, accessible by default, flexible styling

**2. Card Component**
- **Structure**: Card, CardHeader, CardTitle, CardDescription, CardContent
- **Usage**: Chatbot cards, settings sections, analytics widgets
- **Why**: Provides visual grouping, elevates content, maintains consistent spacing

**3. Input Component**
- **Types**: Text, Email, Password, Search
- **Features**: Built-in focus states, error states, disabled states
- **Usage**: Forms, search bars, filters
- **Why**: Accessible, consistent styling, works with form libraries

**4. Select Component**
- **Features**: Dropdown with search, keyboard navigation
- **Usage**: Date range selector, filter options, settings
- **Why**: Better UX than native select, accessible, customizable

**5. Avatar Component**
- **Features**: Image with fallback, status indicators
- **Usage**: User profiles, chatbot avatars, workspace icons
- **Why**: Handles image loading gracefully, consistent sizing

**6. Badge Component**
- **Variants**: Default, Secondary, Outline, Destructive
- **Usage**: Status indicators, tags, counts
- **Why**: Quick visual communication, consistent styling

**7. Dialog/Modal Component**
- **Features**: Overlay, focus trap, ESC to close
- **Usage**: Confirmations, forms, detailed views
- **Why**: Accessible modals, prevents background interaction

**8. Dropdown Menu Component**
- **Features**: Nested menus, keyboard navigation, separators
- **Usage**: User menu, action menus, filter options
- **Why**: Accessible, flexible, supports complex menu structures

**9. Label Component**
- **Features**: Proper form association, accessible
- **Usage**: Form labels, input descriptions
- **Why**: Ensures accessibility, consistent styling

**10. Alert Component**
- **Variants**: Default, Destructive, Success, Warning
- **Usage**: Notifications, error messages, success confirmations
- **Why**: Clear communication of system states

### Custom Components Built

**1. EmptyState Component**
- **Purpose**: Guides users when no data exists
- **Features**: Icon, heading, description, CTA button
- **Usage**: Empty chatbot list, no analytics data
- **Pattern**: Centered content, friendly messaging, clear next action

**2. DashboardLayout Component**
- **Purpose**: Consistent layout wrapper for all dashboard pages
- **Features**: Sidebar navigation, mobile hamburger menu, content area
- **Usage**: Wraps all authenticated pages
- **Pattern**: Responsive sidebar, collapsible on mobile

**3. ChatbotCard Component**
- **Purpose**: Display chatbot information in grid/list views
- **Features**: Avatar, name, status, metrics, actions
- **Usage**: Dashboard chatbot list
- **Pattern**: Hover states, click to navigate, action buttons

### Component Design Principles

**Consistency**: All components follow the same design language
**Accessibility**: ARIA labels, keyboard navigation, focus management
**Responsiveness**: Components adapt to screen size
**Reusability**: Components are generic and composable
**Feedback**: Visual feedback for all interactions (hover, active, disabled)

---

## Layout System

### Navigation Structure

**Primary Navigation (Sidebar)**
```
├── Dashboard (Home)
├── Analytics (Metrics)
├── Chatbots (Management)
│   └── [id]/analytics (Individual chatbot)
│   └── new (Create chatbot)
├── Settings (Configuration)
└── User Menu (Profile, Logout)
```

**Navigation Rationale:**
- **Dashboard first**: Most frequently accessed page
- **Analytics separate**: Power users need quick access to metrics
- **Chatbots central**: Core functionality gets prominent placement
- **Settings last**: Less frequently accessed

**Mobile Navigation:**
- Hamburger menu icon (top-left)
- Overlay sidebar slides in from left
- Tap outside to close
- Smooth animations for better UX

### Page Templates

**1. Dashboard Template**
- Header with title, description, primary CTA
- Search and filter controls
- Grid/List view toggle
- Content area (grid or list)
- Empty state when no data

**2. Analytics Template**
- Header with title and date range selector
- Key metrics cards (4-column grid)
- Charts section (line/bar charts)
- Chatbot directory (list view)
- Export functionality

**3. Form Template (Chatbot Creation/Settings)**
- Multi-step wizard OR single page form
- Progress indicator (if multi-step)
- Form sections with clear labels
- Action buttons (Save, Cancel)
- Validation feedback

**4. Individual Analytics Template**
- Chatbot header with avatar and name
- Metrics overview
- Interactive charts
- Date range filtering
- Export options

### Layout Grid System

**Desktop (≥1024px):**
- Sidebar: 256px fixed width
- Content: Remaining space with max-width constraints
- Grid: 4 columns for cards, 2-3 columns for forms

**Tablet (768px - 1023px):**
- Sidebar: Collapsible/overlay
- Content: Full width with padding
- Grid: 2-3 columns for cards

**Mobile (<768px):**
- Sidebar: Hidden, hamburger menu
- Content: Full width, single column
- Grid: 1 column, stacked layout

### Spacing System

**Container Padding:**
- Desktop: `2rem` (32px)
- Tablet: `1.5rem` (24px)
- Mobile: `1rem` (16px)

**Component Spacing:**
- Section gaps: `2rem` (32px)
- Card gaps: `1.5rem` (24px)
- Element gaps: `1rem` (16px)
- Tight spacing: `0.5rem` (8px)

---

## Responsive Breakpoints

### Tailwind Breakpoints Used

```css
sm:  640px  /* Small tablets, large phones */
md:  768px  /* Tablets */
lg:  1024px /* Laptops, desktops */
xl:  1280px /* Large desktops */
2xl: 1536px /* Extra large screens */
```

### Responsive Strategies

**1. Mobile-First Approach**
- Base styles target mobile devices
- Use `sm:`, `md:`, `lg:` prefixes to enhance for larger screens
- Ensures core functionality works on smallest screens

**2. Navigation Adaptation**
```
Mobile (<1024px):    Hamburger menu → Overlay sidebar
Desktop (≥1024px):   Persistent sidebar
```

**3. Grid Adaptation**
```
Mobile:    1 column (full width)
Tablet:    2 columns (grid-cols-2)
Desktop:   3-4 columns (grid-cols-3 or grid-cols-4)
```

**4. Typography Scaling**
```
Mobile:    Smaller headings (text-2xl → text-3xl)
Desktop:   Larger headings (text-4xl → text-5xl)
```

**5. Form Layout**
```
Mobile:    Stacked fields (flex-col)
Desktop:   Side-by-side fields (flex-row)
```

**6. Control Groups**
```
Mobile:    Vertical stacking (flex-col)
Desktop:   Horizontal layout (flex-row)
```

### Responsive Testing Targets

- **iPhone SE**: 375px (smallest modern phone)
- **iPhone 12/13**: 390px (common phone size)
- **iPad**: 768px (tablet portrait)
- **iPad Pro**: 1024px (tablet landscape)
- **MacBook**: 1440px (laptop)
- **Desktop**: 1920px (standard monitor)

---

## Design Consistency

### How Visual Consistency is Maintained

**1. Design Tokens (Tailwind Config)**
- All colors defined in `tailwind.config.ts`
- Consistent spacing scale (4px base unit)
- Typography scale follows modular scale
- Border radius values standardized

**2. Component Library (shadcn/ui)**
- All components share base styles
- Variants follow consistent naming
- Animations use same timing functions
- Focus states use same ring style

**3. Layout Patterns**
- All pages use same header structure
- Cards follow same padding/spacing rules
- Forms use consistent field layouts
- Buttons maintain same sizing across pages

**4. Color Usage Rules**
- Primary color for main actions only
- Muted colors for secondary information
- Status colors (green/yellow/red) used consistently
- Text hierarchy uses same color scale

**5. Spacing Consistency**
- Section spacing: Always `mb-8` or `space-y-8`
- Card padding: Always `p-6`
- Form field gaps: Always `space-y-4`
- Button groups: Always `gap-4`

**6. Interactive States**
- Hover: Slight opacity change or color shift
- Active: Darker shade of base color
- Disabled: Reduced opacity (0.5) + cursor-not-allowed
- Focus: Blue ring with offset

**7. Animation Standards**
- Transition duration: 150ms (fast), 300ms (normal)
- Easing: `ease-in-out` for most transitions
- Hover effects: Subtle scale or color changes
- Page transitions: Fade or slide (consistent direction)

**8. Icon Usage**
- Icon library: Lucide React (consistent style)
- Icon size: `w-4 h-4` (small), `w-5 h-5` (default), `w-6 h-6` (large)
- Icon color: Inherits text color or uses muted-foreground
- Icon placement: Consistent left/right positioning

**9. Empty States**
- Always include: Icon, heading, description, CTA
- Centered layout with max-width
- Friendly, helpful messaging
- Clear next action

**10. Error Handling**
- Inline validation for forms
- Toast notifications for async actions
- Error messages in red with icon
- Clear, actionable error text

### Design Review Checklist

Before shipping a new feature:

- [ ] Uses colors from design system
- [ ] Typography follows scale
- [ ] Spacing matches existing patterns
- [ ] Responsive on all breakpoints
- [ ] Interactive states defined
- [ ] Accessible (keyboard, screen reader)
- [ ] Icons from Lucide library
- [ ] Animations use standard timing
- [ ] Empty states included
- [ ] Error states handled

---

## Future Design Considerations

### Potential Enhancements

**1. Light Mode**
- Add light theme toggle
- Define light mode color palette
- Test contrast ratios for accessibility

**2. Custom Themes**
- Allow users to customize primary color
- Workspace-level branding
- Custom logo upload

**3. Advanced Animations**
- Page transitions with Framer Motion
- Micro-interactions for delight
- Loading skeletons for better perceived performance

**4. Design System Documentation**
- Storybook for component showcase
- Interactive style guide
- Design tokens documentation

**5. Accessibility Improvements**
- WCAG AAA compliance
- High contrast mode
- Reduced motion support
- Better keyboard navigation

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
