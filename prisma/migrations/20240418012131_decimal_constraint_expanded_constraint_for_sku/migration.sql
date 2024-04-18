/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "SKU" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);
