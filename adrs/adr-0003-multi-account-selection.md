# **ADR 0003: Password-First Login with Multi-Account Selection**

## Date
2026-06-30

## Context (The Problem)
In our CRM schema, a single person can work for multiple different businesses using their exact same email address or mobile number. Because our database model isolates data by tenant, this individual actually exists as separate records across different companies, each linked to a different `tenantId`.

This creates an authentication puzzle. If a user tries to log in using just their email, how do we know which business dashboard to open?
- If we show them a list of their companies *before* they enter a password, we leak private corporate data to the public (Account Enumeration vulnerability). Anyone could type an email address and discover exactly which companies that person belongs to.

## Decision (What We Chose)
We built a secure, two-step **Password-First Unified Login Flow**.

Instead of routing users to custom company web addresses, everyone logs in from a single page. The backend handles the verification logic in a strict order:

### Step 1: The Unified Login Request
When a user submits their email/mobile and password, the backend handles the verification securely:
1. **Find All Matching Accounts:** We fetch every user profile matching that email or mobile number across the entire database.
2. **Verify Password First:** We look at all those accounts and run an asynchronous password comparison using `Promise.all` and `bcrypt.compare`.
3. **Branching Logic:**
   - **Case A (Single Match):** If the password matches exactly one account, we log them into that workspace immediately.
   - **Case B (Multiple Matches):** If the password matches multiple accounts, we do not log them in yet. Instead, we bundle their valid company profiles into a temporary, short-lived cookie (`select_org` valid for 3 minutes) and send a list of company names back to the frontend.

### Step 2: Workspace Selection Verification (`verifyUserCompany`)
If the user has multiple accounts, they pick a business from the dropdown on the frontend, sending the `tenantId` and `businessName` to our server. 
1. The backend verifies the temporary selection cookie.
2. We strictly match the chosen `tenantId` and `businessName` against the allowed accounts sealed inside that token.
3. Once validated, we log them into that specific workspace.

## Why We Chose It (The Benefits)
- **High Security:** No corporate metadata or company names are ever revealed to the browser until *after* the user proves they know the correct password.
- **Resilient to Timing Attacks:** By grouping our password hashing checks asynchronously using `Promise.all`, the server responds quickly and securely without blocking the Node.js event loop.
- **Great User Experience:** Users do not need to remember different subdomains or workspace names to log into their different jobs.

## Rules for Developers (The Consequences)
- When writing frontend code, if the login API returns a 200 status with a `companies` array, you must intercept the flow and show a workspace selector screen instead of routing them to the main dashboard.
- **Protect the Main Session:** Never confuse the temporary `select_org` cookie with the actual `actor_access` cookie. Only the `actor_access` cookie should grant entry to the CRM's functional resource routes (like products, invoices, and roles).
- **Session Extraction Is Automatic:** When writing future controllers, you do not need to query the database to look up who is logged in. The authorization middleware will automatically intercept the `actor_access` cookie, decrypt it, and pass `req.user.userId` and `req.user.tenantId` into your route stream.
- **Never Hardcode the Tenant Boundary:** When building data-fetching modules tomorrow, always use `where: { tenantId: req.user.tenantId }` to ensure data remains strictly locked inside the company they chose during this login step.