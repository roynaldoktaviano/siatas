-- CreateEnum
CREATE TYPE "public"."RoleUser" AS ENUM ('koordinator', 'dosen', 'mahasiswa');

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "public"."RoleUser" NOT NULL DEFAULT 'mahasiswa',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Bidang" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bidang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Mahasiswa" (
    "id" SERIAL NOT NULL,
    "nim" VARCHAR(20) NOT NULL,
    "jurusan" VARCHAR(255) NOT NULL,
    "angkatan" INTEGER NOT NULL,
    "usersId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dosen" (
    "id" SERIAL NOT NULL,
    "nidn" VARCHAR(20) NOT NULL,
    "usersId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dosen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Koordinator" (
    "id" SERIAL NOT NULL,
    "nidn" VARCHAR(20) NOT NULL,
    "usersId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Koordinator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TopikTA" (
    "id" SERIAL NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "bidangId" INTEGER NOT NULL,

    CONSTRAINT "TopikTA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PendaftaranTA" (
    "id" SERIAL NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,
    "topikTAId" INTEGER NOT NULL,
    "tanggalDaftar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PendaftaranTA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_BidangDosen" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BidangDosen_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_DosenPembimbing" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DosenPembimbing_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nim_key" ON "public"."Mahasiswa"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_usersId_key" ON "public"."Mahasiswa"("usersId");

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_nidn_key" ON "public"."Dosen"("nidn");

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_usersId_key" ON "public"."Dosen"("usersId");

-- CreateIndex
CREATE UNIQUE INDEX "Koordinator_nidn_key" ON "public"."Koordinator"("nidn");

-- CreateIndex
CREATE UNIQUE INDEX "Koordinator_usersId_key" ON "public"."Koordinator"("usersId");

-- CreateIndex
CREATE UNIQUE INDEX "PendaftaranTA_mahasiswaId_key" ON "public"."PendaftaranTA"("mahasiswaId");

-- CreateIndex
CREATE UNIQUE INDEX "PendaftaranTA_topikTAId_key" ON "public"."PendaftaranTA"("topikTAId");

-- CreateIndex
CREATE INDEX "_BidangDosen_B_index" ON "public"."_BidangDosen"("B");

-- CreateIndex
CREATE INDEX "_DosenPembimbing_B_index" ON "public"."_DosenPembimbing"("B");

-- AddForeignKey
ALTER TABLE "public"."Mahasiswa" ADD CONSTRAINT "Mahasiswa_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dosen" ADD CONSTRAINT "Dosen_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Koordinator" ADD CONSTRAINT "Koordinator_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TopikTA" ADD CONSTRAINT "TopikTA_bidangId_fkey" FOREIGN KEY ("bidangId") REFERENCES "public"."Bidang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PendaftaranTA" ADD CONSTRAINT "PendaftaranTA_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "public"."Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PendaftaranTA" ADD CONSTRAINT "PendaftaranTA_topikTAId_fkey" FOREIGN KEY ("topikTAId") REFERENCES "public"."TopikTA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BidangDosen" ADD CONSTRAINT "_BidangDosen_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Bidang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BidangDosen" ADD CONSTRAINT "_BidangDosen_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Dosen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DosenPembimbing" ADD CONSTRAINT "_DosenPembimbing_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Dosen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DosenPembimbing" ADD CONSTRAINT "_DosenPembimbing_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."TopikTA"("id") ON DELETE CASCADE ON UPDATE CASCADE;
