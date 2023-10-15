/*
  Warnings:

  - You are about to drop the column `price` on the `game-types` table. All the data in the column will be lost.
  - Added the required column `price` to the `game-offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game-offers" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "game-types" DROP COLUMN "price";
