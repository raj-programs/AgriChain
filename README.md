# 🌿 AgriChain — India's Farmer-First Agricultural Marketplace

> **Direct Farm to Fork, Zero Middlemen.** AgriChain connects Indian farmers directly with buyers — ensuring fair prices, real-time tracking, and transparent transactions across the agricultural supply chain.

**Authors:** Rajgaurav Patil, Satyajeet Ravan, Shravan Patil, Parth Madrewar

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [API Reference](#api-reference)
- [Database Schema (Supabase)](#database-schema-supabase)
- [Authentication Flow](#authentication-flow)
- [User Roles & Permissions](#user-roles--permissions)
- [Frontend Routes](#frontend-routes)
- [Component Library](#component-library)
- [Design System](#design-system)
- [Demo Accounts](#demo-accounts)
- [Future Roadmap](#future-roadmap)

---

## Overview

AgriChain is a full-stack web platform designed to eliminate agricultural middlemen in India. The platform provides:

- **Farmers** — A dashboard to list crops, track orders, view earnings & analytics, and manage their profile
- **Buyers** — A marketplace to browse crops, add to cart, place orders, and track deliveries
- **Admins** — A management panel to verify users, approve crop listings, review fraud reports, and monitor platform analytics

The backend uses an **Express.js REST API** with in-memory mock data for rapid prototyping, while the frontend uses **Supabase** for real authentication (sign-up, login, session management) through Supabase Auth + a `profiles` table for role-based access.

---

## Features

### 🌾 Public Pages
- **Home** — Hero section with live market prices, problem/solution showcase, featured crops, testimonials, and platform stats
- **Marketplace** — Full-featured crop browsing with search, category filtering, price range filters, organic/available toggles, and sorting (price, rating, newest)
- **Crop Detail** — Individual crop page with image, pricing, farmer info, variety, and harvest date
- **How It Works** — Step-by-step guide for farmers (5 steps) and buyers (5 steps) with FAQ section
- **About** — Mission, vision, values, impact stats, and team members
- **Contact** — Contact form with business info and form submission

### 👨‍🌾 Farmer Dashboard
- **Dashboard** — Stats cards (earnings, active orders, listed crops, rating), monthly revenue bar chart, recent orders table, top performing crops, quick actions
- **Add Crop** — 3-level hierarchical crop selector (Category → Sub-Category → Variety, with 60+ varieties), pricing, quantity, organic/available toggles, photo upload area
- **My Listings** — View and manage all listed crops
- **Orders** — Track incoming buyer orders with status filtering
- **Earnings** — Transaction history, total/net earnings, monthly revenue chart
- **Analytics** — Weekly engagement, conversion rate, top crops performance
- **Settings** — Profile editing, password change, bank account details

### 🏪 Buyer Dashboard
- **Dashboard** — Stats (total orders, spending, in-transit), recent orders, recommended crops, quick actions
- **Cart** — Full shopping cart with quantity controls, order summary with subtotal/shipping/platform fee, payment method selection, checkout flow
- **Orders** — Track purchase orders with status badges and tracking IDs
- **Settings** — Profile management and security settings

### 🛡️ Admin Dashboard
- **Dashboard** — Platform-wide stats (users, crops, orders, revenue), pending approval alerts, revenue chart, recent users, admin quick actions
- **Users Management** — View/search all users, verify/block accounts, filter by role
- **Crops** — Approve/reject crop listings
- **Orders** — View all platform orders (farmer→buyer view)
- **Reports** — Fraud/quality/delivery report management with severity levels and status workflow
- **Settings** — Platform configuration (fees, KYC, payment gateway, maintenance mode)

### 🔐 Authentication
- **Login** — Email/password with Supabase Auth, automatic role-based redirect
- **Register** — 2-step wizard (Role & Basic Info → Address Details), role selection (Farmer/Buyer)
- **Session Persistence** — Auto-session recovery on page reload via Supabase `getSession()`
- **Protected Routes** — Role-based access control with automatic redirect for unauthorized access
- **Guest Routes** — Login/Register pages redirect authenticated users to their dashboard

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.0 | UI framework |
| React Router DOM | 7.13.1 | Client-side routing |
| Vite | 7.3.x | Build tool & dev server |
| Axios | 1.15.0 | HTTP client for API calls |
| Supabase JS | 2.103.0 | Authentication (Auth) + Database (profiles) |
| React Icons | 5.6.0 | Icon library |
| FontAwesome | 7.2.0 | Additional icons |
| Headless UI | 2.2.10 | Accessible UI primitives |
| React Phone Input | 3.4.16 | Phone number input (legacy pages) |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Express.js | 4.22.1 | REST API framework |
| bcryptjs | 3.0.3 | Password hashing |
| jsonwebtoken | 9.0.3 | JWT token generation & verification |
| cors | 2.8.6 | Cross-origin resource sharing |
| dotenv | 17.4.1 | Environment variable loading |
| Supabase JS | 2.103.0 | Database client (server-side) |
| Axios | 1.14.0 | HTTP client |

### Database
| Service | Purpose |
|---|---|
| Supabase (PostgreSQL) | User authentication + profiles table |
| In-memory mock data | Crops, orders, cart, analytics, reports, settings (backend) |

---

## Project Structure

```
AgriChain/
├── frontend/                          # React + Vite SPA
│   ├── .env                           # Supabase + API env vars (VITE_ prefixed)
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx                   # Entry point (BrowserRouter + AuthProvider)
│       ├── App.jsx                    # Route definitions + ProtectedRoute/GuestRoute
│       ├── App.css                    # App-level styles
│       ├── theme.css                  # Global design system (colors, fonts, buttons, badges, forms)
│       │
│       ├── api/                       # Axios API modules
│       │   ├── client.js              # Axios instance with base URL, auth interceptor, 401 handler
│       │   ├── auth.js                # login, register, getProfile, updateProfile, changePassword
│       │   ├── crops.js               # getAll, getById, getCategories, getVarieties, getFarmers, create, update, remove
│       │   ├── orders.js              # getFarmerOrders, getBuyerOrders, getAllOrders, placeOrder, updateStatus
│       │   ├── cart.js                # get, addItem, updateItem, removeItem, clear
│       │   ├── analytics.js           # getFarmerAnalytics, getEarnings, getAdminAnalytics
│       │   ├── users.js               # getAll, getById, updateStatus
│       │   ├── reports.js             # getAll, create, updateStatus
│       │   ├── stats.js               # getPlatformStats, getTeam, getAdminStats
│       │   └── settings.js            # get, update
│       │
│       ├── supabase/
│       │   └── supabaseClient.js      # Supabase client init (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
│       │
│       ├── utils/
│       │   ├── AuthContext.jsx         # React Context for auth (login, logout, register, user state)
│       │   └── mockData.js            # Frontend mock data (crops, farmers, orders, stats, etc.)
│       │
│       ├── layouts/
│       │   ├── PublicLayout.jsx        # Navbar + Footer wrapper for public pages
│       │   ├── DashboardLayout.jsx     # Navbar + Sidebar wrapper for authenticated pages
│       │   └── DashboardLayout.css
│       │
│       ├── components/
│       │   ├── Navbar/                 # Main navigation bar (public links, auth actions, user dropdown, mobile menu)
│       │   │   ├── Navbar.jsx
│       │   │   └── Navbar.css
│       │   ├── Sidebar/               # Dashboard sidebar (role-based navigation links)
│       │   │   ├── Sidebar.jsx
│       │   │   └── Sidebar.css
│       │   ├── Footer/                # Site footer (brand, links, contact info)
│       │   │   ├── Footer.jsx
│       │   │   └── Footer.css
│       │   ├── CropCard/              # Reusable crop listing card (image, badges, rating, price, add to cart)
│       │   │   ├── CropCard.jsx
│       │   │   └── CropCard.css
│       │   ├── StatsCard/             # Dashboard stats card (icon, label, value, change indicator)
│       │   │   ├── StatsCard.jsx
│       │   │   └── StatsCard.css
│       │   └── Notification/          # Notification component
│       │       └── Notification.jsx
│       │
│       └── pages/
│           ├── public/                # Public (unauthenticated) pages
│           │   ├── Home.jsx + .css
│           │   ├── Marketplace.jsx + .css
│           │   ├── CropDetail.jsx
│           │   ├── HowItWorks.jsx + .css
│           │   ├── About.jsx + .css
│           │   └── Contact.jsx + .css
│           │
│           ├── auth/                  # Authentication pages
│           │   ├── Login.jsx
│           │   ├── Register.jsx
│           │   └── Auth.css
│           │
│           ├── farmer/                # Farmer role pages
│           │   ├── FarmerDashboard.jsx + .css
│           │   ├── AddCrop.jsx + .css
│           │   ├── MyListings.jsx
│           │   ├── FarmerOrders.jsx
│           │   ├── Earnings.jsx
│           │   ├── FarmerAnalytics.jsx
│           │   └── FarmerSettings.jsx
│           │
│           ├── buyer/                 # Buyer role pages
│           │   ├── BuyerDashboard.jsx
│           │   ├── Cart.jsx
│           │   ├── BuyerOrders.jsx
│           │   └── BuyerSettings.jsx
│           │
│           └── admin/                 # Admin role pages
│               ├── AdminDashboard.jsx
│               ├── UsersManagement.jsx
│               ├── AdminCrops.jsx
│               ├── AdminOrders.jsx
│               ├── Reports.jsx
│               └── AdminSettings.jsx
│
└── backend/                           # Express.js REST API
    ├── .env                           # Supabase credentials, JWT secret
    ├── .gitignore
    ├── package.json
    ├── server.js                      # Express app setup, CORS, route mounting, error handling
    │
    ├── config/
    │   ├── db.js                      # Database config placeholder (PostgreSQL)
    │   └── supabase.js                # Supabase server-side client init
    │
    ├── middleware/
    │   └── auth.js                    # JWT generateToken, verifyToken, requireRole middleware
    │
    └── services/                      # Microservice-style route modules
        ├── auth/
        │   ├── routes.js              # POST /login, POST /register, GET /me, PUT /profile, PUT /password
        │   └── data.js               # In-memory users array (6 seeded users)
        │
        ├── crops/
        │   ├── routes.js              # GET /, GET /categories, GET /farmers, GET /varieties, GET /:id, POST /, PUT /:id, DELETE /:id
        │   └── data.js               # 12 seeded crops, 6 categories, 4 farmers, 60 crop varieties
        │
        ├── orders/
        │   ├── routes.js              # GET /farmer, GET /buyer, GET /all, POST /, PUT /:id/status
        │   └── data.js               # Farmer orders + buyer orders arrays
        │
        ├── cart/
        │   ├── routes.js              # GET /, POST /, PUT /:id, DELETE /:id, DELETE /
        │   └── data.js               # Per-user cart storage
        │
        ├── analytics/
        │   ├── routes.js              # GET /farmer, GET /earnings, GET /admin
        │   └── data.js               # Monthly revenue, top crops, farmer stats, transactions
        │
        ├── users/
        │   └── routes.js              # GET /, GET /:id, PUT /:id/status (admin only)
        │
        ├── reports/
        │   ├── routes.js              # GET /, POST /, PUT /:id/status
        │   └── data.js               # 3 seeded fraud/quality reports
        │
        ├── stats/
        │   ├── routes.js              # GET /platform, GET /team, GET /admin
        │   └── data.js               # Platform stats, team members, admin stats
        │
        └── settings/
            └── routes.js              # GET /, PUT / (admin only, platform config)
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- A **Supabase** project (for authentication)

### Installation

```bash
# Clone the repository
git clone https://github.com/satyajeet-ravan/AgriChain.git
cd AgriChain

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

**Terminal 1 — Backend API (port 3000):**
```bash
cd backend
npm run start
# or: node server.js
```

**Terminal 2 — Frontend Dev Server (port 5173):**
```bash
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

### Production Build

```bash
cd frontend
npm run build     # Outputs to frontend/dist/
npm run preview   # Preview production build locally
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `SUPABASE_URL` | Supabase project URL | `https://xxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase anon/public key | `eyJhbGci...` |
| `JWT_SECRET` | Secret for signing JWT tokens | `agrichain-secret-key-2025` |
| `PORT` | Backend server port | `3000` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://xxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key | `eyJhbGci...` |
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000/api` |

> **Note:** Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client.

---

## Frontend Architecture

### Entry Point

`main.jsx` wraps the app in `BrowserRouter` → `AuthProvider` → `App`, ensuring routing and auth context are available everywhere.

### Routing System (`App.jsx`)

The app uses three route wrapper components:

| Component | Purpose |
|---|---|
| `<ProtectedRoute allowedRole="farmer">` | Requires login + correct role. Redirects to `/login` if unauthenticated, or to the user's own dashboard if wrong role. |
| `<GuestRoute>` | Only allows unauthenticated users. Redirects logged-in users to their dashboard. |
| Plain `<Route>` | Public routes accessible to everyone. |

### Layout System

| Layout | Used By | Contains |
|---|---|---|
| `PublicLayout` | Home, Marketplace, CropDetail, HowItWorks, About, Contact | Navbar + Content + Footer |
| `DashboardLayout` | All farmer/buyer/admin pages | Navbar + Sidebar + Topbar + Content |

### Auth Context (`AuthContext.jsx`)

Provides `user`, `login()`, `logout()`, `register()`, `isAuthenticated`, and `loading` state. Uses Supabase Auth for:
- `signInWithPassword()` for login
- `signUp()` for registration  
- `getSession()` for session recovery on reload
- `onAuthStateChange()` for real-time auth state sync
- `profiles` table lookup for role detection

### API Layer (`api/`)

All API calls go through a shared Axios client (`client.js`) that:
- Sets base URL from `VITE_API_URL`
- Attaches JWT `Bearer` token from `localStorage` to every request
- Handles 401 responses globally by clearing tokens and redirecting to `/login`

---

## Backend Architecture

### Server Setup (`server.js`)

Express.js app with:
- CORS configured for the frontend URL
- JSON body parsing
- 9 microservice route modules mounted under `/api/`
- Global 404 and 500 error handlers
- Uncaught exception/rejection logging

### Authentication Middleware (`middleware/auth.js`)

| Function | Purpose |
|---|---|
| `generateToken(user)` | Creates a JWT with `{ id, email, role }`, valid for 7 days |
| `verifyToken` | Express middleware that validates the `Authorization: Bearer <token>` header |
| `requireRole(...roles)` | Express middleware that checks `req.user.role` against allowed roles |

### Microservice Architecture

Each service in `services/` follows the pattern:
- **`routes.js`** — Express Router with endpoint handlers
- **`data.js`** — In-memory seed data arrays (acts as a mock database)

---

## API Reference

### Auth Service — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/login` | No | Login with email + password. Returns JWT token + user object. |
| `POST` | `/register` | No | Register new user. Creates hashed password. Returns JWT + user. |
| `GET` | `/me` | Yes | Get current user profile. |
| `PUT` | `/profile` | Yes | Update profile (name, phone, location, bio, avatar). |
| `PUT` | `/password` | Yes | Change password (requires current + new password). |

### Crops Service — `/api/crops`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | No | List all crops. Supports query params: `search`, `category`, `organic`, `available`, `minPrice`, `maxPrice`, `sortBy`, `farmerId`. |
| `GET` | `/categories` | No | Get crop categories (All, Fruits, Vegetables, Grains, Spices, Processed). |
| `GET` | `/farmers` | No | Get verified farmer profiles. |
| `GET` | `/varieties` | No | Get full crop variety tree grouped by Category → Sub-Category → Variety. |
| `GET` | `/:id` | No | Get single crop by ID. |
| `POST` | `/` | Farmer | Create new crop listing (variety_id, quantity, price, etc.). |
| `PUT` | `/:id` | Farmer/Admin | Update crop fields. Admin can also set `approvalStatus`. |
| `DELETE` | `/:id` | Farmer/Admin | Delete a crop listing. |

### Orders Service — `/api/orders`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/farmer` | Farmer | Get farmer's received orders. Supports `status` filter. |
| `GET` | `/buyer` | Buyer | Get buyer's purchase orders. Supports `status` filter. |
| `GET` | `/all` | Admin | Get all platform orders (both farmer and buyer views). |
| `POST` | `/` | Buyer | Place new order. Creates entries in both buyer and farmer order lists. |
| `PUT` | `/:id/status` | Yes | Update order status (Pending → Processing → Shipped → Delivered). |

### Cart Service — `/api/cart`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | Buyer | Get current user's cart with enriched crop data. |
| `POST` | `/` | Buyer | Add item to cart (cropId, quantity). Stacks if same crop exists. |
| `PUT` | `/:id` | Buyer | Update cart item quantity (minimum 1). |
| `DELETE` | `/:id` | Buyer | Remove a single item from cart. |
| `DELETE` | `/` | Buyer | Clear entire cart. |

### Analytics Service — `/api/analytics`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/farmer` | Yes | Farmer dashboard analytics: stats, monthly revenue, top crops, engagement. |
| `GET` | `/earnings` | Yes | Farmer earnings: transactions, totals, net earnings. |
| `GET` | `/admin` | Yes | Admin analytics: monthly revenue, top crops. |

### Users Service — `/api/users`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | Admin | Get all users (passwords excluded). Supports `role` and `search` filters. |
| `GET` | `/:id` | Admin | Get user by ID. |
| `PUT` | `/:id/status` | Admin | Verify or block a user. |

### Reports Service — `/api/reports`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | Yes | Admin: all reports. Others: own reports only. |
| `POST` | `/` | Yes | File a report (fraud, quality, payment, delivery). Severity: low/medium/high/critical. |
| `PUT` | `/:id/status` | Admin | Update report status (pending → investigating → resolved/dismissed) + admin notes. |

### Stats Service — `/api/stats`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/platform` | No | Public platform statistics (active farmers, buyers, crops, states). |
| `GET` | `/team` | No | Team member profiles for the About page. |
| `GET` | `/admin` | Yes | Admin dashboard aggregated stats. |

### Settings Service — `/api/settings`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | Admin | Get platform settings (fees, limits, toggles). |
| `PUT` | `/` | Admin | Update platform settings. |

---

## Database Schema (Supabase)

### `auth.users` (Supabase Auth — managed)

Supabase handles this table automatically for authentication.

### `profiles` (Custom table)

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK, FK → auth.users) | Links to Supabase auth user |
| `role` | TEXT | `farmer`, `buyer`, or `admin` |
| `full_name` | TEXT | User's display name |
| `email` | TEXT | User's email |
| `phone_no` | TEXT | Phone number |
| `address` | TEXT | Full address string |
| `dob` | DATE | Date of birth |

### Backend Mock Data (In-Memory)

The backend uses in-memory arrays as mock databases. These reset on server restart:

| Data Store | Seeded Records | Key Fields |
|---|---|---|
| `users` | 6 users (2 farmers, 2 buyers, 1 admin, 1 unverified farmer) | id, name, email, password (hashed), role, avatar, location, verified |
| `crops` | 12 listings | id, name, category, variety_id, price, unit, quantity, farmerId, farmer, location, rating, organic, approvalStatus |
| `cropVarieties` | 60 varieties | id, category, subCategory, variety (organized as Grains/Fruits/Vegetables/Spices/Processed) |
| `farmerOrders` | 4 orders | id, buyer, crop, quantity, amount, status |
| `buyerOrders` | 3 orders | id, farmer, crop, quantity, amount, status, tracking |
| `carts` | Empty object | Per-user cart arrays |
| `fraudReports` | 3 reports | id, type, severity, status, admin_notes |
| `analyticsData` | 12 months | monthlyRevenue, topCrops, weeklyEngagement |
| `transactions` | 5 transactions | id, userId, description, amount, type (credit/debit) |
| `platformSettings` | 1 config object | platformFee, listingFee, minOrderValue, requireKYC, etc. |

---

## Authentication Flow

```
┌──────────────┐       ┌────────────┐       ┌──────────────┐
│  Login Page  │──────▶│  Supabase  │──────▶│   profiles   │
│  (email/pw)  │       │  Auth API  │       │  table (role) │
└──────────────┘       └────────────┘       └──────────────┘
       │                      │                      │
       │              session + JWT            role lookup
       │                      │                      │
       ▼                      ▼                      ▼
┌──────────────────────────────────────────────────────┐
│              AuthContext (React Context)              │
│  user = { ...supabase_user, ...profile (role, etc) } │
└──────────────────────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────┐
│  Role-Based Redirect:                      │
│  farmer → /farmer/dashboard               │
│  buyer  → /buyer/dashboard                │
│  admin  → /admin/dashboard                │
└────────────────────────────────────────────┘
```

---

## User Roles & Permissions

| Feature | Public | Farmer | Buyer | Admin |
|---|:---:|:---:|:---:|:---:|
| View Home/About/Contact | ✅ | ✅ | ✅ | ✅ |
| Browse Marketplace | ✅ | ✅ | ✅ | ✅ |
| View Crop Details | ✅ | ✅ | ✅ | ✅ |
| Add Crop Listing | ❌ | ✅ | ❌ | ❌ |
| Manage Own Listings | ❌ | ✅ | ❌ | ❌ |
| View Farmer Orders | ❌ | ✅ | ❌ | ❌ |
| View Earnings/Analytics | ❌ | ✅ | ❌ | ❌ |
| Add to Cart | ❌ | ❌ | ✅ | ❌ |
| Place Orders | ❌ | ❌ | ✅ | ❌ |
| Track Buyer Orders | ❌ | ❌ | ✅ | ❌ |
| Verify/Block Users | ❌ | ❌ | ❌ | ✅ |
| Approve Crop Listings | ❌ | ❌ | ❌ | ✅ |
| View All Orders | ❌ | ❌ | ❌ | ✅ |
| Manage Reports | ❌ | ❌ | ❌ | ✅ |
| Platform Settings | ❌ | ❌ | ❌ | ✅ |

---

## Frontend Routes

### Public Routes (No auth required)

| Path | Page | Description |
|---|---|---|
| `/` | Home | Landing page with hero, stats, featured crops |
| `/marketplace` | Marketplace | Browse all crops with filters and sorting |
| `/marketplace/:id` | CropDetail | Individual crop detail page |
| `/how-it-works` | HowItWorks | Platform guide + FAQ |
| `/about` | About | Team, mission, values |
| `/contact` | Contact | Contact form |

### Auth Routes (Guest only — redirects if already logged in)

| Path | Page | Description |
|---|---|---|
| `/login` | Login | Email/password sign-in |
| `/register` | Register | 2-step registration wizard |

### Farmer Routes (Requires `farmer` role)

| Path | Page | Description |
|---|---|---|
| `/farmer/dashboard` | FarmerDashboard | Overview with stats, revenue chart, orders |
| `/farmer/crops` | MyListings | Manage crop listings |
| `/farmer/add-crop` | AddCrop | Create new crop listing |
| `/farmer/orders` | FarmerOrders | View and manage incoming orders |
| `/farmer/earnings` | Earnings | Transaction history and payouts |
| `/farmer/analytics` | FarmerAnalytics | Sales analytics and engagement |
| `/farmer/settings` | FarmerSettings | Profile, password, bank details |

### Buyer Routes (Requires `buyer` role)

| Path | Page | Description |
|---|---|---|
| `/buyer/dashboard` | BuyerDashboard | Overview with orders, recommendations |
| `/buyer/cart` | Cart | Shopping cart + checkout |
| `/buyer/orders` | BuyerOrders | Track purchase orders |
| `/buyer/settings` | BuyerSettings | Profile and account settings |

### Admin Routes (Requires `admin` role)

| Path | Page | Description |
|---|---|---|
| `/admin/dashboard` | AdminDashboard | Platform-wide stats and management |
| `/admin/users` | UsersManagement | Verify/block users |
| `/admin/crops` | AdminCrops | Approve/reject crop listings |
| `/admin/orders` | AdminOrders | View all platform orders |
| `/admin/reports` | Reports | Fraud/quality report management |
| `/admin/settings` | AdminSettings | Platform configuration |

### Catch-All

| Path | Page | Description |
|---|---|---|
| `*` | 404 Page | Inline 404 with link back to Home |

---

## Component Library

| Component | Location | Props | Used In |
|---|---|---|---|
| `Navbar` | `components/Navbar/` | None (uses `useAuth` internally) | PublicLayout, DashboardLayout |
| `Sidebar` | `components/Sidebar/` | `mobileOpen` | DashboardLayout |
| `Footer` | `components/Footer/` | None | PublicLayout |
| `CropCard` | `components/CropCard/` | `crop`, `onAddToCart`, `showActions` | Home, Marketplace |
| `StatsCard` | `components/StatsCard/` | `icon`, `label`, `value`, `change`, `changeType`, `color`, `bg` | All Dashboards |
| `PublicLayout` | `layouts/` | `children` | All public pages |
| `DashboardLayout` | `layouts/` | `children` | All dashboard pages |

---

## Design System

The global design system is defined in `theme.css` using CSS custom properties:

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--primary` | `#2d6a4f` | Primary green (buttons, links, accents) |
| `--primary-light` | `#52b788` | Light green (gradients, focus rings) |
| `--primary-dark` | `#1b4332` | Dark green (hero backgrounds) |
| `--orange` | `#f4a261` | CTA buttons, accent highlights |
| `--accent-light` | `#d8f3dc` | Card backgrounds, badges |
| `--dark` | `#1b2631` | Primary text |
| `--gray` | `#6c757d` | Secondary text |

### Typography
- **Font Family:** Inter (Google Fonts) with system-ui fallback
- **Weights:** 300–800

### Button Variants
`btn-primary`, `btn-orange`, `btn-outline`, `btn-outline-white`, `btn-danger`, `btn-sm`, `btn-lg`

### Badge Variants
`badge-success`, `badge-warning`, `badge-danger`, `badge-info`, `badge-primary`

### Spacing & Borders
- Border radii: `--radius-sm` (4px) through `--radius-full` (9999px)
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-green`

---

## Demo Accounts

The backend seeds these demo users (password for all: `password123`):

| Email | Role | Name |
|---|---|---|
| `farmer@agrichain.com` | Farmer | Rajesh Kumar |
| `buyer@agrichain.com` | Buyer | FreshMart Pvt Ltd |
| `admin@agrichain.com` | Admin | AgriChain Admin |
| `suresh@mail.com` | Farmer (unverified) | Suresh Patil |
| `greengrocer@mail.com` | Buyer (unverified) | Green Grocers |
| `anita@mail.com` | Farmer | Anita Sharma |

> **Note:** These are for the Express backend's mock auth. For the live Supabase auth, you need to register accounts through the app's registration page.

---

## Crop Variety Catalog

The platform has a comprehensive 3-level crop taxonomy with **60 varieties** across 5 categories:

| Category | Sub-Categories | Total Varieties |
|---|---|---|
| 🌾 Grains | Rice (4), Wheat (3), Millets (3), Pulses & Legumes (4) | 14 |
| 🍎 Fruits | Mango (3), Banana (3), Citrus (3), Other Fruits (3) | 12 |
| 🥦 Vegetables | Leafy Greens (3), Root Vegetables (4), Solanaceae (4), Gourds & Others (4) | 15 |
| 🌶️ Spices | Whole Spices (4), Seed Spices (3), Aromatic Spices (3) | 10 |
| 🫙 Processed | Sweeteners (3), Oils (3), Flours & Powders (3) | 9 |

---

## Future Roadmap

- [ ] Migrate all in-memory mock data to Supabase PostgreSQL tables
- [ ] Implement real file upload for crop photos (Supabase Storage)
- [ ] Add real-time chat between farmers and buyers
- [ ] Implement crop price history charts with live mandi API data


---

## License

This project is developed as part of a DBMS course project.

---

<p align="center">
  Built with ❤️ for Indian Agriculture 🇮🇳
</p>
