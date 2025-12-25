import { prisma } from "../../../../prisma/prisma-client";
import Products from "./frontPage";

export const dynamic = 'force-dynamic';

export default async function CasesProductsWrapper() {
    const products = await prisma.cases.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    return <Products products={products} />;
}