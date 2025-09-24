"use client";

import { useState } from "react";

export default function ImageUploadFields() {
    const [files, setFiles] = useState<File[]>([]);

    const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files && e.target.files[0]) {
            const newFiles = [...files];
            newFiles[index] = e.target.files[0];
            setFiles(newFiles);
        }
    };

    const addNewField = () => {
        setFiles([...files, new File([], "")]);
    };

    const removeField = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-2">
            <label className="block mb-1 font-medium">Картинки:</label>

            {files.map((file, i) => (
                <div key={i} className="flex items-center gap-2">
                    <input
                        type="file"
                        onChange={(e) => handleAddFile(e, i)}
                        className="border px-2 py-1 w-full"
                    />
                    <button
                        type="button"
                        onClick={() => removeField(i)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                        ✕
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={addNewField}
                className="px-3 py-1 bg-black text-white rounded"
            >
                Добавить картинку
            </button>
        </div>
    );
}
