-- CreateEnum
CREATE TYPE "StatusEnumType" AS ENUM ('PENDING', 'EXECUTED');

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "payment_status" "StatusEnumType" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
