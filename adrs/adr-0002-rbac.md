# **ADR 0002: Role-Based Access Control (RBAC) Architecture**

## Date
2026-06-30

## Context (The Problem)
Inside our CRM, different employees have different job responsibilities. For example, a business owner should be able to do everything, but a regular sales agent should only be allowed to view customers and should not be allowed to delete products or view corporate billing history.

We needed a system to control who can do what (Authorization). We decided to use **Role-Based Access Control (RBAC)**, which groups permissions into neat packages called "Roles."

## Decision (What We Chose)
We chose a flexible, database-backed RBAC model. Instead of checking a user's job title (like checking if they are a "Manager"), we check if they possess the specific action-resource permission required for that route.

Our permissions are defined using a descriptive object structure:
```json
{
  "name": "create",
  "resource": "users",
  "description": "Allow adding new employees or staff members"
}
```

We connect everything using three simple steps:

1. **Permissions** are global, pre-defined, and immutable actions (e.g., `create` on `users`).
2. **Roles** are bundles of these permissions created by the company owner (e.g., a "Sales Team" role gets `read:products` and `create:leads`).
3. **Users** are assigned one or more of these roles.

When a user logs in, the backend collects all the permission objects from all their assigned roles, merges them into a single list, and embeds them directly inside their secure session token.

## Why We Chose It (The Benefits)

* **Extremely Flexible:** Business owners can create custom roles tailored exactly to their unique staff operations without us needing to rewrite any backend code.
* **Granular Control:** We can lock down specific parts of a feature. A user can have permission to read a resource but be blocked from updating or deleting it.

## Rules for Developers (The Consequences)

* **Use the Authorization Middleware:** When protecting a route, use our custom middleware and pass it the required permission signature.
* **Check the User Permissions:** The middleware automatically validates the user's permission array. If the required permission object is missing from their token payload, the request is instantly rejected with a `403 Forbidden` error.