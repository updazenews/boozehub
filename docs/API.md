# REST API (Phase 1)

All protected endpoints require verified server authentication. Examples use development request headers only; production replaces them with verified secure session/JWT middleware.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register customer with DOB and begin age verification |
| POST | `/api/auth/login` | Rate-limited authentication |
| GET | `/api/stores/nearby` | Location-filtered eligible stores |
| GET | `/api/products` | Nearby catalogue search/filter |
| POST | `/api/cart/items` | Add an item; enforces one-store cart |
| POST | `/api/orders` | Server-calculated checkout after verification |
| POST | `/api/store/apply` | Submit a pending store application |
| POST | `/api/admin/stores/:id/approve` | Audit-logged licence/store approval |
| POST | `/api/driver/deliveries/:id/verify-age` | Record minimum necessary age-check outcome |
| POST | `/api/payments/webhook` | Signature-verified provider callback |

## Error format

`{"error":"CART_STORE_CONFLICT","message":"..."}`. API errors never return stack traces, database messages or provider secrets.
