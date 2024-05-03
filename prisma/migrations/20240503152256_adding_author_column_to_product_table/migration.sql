/*
  Warnings:

  - Added the required column `author` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "author" VARCHAR(255) NOT NULL;
