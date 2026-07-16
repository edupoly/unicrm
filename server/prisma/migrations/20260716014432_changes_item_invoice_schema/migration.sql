/*
  Warnings:

  - You are about to drop the column `subtotal` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `tax_amount` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `total_payable` on the `invoices` table. All the data in the column will be lost.
  - The `status` column on the `invoices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `grand_total` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_total` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'PENDING', 'PAID', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'UPI', 'CARD', 'BANK_TRANSFER');

-- DropForeignKey
ALTER TABLE "invoice_items" DROP CONSTRAINT "invoice_items_item_id_fkey";

-- DropIndex
DROP INDEX "invoice_items_invoice_id_item_id_key";

-- AlterTable
ALTER TABLE "invoice_items" ADD COLUMN     "discount_percentage" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "tax_percentage" DECIMAL(5,2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "subtotal",
DROP COLUMN "tax_amount",
DROP COLUMN "total_payable",
ADD COLUMN     "grand_total" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "paid_at" TIMESTAMP(3),
ADD COLUMN     "payment_method" "PaymentMethod" DEFAULT 'CASH',
ADD COLUMN     "sub_total" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "tax_total" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" UUID,
ALTER COLUMN "customer_id" DROP NOT NULL,
ALTER COLUMN "created_by" DROP NOT NULL,
ALTER COLUMN "invoice_number" DROP NOT NULL,
ALTER COLUMN "discount_total" SET DEFAULT 0.00,
DROP COLUMN "status",
ADD COLUMN     "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "tax_percentage" DECIMAL(5,2) NOT NULL DEFAULT 0.00;

-- CreateIndex
CREATE INDEX "invoice_items_invoice_id_item_id_idx" ON "invoice_items"("invoice_id", "item_id");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
