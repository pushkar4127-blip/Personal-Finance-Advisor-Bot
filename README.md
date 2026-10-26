# FinWise AI — Personal Finance Advisor
Live Demo : https://drive.google.com/file/d/1pV5dpo5pqLBOpqV4gL01Lh6_YqFlS4Yz/view?usp=sharing

Documentation Link : https://1drv.ms/w/c/76047e3b9b3f4013/IQDkMkq6fRuhQ7vzDnd3dQNsAbhUrTg6gxAhboMnUWK3PY4?e=rVZR3e

FinWise AI is a personal finance assistant. Someone shares their income, monthly
expenses, and a savings goal, and gets back a personalized budget breakdown,
prioritized saving suggestions, a monthly financial summary, a "What If?"
scenario simulator, and a simple chat interface for follow-up questions.

FinWise AI is an educational planning tool. It produces estimates, not
professional financial, investment, tax, or legal advice, and never guarantees
outcomes — this disclaimer is shown throughout the app.

## What's live right now

- **Landing page** (`/`) — product pitch, feature highlights, and the two entry
  points: build a real plan, or load a demo instantly.
- **Financial plan form** (`/plan/new`) — income, a full monthly expense
  breakdown (with support for custom expense lines), goal details, and a risk
  preference, with basic validation.
- **Dashboard** (`/dashboard`) — a five-section app shell with a responsive
  sidebar:
  - **Dashboard**: income/expense/balance/savings summary cards, an
    income-vs-expenses chart, a 12-month projected cash-flow chart, and an AI
    monthly summary.
  - **Budget**: a needs/wants/savings donut chart, category-by-category
    breakdown, and a savings-goal progress bar.
  - **Savings**: prioritized saving suggestions (each with an estimated
    monthly impact) and an interactive "What If?" simulator.
  - **AI Advisor**: a chat interface pre-loaded with the four example
    questions from the brief, answered against the user's own numbers.
  - **Settings**: currency/risk preference, a link back into the plan editor,
    and a way to clear locally stored data.
- **Demo Mode** — the "Try Demo" button (on the landing page and inside an
  empty dashboard) instantly loads a realistic sample plan, so the whole flow
  is demoable with no setup.

A plan is kept only in the browser (`localStorage`) — nothing is sent to a
server yet. See [`PLAN.md`](./PLAN.md) for the roadmap that adds a real
Gemini-powered backend.

## How the "AI" works today

The budget math (needs/wants/savings split, suggested savings, goal
projections, what-if scenarios) is real, computed in
[`src/lib/budget.ts`](./src/lib/budget.ts). The saving suggestions, monthly
summary, and chat responses are produced by a deterministic, rule-based
stand-in in [`src/lib/aiFixtures.ts`](./src/lib/aiFixtures.ts) — it reads the
same numbers a Gemini prompt would and reasons over them with simple rules, so
the product feels and behaves like the finished experience today. `PLAN.md`
lays out how this gets swapped for real Gemini calls behind a Netlify
Function, without changing the UI.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (React 19 + Vite 7, SSR) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| Icons | Lucide |
| Charts | Chart.js via `react-chartjs-2` |
| Routing | TanStack Router (file-based) |
| State | React Context + `localStorage` |
| Hosting | Netlify |

The original brief describes a React + Flask split with a separate backend
process. This project runs on Netlify, so the equivalent backend layer is a
**Netlify Function** rather than a Flask app — same separation (secrets never
reach the browser), different runtime. `PLAN.md` covers adding it. Charts use
Chart.js (already wired into this project's starting template) rather than
Recharts; the two libraries cover the same chart types requested (donut, bar,
line/progress).

## Running locally

```bash
pnpm install
pnpm dev
```

This starts the Vite dev server. If you have the Netlify CLI configured for
this site, `netlify dev` will also work and adds local emulation for Netlify
platform features once the backend milestone lands.

## Using Demo Mode

Click **Try Demo** on the landing page (or inside the dashboard's empty
state). It instantly loads a realistic sample plan — ₹50,000 income, a full
expense breakdown, ₹40,000 in current savings, and an "Emergency fund" goal —
and takes you straight to the dashboard. No setup, no API key, no login.

## Project structure

```
src/
├── routes/                  # File-based routes (TanStack Router)
│   ├── __root.tsx           # Root HTML shell, wraps app in FinancialPlanProvider
│   ├── index.tsx            # Landing page
│   ├── plan.new.tsx         # Multi-section financial plan form
│   ├── dashboard.tsx        # Dashboard layout (sidebar + empty state gate)
│   ├── dashboard.index.tsx  # Dashboard tab: overview
│   ├── dashboard.budget.tsx # Budget tab
│   ├── dashboard.savings.tsx      # Savings tab: suggestions + What-If
│   ├── dashboard.advisor.tsx      # AI Advisor tab: chat
│   └── dashboard.settings.tsx     # Settings tab
├── components/
│   ├── layout/AppShell.tsx  # Sidebar + responsive mobile nav
│   ├── dashboard/           # Dashboard-specific UI (cards, charts, chat, etc.)
│   ├── Disclaimer.tsx       # Shared "not financial advice" banner
│   └── LoadingOverlay.tsx   # "FinWise AI is analyzing your finances..." state
├── context/financial-plan-context.tsx  # Plan state, persisted to localStorage
└── lib/
    ├── types.ts             # FinancialPlanInput and related types
    ├── budget.ts             # Real budget math (needs/wants/savings, what-if)
    ├── aiFixtures.ts         # Rule-based stand-in for Gemini output
    ├── currency.ts            # Currency formatting
    └── demoData.ts            # Demo Mode sample plan
```

## Roadmap

See [`PLAN.md`](./PLAN.md) for what's next — a real Gemini-powered backend
(via a Netlify Function and the Netlify AI Gateway), persistent storage for
plans, and hardening.
