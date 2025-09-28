import { prisma } from "../../../../prisma/prisma-client";
import ProductClient from "./frontPage";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductPage(props: { params: { id: string } }) {
    const { id } = props.params;
    const productId = Number(id);

    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { images: true },
    });

    if (!product) return notFound();

    const allProducts = await prisma.product.findMany({
        where: { id: { not: productId } },
        include: { images: true },
    });


    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    const relatedProducts = shuffled.slice(0, 5);

    return (
        <ProductClient
            product={product}
            relatedProducts={relatedProducts}
            user={null}
        />
    );
}
