import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, username, fullName, password } = await req.json();

        if (!email || !username || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        const usernameRegex = /^[a-z0-9]+$/;

        if (!usernameRegex.test(username)) {
            return NextResponse.json(
                {
                    error:
                        "Username must be in lowercase Latin letters and digits only. No spaces, uppercase letters, or special characters.",
                },
                { status: 400 }
            );
        }

        const user_name_existing = await prisma.user.findUnique({ where: { username } });
        if (user_name_existing) {
            return NextResponse.json(
                { error: "Username already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                address: "none",
                postcode: "none",
                isAdmin: email === "yehorkiiakh@gmail.com",
            },
        });

        return NextResponse.json({ user: { id: user.id, email: user.email } });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Invalid request data" },
            { status: 400 }
        );
    }
}
