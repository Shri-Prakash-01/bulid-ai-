# BuildAI — AI-Powered Construction Management Platform

> A full-stack web application that connects homeowners, contractors, and admins through an AI-driven construction project lifecycle — from cost estimation to contract execution.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
  - [User / Homeowner Portal](#user--homeowner-portal)
  - [Contractor Portal](#contractor-portal)
  - [Admin Portal](#admin-portal)
- [Complete Bidding Flow](#complete-bidding-flow)
- [AI Integration](#ai-integration)
- [Backend API Reference](#backend-api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Roles & Demo Credentials](#roles--demo-credentials)

---

## Overview

BuildAI is a React + Node.js platform that guides homeowners through every stage of a construction project:

1. Define project specs (plot, floors, rooms, quality, budget)
2. Get an AI-generated cost estimate via OpenRouter (GPT-4o-mini)
3. Publish the project for contractor bids
4. Compare bids, accept one, wait for contractor confirmation
5. Both parties confirm → Construction contract auto-generated
6. Track construction milestones, inspections, payments, and documents

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 6, Tailwind CSS v4 |
| Icons | Lucide React, Google Material Symbols |
| PDF / Export | jsPDF, html2canvas |
| Animations | canvas-confetti |
| Backend | Node.js (native `http` module, no framework) |
| AI / LLM | OpenRouter API → `openai/gpt-4o-mini` |
| Data Store | In-memory (server restart resets data) |
| Dev Proxy | Vite `/api` → `localhost:5050` |

---

## Project Structure

```
buildai/
├── server.js                     # Node.js backend — all API endpoints
├── vite.config.js                # Vite config + dev proxy
├── .env                          # API keys (not committed)
├── .env.example                  # Template for env vars
├── package.json
│
├── public/
│   └── hero-house.png
│
└── src/
    ├── App.jsx                   # Root — routing + all shared state
    ├── main.jsx
    ├── index.css
    │
    ├── services/
    │   └── openrouterService.js  # AI prediction + chat API calls
    │
    └── components/
        ├── SplashLoading.jsx
        ├── AuthPage.jsx
        ├── Sidebar.jsx
        ├── PortalHeader.jsx
        ├── Navbar.jsx
        ├── Footer.jsx
        ├── MobileBottomNav.jsx
        ├── AiChatWidget.jsx      # Floating AI assistant (real OpenRouter chat)
        ├── AdminPortal.jsx
        ├── WizardPage.jsx / WizardStep1–4.jsx
        ├── DashboardPage.jsx
        ├── LoginModal.jsx
        │
        ├── user/
        │   ├── UserDashboard.jsx
        │   ├── CreateProject.jsx       # 6-step project wizard
        │   ├── CostEstimation.jsx      # AI cost prediction + auto-trigger
        │   ├── PublishBidding.jsx      # Publish project + live bid polling
        │   ├── QuotationsRfq.jsx       # View & accept contractor bids
        │   ├── ProjectConfirmed.jsx    # Awaiting contractor confirm + contract view
        │   ├── ConstructionTracking.jsx
        │   ├── FindContractor.jsx
        │   ├── ImageGeneration.jsx     # AI floor plan + interior visualizer
        │   ├── LoanFeasibility.jsx     # EMI & FOIR calculator
        │   ├── UserPayments.jsx
        │   ├── UserDocuments.jsx
        │   └── ChangeRequests.jsx
        │
        ├── contractor/
        │   ├── ContractorDashboard.jsx # Live metrics + bid notifications
        │   ├── ProjectRequests.jsx     # Browse open projects (live API)
        │   ├── QuotationBuilder.jsx    # Build & submit bid (with status guard)
        │   ├── ContractorBidAccept.jsx # Accept / decline selected bid
        │   ├── ContractorProjects.jsx  # Active projects (live API)
        │   ├── ProgressUpdate.jsx
        │   ├── MaterialManagement.jsx
        │   ├── LabourManagement.jsx
        │   ├── ContractorPayments.jsx
        │   ├── BusinessProfile.jsx
        │   └── VerificationCenter.jsx
        │
        └── admin/
            ├── UserManagement.jsx
            ├── ContractorManagement.jsx
            ├── AdminProjects.jsx
            ├── CostAdmin.jsx
            ├── ContractorMatchingAdmin.jsx
            ├── RfqAdmin.jsx
            ├── ConstructionAdmin.jsx
            ├── InspectionAdmin.jsx
            ├── PaymentAdmin.jsx
            ├── AiMlControlCenter.jsx
            ├── AiJobsAdmin.jsx
            ├── ComplaintsDisputes.jsx
            └── AuditLogs.jsx
```

---

## Features

### User / Homeowner Portal

| Page | Description |
|------|-------------|
| **Dashboard** | Project overview, quick actions, status summary |
| **Create Project** | 6-step wizard: plot dimensions → construction details → room requirements (live +/- counters) → quality level → budget → Vastu/special constraints |
| **AI Cost Estimation** | Auto-triggers on page load. Sends full `projectData` + `roomData` to OpenRouter. Shows estimated cost, timeline, 8-line cost breakdown, BOM highlight, environmental risk badges |
| **BOQ Materials** | Auto-generated Bill of Quantities based on built-up area |
| **Publish for Bidding** | Publishes project to backend (`POST /api/projects`). Polls for incoming contractor bids every 4 seconds |
| **Quotations / Bids** | Side-by-side bid comparison, sorted by price. One-click accept triggers `PATCH /api/bids/:id/select` |
| **Project Confirmed** | Polls for contractor confirmation every 4 seconds. Shows contract + 9-phase milestones once both parties accept |
| **AI Image Generation** | Floor plan visualizer (Vastu-compliant) + interior style renderer (6 styles) |
| **Loan Feasibility** | FOIR calculator, EMI estimator at 8.5%, co-applicant simulator |
| **Construction Tracking** | Milestone-based progress tracker linked to active contract |
| **Find Contractor** | Browse verified contractors, send RFQ |
| **Payments** | Payment schedule linked to project |
| **Documents** | Project document vault |
| **Change Requests** | Raise and track site change requests |

---

### Contractor Portal

| Page | Description |
|------|-------------|
| **Dashboard** | Live metrics (open projects, selected bids, active sites). Amber notification banner when a homeowner selects your bid. Polls API every 5 seconds |
| **Project Requests** | Live list of open projects fetched from backend. Each card shows full project specs, AI estimate, room config. "Submit Bid" button |
| **Quotation Builder** | Enter material, labour, overhead costs. Pre-checks project status on load — blocks submission if project is `confirmed` or `closed`. Compares your bid vs AI estimate |
| **Bid Accept / Decline** | Auto-fetches contractor's bids by `contractorId` on mount (works even without prior navigation). Shows "selected" bids with Accept / Decline buttons |
| **Active Projects** | Live from API — shows `selected` bids (pending decision) with inline Accept/Decline, and `accepted` bids as confirmed active sites |
| **Progress Update** | Daily site log entry |
| **Material Management** | Track material procurement |
| **Labour Management** | Manage workforce |
| **Payments** | Payment claim tracking |
| **Business Profile** | Company info, portfolio |
| **Verification Center** | License & document verification |

---

### Admin Portal

| Page | Description |
|------|-------------|
| User Management | View, verify, and manage homeowner accounts |
| Contractor Management | Approve/suspend contractors, tier management |
| Admin Projects | Overview of all projects across the platform |
| Cost Admin | Monitor AI cost estimation outputs |
| Contractor Matching | AI-powered contractor-to-project matching controls |
| RFQ Admin | Manage RFQ and quotation flow |
| Construction Admin | Site execution oversight |
| Inspection Admin | Quality inspection reports |
| Payment Admin | Platform-wide payment monitoring |
| AI/ML Control Center | Model settings, API usage, engine version control |
| AI Jobs Admin | Monitor async AI prediction jobs |
| Complaints & Disputes | Raise and resolve disputes |
| Audit Logs | Full platform activity trail |

---

## Complete Bidding Flow

```
USER SIDE
─────────────────────────────────────────────────────────────
1. Create Project (6-step wizard)
         │
         ▼
2. AI Cost Estimation  ←─── auto-triggers on page load
   (OpenRouter GPT-4o-mini)
         │
         ├──► View BOQ Materials
         │
         ▼
3. Publish Project for Bidding
   POST /api/projects  →  status: "open"
   (polls for bids every 4s)
         │
         ▼
4. Contractor submits bid
   POST /api/bids
         │
         ▼
5. User views bids (sorted by price)
   GET /api/bids?projectId=
         │
         ▼
6. User accepts a bid
   PATCH /api/bids/:id/select
   → other bids marked rejected
   → project status: "closed"
         │
         ▼
7. Waiting for contractor confirmation
   (ProjectConfirmed polls every 4s)

CONTRACTOR SIDE
─────────────────────────────────────────────────────────────
A. Browse open projects
   GET /api/projects  (status: open only)
         │
         ▼
B. Build & submit bid
   POST /api/bids
         │
         ▼
C. Bid pending → auto-polling every 4s
   GET /api/bids?contractorId=
         │
         ▼
D. Bid selected by homeowner → notification appears
   status: "selected"
         │
         ├── Decline → project re-opens
         │
         └── Accept
             PATCH /api/bids/:id/contractor-confirm  { action: "accept" }
                   │
                   ▼
             Contract auto-generated
             GET /api/contracts?projectId=

BOTH PARTIES
─────────────────────────────────────────────────────────────
             PROJECT CONFIRMED  ✓
             Contract with 9 construction milestones
                   │
                   ▼
             Construction Execution
             (progress tracking, inspections, payments)
```

---

## AI Integration

### Cost Estimation — `POST /api/predict`

Called automatically when the user lands on the Cost Estimation page. Sends full project context to OpenRouter.

**Input payload:**
```json
{
  "propertyData": {
    "length": 40, "width": 60,
    "city": "Mumbai", "state": "MH",
    "floors": 2, "constructionType": "Premium",
    "budget": 5000000
  },
  "roomData": {
    "bedrooms": 3, "bathrooms": 2, "kitchen": 1,
    "livingRoom": 1, "diningRoom": 1,
    "poojaRoom": 1, "storeRoom": 1, "balcony": 2
  },
  "styleData": {
    "interiorStyle": "Modern",
    "budget": 5000000,
    "features": ["Garden", "Solar", "EV Charging"]
  }
}
```

**Response:**
```json
{
  "estimatedCost": 6240000,
  "timelineMonths": 16,
  "totalAreaSqFt": 4320,
  "breakdown": {
    "material": 2184000, "labour": 1248000,
    "interior": 936000, "electrical": 499200,
    "plumbing": 436800, "furniture": 374400,
    "painting": 312000, "govt": 249600
  },
  "recommendation": "Raft Foundation recommended for 2-floor build...",
  "bomHighlight": "~1,642 bags cement, 17.3 tons TMT Fe-550",
  "environmentalRisks": {
    "flood": "MODERATE", "earthquake": "LOW",
    "wind": "LOW", "soil": "OPTIMAL"
  }
}
```

### AI Chat Widget

Floating chat on every page. Connected to OpenRouter with full project context injected as system prompt. Falls back to rule-based responses if no API key is set.

### Fallback (no API key)

`calculateLocalEstimates()` uses per-sq-ft rate table by construction type:

| Type | Rate |
|------|------|
| Economy | ₹1,500/sq.ft |
| Standard | ₹1,850/sq.ft |
| Premium | ₹2,400/sq.ft |
| Luxury | ₹3,500/sq.ft |

---

## Backend API Reference

Base URL: `http://localhost:5050`

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server status check |

### AI Prediction

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/predict` | AI construction cost estimate |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Publish a project for bidding |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:id` | Get single project |
| PATCH | `/api/projects/:id/status` | Update project status |

### Bids

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bids` | Contractor submits a bid |
| GET | `/api/bids?projectId=` | Get bids for a project |
| GET | `/api/bids?contractorId=` | Get bids by a contractor |
| PATCH | `/api/bids/:id/select` | User selects/accepts a bid |
| PATCH | `/api/bids/:id/contractor-confirm` | Contractor accepts or rejects `{ action: "accept" \| "reject" }` |

### Contracts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contracts?projectId=` | Get contracts for a project |
| GET | `/api/contracts/:id` | Get single contract |
| PATCH | `/api/contracts/:id/milestone` | Update milestone status `{ index, status }` |

> **Note:** The backend uses an in-memory store. All data resets on server restart.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- An OpenRouter API key → [openrouter.ai](https://openrouter.ai)

### Installation

```bash
# Clone / open the project
cd /path/to/buildai

# Install dependencies
npm install
```

### Environment Variables

Copy the example file and add your key:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_OPENROUTER_API_KEY=sk-or-v1-your-key-here
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

Both vars are needed — `VITE_` prefix for the frontend (Vite), plain for the Node backend.

---

## Running the App

You need **two terminals**:

**Terminal 1 — Backend server:**
```bash
node server.js
```
Expected output:
```
🚀 BuildAI Backend V5.0 running on http://localhost:5050
🔑 OpenRouter API Key: YES (sk-or-v1-f9...)
📡 Endpoints:
   GET  /api/health
   POST /api/predict
   POST /api/projects
   ...
```

**Terminal 2 — Frontend dev server:**
```bash
npm run dev
```
Opens at: `http://localhost:5173`

### Build for Production

```bash
npm run build       # outputs to dist/
npm run preview     # preview production build
```

---

## Roles & Demo Credentials

The app ships with role-based routing. On the Auth page, select or log in as one of these roles:

| Role | Default Name | Landing Page |
|------|-------------|-------------|
| **Homeowner / User** | Rajesh Sharma | User Dashboard |
| **Contractor** | Sarah Jenkins | Contractor Dashboard |
| **Admin** | Admin User | Admin Portal |

> Authentication is client-side only. No real JWT or session persistence — role is stored in React state.

---

## Key State (App.jsx)

All shared state lives in `App.jsx` and is passed as props:

| State | Type | Used By |
|-------|------|---------|
| `projectData` | object | All user + admin pages |
| `roomData` | object | CreateProject, CostEstimation |
| `styleData` | object | AiChatWidget, CostEstimation |
| `publishedProject` | object | PublishBidding, QuotationsRfq, ProjectConfirmed |
| `bids` | array | PublishBidding, QuotationsRfq |
| `acceptedBid` | object | QuotationsRfq, ProjectConfirmed |
| `activeContract` | object | ProjectConfirmed, ConstructionTracking, ContractorBidAccept |
| `aiEstimate` | object | PublishBidding (sent to backend with project) |
| `selectedProject` | object | Contractor QuotationBuilder |
| `myBid` | object | Contractor ContractorBidAccept |

---

## Notes

- **In-memory data** — restarting `node server.js` clears all projects, bids, and contracts. For persistence, replace the in-memory store with a database (MongoDB, PostgreSQL, etc.)
- **No real auth** — login is UI-only. For production, add JWT + bcrypt.
- **OpenRouter model** — defaults to `openai/gpt-4o-mini`. Change the model in `server.js` and `openrouterService.js`.
- **CORS** — the backend allows all origins (`*`). Restrict this in production.
- **Vite proxy** — in development, `/api` requests from the frontend are proxied to `localhost:5050`, avoiding CORS issues entirely.
