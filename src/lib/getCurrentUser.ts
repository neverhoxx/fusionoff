import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { prisma } from "../../prisma/prisma-client";

export async function getCurrentUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) return null;

        const payload = verifyToken(token);
        if (!payload) return null;

        const userId = parseInt(payload.userId, 10);
        if (isNaN(userId)) return null;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                username: true,
                isAdmin: true
            },
        });

        return user ?? null;
    } catch (err) {
        console.error("getCurrentUser error:", err);
        return null;
    }
}
