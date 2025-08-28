"use server"

import { loginSchema } from "@/app/lib/schema";
import { ActionResult } from "@/app/type";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bycrpt from 'bcrypt'

import { cookies } from "next/headers";
import { lucia } from "@/app/lib/auth";



export async function LogIn(
    _:unknown,
    formData: FormData,
): Promise<ActionResult>{

    const validate = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    })

    console.log(validate);
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

    if (!existingUser) {
        return {
            error: "Akun tidak ditemukan"
        }
    } 

    const comparePassword = bycrpt.compareSync(validate.data.password, existingUser.password);

    if(!comparePassword){
        return {
            error: "Password salah"
        }
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookieStore = await cookies();
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/dashboard");
}