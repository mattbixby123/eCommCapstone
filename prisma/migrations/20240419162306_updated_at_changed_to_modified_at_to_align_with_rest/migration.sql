/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `product` table. All the data in the column will be lost.
  - Added the required column `modifiedAt` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "updatedAt",
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;
