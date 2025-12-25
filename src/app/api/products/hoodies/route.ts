export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            title,
            subtitle,
            price,
            description,
            material,
            images
        } = body;

        const product = await prisma.hoodies.create({
            data: {
                title,
                subtitle,
                price: parseFloat(price),
                description,
                material,
                images: {
                    create: images.map((url: string) => ({ url })),
                },
            },
            include: { images: true },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Ошибка при добавлении товара" }, { status: 500 });
    }
}

