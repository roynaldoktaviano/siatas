/*
  Warnings:

  - The primary key for the `_BidangDosen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_DosenPembimbing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_BidangDosen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_DosenPembimbing` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_BidangDosen" DROP CONSTRAINT "_BidangDosen_AB_pkey";

-- AlterTable
ALTER TABLE "_DosenPembimbing" DROP CONSTRAINT "_DosenPembimbing_AB_pkey";

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE INDEX "Session_user_id_idx" ON "Session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_BidangDosen_AB_unique" ON "_BidangDosen"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_DosenPembimbing_AB_unique" ON "_DosenPembimbing"("A", "B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
