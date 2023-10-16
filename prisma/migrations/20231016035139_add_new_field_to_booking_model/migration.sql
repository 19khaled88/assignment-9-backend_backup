/*
  Warnings:

  - Added the required column `fieldId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameTypeId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turfId` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "fieldId" TEXT NOT NULL,
ADD COLUMN     "gameTypeId" TEXT NOT NULL,
ADD COLUMN     "turfId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_turfId_fkey" FOREIGN KEY ("turfId") REFERENCES "turfs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_gameTypeId_fkey" FOREIGN KEY ("gameTypeId") REFERENCES "game-types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
