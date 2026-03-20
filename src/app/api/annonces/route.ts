import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    try {
        const annonces = await prisma.annonce.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(annonces);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch annonces" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const annonce = await prisma.annonce.create({
            data: { ...body, date: new Date(body.date) },
        });
        return NextResponse.json(annonce);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create annonce" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, ...updateData } = body;

        const annonce = await prisma.annonce.update({
            where: { id },
            data: {
                ...updateData,
                ...(updateData.date ? { date: new Date(updateData.date) } : {}),
            },
        });

        return NextResponse.json(annonce);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update annonce" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await prisma.annonce.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Annonce deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete annonce" }, { status: 500 });
    }
}
