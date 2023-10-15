/*
  Warnings:

  - Added the required column `turfId` to the `fields` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fields" ADD COLUMN     "turfId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_turfId_fkey" FOREIGN KEY ("turfId") REFERENCES "turfs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
