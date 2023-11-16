/*
  Warnings:

  - Added the required column `image` to the `turfs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "turfs" ADD COLUMN     "image" TEXT NOT NULL;
