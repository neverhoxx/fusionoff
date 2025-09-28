import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: "products",
                        format: "webp",
                        quality: "auto",
                    },
                    (err, uploadResult) => {
                        if (err) reject(err);
                        else resolve(uploadResult);
                    }
                )
                .end(buffer);
        });

        return NextResponse.json(result);
    } catch (err) {
        console.error("Ошибка загрузки:", err);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
