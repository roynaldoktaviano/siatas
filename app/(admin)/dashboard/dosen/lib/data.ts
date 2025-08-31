import prisma from "@/lib/prisma";
export async function getDosen() {
    try {
      const dosens = await prisma.dosen.findMany({
        include: {
          users: true,   // ambil data user (name, email, role)
          bidang: true,  // ambil semua bidang yang berelasi
        },
      });
  
      // flatten hasilnya biar gampang dipakai di table
      return dosens.map(d => ({
        id: d.id,
        name: d.users.name,
        role: d.users.role,
        nidn: d.nidn,
        bidang: d.bidang.map(b => b.nama).join(", ") || "-", 
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }