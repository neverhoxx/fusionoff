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
    polup?: string | null;
    polub?: string | null;
    shirinab?: string | null;
    koleno?: string | null;
    dlina?: string | null;
    vihod?: string | null;
    images: { id: number; url: string }[];
};

export default function AdminProductsList({ products }: { products: Product[] }) {
    const [items, setItems] = useState(products);
    const [editing, setEditing] = useState<Product | null>(null);

    const handleDelete = async (id: number) => {
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

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

    const handleSave = async (updated: Product, files?: FileList | null) => {
        let uploadedUrls: string[] = [];

        if (files) {
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append("file", files[i]);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await uploadRes.json();
                if (data.secure_url) uploadedUrls.push(data.secure_url);
            }
        } else {
            uploadedUrls = updated.images.map((img) => img.url);
        }

        const res = await fetch(`/api/products/${updated.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...updated, images: uploadedUrls }),
        });

        if (res.ok) {
            const newProduct = await res.json();
            setItems((prev) =>
                prev.map((p) => (p.id === newProduct.id ? newProduct : p))
            );
            setEditing(null);
        } else {
            const err = await res.json();
            alert(`Ошибка: ${err.error}`);
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
    onSave: (p: Product, files?: FileList | null) => void;
    onCancel: () => void;
}) {
    const [title, setTitle] = useState(product.title);
    const [subtitle, setSubtitle] = useState(product.subtitle || "");
    const [price, setPrice] = useState(product.price.toString());
    const [description, setDescription] = useState(product.description || "");
    const [material, setMaterial] = useState(product.material || "");
    const [polup, setPolup] = useState(product.polup || "");
    const [polub, setPolub] = useState(product.polub || "");
    const [shirinab, setShirinab] = useState(product.shirinab || "");
    const [koleno, setKoleno] = useState(product.koleno || "");
    const [dlina, setDlina] = useState(product.dlina || "");
    const [vihod, setVihod] = useState(product.vihod || "");
    const [files, setFiles] = useState<FileList | null>(null);

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
                polup,
                polub,
                shirinab,
                koleno,
                dlina,
                vihod,
            },
            files
        );
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border p-4 rounded flex flex-col gap-2"
        >
            <h3 className="mb-2">Изменение товара</h3>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название"
                className="border px-2 py-1 w-full"
            />

            <input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Подзаголовок"
                className="border px-2 py-1 w-full"
            />

            <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Цена"
                className="border px-2 py-1 w-full"
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание"
                className="border px-2 py-1 w-full"
            />

            <input
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="Материал"
                className="border px-2 py-1 w-full"
            />

            <input
                value={polup}
                onChange={(e) => setPolup(e.target.value)}
                placeholder="Полупояс"
                className="border px-2 py-1 w-full"
            />

            <input
                value={polub}
                onChange={(e) => setPolub(e.target.value)}
                placeholder="Полуобхват бедер"
                className="border px-2 py-1 w-full"
            />

            <input
                value={shirinab}
                onChange={(e) => setShirinab(e.target.value)}
                placeholder="Ширина бедра"
                className="border px-2 py-1 w-full"
            />

            <input
                value={koleno}
                onChange={(e) => setKoleno(e.target.value)}
                placeholder="Колено"
                className="border px-2 py-1 w-full"
            />

            <input
                value={dlina}
                onChange={(e) => setDlina(e.target.value)}
                placeholder="Длина"
                className="border px-2 py-1 w-full"
            />

            <input
                value={vihod}
                onChange={(e) => setVihod(e.target.value)}
                placeholder="Выход"
                className="border px-2 py-1 w-full"
            />

            <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="border px-2 py-1 w-full"
            />

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="px-3 py-1 bg-black text-white rounded"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-3 py-1 bg-black text-white rounded"
                >
                    Отмена
                </button>
            </div>
        </form>
    );
}
