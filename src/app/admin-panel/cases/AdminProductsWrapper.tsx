import { prisma } from "../../../../prisma/prisma-client";
import CasesAdminProductsList from "./AdminProductsList";

// Тип продукта для компонента
type CaseProduct = {
    id: number;
    title: string;
    price: number;
    images: { id: number; url: string }[];
    createdAt: string;
};

export default async function CasesAdminProductsWrapper() {
    const cases = await prisma.cases.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    const products: CaseProduct[] = cases.map((c) => ({
        id: c.id,
        title: c.title,
        price: c.price,
        images: c.images.map((img) => ({ id: img.id, url: img.url })),
        createdAt: c.createdAt.toISOString(),
    }));

    return <CasesAdminProductsList products={products} />;
}
