/*
  Warnings:

  - You are about to drop the column `name` on the `fields` table. All the data in the column will be lost.
  - Added the required column `code` to the `fields` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fields" DROP COLUMN "name",
ADD COLUMN     "code" TEXT NOT NULL;
