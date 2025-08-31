"use server"
import { daftarTASchema } from "@/app/lib/schema";
import { ActionResult } from "@/app/type";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function addTugasAkhir(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  // validasi awal
  const validate = daftarTASchema.safeParse({
    nim: formData.get("nim"),
    topikTAId: formData.get("judul"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  try {
    // cari mahasiswa berdasarkan NIM
    const mahasiswa = await prisma.mahasiswa.findUnique({
      where: { nim: validate.data.nim },
    });

    if (!mahasiswa) {
      return { error: "Mahasiswa dengan NIM tersebut tidak ditemukan" };
    }

    // simpan ke tabel PendaftaranTA
    await prisma.pendaftaranTA.create({
      data: {
        mahasiswaId: mahasiswa.id,
        topikTAId: validate.data.topikTAId,
        tanggalDaftar: new Date(),
      },
    });

    await prisma.mahasiswa.update({
      where: { id: mahasiswa.id },
      data: { isTA: true },})
  } catch (error) {
    console.error(error);
    return { error: "Gagal menyimpan data pendaftaran TA" };
  }

  return redirect("/dashboard/tugas-akhir");
}


// export async function getSt