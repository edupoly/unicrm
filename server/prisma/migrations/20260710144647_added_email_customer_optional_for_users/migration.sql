-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "email" VARCHAR(255);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;
