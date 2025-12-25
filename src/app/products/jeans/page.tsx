import { prisma } from "../../../../prisma/prisma-client";
import Products from "./frontPage";

export const dynamic = 'force-dynamic';

export default async function JeansProductsWrapper() {
    const products = await prisma.jeans.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    return <Products products={products} />;
}