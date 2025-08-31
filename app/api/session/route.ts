import { cookies } from "next/headers";

import prisma from "@/lib/prisma";
import { lucia } from "@/app/lib/auth";


export async function GET() {
  try {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value;

    if (!sessionId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { session, user } = await lucia.validateSession(sessionId);

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const mahasiswa = await prisma.mahasiswa.findUnique({
      where: { usersId: user.id },
      include: { users: true }
    });

    return Response.json({
      name: mahasiswa?.users.name || "",
      nim: mahasiswa?.nim || ""
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
