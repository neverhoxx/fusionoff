"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function ProductForm() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [subtitle, setSubtitle] = useState("");
    const [polup, setPolup] = useState("");
    const [polub, setPolub] = useState("");
    const [shirinab, setShirinab] = useState("");
    const [koleno, setKoleno] = useState("");
    const [dlina, setDlina] = useState("");
    const [vihod, setVihod] = useState("");
    const [material, setMaterial] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const compressFile = async (file: File) => {
        try {
            const options = {
                maxSizeMB: 1, // максимум 1MB на файл
                maxWidthOrHeight: 1920, // ресайз до 1920px
                useWebWorker: true,
            };
            return await imageCompression(file, options);
        } catch (error) {
            console.error("Ошибка сжатия:", error);
            return file;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        let uploadedUrls: string[] = [];

        if (files) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];

                // Сжимаем файл перед загрузкой
                file = await compressFile(file);

                const formData = new FormData();
                formData.append("file", file);

                try {
                    const uploadRes = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });

                    const data = await uploadRes.json();
                    if (data.secure_url) {
                        uploadedUrls.push(data.secure_url);
                    } else {
                        throw new Error(data.error || "Ошибка загрузки");
                    }
                } catch (err: any) {
                    console.error("Ошибка загрузки:", err);
                    setMessage(`❌ Ошибка загрузки файла: ${err.message}`);
                    setLoading(false);
                    return;
                }
            }
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                subtitle,
                price,
                description,
                material,
                polup,
                polub,
                shirinab,
                koleno,
                dlina,
                vihod,
                images: uploadedUrls,
            }),
        });

        if (res.ok) {
            setMessage("✅ Товар добавлен!");
            setTitle("");
            setPrice("");
            setFiles(null);
            setDescription("");
            setSubtitle("");
            setPolup("");
            setPolub("");
            setShirinab("");
            setKoleno("");
            setDlina("");
            setVihod("");
            setMaterial("");
        } else {
            const error = await res.json();
            setMessage(`❌ Ошибка: ${error.error}`);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
            <div>
                <label className="block mb-1">Название:</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
            </div>

            <div>
                <label className="block mb-1">Цена:</label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
            </div>

            <div>
                <label className="block mb-1">
                    Полное название (на странице с деталями продукта):
                </label>
                <input
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
            </div>

            <div>
                <label className="block mb-1">Материал</label>
                <input
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
            </div>

            <div>
                <label htmlFor="description">Описание</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full h-40"
                    placeholder="Введите описание товара..."
                />
            </div>

            <div>
                <label className="block mb-2">Замеры</label>

                <label className="block mb-1">Полупояс</label>
                <input
                    value={polup}
                    onChange={(e) => setPolup(e.target.value)}
                    className="border px-2 py-1 w-full"
                />

                <label className="block mb-1">Полу обхват бедер</label>
                <input
                    value={polub}
                    onChange={(e) => setPolub(e.target.value)}
                    className="border px-2 py-1 w-full"
                />

                <label className="block mb-1">Ширина бедра</label>
                <input
                    value={shirinab}
                    onChange={(e) => setShirinab(e.target.value)}
                    className="border px-2 py-1 w-full"
                />

                <label className="block mb-1">Колено</label>
                <input
                    value={koleno}
                    onChange={(e) => setKoleno(e.target.value)}
                    className="border px-2 py-1 w-full"
                />

                <label className="block mb-1">Длина</label>
                <input
                    value={dlina}
                    onChange={(e) => setDlina(e.target.value)}
                    className="border px-2 py-1 w-full"
                />

                <label className="block mb-1">Выход</label>
                <input
                    value={vihod}
                    onChange={(e) => setVihod(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
            </div>

            <div>
                <label className="block mb-1">Картинки:</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setFiles(e.target.files)}
                    className="border px-2 py-1 w-full"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-black text-white rounded cursor-pointer"
            >
                {loading ? "Загрузка..." : "Добавить товар"}
            </button>

            {message && <p className="mt-2">{message}</p>}
        </form>
    );
}
