# Architecture

```text
Customer PWA / Store PWA / Driver PWA / Admin PWA
                       | REST + authenticated sessions
                   API service
 auth | catalogue | cart/order | compliance | dispatch | payments
                       |                         |
                 PostgreSQL                 provider adapters
```

The platform is a marketplace coordinator—not the seller of record. Store catalogue, fulfilment and licence responsibility stay with each approved store. Driver delivery and payment providers are separate bounded contexts. Adapters in `packages/payments`, `packages/maps`, and `packages/notifications` keep vendors replaceable.

## State controls

Orders use guarded transitions. Only an approved store with a verified, non-expired licence may receive an order. `DELIVERED` requires a successful delivery age check in the order compliance record. The V1 cart has one `store_id`; `order_groups` exists for a future multi-store checkout.

See [DATABASE.md](DATABASE.md), [API.md](API.md), [SECURITY.md](SECURITY.md), and [COMPLIANCE.md](COMPLIANCE.md).
