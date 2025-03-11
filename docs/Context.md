# Cat Health Tracker SaaS - System Flow & Features

## Overview
The **Cat Health Tracker SaaS** is a modern web application designed to help cat owners manage their pets' health effectively. The platform offers an intuitive user interface, comprehensive health tracking, and timely notifications to ensure optimal pet care.

## Technology Stack
- **Front-end:** Next.js (TypeScript, Tailwind CSS)
- **Back-end:** Node.js
- **Database:** Supabase
- **Authentication:** Supabase
- **Hosting:** Vercel
- **Notifications:** Email
- **Payments:** Stripe for subscriptions
- **Ai Processing:** Claude
---

## User Flow

### 1. **User Onboarding**
- **Sign Up:** Google
- **Email Verification:** Required for new accounts.
- **Guided Setup:** Add your first cat profile with step-by-step instructions.

### 2. **Dashboard**
- **Overview:** View all registered cats and their health status.
- **Quick Stats:** Monitor key health metrics like weight trends and vaccination status.
- **Alerts:** Get reminders for upcoming vet appointments and other important events.

### 3. **Cat Profile Management**
- **Add/Edit/Delete:** Manage cat profiles with ease.
- **Profile Fields:**
  - Name
  - Age
  - Breed
  - Gender
  - Medical History
  - Vaccination Records
  - Weight Tracking
  - Dietary Preferences
  - Activity Levels

### 4. **Health Tracking & Monitoring**
- **Weight Tracking:** Log and visualize weight changes over time.
- **Vaccination & Deworming:** Record dates and set reminders.
- **Diet & Feeding Schedule:** Log food intake and schedule meal plans.
- **Symptoms & Illness Tracking:** Record symptoms, vet visits, and prescribed treatments.
- **Activity Levels:** Track daily movement and playtime.

### 5. **Notifications & Reminders**
- **Automated Reminders:** For vaccinations, vet check-ups, and medication.
- **Push/Email Notifications:** Stay informed about upcoming events.

### 6. **Reports & Analytics**
- **Health Trends:** View detailed reports on weight growth, meal logs, and more.
- **Exportable PDFs:** Generate reports for vet visits.

### 7. **Subscription & Payments**
- **Free Plan:** Limited features for basic tracking.
- **Premium Plan:** Monthly/yearly subscription for advanced tracking & unlimited profiles.
- **Payment Management:** Handled via **Stripe**.

### 8. **Community & Support**
- **Blog:** In-app articles on pet care tips.
- **Chat Support:** Access FAQs and chat with support.
- **User Forum:** Engage in discussions with other cat owners.

---

## Key Features
- **Comprehensive Health Tracking:** Monitor all aspects of your cat's health in one place.
- **Customizable Reminders:** Never miss an important event with personalized notifications.
- **Data Visualization:** Easily understand your cat's health trends with intuitive charts and graphs.
- **Community Engagement:** Connect with other cat owners and share experiences.

---

## Future Enhancements
- **Mobile App:** Extend functionality to iOS and Android devices.
- **AI Health Insights:** Provide predictive health analytics using AI.
- **Integration with Vet Clinics:** Directly share health records with your vet.

---

## Database Schema

### Tables

#### 1. users
- `id` (UUID, PK): User identifier
- `email` (VARCHAR): User's email address
- `created_at` (TIMESTAMP): Account creation date
- `updated_at` (TIMESTAMP): Last update timestamp
- `full_name` (VARCHAR): User's full name
- `avatar_url` (VARCHAR): Profile picture URL
- `subscription_tier` (VARCHAR): 'free' or 'premium'
- `subscription_status` (VARCHAR): 'active', 'canceled', 'past_due'
- `stripe_customer_id` (VARCHAR): Stripe customer identifier

#### 2. cats
- `id` (UUID, PK): Cat identifier
- `user_id` (UUID, FK): Reference to users.id
- `name` (VARCHAR): Cat's name
- `birth_date` (DATE): Cat's birth date
- `breed` (VARCHAR): Cat's breed
- `gender` (VARCHAR): 'male' or 'female'
- `color` (VARCHAR): Cat's color
- `microchip_id` (VARCHAR): Microchip identifier
- `created_at` (TIMESTAMP): Record creation date
- `updated_at` (TIMESTAMP): Last update timestamp
- `profile_image_url` (VARCHAR): Cat's profile picture URL
- `notes` (TEXT): General notes about the cat

#### 3. weight_records
- `id` (UUID, PK): Record identifier
- `cat_id` (UUID, FK): Reference to cats.id
- `weight` (DECIMAL): Weight in kilograms
- `recorded_at` (TIMESTAMP): When the weight was recorded
- `notes` (TEXT): Optional notes about the weight record

#### 4. vaccinations
- `id` (UUID, PK): Vaccination record identifier
- `cat_id` (UUID, FK): Reference to cats.id
- `vaccine_name` (VARCHAR): Name of the vaccine
- `administered_date` (DATE): When the vaccine was given
- `expiry_date` (DATE): When the vaccine expires/needs renewal
- `vet_name` (VARCHAR): Administering veterinarian
- `notes` (TEXT): Additional information
- `reminder_set` (BOOLEAN): Whether a reminder is set

#### 5. deworming_records
- `id` (UUID, PK): Record identifier
- `cat_id` (UUID, FK): Reference to cats.id
- `medication` (VARCHAR): Deworming medication used
- `administered_date` (DATE): When medication was given
- `next_due_date` (DATE): When next dose is due
- `notes` (TEXT): Additional information
- `reminder_set` (BOOLEAN): Whether a reminder is set

#### 6. meal_logs
- `id` (UUID, PK): Meal log identifier
- `cat_id` (UUID, FK): Reference to cats.id
- `food_type` (VARCHAR): Type of food given
- `amount` (DECIMAL): Amount of food in grams
- `feeding_time` (TIMESTAMP): When the meal was given
- `notes` (TEXT): Additional information

#### 7. medical_records
- `id` (UUID, PK): Medical record identifier
- `cat_id` (UUID, FK): Reference to cats.id
- `record_type` (VARCHAR): 'checkup', 'illness', 'surgery', etc.
- `date` (DATE): Date of the medical event
- `vet_name` (VARCHAR): Attending veterinarian
- `diagnosis` (TEXT): Diagnosis information
- `treatment` (TEXT): Treatment details
- `cost` (DECIMAL): Cost of treatment
- `follow_up_date` (DATE): Date for follow-up
- `notes` (TEXT): Additional information
- `documents_url` (VARCHAR): URL to uploaded documents

#### 8. medications
- `id` (UUID, PK): Medication record identifier
- `cat_id` (UUID, FK): Reference to cats.id
- `name` (VARCHAR): Medication name
- `dosage` (VARCHAR): Dosage information
- `frequency` (VARCHAR): How often to administer
- `start_date` (DATE): When to start medication
- `end_date` (DATE): When to end medication
- `notes` (TEXT): Additional information
- `reminder_set` (BOOLEAN): Whether a reminder is set

#### 9. reminders
- `id` (UUID, PK): Reminder identifier
- `user_id` (UUID, FK): Reference to users.id
- `cat_id` (UUID, FK): Reference to cats.id
- `type` (VARCHAR): 'vaccination', 'medication', 'vet_visit', etc.
- `title` (VARCHAR): Reminder title
- `description` (TEXT): Detailed description
- `due_date` (DATE): When the reminder is due
- `status` (VARCHAR): 'pending', 'completed', 'dismissed'
- `created_at` (TIMESTAMP): When the reminder was created

#### 10. blog_posts
- `id` (UUID, PK): Post identifier
- `title` (VARCHAR): Post title
- `content` (TEXT): Post content
- `author_id` (UUID, FK): Reference to users.id for admin users
- `published_at` (TIMESTAMP): Publication date
- `updated_at` (TIMESTAMP): Last update timestamp
- `featured_image_url` (VARCHAR): Featured image URL
- `slug` (VARCHAR): URL-friendly identifier
- `is_published` (BOOLEAN): Whether the post is published

#### 11. forum_topics
- `id` (UUID, PK): Topic identifier
- `title` (VARCHAR): Topic title
- `user_id` (UUID, FK): Reference to users.id
- `created_at` (TIMESTAMP): Creation timestamp
- `updated_at` (TIMESTAMP): Last update timestamp
- `is_pinned` (BOOLEAN): Whether the topic is pinned
- `is_locked` (BOOLEAN): Whether the topic is locked

#### 12. forum_posts
- `id` (UUID, PK): Post identifier
- `topic_id` (UUID, FK): Reference to forum_topics.id
- `user_id` (UUID, FK): Reference to users.id
- `content` (TEXT): Post content
- `created_at` (TIMESTAMP): Creation timestamp
- `updated_at` (TIMESTAMP): Last update timestamp

## Project Folder Structure

cat-pur/
│
├── .github/                    # GitHub Actions workflows
│
├── public/                     # Static assets
│   ├── images/~
│   ├── icons/
│   └── favicon.ico
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   ├── auth/               # Authentication pages
│   │   ├── dashboard/          # Dashboard pages
│   │   ├── cats/               # Cat profile pages
│   │   ├── health-tracking/    # Health tracking pages
│   │   ├── reports/            # Reports pages
│   │   ├── settings/           # User settings
│   │   ├── subscription/       # Subscription management
│   │   ├── community/          # Community features
│   │   │   ├── blog/
│   │   │   └── forum/
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   │
│   ├── components/             # Reusable components
│   │   ├── ui/                 # UI components
│   │   ├── forms/              # Form components
│   │   ├── charts/             # Chart components
│   │   ├── layout/             # Layout components
│   │   └── modals/             # Modal components
│   │
│   ├── lib/                    # Utility functions
│   │   ├── supabase/           # Supabase client
│   │   ├── stripe/             # Stripe integration
│   │   ├── claude/             # Claude AI integration
│   │   ├── validators/         # Form validators
│   │   └── utils/              # Helper functions
│   │
│   ├── hooks/                  # Custom React hooks
│   │
│   ├── types/                  # TypeScript type definitions
│   │
│   ├── styles/                 # Global styles
│   │
│   └── context/                # React context providers
│
├── docs/                       # Documentation
│   ├── Context.md              # System flow & features
│   └── API.md                  # API documentation
│
├── scripts/                    # Utility scripts
│
├── .env.example                # Example environment variables
├── .eslintrc.js                # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── README.md                   # Project overview