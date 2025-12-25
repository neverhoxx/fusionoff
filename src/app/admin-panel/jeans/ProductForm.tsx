"use client";

import { useState, useEffect } from "react";

type ImagePreview = {
    file: File;
    preview: string;
};

export default function JeansProductForm() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [material, setMaterial] = useState("");
    const [images, setImages] = useState<ImagePreview[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [collections, setCollections] = useState<any[]>([]);
    const [collectionId, setCollectionId] = useState<number | null>(null);
    const [newCollection, setNewCollection] = useState("");


    const handleAddImages = (files: FileList | null) => {
        if (!files) return;

        const newImages = Array.from(files).map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...newImages]);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const uploadedUrls: string[] = [];

        try {
            for (const img of images) {
                const formData = new FormData();
                formData.append("file", img.file);

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();
                if (!data.secure_url) throw new Error("Ошибка загрузки");
                uploadedUrls.push(data.secure_url);
            }

            const res = await fetch("/api/products/jeans", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    price,
                    description,
                    subtitle,
                    material,
                    collectionId,
                    images: uploadedUrls,
                }),
            });

            if (!res.ok) throw new Error("Ошибка при сохранении");

            setMessage("✅ Товар успешно добавлен!");
            setTitle("");
            setPrice("");
            setDescription("");
            setSubtitle("");
            setMaterial("");
            setImages([]);
        } catch (err) {
            setMessage("❌ Ошибка при добавлении товара");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetch("/api/collections")
            .then(res => res.json())
            .then(setCollections);
    }, []);


    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">

            <input
                placeholder="Название"
                className="border p-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                placeholder="Цена"
                type="number"
                className="border p-2 w-full"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                placeholder="Подзаголовок"
                className="border p-2 w-full"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
            />

            <input
                placeholder="Материал"
                className="border p-2 w-full"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
            />

            <textarea
                placeholder="Описание"
                className="border p-2 w-full h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className="space-y-2">
                <label className="font-medium">Коллекция</label>

                <select
                    className="border p-2 w-full"
                    value={collectionId ?? ""}
                    onChange={(e) => setCollectionId(Number(e.target.value))}
                >
                    <option value="">— выбрать коллекцию —</option>
                    {collections.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <div className="flex gap-2">
                    <input
                        placeholder="Новая коллекция"
                        className="border p-2 flex-1"
                        value={newCollection}
                        onChange={(e) => setNewCollection(e.target.value)}
                    />
                    <button
                        type="button"
                        className="bg-black text-white px-4"
                        onClick={async () => {
                            if (!newCollection) return;

                            const res = await fetch("/api/collection", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ name: newCollection }),
                            });

                            const data = await res.json();
                            setCollections((prev) => [...prev, data]);
                            setCollectionId(data.id);
                            setNewCollection("");
                        }}
                    >
                        +
                    </button>
                </div>
            </div>


            <div>
                <label className="block mb-2 font-medium">Изображения</label>

                <div className="flex flex-wrap gap-4">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="relative w-28 h-28 border rounded overflow-hidden"
                        >
                            <img
                                src={img.preview}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    <label className="w-28 h-28 border-dashed border-2 flex items-center justify-center cursor-pointer text-sm text-gray-500">
                        +
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleAddImages(e.target.files)}
                        />
                    </label>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
                {loading ? "Загрузка..." : "Добавить товар"}
            </button>

            {message && (
                <p className="text-sm mt-2 text-center">{message}</p>
            )}
        </form>
    );
}
