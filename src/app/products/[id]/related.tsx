"use client";
import { Container } from "@/components/shared/container";
import { ProductCard } from "../product-card";

type Product = {
    id: number;
    title: string;
    price: number;
    images: { id: number; url: string }[];
};

export default function RelatedProducts({ products }: { products: Product[] }) {
    if (!products || products.length === 0) return null;

    return (
        <Container className="pt-10">
            <h2 className="text-[22px] font-semibold mb-6">Вам также может понравиться</h2>
            <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-5 md:gap-6 md:overflow-visible">
                {products.slice(0, 5).map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </Container>
    );
}
