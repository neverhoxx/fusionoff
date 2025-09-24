import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { prisma } from "../../prisma/prisma-client";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    const payload = verifyToken(token!);
    if (!payload) return null;

    return await prisma.user.findUnique({
        where: { id: payload.userId },
        select: {
            id: true,
            email: true,
            username: true,
            isAdmin: true
        },
    });
}
