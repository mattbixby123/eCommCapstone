/*
  Warnings:

  - You are about to drop the `orderDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderDetail" DROP CONSTRAINT "orderDetail_customerId_fkey";

-- DropForeignKey
ALTER TABLE "orderItem" DROP CONSTRAINT "orderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orderItem" DROP CONSTRAINT "orderItem_productId_fkey";

-- DropTable
DROP TABLE "orderDetail";

-- DropTable
DROP TABLE "orderItem";
