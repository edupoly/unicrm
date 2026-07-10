# ADR 0006: High-Performance Bulk Item Creation Engine

## Date
2026-07-10

## Context (The Problem)
When a new business joins our CRM, they often need to import their entire catalog (10 to 30 items) at once. If our API forces them to save items one by one, it requires dozens of individual database operations, making the user experience painfully slow.

However, Prisma's high-speed bulk insert method (`createMany`) is flat. Unlike single creation queries, it completely blocks nested relational loops. We needed a clean, production-grade way to insert dozens of parents (`Item`) and their corresponding optional children (`ProductDetail` or `ServiceDetail`) simultaneously without writing messy database loops or creating orphaned records.

## Decision (What We Chose)
We implemented an **In-Memory Decoupled Pre-Assembly** strategy combined with an atomic database transaction. 

Instead of waiting for the database to generate record IDs sequentially, our backend takes full control of the lifecycle upfront:

1. **Pre-Generate Identifiers:** Inside a single JavaScript payload loop, we use native application code to pre-generate unique IDs (`crypto.randomUUID()`) for every incoming item.
2. **Synchronize Arrays in Memory:** Using that pre-generated ID, we simultaneously build our flat parent array (`itemsToInsert`) and our targeted child arrays (`productsToInsert` or `servicesToInsert`) in application memory.
3. **Handle Optional Data Cleanly:** If a business chooses not to track inventory metrics or time durations for specific items, our loop detects the missing payload property and skips pushing a record to the child arrays.
4. **Execute Atomic Bulk Operations:** We pass the finalized, flat arrays into a single `prisma.$transaction` block execution containing exactly three operations:
```javascript
await prisma.$transaction([
    prisma.item.createMany({ data: itemsToInsert }),
    prisma.productDetail.createMany({ data: productsToInsert }),
    prisma.serviceDetail.createMany({ data: servicesToInsert })
]);

```

## Why We Chose It (The Benefits)

* **Massive Performance Gain:** No matter if a business adds 10 items or 50 items, the entire operation takes a maximum of 3 database trips instead of running 10-30 separate dependent queries.
* **Data Cleanliness:** Because everything runs inside an atomic transaction, if a single item fails validation mid-way, the entire batch rolls back safely, guaranteeing we never leave empty parent records floating in our system.
* **Flexible Cataloging:** Businesses can mix products, services, and basic untracked items inside a single upload payload seamlessly.

## Rules for Developers (The Consequences)

* **Do Not Re-map Mid-Transaction:** Never pause the database transaction pipeline to execute JavaScript sorting or filtering. All array modifications, default pricing fallbacks, and UUID mapping must happen completely before the transaction block begins.
* **Keep Array Footprints Safe:** If no child metadata is sent for an item, ensure your controller skips adding a child record entirely so that the query engine can easily read it as a natural `null` state later.
* **Update the fields in Controller**: If ``items``, ``productDetails`` or ``serviceDetails`` schema fields are added or removed then update the fields which are used in ``server\src\controllers\items\addItemByTenantId.js``.