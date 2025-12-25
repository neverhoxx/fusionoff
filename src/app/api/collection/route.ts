import { prisma } from "../../../../prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const collections = await prisma.collection.findMany({
        orderBy: { name: "asc" }
    });

    return NextResponse.json(collections);
}

export async function POST(req: Request) {
    const { name } = await req.json();

    if (!name) {
        return NextResponse.json({ error: "Название обязательно" }, { status: 400 });
    }

    const collection = await prisma.collection.create({
        data: { name },
    });

    return NextResponse.json(collection);
}
