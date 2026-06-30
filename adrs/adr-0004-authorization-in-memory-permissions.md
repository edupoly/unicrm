# **ADR 0004: Authorization Middleware, JWT Payload, and In-Memory Permission Bootstrapping**

## Date
2026-06-30

## Context (The Problem)
Every time a user makes an HTTP request to an API route (like creating a product or reading an invoice), our CRM must check two things immediately:
1. **Who is making the request, and which company do they belong to? or Is the user logged in?**
2. **Do they have the required permission (like `create:users`) to execute this action?**

If we query the database to look up a user's permissions on every single API click, our database will get overloaded, causing the CRM to slow down heavily under production traffic. We needed a system that validates permissions instantly without hitting the database repeatedly.

## Decision (What We Chose)
We implemented a two-part hybrid system combining **Stateless JWT Sessions** and an **In-Memory Bootstrapped Permission Cache**.

### 1. In-Memory Bootstrapping (`permissions.js`)
When our server starts up, `initPermissions()` runs exactly once. It fetches the static, pre-defined permissions table from the database and saves them right inside the server's RAM memory as `PERMISSIONS_ARRAY` and `PERMISSIONS_OBJ`.
- Because permissions are system-wide and immutable (users cannot create or delete basic features), we can safely read them from memory instead of requesting them from the database over and over again.

### 2. Stateless Guard Middleware (`authorize`)
- When a user logs in successfully, their active `userId`, `tenantId`, and their assigned `permissions` array are cryptographically sealed inside the `USER_SESSION_COOKIE_NAME (actor_access)` cookie payload.
- We built a centralized middleware that intercepts incoming requests before they can touch our database layers. The process follows a clean sequence:
1. It checks for the `actor_access` session cookie.
2. It decrypts the JWT token payload which securely stores the `userId`, `tenantId`, and the user's specific array of `permissions`.
3. It performs an in-memory look-up using `checkPermissionExists` to see if the route's required permission matches an object in the user's token array.
4. If it matches, it appends the identity context directly into the request stream (`req.user = { userId, tenantId, permissions }`) and allows execution.

## Why We Chose It (The Benefits)
- **Extreme Speed:** Cryptographic JWT validation combined with our in-memory bootstrapping registry takes less than a millisecond, completely bypassing database I/O latency.
- **Absolute Multi-Tenant Safety:** Because the middleware automatically populates `req.user.tenantId` from the decrypted secure token, subsequent controller database operations are hard-fenced against accidental cross-company data leakage.

## Rules for Developers (The Consequences)
- **Always Apply the Guard:** When defining a new route, place the `authorize(permission)` middleware right before your controller file. If you omit it, the route is publicly exposed and `req.user` will be undefined.
- **Do not Trust Body payloads for Identity:** When writing controllers, never pull `tenantId` or `userId` from `req.body` or query strings. Always extract them securely from `req.user` to preserve the system's tenancy boundaries.
- **Use global permissions:** For permission validation workflows, use `getGlobalPermissions()` to pull the static permissions registry instead of running manual database select operations.