/*
  Warnings:

  - You are about to drop the column `businessName` on the `tenants` table. All the data in the column will be lost.
  - Added the required column `business_name` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoice_items" ADD COLUMN     "custom_fields" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "custom_fields" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "custom_fields" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "businessName",
ADD COLUMN     "business_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "custom_fields" JSONB NOT NULL DEFAULT '{}';

-- CreateTable
CREATE TABLE "tenant_configs" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "business_type" VARCHAR(255) NOT NULL,
    "product_label_plural" VARCHAR(50) NOT NULL DEFAULT 'Products',
    "product_label_singular" VARCHAR(50) NOT NULL DEFAULT 'Product',
    "service_label_plural" VARCHAR(50) NOT NULL DEFAULT 'Services',
    "service_label_singular" VARCHAR(50) NOT NULL DEFAULT 'Service',
    "customer_label_plural" VARCHAR(50) NOT NULL DEFAULT 'Customers',
    "customer_label_singular" VARCHAR(50) NOT NULL DEFAULT 'Customer',
    "currency_code" VARCHAR(10) NOT NULL DEFAULT 'INR',
    "time_zone" VARCHAR(100) NOT NULL DEFAULT 'Asia/Kolkata',
    "custom_fields" JSONB NOT NULL DEFAULT '{}',
    "billing_settings" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "tenant_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_configs_tenant_id_key" ON "tenant_configs"("tenant_id");

-- AddForeignKey
ALTER TABLE "tenant_configs" ADD CONSTRAINT "tenant_configs_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
