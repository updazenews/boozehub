# Database and ERD

`users` has one role-specific profile (`customers`, `drivers`, or store membership). A store has licences, products and inventory. An order links one store in V1 and is prepared for an `order_group` in V2. Every order has `order_compliance`, status history, payment records and optionally a delivery.

```text
users--customers--carts--cart_items--products--stores--store_licences
                     \             orders--order_items
                      \                  \--order_compliance--deliveries--drivers
                       addresses          \--payments/refunds
```

All money is stored as integer cents, timestamps use `timestamptz`, and state-changing order/payment operations must run in database transactions.
