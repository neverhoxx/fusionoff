import { prisma } from "../../../../prisma/prisma-client";
import ProductClient from "./frontPage";
import { notFound } from "next/navigation";

export default async function ProductPage(props: { params: { id: string } }) {
    const { id } = props.params;
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: { images: true },
    });

    if (!product) return notFound();

    return <ProductClient product={product} user={null} />;
}
