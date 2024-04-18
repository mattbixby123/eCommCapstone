-- DropForeignKey
ALTER TABLE "orderDetails" DROP CONSTRAINT "orderDetails_customerId_fkey";

-- DropForeignKey
ALTER TABLE "orderDetails" DROP CONSTRAINT "orderDetails_paymentDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "shoppingSession" DROP CONSTRAINT "shoppingSession_customerId_fkey";

-- AddForeignKey
ALTER TABLE "shoppingSession" ADD CONSTRAINT "shoppingSession_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_paymentDetailsId_fkey" FOREIGN KEY ("paymentDetailsId") REFERENCES "paymentDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
