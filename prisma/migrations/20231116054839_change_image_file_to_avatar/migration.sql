/*
  Warnings:

  - You are about to drop the column `image` on the `turfs` table. All the data in the column will be lost.
  - Added the required column `avatar` to the `turfs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "turfs" DROP COLUMN "image",
ADD COLUMN     "avatar" TEXT NOT NULL;
