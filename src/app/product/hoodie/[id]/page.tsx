import { prisma } from "../../../../../prisma/prisma-client";
import HoodiesProductClient from "./frontPage";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function HoodiesProductPage({ params }: { params: { id: string } }) {
    const id = (await params).id;
    const productId = Number(id);


    if (!Number.isInteger(productId)) {
        notFound();
    }

    const product = await prisma.hoodies.findUnique({
        where: { id: productId },
        include: { images: true },
    });

    if (!product) {
        notFound();
    }

    const relatedProducts = await prisma.hoodies.findMany({
        where: {
            id: { not: productId },
        },
        take: 5,
        include: { images: true },
    });

    return (
        <HoodiesProductClient
            product={product}
            relatedProducts={relatedProducts}
            user={null}
        />
    );
}
