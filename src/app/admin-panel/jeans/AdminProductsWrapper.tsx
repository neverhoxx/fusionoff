import { prisma } from "../../../../prisma/prisma-client";
import AdminProductsList from "./AdminProductsList";

export default async function JeansAdminProductsWrapper() {
    const products = await prisma.jeans.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    return <AdminProductsList products={products} />;
}
