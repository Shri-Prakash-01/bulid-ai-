# 🚀 BuildAI Supabase Integration & Setup Guide

This guide explains how Supabase has been integrated into **BuildAI** for data storage, and provides step-by-step instructions on setting up your database, schema, and dummy data.

---

## 📁 Key Files Created / Updated

1. **`supabase_schema.sql`** (in workspace root)
   - Contains complete PostgreSQL DDL statements for creating all 7 core tables: `profiles`, `projects`, `bids`, `contracts`, `payments`, `rfqs`, and `audit_logs`.
   - Includes Row Level Security (RLS) policies.
   - Includes realistic sample dummy data for instant testing.

2. **`src/lib/supabase.js`**
   - Configures the `@supabase/supabase-js` client.
   - Includes configuration check (`isSupabaseConfigured()`) so the app gracefully handles missing credentials.

3. **`src/services/supabaseService.js`**
   - Provides clean service functions for fetching, creating, updating, and filtering data across projects, bids, contracts, payments, profiles, and audit logs.

4. **`server.js`**
   - Upgraded Node.js API server connected to Supabase PostgreSQL database tables.
   - Persists all project creation, bidding, and contract confirmations directly to Supabase when credentials are provided in `.env`.
   - Falls back gracefully to in-memory store if credentials are not yet entered.

5. **`.env` & `.env.example`**
   - Added `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY` variables.

---

## 🛠️ Step-by-Step Supabase Setup

### Step 1: Create a Free Supabase Account & Project
1. Go to [https://supabase.com](https://supabase.com) and log in or create a free account.
2. Click **"New Project"**.
3. Enter your project name (e.g., `buildai-db`), database password, and select a region close to you.
4. Click **"Create new project"** and wait ~1–2 minutes for provision.

---

### Step 2: Run the Schema & Dummy Data Script
1. In your Supabase Dashboard, open the **SQL Editor** from the left navigation menu (icon `<_>`).
2. Click **"+ New Query"**.
3. Open [`supabase_schema.sql`](file:///Users/princetiwari.shri/Desktop/new/supabase_schema.sql) in your workspace, copy all contents, and paste them into the SQL Editor.
4. Click **"Run"** (or press `Ctrl` + `Enter` / `Cmd` + `Enter`).
5. You should see a success message showing the table row counts!

---

### Step 3: Copy Credentials to `.env`
1. In your Supabase Dashboard, go to **Project Settings** (gear icon) ➔ **API**.
2. Copy the **Project URL** (e.g., `https://xyzcompany.supabase.co`).
3. Copy the **anon public key** (starts with `eyJhbGciOi...`).
4. Open your `.env` file in the project workspace and update the keys:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## 📊 Database Schema Overview

| Table Name | Description | Key Columns |
| :--- | :--- | :--- |
| **`profiles`** | User accounts (Homeowners, Contractors, Admins) | `id`, `full_name`, `email`, `role`, `phone`, `company_name`, `rating` |
| **`projects`** | Published construction projects | `id`, `title`, `status`, `owner_id`, `project_data` (JSONB), `room_data` (JSONB), `ai_estimate` (JSONB) |
| **`bids`** | Contractor proposals submitted for projects | `id`, `project_id`, `contractor_id`, `material_cost`, `labour_cost`, `total_cost`, `timeline`, `status` |
| **`contracts`** | Confirmed contracts with milestone tracking | `id`, `project_id`, `bid_id`, `contractor_name`, `total_cost`, `milestones` (JSONB), `status` |
| **`payments`** | Escrow & milestone payments | `id`, `tx_id`, `project_id`, `milestone_title`, `amount`, `status` (`Released`, `Held in Escrow`) |
| **`rfqs`** | Request for Quotations | `id`, `rfq_code`, `title`, `client_name`, `category`, `budget`, `deadline`, `status` |
| **`audit_logs`** | System & administrative audit trail | `id`, `user_name`, `role`, `action`, `target`, `timestamp`, `details` (JSONB) |

---

## 🏃 Running the Application

To start the Vite frontend and the Node.js backend with Supabase integration:

```bash
# Terminal 1: Backend Server
npm run server

# Terminal 2: Vite Dev Frontend
npm run dev
```

When `npm run server` runs with valid Supabase keys in `.env`, you will see:
`⚡ Supabase Database: ENABLED & CONNECTED`
