/*
  Warnings:

  - You are about to drop the column `activeExpires` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "activeExpires",
ADD COLUMN     "expiresAt" BIGINT NOT NULL DEFAULT 0;
