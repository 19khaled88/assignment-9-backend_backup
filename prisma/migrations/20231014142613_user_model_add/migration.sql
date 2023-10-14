-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('ADMIN', 'USER', 'SUPER_ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleEnumType" NOT NULL DEFAULT 'USER',
    "contactNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
