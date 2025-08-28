import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { RoleUser } from "@prisma/client";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

const adapter = new PrismaAdapter(prisma.session, prisma.users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    }
},
getUserAttributes: (attributes) => {
    return {
        id: attributes.id,
        email: attributes.email,
        name: attributes.name,
        role: attributes.role as RoleUser
    };
}
});

export const getUser = cache(async () => {
    const cookieStore = await cookies(); // ✅ harus di-await
    const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) return null;

    const { user, session } = await lucia.validateSession(sessionId);

    try {
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookieStore.set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }

        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookieStore.set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }
    } catch (err) {
        console.error("Session error:", err);
    }

    return user;
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    user_id: number;
    DatabaseUserAttributes: {
        id: number
        email: string
        name: string
        role: RoleUser
    }
  }
}