"use server";

import { registerSchema } from "@/app/lib/schema";
import { ActionResult } from "@/app/type";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bycrpt from 'bcrypt'


export async function Register(
    _:unknown,
    formData: FormData,
) : Promise<ActionResult>{
    const validate = registerSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        nama: formData.get("nama"),
        nim: formData.get("nim"),
        angkatan: formData.get("angkatan"),
    })
    if(!validate.success){
        return {
            error: validate.error.issues[0].message
        }
    }
    const existingUser = await prisma.users.findFirst({
        where: {
            email: validate.data.email,
        }
    })

    if(existingUser){
        return {
            error: "Email sudah terdaftar"
        }
    }

    const hashPassword = bycrpt.hashSync(validate.data.password, 12);

    try {
        const newUser = await prisma.users.create({
            data: {
                email: validate.data.email,
                password: hashPassword,
                name: validate.data.nama,
                role: 'mahasiswa',
            }
        })

        await prisma.mahasiswa.create({
            data:{
                jurusan:'Teknik Sipil',
                nim: validate.data.nim,
                angkatan: parseInt(validate.data.angkatan),
                usersId: newUser.id,
                isTA: false,
            }
        })
    } catch (error) {
        console.log(error);
        return{
            error:	"Terjadi kesalahan pada server"
        }
    }
    return redirect("/login");
}