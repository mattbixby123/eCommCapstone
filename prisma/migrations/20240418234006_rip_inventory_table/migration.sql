/*
  Warnings:

  - You are about to drop the column `inventoryId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `productInventoryId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `productInventory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `inventory` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_productInventoryId_fkey";

-- DropForeignKey
ALTER TABLE "productInventory" DROP CONSTRAINT "productInventory_categoryId_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "inventoryId",
DROP COLUMN "productInventoryId",
ADD COLUMN     "inventory" INTEGER NOT NULL;

-- DropTable
DROP TABLE "productInventory";
