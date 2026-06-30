# **ADR 0001: Data Isolation Strategy (How We Separate Multi-Tenant Data)**

## Date
2026-06-30

## Context (The Problem)
We are building a Multi-Tenant CRM. This means many different businesses (Tenants) will sign up and use our app at the same time.

The biggest rule of a multi-tenant app is: **Company A must never see Company B's data.** We had to decide how to separate this data in our database. We looked at two options:
1. **The Isolated Model:** Give every single company their own separate physical database.
2. **The Shared Model:** Put everyone in one database, but tag every single row of data with a specific `tenantId` to know who owns what.

## Decision (What We Chose)
We chose **Option 2: The Shared Database Model**.

Every single table we create in our database (like `User`, `Product`, or `Invoice`) will have a column called `tenantId`. When a user asks for data, our backend will always filter the query using that ID (e.g., "Find invoices where `tenantId` is Company A").

## Why We Chose It (The Benefits)
- **It saves money:** Running one database instance is incredibly cheap. Running hundreds of separate databases for every small client would make our hosting bills too expensive.
- **Easy Maintenance:** When we want to update our database structure (Prisma migrations), we only have to run the update once on our single database, instead of repeating it hundreds of times.

## Rules for Developers (The Consequences)
Because we share a database, you must follow this golden rule when writing code:
- **Never trust a tenant ID sent from the frontend.** Always extract the `tenantId` safely from the user's verified secure JWT token (`req.user.tenantId`) inside the controllers.
- If you forget to add `where: { tenantId }` to a database query, you might accidentally leak another company's data. Always double-check your Prisma queries!