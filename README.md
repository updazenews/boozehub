# BoozeHub

Compliance-first South African marketplace software. Independent, approved liquor retailers remain the sellers; BoozeHub coordinates discovery, ordering, payment integrations and delivery.

## Phase 1 implemented

- REST API foundation with server-side RBAC, customer age-verification gate, single-store carts, server-side totals and store approval/licence eligibility checks.
- PostgreSQL schema with foreign keys, order compliance records, audit logs and future multi-store order grouping.
- API-driven application shells for customer, store, driver and administration interfaces.

## Run locally

```bash
cp .env.example .env
npm install
createdb boozehub
npm run db:migrate
npm run db:seed
npm run dev
```

Then request `GET http://localhost:3000/health`. See [SETUP.md](docs/SETUP.md), [API.md](docs/API.md), and [ARCHITECTURE.md](docs/ARCHITECTURE.md).

> Development seed data is clearly fictional and must never be used as evidence of licensing or compliance.
