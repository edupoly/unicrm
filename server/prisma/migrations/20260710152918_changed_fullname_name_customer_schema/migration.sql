/*
  Warnings:

  - You are about to drop the column `full_name` on the `customers` table. All the data in the column will be lost.
  - Added the required column `name` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "full_name",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;
