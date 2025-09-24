import { prisma } from "../../../prisma/prisma-client";
import AdminProductsList from "./AdminProductsList";

export default async function AdminProductsWrapper() {
    const products = await prisma.product.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    return <AdminProductsList products={products} />;
}
