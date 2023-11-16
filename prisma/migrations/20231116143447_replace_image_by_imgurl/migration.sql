/*
  Warnings:

  - You are about to drop the column `image` on the `game-types` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `turfs` table. All the data in the column will be lost.
  - Added the required column `imgurl` to the `game-types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgurl` to the `turfs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game-types" DROP COLUMN "image",
ADD COLUMN     "imgurl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "turfs" DROP COLUMN "image",
ADD COLUMN     "imgurl" TEXT NOT NULL;
