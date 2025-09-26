import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, username, password } = await req.json();

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

        const usernameRegex = /^[a-z0-9]{3,20}$/;
        if (!usernameRegex.test(username)) {
            return NextResponse.json(
                {
                    error:
                        "Username must be 3–20 characters, lowercase letters and digits only.",
                },
                { status: 400 }
            );
        }

        const usernameTaken = await prisma.user.findUnique({ where: { username } });
        if (usernameTaken) {
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

        return NextResponse.json({
            user: { id: user.id, email: user.email, username: user.username },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
