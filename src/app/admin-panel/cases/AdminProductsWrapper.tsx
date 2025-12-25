import { prisma } from "../../../../prisma/prisma-client";
import CasesAdminProductsList from "./AdminProductsList";

export default async function CasesAdminProductsWrapper() {
    const products = await prisma.cases.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    return <CasesAdminProductsList products={products} />;
}
