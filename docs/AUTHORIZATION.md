# Authentication and authorization

Sessions/JWTs are issued only after password verification, email verification where required, and administrator MFA. The API resolves an actor from the verified credential. Requests never choose their role, store ID or customer ID.

| Role | Scope | Key permissions |
|---|---|---|
| CUSTOMER | Own profile and orders | Browse, cart, checkout, support, review |
| STORE_OWNER | Own store | Manage staff, products, orders and store settings |
| STORE_MANAGER / STORE_STAFF | Granted store | Operations within configured permissions |
| DRIVER | Own/accepted jobs | Availability, delivery workflow, verification outcome |
| SUPPORT_AGENT | Assigned tickets | Support only; no financial administration |
| ADMIN | Platform operational scope | Review stores/drivers, order interventions, compliance |
| SUPER_ADMIN | Platform | Manage administrators and platform security settings |

Every administrative approval, suspension, refund, reassignment and policy change is appended to `audit_logs`.
