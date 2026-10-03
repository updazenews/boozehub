# Setup

1. Install Node 22+ and PostgreSQL 16+.
2. Copy `.env.example` to `.env`, set `DATABASE_URL` and a strong `AUTH_SECRET`.
3. Run `npm install`, `npm run db:migrate`, then `npm run db:seed`.
4. Start the API with `npm run dev`.

Create the first super administrator directly through the controlled bootstrap process in your deployment automation, then disable bootstrap credentials. Configure a payment provider, map provider and age-verification provider through encrypted production secrets; provider callbacks must use signature verification before altering payment state.
