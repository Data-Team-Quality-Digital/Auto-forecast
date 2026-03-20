# Auto-forecast

A production-ready financial planning SaaS UI built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**.

## Features

- Executive dashboard with KPI cards, filters, trend visualization, and scenario insights.
- DRE grid showing grouped financial performance by account and client with planned vs actual values for Jan–Dec.
- Additional inputs page with editable local-state form/table for project-level planning data.
- Operational planning grid with business logic that locks past months as read-only actuals and keeps current/future months editable for forecast updates.
- Scalable component-based structure and mock JSON-style datasets.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project structure

```text
app/
  dashboard/
  dre/
  inputs/
  operational/
components/
  dashboard/
  dre/
  inputs/
  layout/
  operational/
  ui/
lib/
  constants.ts
  forecast-context.tsx
  mock-data.ts
  types.ts
  utils.ts
```
