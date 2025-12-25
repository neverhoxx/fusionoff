"use client";

import { useState } from "react";
import Image from "next/image";

type Product = {
    id: number;
    title: string;
    subtitle?: string | null;
    price: number;
    description?: string | null;
    material?: string | null;
    images: { id: number; url: string }[];
};

export default function HoodiesAdminProductsList({ products }: { products: Product[] }) {
    const [items, setItems] = useState(products);
    const [editing, setEditing] = useState<Product | null>(null);

    const handleDelete = async (id: number) => {
        const res = await fetch(`/api/products/hoodies/${id}`, { method: "DELETE" });

        if (res.ok) {
            setItems((prev) => prev.filter((p) => p.id !== id));
        } else {
            let errMessage = "Unknown error";

            const contentType = res.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                try {
                    const err = await res.json();
                    errMessage = err.error || errMessage;
                } catch {
                    // parsing failed
                }
            }

            alert(`Ошибка: ${errMessage}`);
        }
    };

    const handleSave = async (
        updated: Product,
        newFiles: File[],
        keepImages: string[]
    ) => {
        let uploadedUrls: string[] = [];

        for (const file of newFiles) {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.secure_url) uploadedUrls.push(data.secure_url);
        }

        const res = await fetch(`/api/products/hoodies/${updated.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...updated,
                images: [...keepImages, ...uploadedUrls],
            }),
        });

        if (res.ok) {
            const updatedProduct = await res.json();
            setItems((prev) =>
                prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
            );
            setEditing(null);
        }
    };


    if (items.length === 0) {
        return <p className="mt-4 text-gray-500">Пока нет товаров</p>;
    }

    return (
        <div className="mt-6 space-y-4">
            {items.map((p) =>
                editing?.id === p.id ? (
                    <EditForm
                        key={p.id}
                        product={p}
                        onSave={handleSave}
                        onCancel={() => setEditing(null)}
                    />
                ) : (
                    <div
                        key={p.id}
                        className="flex flex-wrap items-center justify-between border p-4 rounded gap-2"
                    >
                        <div>
                            {p.images.length > 0 ? (
                                <Image
                                    src={p.images[0].url}
                                    alt={p.title}
                                    width={80}
                                    height={80}
                                    className="mx-auto object-cover rounded"
                                />
                            ) : (
                                <div className="w-[155px] h-[193px] md:w-[314px] md:h-[346px] bg-gray-200 flex items-center justify-center rounded">
                                    <span className="text-sm text-gray-500">Нет фото</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold">{p.title}</h3>
                            <span className="text-sm text-gray-600">${p.price}</span>
                            {p.description && (
                                <p className="text-sm text-gray-500 whitespace-pre-line">
                                    {p.description}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => setEditing(p)}
                                className="px-3 py-1 bg-black text-white rounded cursor-pointer"
                            >
                                Редактировать
                            </button>
                            <button
                                onClick={() => handleDelete(p.id)}
                                className="px-3 py-1 bg-black text-white rounded cursor-pointer"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

function EditForm({
    product,
    onSave,
    onCancel,
}: {
    product: Product;
    onSave: (product: Product, newFiles: File[], keepImages: string[]) => void;
    onCancel: () => void;
}) {
    const [title, setTitle] = useState(product.title);
    const [subtitle, setSubtitle] = useState(product.subtitle || "");
    const [price, setPrice] = useState(product.price.toString());
    const [description, setDescription] = useState(product.description || "");
    const [material, setMaterial] = useState(product.material || "");

    const [existingImages, setExistingImages] = useState<string[]>(
        product.images.map(i => i.url)
    );

    const [newFiles, setNewFiles] = useState<File[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSave(
            {
                ...product,
                title,
                subtitle,
                price: parseFloat(price),
                description,
                material,
            },
            newFiles,
            existingImages
        );
    };

    return (
        <form onSubmit={handleSubmit} className="border p-4 space-y-4">
            <input value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full" />

            <input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="border p-2 w-full" />

            <input value={price} onChange={e => setPrice(e.target.value)} className="border p-2 w-full" />

            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="border p-2 w-full"
            />

            <div className="flex gap-3 flex-wrap">
                {existingImages.map((img) => (
                    <div key={img} className="relative w-24 h-24">
                        <img src={img} className="w-full h-full object-cover rounded" />
                        <button
                            type="button"
                            onClick={() =>
                                setExistingImages((prev) =>
                                    prev.filter((i) => i !== img)
                                )
                            }
                            className="absolute top-1 right-1 bg-black text-white w-5 h-5 rounded-full"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <input
                type="file"
                multiple
                onChange={(e) =>
                    setNewFiles(e.target.files ? Array.from(e.target.files) : [])
                }
            />

            <button className="bg-black text-white px-4 py-2 rounded">
                Сохранить
            </button>
        </form>
    );
}


