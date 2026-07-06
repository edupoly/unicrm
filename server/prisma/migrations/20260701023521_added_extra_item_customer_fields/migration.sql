/*
  Warnings:

  - You are about to drop the column `base_price` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `discount_percentage` on the `product_details` table. All the data in the column will be lost.
  - You are about to drop the column `is_on_sale` on the `product_details` table. All the data in the column will be lost.
  - Made the column `item_id` on table `invoice_items` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `price` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "created_by" UUID,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "invoice_items" ALTER COLUMN "item_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "items" DROP COLUMN "base_price",
ADD COLUMN     "created_by" UUID,
ADD COLUMN     "discount_percentage" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "is_on_sale" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "price" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "product_details" DROP COLUMN "discount_percentage",
DROP COLUMN "is_on_sale",
ADD COLUMN     "minimum_stock_level" INTEGER NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
