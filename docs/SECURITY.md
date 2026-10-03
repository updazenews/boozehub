# Security

The API uses server-side authorization: identity and role are derived from verified authentication, never request bodies. Passwords require an Argon2id-compatible implementation in deployment; administrators must enrol MFA. Rate-limit login and reset endpoints, validate input, enforce HTTPS/secure cookies, protect browser requests from CSRF, scan uploaded documents and verify payment-webhook signatures. Do not log cards, full identity documents, tokens or secret values.
