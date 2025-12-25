import { prisma } from "../../../../prisma/prisma-client";
import MainCases from "./cases";

export default async function MainCasesWrapper() {
    const cases = await prisma.cases.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    const products = cases.map((c) => ({
        ...c,
        productType: "CASE" as const,
        createdAt: c.createdAt.toISOString(),
    }));

    return <MainCases products={products} />;
}

