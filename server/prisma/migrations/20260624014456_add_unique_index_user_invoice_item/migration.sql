/*
  Warnings:

  - A unique constraint covering the columns `[invoice_id,item_id]` on the table `invoice_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenant_id,mobile_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invoice_items_invoice_id_item_id_key" ON "invoice_items"("invoice_id", "item_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_tenant_id_mobile_number_key" ON "users"("tenant_id", "mobile_number");
