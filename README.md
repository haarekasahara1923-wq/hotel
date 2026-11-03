# Royal Blue Heaven — Luxury Hotel Web Application

> **Property:** Royal Blue Heaven | 20 Luxury Chambers & Suites | DD Nagar, Gwalior, Madhya Pradesh, India  
> **Brand Palette:** Royal Blue (`#1A3FA3`), Deep Navy (`#0B1B3A`), Antique Gold (`#C9A24B`), Champagne (`#F4E9CD`), Ivory (`#FBF8F1`)

---

## 🏛️ Project Overview

Royal Blue Heaven is a full-featured, luxury web application and CMS management system built for a single boutique hotel with 20 rooms in Gwalior. The web application features:

1. **Guest Public Experience:**
   - **Home Page:** Cinematic hero banner, glassmorphism booking search bar, heritage story, chamber showcase, gastronomy & spa highlights, Gwalior landmarks, verified guest testimonials, and direct booking guarantee.
   - **Rooms & Suites:** Complete listing with filters (view, guest capacity) and dynamic pricing.
   - **Chamber Detail (`/rooms/[slug]`):** High-resolution image gallery, specifications, amenities, stay policies, and sticky reservation card.
   - **3-Step Booking Engine:**
     - Step 1 (`/book`): Real-time availability engine & tariff calculation.
     - Step 2 (`/book/[roomTypeSlug]`): Guest details, curated add-ons (buffet breakfast, airport chauffeur transfer, spa ritual, floral decor), coupon validation (`ROYAL20`, `WELCOME10`, `FLAT2000`), GST auto-calculation, and payment preference (Full online via Razorpay, 30% advance deposit, or Pay at Hotel).
     - Step 3 (`/book/confirmation`): Instant reference voucher with WhatsApp concierge dispatch & printable confirmation.
   - **Guest Self-Service Lookup (`/lookup`):** Review or manage reservations using only Booking ID + Phone (no account creation required).
   - **Dining (`/dining`):** Maharaja Fine Dining Awadhi & Rajput royal menu with interactive table reservation form.
   - **Events & Banquets (`/events`):** Palace wedding packages (up to 300 guests), corporate retreats, and event proposal planner.
   - **Spa & Wellness (`/spa`):** Ayurvedic Abhyanga, Shirodhara, 24k Gold Leaf facial with instant appointment scheduling.
   - **Experiences (`/experiences`):** Curated guide to Gwalior Fort, Jai Vilas Palace, Sas-Bahu Temples, and Tansen Tomb.
   - **Facilities (`/facilities`):** Heated pool, 24/7 fitness center, business center, and valet parking.
   - **Offers (`/offers`):** Honeymoon escapes, heritage weekend deals, and advance purchase discounts.
   - **Gallery (`/gallery`):** Category-filtered lightbox gallery.
   - **Testimonials (`/testimonials`):** Star rating breakdown with verified guest feedback & review submission form.
   - **Contact Us (`/contact`):** Full contact coordinates, Google Maps embed, WhatsApp click-to-chat, and enquiry form.
   - **Policies:** Cancellation & Refund Policy, Privacy Policy, Terms & Conditions.

2. **Super Admin Management Suite (`/admin`):**
   - **Overview Dashboard:** Live occupancy rate (e.g. 16/20 rooms = 80%), monthly revenue, today's check-ins/outs, Average Daily Rate (ADR), and RevPAR.
   - **20-Room Inventory Matrix:** Live visual matrix of all 20 rooms (Deluxe 101-108, Premier Suites 201-205, Royal Suites 301-303, Presidential Suites 401-402, Heritage Villas V1-V2) with one-click status toggling (Available, Occupied, Maintenance).
   - **Bookings Management:** Live guest folios with status tracking (Confirmed, Checked-In, Checked-Out, Cancelled).
   - **Enquiry & Leads Pipeline:** Wedding, dining, and corporate leads with direct WhatsApp reply integration.
   - **Site Branding & CMS:** Live editor for Hotel title, tagline, reception phone, WhatsApp number, and top announcement banner.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, TypeScript)
- **Styling:** Tailwind CSS with Royal Blue & Gold theme tokens
- **Database & ORM:** PostgreSQL (Neon-ready) with Prisma ORM
- **Authentication:** NextAuth v5 with Credentials & Email OTP
- **Payments:** Razorpay API integration
- **Media:** Cloudinary SDK
- **Email:** Resend API with royal email templates
- **Form & Validation:** React Hook Form, Zod

---

## 🚀 Getting Started

### 1. Environment Configuration

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set your credentials in `.env`:
- `DATABASE_URL`: PostgreSQL connection string (e.g. Neon DB or local Postgres)
- `NEXTAUTH_SECRET`: Secret key for session tokens
- `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`: Razorpay gateway keys
- `RESEND_API_KEY`: For sending confirmation emails
- `CLOUDINARY_*`: For media storage

### 2. Database Migration & Seed

Run Prisma migration and populate the default 20 rooms, 5 suite tiers, rate rules, add-ons, and sample reviews:
```bash
npx prisma db push
npx prisma db seed
```

Default Super Admin login:
- **Email:** `admin@royalblueheaven.com`
- **Password:** `Admin@RBH2024!`

### 3. Launch Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
Admin portal is available at [http://localhost:3000/admin](http://localhost:3000/admin).

### 4. Production Build

```bash
npm run build
npm start
```
