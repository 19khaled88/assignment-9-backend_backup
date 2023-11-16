/*
  Warnings:

  - You are about to drop the column `avatar` on the `turfs` table. All the data in the column will be lost.
  - Added the required column `image` to the `turfs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "turfs" DROP COLUMN "avatar",
ADD COLUMN     "image" TEXT NOT NULL;
