# EstateHub

EstateHub is a property management application foundation for managing properties, units, tenancies, rent, payments, maintenance, documents, and reporting.

> **Current stage:** Foundation release. The dashboard uses fictional demonstration data only. It is not connected to a database, payment provider, or authentication system.

## Technology

- Next.js App Router
- React
- TypeScript (strict mode)
- Tailwind CSS
- Vercel deployment

## Getting started

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Available scripts

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Demonstration data

The initial dashboard contains fictional properties, units, rent summaries, payment records, and maintenance requests. Monetary examples use KSh and are illustrative only. Do not use these values as real financial records.

## Project structure

```text
src/
  app/                 App Router pages and global styles
  components/
    dashboard/         Dashboard-specific UI
    layout/             Application shell and navigation
  data/                 Fictional demonstration records
  types/                Shared domain types
```

## Product boundaries

This foundation does not yet implement authentication, authorization, persistence, payment processing, tenant portals, document storage, or operational workflows. Those capabilities require separate requirements, security design, and testing before implementation.

## Development principles

- Keep tenant and financial data private by default.
- Enforce authorization on the server and database when backend capabilities are introduced.
- Preserve financial history and use auditable, explicit financial actions.
- Use Africa/Nairobi for displayed times, DD/MM/YYYY for dates, and KSh for currency.
- Treat demonstration data as non-production fixtures.
- Target WCAG 2.2 AA accessibility.

## Deployment

The application is intended to be deployed through the EstateHub GitHub repository and its linked Vercel project. Pushes to `main` should trigger the configured production deployment.
