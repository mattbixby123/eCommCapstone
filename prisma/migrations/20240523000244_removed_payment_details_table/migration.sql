/*
  Warnings:

  - You are about to drop the `paymentDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderDetail" DROP CONSTRAINT "orderDetail_paymentDetailsId_fkey";

-- DropTable
DROP TABLE "paymentDetail";
