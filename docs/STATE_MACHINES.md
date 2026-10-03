# State machines

## Order
`PENDING_PAYMENT → PAID → SENT_TO_STORE → STORE_ACCEPTED → PREPARING → READY_FOR_COLLECTION → DRIVER_ASSIGNED → DRIVER_ARRIVED_AT_STORE → PICKED_UP → EN_ROUTE → ARRIVED → AGE_VERIFICATION → DELIVERED`.

Cancellation/refund and failed-delivery branches are explicitly guarded. Only `AGE_VERIFICATION → DELIVERED` requires `deliveryAgeCheckCompleted=true` and result `VERIFIED`; a failure transitions to `FAILED_DELIVERY`.

## Payment
`INITIATED → PENDING → SUCCEEDED | FAILED | CANCELLED`; a successful payment may become `PARTIALLY_REFUNDED` or `REFUNDED`. Provider webhooks are idempotent by provider event ID and signature-verified before changing a payment.

## Delivery
`OFFERED → ACCEPTED → AT_STORE → PICKED_UP → EN_ROUTE → ARRIVED → AGE_CHECK → COMPLETED | FAILED_RETURN`. The driver cannot submit completion outside this sequence.
