import { prisma } from "../../../../prisma/prisma-client";
import HoodiesAdminProductsList from "./AdminProductsList";

export default async function HoodiesAdminProductsWrapper() {
    const products = await prisma.hoodies.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    return <HoodiesAdminProductsList products={products} />;
}
