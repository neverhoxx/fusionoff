export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            title,
            subtitle,
            price,
            description,
            material,
            polup,
            polub,
            shirinab,
            koleno,
            dlina,
            vihod,
            images,
        } = body;

        const product = await prisma.product.create({
            data: {
                title,
                subtitle,
                price: parseFloat(price),
                description,
                material,
                polup,
                polub,
                shirinab,
                koleno,
                dlina,
                vihod,
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

