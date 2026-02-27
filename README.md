# Conninter – Healthcare Coordination Platform

A unified digital ecosystem connecting **hospitals**, **distributors**, and **medical representatives** through a centralised **VMS** (Visitor Management) and **DMS** (Delivery Management) platform.

---

## 🏗 Architecture

```
CONNITER HC/
├── apps/
│   ├── web/      → Next.js 14 (App Router) — port 3000
│   └── api/      → NestJS 10 — port 4000
├── packages/
│   └── shared/   → Shared TypeScript types
└── turbo.json    → Turborepo monorepo
```

## 🔑 Key Features

| Feature | Description |
|---|---|
| **VMS** | Digital slot booking for doctor visits — eliminates unannounced visits |
| **DMS** | Advance delivery scheduling — prevents gate congestion |
| **Phone OTP Auth** | Firebase Phone Auth — zero friction, no passwords |
| **Hospital Search** | Find hospitals by city/speciality (unauthenticated) |
| **Dashboard** | Calendar view + My Visits + My Deliveries + Notifications |
| **Blog** | SEO-optimised blog for industry insights & case studies |
| **Swagger API** | Auto-generated API docs at `/api/docs` |

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, CSS Modules, Firebase Auth
- **Backend**: NestJS 10, TypeORM, PostgreSQL, Firebase Admin SDK, Swagger
- **Auth**: Firebase Phone OTP + JWT
- **Monorepo**: Turborepo

---

## ⚙️ Setup

### 1. Prerequisites
- Node.js 18+
- PostgreSQL 15+
- A Firebase project with **Phone Authentication** enabled

### 2. Clone & Install

```bash
# Install all workspace deps
npm install
```

### 3. Configure Environment Variables

```bash
# Web app
cp apps/web/.env.local.example apps/web/.env.local
# Fill in NEXT_PUBLIC_FIREBASE_* values from Firebase Console

# API
cp apps/api/.env.example apps/api/.env
# Fill in DATABASE_URL, JWT_SECRET, FIREBASE_* values
```

### 4. PostgreSQL Setup

Create the database:
```sql
CREATE DATABASE conninter;
```
TypeORM will auto-sync the schema in development mode.

### 5. Run in Development

```bash
# Run both apps in parallel
npm run dev

# Or individually:
cd apps/web && npm run dev   # http://localhost:3000
cd apps/api && npm run dev   # http://localhost:4000
```

### 6. Swagger API Docs

```
http://localhost:4000/api/docs
```

---

## 📁 Key Pages

| Route | Description |
|---|---|
| `/` | Landing page (Hero + Segments + HowItWorks + Partner Ribbon) |
| `/hospitals` | Hospital directory with city search |
| `/hospitals/[id]` | Hospital detail + VMS/DMS slot picker |
| `/auth` | Phone + OTP login |
| `/dashboard` | Calendar view (protected) |
| `/dashboard/visits` | My VMS visits |
| `/dashboard/deliveries` | My DMS deliveries |
| `/dashboard/notifications` | Real-time notifications |
| `/dashboard/settings` | Profile settings |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post detail |

## 📡 API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/verify` | – | Exchange Firebase token for JWT |
| GET | `/hospitals` | – | List hospitals (city filter) |
| GET | `/hospitals/:id` | – | Hospital profile |
| GET | `/hospitals/:id/slots` | – | Available slots (date/type filter) |
| GET | `/users/me` | JWT | Get my profile |
| PATCH | `/users/me` | JWT | Update profile |
| POST | `/appointments` | JWT | Book a slot |
| GET | `/appointments/my` | JWT | My appointments |
| DELETE | `/appointments/:id` | JWT | Cancel appointment |
| GET | `/blog` | – | Blog posts |
| GET | `/blog/:slug` | – | Blog post detail |
| POST | `/leads` | – | Submit lead/enquiry |
