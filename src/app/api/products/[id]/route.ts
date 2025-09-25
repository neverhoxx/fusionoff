import { prisma } from "../../../../../prisma/prisma-client";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    context: { params: { id: string } }
) {
    try {
        const { id } = context.params;
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return NextResponse.json({ error: "Некорректный ID" }, { status: 400 });
        }

        const body = await req.json();
        const { title, price, description, images } = body;

        const updated = await prisma.product.update({
            where: { id: productId },
            data: {
                title,
                price: parseFloat(price),
                description,
                images: images
                    ? {
                        deleteMany: {},
                        create: images.map((url: string) => ({ url })),
                    }
                    : undefined,
            },
            include: { images: true },
        });

        return NextResponse.json(updated);
    } catch (err) {
        console.error("Ошибка обновления:", err);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return NextResponse.json({ error: "Некорректный ID" }, { status: 400 });
        }

        await prisma.productImage.deleteMany({
            where: { productId },
        });

        await prisma.product.delete({
            where: { id: productId },
        });

        return NextResponse.json({ message: "Продукт удален" });
    } catch (err: unknown) {
        console.error("Ошибка удаления:", err);

        if (err instanceof Error && (err as any).code === "P2025") {
            return NextResponse.json({ error: "Продукт не найден" }, { status: 404 });
        }

        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}


