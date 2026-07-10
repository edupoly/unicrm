/*
  Warnings:

  - A unique constraint covering the columns `[tenant_id,email]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customers_tenant_id_email_key" ON "customers"("tenant_id", "email");
