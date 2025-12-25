import { prisma } from "../../../prisma/prisma-client";
import ProductsPage from "./products";

export default async function MainProductsWrapper() {
    const jeans = await prisma.jeans.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    const hoodies = await prisma.hoodies.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    const cases = await prisma.cases.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    const allProducts = [
        ...jeans.map((p) => ({
            ...p,
            productType: "JEANS" as const,
            createdAt: p.createdAt.toISOString(),
        })),
        ...hoodies.map((p) => ({
            ...p,
            productType: "HOODIE" as const,
            createdAt: p.createdAt.toISOString(),
        })),
        ...cases.map((p) => ({
            ...p,
            productType: "CASE" as const,
            createdAt: p.createdAt.toISOString(),
        })),
    ]
    return <ProductsPage products={allProducts} />;
}
