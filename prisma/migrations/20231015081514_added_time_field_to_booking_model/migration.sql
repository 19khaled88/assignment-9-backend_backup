/*
  Warnings:

  - You are about to drop the column `price` on the `game-offers` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `game-offers` table. All the data in the column will be lost.
  - Added the required column `booking_time` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offer_price` to the `game-offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offer_time` to the `game-offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "booking_time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "game-offers" DROP COLUMN "price",
DROP COLUMN "time",
ADD COLUMN     "offer_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "offer_time" TIMESTAMP(3) NOT NULL;
