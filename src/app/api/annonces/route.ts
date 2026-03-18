import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    const annonces = await prisma.annonce.findMany({
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(annonces);
}

export async function POST(req: Request) {
    const body = await req.json();
    const annonce = await prisma.annonce.create({
        data: { ...body, date: new Date(body.date) },
    });
    return NextResponse.json(annonce);
}
