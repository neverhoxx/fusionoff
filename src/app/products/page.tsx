import { prisma } from "../../../prisma/prisma-client";
import Products from "./frontPage";

export const dynamic = 'force-dynamic';

export default async function MainProductsWrapper() {
    const products = await prisma.product.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
        take: 10,
    });

    return <Products products={products} />;
}