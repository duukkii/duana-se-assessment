# Analytics & PostHog Integration Plan

This document outlines the analytics strategy for ChatFlow, including event tracking, insights measurement, and PostHog integration.

---

## Overview

**Goal:** Understand user behavior, measure product success, and identify opportunities for improvement.

**Analytics Tool:** PostHog
- **Why PostHog?**
  - Open-source and privacy-friendly
  - Product analytics + session recording + feature flags
  - Self-hostable (data ownership)
  - No per-event pricing (predictable costs)
  - Built for product teams

---

## Event Tracking Strategy

### Core Principles

1. **Track user intent, not just clicks**
2. **Measure outcomes, not just actions**
3. **Capture context with properties**
4. **Respect user privacy**
5. **Keep events consistent and well-named**

### Event Naming Convention

Format: `object_action` (e.g., `chatbot_created`, `dashboard_viewed`)

**Objects:**
- `user` - User account actions
- `chatbot` - Chatbot management
- `conversation` - Chat interactions
- `analytics` - Analytics usage
- `settings` - Settings changes
- `onboarding` - Onboarding flow

**Actions:**
- `viewed` - Page/component viewed
- `created` - New item created
- `updated` - Item modified
- `deleted` - Item removed
- `clicked` - Button/link clicked
- `completed` - Process finished
- `failed` - Action failed

---

## Events to Track

### 1. Authentication Events

**`user_signed_up`**
- **When:** User completes signup
- **Properties:**
  - `method`: "email" | "google" | "microsoft"
  - `company_name`: string
  - `timestamp`: ISO date
- **Why:** Measure signup conversion, understand preferred auth methods

**`user_logged_in`**
- **When:** User successfully logs in
- **Properties:**
  - `method`: "email" | "google" | "microsoft"
  - `timestamp`: ISO date
- **Why:** Track active users, identify authentication issues

**`user_logged_out`**
- **When:** User clicks logout
- **Properties:**
  - `session_duration`: number (seconds)
  - `timestamp`: ISO date
- **Why:** Understand session lengths, identify forced logouts

**`auth_failed`**
- **When:** Login/signup fails
- **Properties:**
  - `method`: "email" | "google" | "microsoft"
  - `error_type`: "invalid_credentials" | "network_error" | "oauth_error"
  - `timestamp`: ISO date
- **Why:** Identify authentication problems, improve error handling

---

### 2. Onboarding Events

**`onboarding_started`**
- **When:** User lands on onboarding page
- **Properties:**
  - `is_new_user`: boolean
  - `signup_method`: string
  - `timestamp`: ISO date
- **Why:** Track onboarding funnel start

**`onboarding_step_viewed`**
- **When:** User views each onboarding step
- **Properties:**
  - `step_number`: number
  - `step_name`: string
  - `timestamp`: ISO date
- **Why:** Identify drop-off points in onboarding

**`onboarding_completed`**
- **When:** User finishes onboarding
- **Properties:**
  - `time_taken`: number (seconds)
  - `steps_completed`: number
  - `timestamp`: ISO date
- **Why:** Measure onboarding success rate, optimize flow

**`onboarding_skipped`**
- **When:** User skips onboarding
- **Properties:**
  - `step_number`: number (where they skipped)
  - `timestamp`: ISO date
- **Why:** Understand why users skip, improve value proposition

---

### 3. Chatbot Management Events

**`chatbot_created`**
- **When:** User successfully creates a chatbot
- **Properties:**
  - `chatbot_id`: string
  - `chatbot_name`: string
  - `avatar_type`: "svg" | "upload"
  - `has_knowledge_base`: boolean
  - `is_first_chatbot`: boolean
  - `time_to_create`: number (seconds)
  - `timestamp`: ISO date
- **Why:** Measure activation, understand creation patterns

**`chatbot_updated`**
- **When:** User edits chatbot settings
- **Properties:**
  - `chatbot_id`: string
  - `fields_changed`: array (e.g., ["name", "avatar"])
  - `timestamp`: ISO date
- **Why:** Track engagement, identify most-edited fields

**`chatbot_deleted`**
- **When:** User deletes a chatbot
- **Properties:**
  - `chatbot_id`: string
  - `chatbot_age`: number (days since creation)
  - `total_conversations`: number
  - `timestamp`: ISO date
- **Why:** Understand churn reasons, identify unsuccessful chatbots

**`chatbot_duplicated`**
- **When:** User duplicates a chatbot
- **Properties:**
  - `source_chatbot_id`: string
  - `new_chatbot_id`: string
  - `timestamp`: ISO date
- **Why:** Measure feature usage, understand use cases

**`chatbot_activated`**
- **When:** User activates an inactive chatbot
- **Properties:**
  - `chatbot_id`: string
  - `inactive_duration`: number (days)
  - `timestamp`: ISO date
- **Why:** Track re-engagement

**`chatbot_deactivated`**
- **When:** User deactivates a chatbot
- **Properties:**
  - `chatbot_id`: string
  - `reason`: string (if provided)
  - `timestamp`: ISO date
- **Why:** Understand why chatbots are paused

---

### 4. Dashboard Events

**`dashboard_viewed`**
- **When:** User lands on dashboard page
- **Properties:**
  - `chatbot_count`: number
  - `view_mode`: "grid" | "list"
  - `timestamp`: ISO date
- **Why:** Track engagement, understand dashboard usage

**`dashboard_search_used`**
- **When:** User searches for chatbots
- **Properties:**
  - `query`: string (anonymized if contains PII)
  - `results_count`: number
  - `timestamp`: ISO date
- **Why:** Understand search patterns, improve search

**`dashboard_filter_applied`**
- **When:** User applies sort/filter
- **Properties:**
  - `filter_type`: "name-asc" | "name-desc" | "date-newest" | etc.
  - `timestamp`: ISO date
- **Why:** Understand how users organize chatbots

**`dashboard_view_toggled`**
- **When:** User switches between grid/list view
- **Properties:**
  - `from_view`: "grid" | "list"
  - `to_view`: "grid" | "list"
  - `timestamp`: ISO date
- **Why:** Understand view preferences

**`create_chatbot_clicked`**
- **When:** User clicks "Create New Chatbot" button
- **Properties:**
  - `source`: "dashboard" | "empty_state" | "navbar"
  - `existing_chatbot_count`: number
  - `timestamp`: ISO date
- **Why:** Track activation funnel, identify best CTAs

---

### 5. Analytics Events

**`analytics_page_viewed`**
- **When:** User opens overall analytics page
- **Properties:**
  - `chatbot_count`: number
  - `timestamp`: ISO date
- **Why:** Measure feature adoption

**`analytics_date_range_changed`**
- **When:** User changes date range selector
- **Properties:**
  - `range`: "7d" | "30d" | "90d" | "custom"
  - `start_date`: ISO date
  - `end_date`: ISO date
  - `timestamp`: ISO date
- **Why:** Understand analysis patterns

**`analytics_exported`**
- **When:** User exports analytics data
- **Properties:**
  - `format`: "csv" | "excel"
  - `data_type`: "overview" | "chatbot_specific"
  - `date_range`: string
  - `timestamp`: ISO date
- **Why:** Measure feature usage, understand reporting needs

**`chatbot_analytics_viewed`**
- **When:** User views individual chatbot analytics
- **Properties:**
  - `chatbot_id`: string
  - `chatbot_age`: number (days)
  - `conversation_count`: number
  - `timestamp`: ISO date
- **Why:** Track engagement with specific chatbots

**`analytics_chart_interacted`**
- **When:** User hovers/clicks on chart elements
- **Properties:**
  - `chart_type`: "line" | "bar"
  - `data_point`: string
  - `timestamp`: ISO date
- **Why:** Understand which metrics users care about

---

### 6. Settings Events

**`settings_viewed`**
- **When:** User opens settings page
- **Properties:**
  - `timestamp`: ISO date
- **Why:** Track feature discovery

**`workspace_settings_updated`**
- **When:** User changes workspace settings
- **Properties:**
  - `fields_changed`: array
  - `timestamp`: ISO date
- **Why:** Track customization

**`account_settings_updated`**
- **When:** User updates account info
- **Properties:**
  - `fields_changed`: array (excluding sensitive data)
  - `timestamp`: ISO date
- **Why:** Track profile completion

**`password_changed`**
- **When:** User successfully changes password
- **Properties:**
  - `timestamp`: ISO date
- **Why:** Track security actions

**`password_change_failed`**
- **When:** Password change fails
- **Properties:**
  - `error_type`: "incorrect_current" | "weak_password" | "mismatch"
  - `timestamp`: ISO date
- **Why:** Identify UX issues in password flow

---

### 7. Conversation Events (Future)

**`conversation_started`**
- **When:** End user starts chat with chatbot
- **Properties:**
  - `chatbot_id`: string
  - `user_type`: "new" | "returning"
  - `source`: "website" | "mobile" | "api"
  - `timestamp`: ISO date
- **Why:** Measure chatbot usage

**`conversation_message_sent`**
- **When:** User or bot sends message
- **Properties:**
  - `chatbot_id`: string
  - `conversation_id`: string
  - `sender`: "user" | "bot"
  - `message_length`: number
  - `timestamp`: ISO date
- **Why:** Track engagement depth

**`conversation_resolved`**
- **When:** Conversation marked as resolved
- **Properties:**
  - `chatbot_id`: string
  - `conversation_id`: string
  - `resolution_type`: "bot" | "human" | "timeout"
  - `message_count`: number
  - `duration`: number (seconds)
  - `timestamp`: ISO date
- **Why:** Measure chatbot effectiveness

**`conversation_escalated`**
- **When:** Bot escalates to human
- **Properties:**
  - `chatbot_id`: string
  - `conversation_id`: string
  - `reason`: "bot_confused" | "user_requested" | "complex_query"
  - `message_count_before_escalation`: number
  - `timestamp`: ISO date
- **Why:** Identify bot limitations, improve training

---

### 8. Error Events

**`error_occurred`**
- **When:** Any error happens in the app
- **Properties:**
  - `error_type`: string
  - `error_message`: string
  - `page`: string
  - `component`: string
  - `user_action`: string
  - `timestamp`: ISO date
- **Why:** Track bugs, improve stability

**`api_error`**
- **When:** API request fails
- **Properties:**
  - `endpoint`: string
  - `status_code`: number
  - `error_message`: string
  - `timestamp`: ISO date
- **Why:** Monitor API health

---

## User Properties to Track

### Identity Properties
- `user_id`: Unique identifier
- `email`: User email (hashed for privacy)
- `company_name`: Workspace name
- `signup_date`: ISO date
- `signup_method`: "email" | "google" | "microsoft"

### Behavioral Properties
- `chatbot_count`: Number of chatbots created
- `total_conversations`: Across all chatbots
- `last_login_date`: ISO date
- `login_count`: Total logins
- `days_since_signup`: Number

### Engagement Properties
- `is_active_user`: Boolean (logged in last 7 days)
- `dashboard_views_last_7d`: Number
- `analytics_views_last_7d`: Number
- `chatbots_created_last_30d`: Number

### Feature Adoption Properties
- `has_created_chatbot`: Boolean
- `has_viewed_analytics`: Boolean
- `has_exported_data`: Boolean
- `has_updated_settings`: Boolean

---

## Key Insights to Measure

### 1. Activation Metrics

**Question:** Are users successfully getting started?

**Metrics:**
- **Time to First Chatbot:** Median time from signup to first chatbot created
  - Target: < 5 minutes
  - Track: `user_signed_up` → `chatbot_created`

- **Onboarding Completion Rate:** % of users who complete onboarding
  - Target: > 80%
  - Track: `onboarding_started` → `onboarding_completed`

- **First Week Retention:** % of users who return within 7 days
  - Target: > 60%
  - Track: `user_signed_up` → `user_logged_in` (within 7 days)

**PostHog Features:**
- Funnel analysis for onboarding
- Cohort analysis for retention
- Session recordings to see friction points

---

### 2. Engagement Metrics

**Question:** Are users actively using the product?

**Metrics:**
- **Daily Active Users (DAU):** Unique users per day
  - Track: `user_logged_in` events

- **Weekly Active Users (WAU):** Unique users per week
  - Track: `user_logged_in` events

- **DAU/WAU Ratio:** Stickiness metric
  - Target: > 0.3 (30% of weekly users are daily users)

- **Average Chatbots per User:** 
  - Target: 2-3 chatbots
  - Track: `chatbot_count` user property

- **Dashboard Visits per Week:**
  - Target: 3-5 visits
  - Track: `dashboard_viewed` events

**PostHog Features:**
- User lifecycle analysis
- Retention curves
- Stickiness reports

---

### 3. Feature Adoption Metrics

**Question:** Which features are users discovering and using?

**Metrics:**
- **Analytics Page Adoption:** % of users who view analytics
  - Track: Users with `analytics_page_viewed` event

- **Export Feature Usage:** % of users who export data
  - Track: Users with `analytics_exported` event

- **Search Usage:** % of users who use dashboard search
  - Track: Users with `dashboard_search_used` event

- **Multi-Chatbot Users:** % of users with 2+ chatbots
  - Track: `chatbot_count` > 1

**PostHog Features:**
- Feature flags for A/B testing
- Trend analysis for feature adoption
- Correlation analysis (which features drive retention?)

---

### 4. Success Metrics

**Question:** Are users achieving their goals?

**Metrics:**
- **Chatbot Longevity:** Average days chatbot stays active
  - Track: Time between `chatbot_created` and `chatbot_deleted`

- **Chatbot Utilization:** Average conversations per chatbot
  - Track: `total_conversations` per chatbot

- **User Satisfaction:** NPS or CSAT scores
  - Track: Survey responses (integrated with PostHog)

- **Upgrade Rate:** % of free users who upgrade to paid
  - Track: `subscription_upgraded` event (future)

**PostHog Features:**
- Custom dashboards for success metrics
- Goal tracking
- User surveys

---

### 5. Churn Risk Metrics

**Question:** Which users are at risk of churning?

**Metrics:**
- **Inactive Users:** Users who haven't logged in for 14+ days
  - Track: `last_login_date` property

- **Zero Chatbot Users:** Users who signed up but never created chatbot
  - Track: `chatbot_count` = 0

- **Deleted Chatbot Rate:** % of chatbots deleted within 7 days
  - Track: `chatbot_deleted` where `chatbot_age` < 7

- **Low Engagement:** Users with < 2 dashboard views per week
  - Track: `dashboard_views_last_7d` < 2

**PostHog Features:**
- Cohort creation for at-risk users
- Automated alerts for churn signals
- Session recordings to understand frustration

---

### 6. Product Health Metrics

**Question:** Is the product performing well?

**Metrics:**
- **Error Rate:** Errors per session
  - Track: `error_occurred` events
  - Target: < 1% of sessions have errors

- **API Success Rate:** % of successful API calls
  - Track: `api_error` events
  - Target: > 99.5%

- **Page Load Time:** Average time to interactive
  - Track: Built-in performance monitoring
  - Target: < 2 seconds

- **Crash Rate:** % of sessions with crashes
  - Track: Session recordings + error events
  - Target: < 0.1%

**PostHog Features:**
- Performance monitoring
- Error tracking
- Session replay for debugging

---

## How to Use PostHog to Improve the Product

### 1. Identify Friction Points

**Method:** Session Recordings + Funnel Analysis

**Example:**
- Notice 40% drop-off at onboarding step 3
- Watch session recordings of users who dropped off
- Discover: Users confused by knowledge base upload
- Solution: Add clearer instructions, make step optional

**PostHog Features:**
- Session recordings with event timeline
- Funnel analysis with drop-off visualization
- Heatmaps showing where users click

---

### 2. Validate Feature Ideas

**Method:** Feature Flags + A/B Testing

**Example:**
- Hypothesis: Adding chatbot templates will increase activation
- Create feature flag: `show_chatbot_templates`
- Enable for 50% of new users
- Measure: Time to first chatbot, completion rate
- Result: 30% faster activation → Roll out to 100%

**PostHog Features:**
- Feature flags with percentage rollouts
- Multivariate testing
- Statistical significance calculator

---

### 3. Understand User Segments

**Method:** Cohort Analysis + User Properties

**Example:**
- Create cohorts:
  - "Power Users" (3+ chatbots, daily logins)
  - "Casual Users" (1 chatbot, weekly logins)
  - "At-Risk Users" (no login in 14 days)
- Analyze behavior differences
- Discover: Power users view analytics 5x more
- Solution: Promote analytics feature to casual users

**PostHog Features:**
- Dynamic cohorts based on properties
- Cohort comparison
- Behavioral insights

---

### 4. Optimize Onboarding

**Method:** Funnel Analysis + Path Analysis

**Example:**
- Track onboarding funnel:
  - Signup → Onboarding Start → Step 1 → Step 2 → Step 3 → Complete
- Identify: 30% skip at step 2 (avatar selection)
- Path analysis shows: Users who skip still create chatbots
- Solution: Make avatar selection optional, move to end

**PostHog Features:**
- Funnel visualization
- Path analysis (what do users do next?)
- Time-to-convert metrics

---

### 5. Reduce Churn

**Method:** Retention Analysis + Surveys

**Example:**
- Retention curve shows: 50% of users churn after day 7
- Create cohort: "Churned Users"
- Send survey: "Why did you stop using ChatFlow?"
- Top reason: "Chatbot didn't answer questions well"
- Solution: Improve knowledge base upload, add training guide

**PostHog Features:**
- Retention curves
- User surveys (in-app or email)
- Churn prediction

---

### 6. Prioritize Features

**Method:** Correlation Analysis + User Feedback

**Example:**
- Question: What features drive retention?
- Correlation analysis shows:
  - Users who export analytics: 80% retained
  - Users who view analytics: 70% retained
  - Users who search dashboard: 50% retained
- Conclusion: Analytics features drive retention
- Decision: Prioritize analytics improvements over dashboard features

**PostHog Features:**
- Correlation analysis
- Feature usage vs. retention
- User feedback integration

---

### 7. Improve Performance

**Method:** Performance Monitoring + Session Replay

**Example:**
- Notice: Dashboard page load time increased to 4 seconds
- Filter sessions with slow load times
- Watch session replays
- Discover: Users with 20+ chatbots load slowly
- Solution: Implement pagination, lazy loading

**PostHog Features:**
- Performance monitoring
- Session replay with performance metrics
- Custom performance events

---

## PostHog Implementation Plan

### Phase 1: Foundation (Week 1)

**Setup:**
1. Install PostHog SDK: `npm install posthog-js`
2. Initialize PostHog in app
3. Set up user identification
4. Configure privacy settings

**Events to Implement:**
- Authentication events
- Onboarding events
- Dashboard events
- Chatbot creation events

**Goal:** Track core user journey

---

### Phase 2: Feature Tracking (Week 2)

**Events to Implement:**
- Analytics events
- Settings events
- Search and filter events
- Error events

**Goal:** Understand feature adoption

---

### Phase 3: Advanced Analytics (Week 3)

**Setup:**
- Session recordings
- Heatmaps
- Feature flags
- User surveys

**Goal:** Deep insights and experimentation

---

### Phase 4: Optimization (Week 4+)

**Activities:**
- Create custom dashboards
- Set up automated alerts
- Build user cohorts
- Run A/B tests

**Goal:** Continuous improvement

---

## Privacy & Compliance

### Data Collection Principles

1. **Collect only what's needed:** Don't track sensitive data
2. **Anonymize PII:** Hash emails, remove names from events
3. **Respect opt-outs:** Honor Do Not Track, provide opt-out
4. **Be transparent:** Privacy policy explains tracking
5. **Secure data:** Encrypt in transit and at rest

### GDPR Compliance

- **Consent:** Ask for analytics consent on signup
- **Right to access:** Users can request their data
- **Right to deletion:** Users can request data deletion
- **Data minimization:** Only track necessary events
- **Data retention:** Auto-delete data after 2 years

### What NOT to Track

❌ Passwords or password hashes

❌ Credit card numbers

❌ Social security numbers

❌ Full message content (only metadata)

❌ IP addresses (unless necessary)

❌ Precise geolocation

---

## Success Criteria

### 3 Months After Launch

- **Activation:** 70% of signups create first chatbot
- **Engagement:** 40% DAU/WAU ratio
- **Retention:** 50% of users return after 30 days
- **Feature Adoption:** 60% of users view analytics
- **Error Rate:** < 1% of sessions have errors

### 6 Months After Launch

- **Activation:** 80% of signups create first chatbot
- **Engagement:** 50% DAU/WAU ratio
- **Retention:** 60% of users return after 30 days
- **Feature Adoption:** 75% of users view analytics
- **Upgrade Rate:** 15% of free users upgrade to paid

---

## Conclusion

Analytics is not just about tracking numbers—it's about understanding users, validating hypotheses, and continuously improving the product. PostHog provides the tools to:

1. **Measure what matters:** Focus on activation, engagement, retention
2. **Understand why:** Session recordings reveal user struggles
3. **Test ideas:** Feature flags enable safe experimentation
4. **Act on insights:** Data-driven decisions improve outcomes

By implementing this analytics strategy, ChatFlow can build a product that truly serves user needs and grows sustainably.
