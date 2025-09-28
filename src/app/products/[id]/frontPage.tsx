'use client';
import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { useCart } from "@/lib/useCart";

import RelatedProducts from "./related";

type Product = {
    id: number;
    title: string;
    subtitle?: string | null;
    description?: string | null;
    material?: string | null;
    polup?: string | null;
    polub?: string | null;
    shirinab?: string | null;
    koleno?: string | null;
    dlina?: string | null;
    vihod?: string | null;
    vipo?: string | null;
    price: number;
    images: { id: number; url: string }[];
};

type User = {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
} | null;

type RelatedProduct = {
    id: number;
    title: string;
    price: number;
    image: string;
};

export default function ProductClient({
    product,
    relatedProducts,
    user,
}: {
    product: Product;
    relatedProducts: Product[];
    user: User;
}) {
    const [activeImage, setActiveImage] = useState(
        product.images.length > 0 ? product.images[0].url : null
    );
    const [quantity] = useState<number>(1);
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity,
        });
    };

    return (
        <div className="product-det">
            <Container className="flex flex-col md:flex-col lg:flex-row gap-6 pt-5">
                <div className="lg:w-[65%] w-full flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-[280px]">
                        {activeImage ? (
                            <Image
                                src={activeImage}
                                alt={product.title}
                                width={830}
                                height={607}
                                className="max-h-[640px] object-contain rounded select-none w-full"
                            />
                        ) : (
                            <div className="w-full h-[600px] bg-gray-200 rounded flex items-center justify-center select-none">
                                Нет фото
                            </div>
                        )}
                    </div>

                    <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                        {product.images.map((img: { id: number; url: string }) => (
                            <Image
                                key={img.id}
                                src={img.url}
                                alt={product.title}
                                width={100}
                                height={100}
                                className={`cursor-pointer border rounded object-cover select-none ${activeImage === img.url ? "border-black" : "border-transparent"
                                    }`}
                                onClick={() => setActiveImage(img.url)}
                            />
                        ))}
                    </div>
                </div>

                <div className="lg:w-[35%] w-full pl-0 lg:pl-[24px]">
                    <h2 className="text-[24px] font-semibold mb-2">{product.title}</h2>
                    <p className="text-[18px] mb-3">{product.price}₽</p>

                    <button
                        onClick={handleAddToCart}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                    >
                        Добавить в корзину
                    </button>

                    <div className="mt-5">
                        <div className="py-2 border-y-2 mb-1">
                            <h3 className="text-[18px]">Описание</h3>
                        </div>
                        <p className="mb-5">{product.subtitle}</p>

                        <h3 className="font-semibold">Описание товара</h3>
                        <p className="whitespace-pre-line">{product.description}</p>

                        <h3 className="font-semibold">Материал</h3>
                        <p>{product.material}</p>

                        <h3 className="font-semibold mt-3">Размеры</h3>
                        <ul className="mb-2 list-disc pl-4">
                            <li>Полуобхват: {product.polup}</li>
                            <li>Полуобхват бёдер: {product.polub}</li>
                            <li>Ширина: {product.shirinab}</li>
                            <li>Колено: {product.koleno}</li>
                            <li>Длина: {product.dlina}</li>
                            <li>Выход: {product.vihod}</li>
                            <li>Высота посадки: {product.vipo}</li>
                        </ul>
                    </div>
                </div>
            </Container>

            <RelatedProducts products={relatedProducts} />
        </div>
    );
}