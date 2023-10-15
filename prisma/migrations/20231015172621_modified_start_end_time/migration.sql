/*
  Warnings:

  - You are about to drop the column `booking_time` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `offer_price` on the `game-offers` table. All the data in the column will be lost.
  - You are about to drop the column `offer_time` on the `game-offers` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_per_hour` to the `game-offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "booking_time",
ADD COLUMN     "end_time" TEXT NOT NULL,
ADD COLUMN     "start_time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "game-offers" DROP COLUMN "offer_price",
DROP COLUMN "offer_time",
ADD COLUMN     "price_per_hour" DOUBLE PRECISION NOT NULL;
