"use client";
import Image from "next/image";
import { useState } from "react";
import { Container } from "../container";

import Link from "next/link";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

type Product = {
    id: number;
    title: string;
    price: number;
    images: { id: number; url: string }[];
};

export default function MainProducts({ products }: { products: Product[] }) {
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

function ProductCard({ item }: { item: Product }) {
    const [index, setIndex] = useState(0);

    const nextImg = () => {
        setIndex((prev) => (prev + 1) % item.images.length);
    };

    const prevImg = () => {
        setIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
    };

    return (
        <Link href={`/products/${item.id}`} className="md:w-[352px] flex flex-col mt-[25px] select-none w-[155px] cursor-pointer">
            <div className="relative group">
                {item.images.length > 0 ? (
                    <Image
                        src={item.images[index].url}
                        alt={item.title}
                        width={314}
                        height={346}
                        className="md:w-[314px] w-[155px] md:h-[346px] h-[193px] mx-auto object-cover rounded"
                    />
                ) : (
                    <div className="md:w-[314px] w-[155px] md:h-[346px] h-[193px] bg-gray-200 flex items-center justify-center rounded">
                        <span className="text-sm text-gray-500">Нет фото</span>
                    </div>
                )}
                {item.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImg}
                            className="absolute top-1/2 left-2 -translate-y-1/2 text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer z-10"
                        >
                            <IoIosArrowBack />
                        </button>
                        <button
                            onClick={nextImg}
                            className="absolute top-1/2 right-2 -translate-y-1/2 text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer z-10"
                        >
                            <IoIosArrowForward />
                        </button>
                    </>
                )}
            </div>
            <h3 className="md:text-[14px] text-[10px] font-medium text-start">{item.title}</h3>
            <span className="md:text-[14px] text-[10px] font-medium">{item.price}₽</span>
        </Link>
    );
}
