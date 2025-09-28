"use client";
import { Container } from "@/components/shared/container";

import { ProductCard } from "./product-card";

type Product = {
    id: number;
    title: string;
    price: number;
    images: { id: number; url: string }[];
};

export default function Products({ products }: { products: Product[] }) {
    return (
        <Container className="pt-20">
            <h2 className="text-[30px] font-bold">НОВАЯ КОЛЛЕКЦИЯ</h2>
            <div className="my-[50px] flex gap-0 flex-wrap justify-between">
                {products.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </Container>
    );
}

