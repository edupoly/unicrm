# ADR 0005: Polymorphic Inheritance for Products and Services (The Parent-Child Schema)

## Date
2026-07-01

## Context (The Problem)
Inside our CRM, companies sell two different types of things: **Physical Products** (like boxes of electronics) and **Time-Based Services** (like 60 minutes of software consulting). 

They share a lot of common properties like a `name`, a base `price`, a `tenantId`, sales data, and auditing logs (`createdAt`, `updatedAt`). However, they also have distinct differences:
- **Products** care about physical inventory metrics like `stockQuantity`, `costPrice`, and low-stock limits.
- **Services** care about execution logistics like `durationMinutes` and operational availability.

If we create two completely separate tables (`Products` and `Services`), we force future modules like invoicing, billing, and checkout charts to query multiple tables separately and stitch the data together manually. This approach degrades backend performance and complicates database schemas.

## Decision (What We Chose)
We implemented a **Parent-Child Schema Architecture** (Delegated Types) using a 1:1 relationship layout.

```
        +------------------------------------+
        |            Item (Parent)           |
        |  (id, tenantId, name, price, type) |
        +-----------------+------------------+
                            |
           +-------------+-------------+
           | 1:1                       | 1:1
+----------v----------+     +----------v----------+
|    ProductDetail    |     |    ServiceDetail    |
| (costPrice, stock)  |     |  (durationMinutes)  |
+---------------------+     +---------------------+

```

1. **The Parent Table (`Item`):** Acts as the single point of entry. It stores all unified structural, financial, and analytical configurations. Every sellable entity gets an entry here, flagged by an `ItemType` enum (`PRODUCT` or `SERVICE`).
2. **The Child Tables (`ProductDetail` & `ServiceDetail`):** Extension tables linked via a strict 1:1 configuration (`itemId`). They hold unique metadata fields exclusive to their respective types.

## Why We Chose It (The Benefits)
- **Single Query Fetching:** By using this parent-child setup, our billing and inventory controllers can write a single, unified query using Prisma's include operator to pull any catalog item alongside its type-specific details in one go.
- **Unified Billing Systems:** Invoicing lines only need to connect to the parent `Item` table. The billing code doesn't need to know if it's billing a service or a physical product, it reads the price and name directly from the `Item` row.
- **Shared Business Features:** Changes like adding `discountPercentage` or `isOnSale` settings immediately support both products and services in one code update.
- **Clean Relational Integrity:** We prevent duplicate, empty columns (null values) that appear when forcing products and services into a single massive, cluttered table.

## Rules for Developers (The Consequences)
- **Always Query the Root Table First:** When building inventory or checkout controllers, search the parent `Item` table first. Use Prisma's `include` statement to load the child details dynamically if the business logic demands it:
```javascript
  const inventoryItem = await prisma.item.findUnique({
      where: { id: itemId },
      include: { productDetails: true, serviceDetails: true }
  });
```
- **Maintain Tenancy Rules:** The unique constraint `@@unique([tenantId, sku])` handles multi-company validation. A SKU identifier only has to be unique within its specific company ecosystem.

