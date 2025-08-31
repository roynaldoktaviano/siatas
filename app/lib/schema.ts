import z from "zod";


export const loginSchema = z.object({
    email: z
    .string()
    .nonempty({ message: "Email wajib di isi" })
    .email({ message: "Email Salah" }),
  password: z.string().nonempty("Password wajib di isi").min(6, "Password harus lebih dari 6 karakter"),
});


export const registerSchema = z.object({
  email: z
  .string()
  .nonempty({ message: "Email wajib di isi" })
  .email({ message: "Email Salah" }),
password: z.string().nonempty("Password wajib di isi").min(6, "Password harus lebih dari 6 karakter"),
nama: z.string().nonempty("Nama wajib di isi"),
nim: z.string().nonempty("NIM wajib di isi").min(10, "NIM harus 10 karakter").max(10, "NIM harus 10 karakter"),
angkatan: z.string().nonempty("Angkatan wajib di isi").min(4, "Angkatan harus 4 karakter").max(4, "Angkatan harus 4 karakter"),
});

export const daftarTASchema = z.object({
  nim: z.string()
    .nonempty({ message: "NIM wajib di isi" })
    .length(10, "NIM harus 10 karakter"),
  topikTAId: z.coerce.number().int().positive({ message: "Topik TA wajib diisi" }),
});