# FinWise AI — Roadmap

This milestone shipped the full, clickable product surface: landing page,
financial plan form, and a five-section dashboard (Dashboard, Budget,
Savings, AI Advisor, Settings) with real budget math, charts, a What-If
simulator, and a chat interface — all backed by a rule-based stand-in for the
AI layer and a plan stored in the browser. See `README.md` for what's live and
how the current "AI" is implemented.

The milestones below turn that stand-in into the real thing.

## Milestone 2 — Real AI, server-side

Replace `src/lib/aiFixtures.ts` with a live model call, without changing any
UI:

- Add a Netlify Function (e.g. `netlify/functions/financial-advice.ts`) that
  accepts a financial plan payload and returns structured JSON: budget
  breakdown, saving suggestions (title/explanation/estimated impact/priority),
  and a monthly summary.
- Call Gemini through the Netlify AI Gateway from inside that function, so the
  model key never reaches the browser.
- Prompt the model with the same fields the rule-based version already
  computes (income, expense breakdown, goal, risk preference) and ask for the
  same shape of response, so the dashboard components need no changes —
  only their data source moves from `aiFixtures.ts` to a fetch call.
- Validate and sanitize the request payload in the function (numeric bounds,
  string length limits) before it reaches the model.
- Keep today's rule-based output as an automatic fallback if the call fails
  or the integration isn't configured yet, so Demo Mode and first-time use
  never break.

## Milestone 3 — Real AI chat

Extend "Ask FinWise AI" to call the same backend with the user's question and
their financial context, replacing the keyword-matched responses in
`generateChatResponse`. Stream or return a single response; keep the existing
suggested-question chips as prompt starters.

## Milestone 4 — Persistence across devices

Today a plan lives only in the browser's `localStorage`, so it disappears if
someone switches devices or clears site data.

- Store plans in Netlify DB (managed Postgres) instead, keyed by a
  per-visitor identifier.
- If multi-device access without an account is desired, use a long-lived
  signed cookie to identify a returning visitor; if accounts are wanted
  instead, layer in Netlify Identity (or an equivalent) and scope plans to a
  logged-in user.
- Migrate the existing `FinancialPlanProvider` to read/write through the new
  storage instead of `localStorage`, keeping the same context API so
  dashboard components are unaffected.

## Milestone 5 — Polish

- Export or print the budget plan.
- Support more than one savings goal at a time.
- Add basic rate limiting and abuse protection on the AI function.
- Dark mode.
