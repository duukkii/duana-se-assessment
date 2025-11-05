# Self-Assessment and Learning Plan

## 1. Knowledge Gap Analysis

### a. What components/technologies are new to you in this assignment?

- **Next.js** was new to me. While they are similar, I've only worked with React/React Native previously so it took awhile to get used to.
- I explored using **Recharts** during this assignment to generate the charts for the analytics pages, as per ChatGPT’s suggestion.
- **OAuth**… Did not manage to set it up and make it work but I tried.
- It was my first time deploying with **Vercel**, previously I used **Netlify**.

### b. What components are familiar to you (worked with before)?

- **TypeScript**
- **shadcn/ui**
- **CSS**
- **TanStack Query**
- **GitHub**

---

## 2. State Management Discussion

### a. What are the different state management approaches in React/Next.js?

- **Context API**: Built into React, used to share state across components without passing props manually, best for small apps or global data like authentication.
- **Redux**: Popular library for managing global state in a predictable way using a single store, ideal for large apps with complex state management needs.
- **Zustand**: Minimalist state management library for smaller apps that don’t need Redux’s complexity.
- **TanStack Query**: Server state, automatically handles caching, refetching, and synchronization of data from API.
- **Recoil**: A newer state management library that uses atoms (small pieces of state) and selectors (computed states), best for apps with complex dependencies between state values.
- **MobX**: A reactive state management library where state changes automatically trigger UI updates.

### b. Which state management libraries/patterns have you used before?

- I mostly use **Context API** and **TanStack Query** for my projects, and I’ve only read about/heard about the rest.

### c. What are the trade-offs between different state management approaches?

| Approach         | Pros                                                     | Cons                                                      |
|------------------|----------------------------------------------------------|-----------------------------------------------------------|
| **Context API**  | Simple, built-in, no dependencies                        | Can cause unnecessary re-renders, not ideal for large state |
| **Redux**        | Predictable state, large community and ecosystem         | Complex for smaller apps                                   |
| **Zustand**      | Minimal boilerplate, simple to use, reactive state       | Lacks middlewares and advanced features for large apps     |
| **TanStack Query** | Perfect for server state, automatic caching             | Not a replacement for local UI state management           |
| **Recoil**       | Good for complex state dependencies and reactivity       | Still relatively new, less community support than Redux   |
| **MobX**         | Reactive, minimal boilerplate, automatic state updates   | Less predictable, harder to debug in large apps           |

---

## 3. Learning Plan

### a. What resources would you use?

- There are many documentations and YouTube videos available online nowadays, as well as online courses (i.e. Udemy).
- I always treat the AI resources nowadays as personal 1-1 professors, and I’ve truly learned so much because I can ask more specific (and "stupid") questions.

### b. How long will you take to reach basic competency?

- Honestly, it’s really difficult to give a specific timeline, but with more practice projects, maybe **1-2 months**?
- For higher levels of competency, I’d definitely require more time.

### c. What would you build to practice?

- **E-commerce catalog** where users can browse products, view product details, and add products to a cart.
- **Task management app** where users can add, edit, delete, and mark tasks as complete.
- **Simple blog** with posts fetched from an API using Server-Side Rendering (SSR).

### d. What’s your learning strategy for quickly picking up new tools?

- The best way to learn is truly to learn by doing different projects and utilizing different technologies.
- Follow tutorials online, step-by-step.
- Consolidate personalized notes and documentation.

---

## 4. Tools Used

- **ChatGPT**: Workflow suggestions, file structure recommendations, troubleshooting and debugging, for unfamiliar concepts, `.md` file templates.
- **Windsurf**: In-line code modifications (to prevent messing up indentation), troubleshooting and debugging.
- **Stitch AI**: Inspiration for UI design.
- **Figma**: UI design.

---

## 5. MVP Development Strategy

### If given 2 weeks to ship an MVP:

#### **a. Week 1 priorities:**

##### i. What features would you build first?

1. **Core user flows**: User Authentication, Dashboard Page, Chatbot Creation Form, Basic Chatbot Analytics page.
2. **API Routes**.
3. **Basic UI layout** (no styling, just boxes and text).
4. **TanStack Query** for data fetching.

##### ii. What would you validate?

1. **User Authentication Flow** and Function.
2. **Create Chatbot Flow**.
3. **Basic Dashboard Validation** (does the list show up accurately?).
4. **API Response Handling**.

##### iii. What shortcuts would you take?

1. Use **dummy data**.
2. Focus on **UX** instead of UI, no animations, no styling.
3. **Minimal form validation**.
4. Skip **real-time features** for now.

#### **b. Week 2 priorities:**

##### i. What would you polish/improve?

1. Add in **UI details** (i.e. styling, responsiveness).
2. **Error handling** and edge cases.
3. Add in details for **Authentication** (i.e. reset password, etc.).
4. **Chatbot details**.

##### ii. What would you deploy?

1. Deploy MVP to production (basic features).
2. Remove unused CSS.
3. SSG for any pages that can be pre-rendered.
4. App monitoring (error tracking).

#### **c. Deferred to v2:**

##### i. What features can wait?

1. Adding advanced analytics.
2. Notifications.
3. User roles/permissions.
4. Fancy animations/interactions.

##### ii. Why defer these features?

1. The main point of an MVP is to showcase the core features and functionality of the application. After user feedback and validation of the app’s value, then further refinement can be done to the features.

#### **d. Risks:**

##### i. What could go wrong?

1. Performance issues.
2. Unpolished UI/UX could deter users.
3. Missing deadlines.
4. Bugs.

##### ii. How would you de-risk?

1. Test earlier with real users.
2. Deploy in increments.
3. Prioritize key features of the application, don’t focus too much on the nitty gritty.

---

