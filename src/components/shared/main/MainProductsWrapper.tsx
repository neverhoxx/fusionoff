import { prisma } from "../../../../prisma/prisma-client";
import MainProducts from "./products";

export default async function MainProductsWrapper() {
    const products = await prisma.product.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
        take: 10,
    });

    return <MainProducts products={products} />;
}
