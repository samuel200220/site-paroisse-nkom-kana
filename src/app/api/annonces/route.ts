import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const annonces = await prisma.annonce.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(annonces);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch annonces' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const annonce = await prisma.annonce.create({
            data: {
                titre: data.titre,
                description: data.description,
                date: new Date(data.date),
                auteur: data.auteur,
            },
        });
        return NextResponse.json(annonce);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create annonce' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;
        if (updateData.date) updateData.date = new Date(updateData.date);

        const annonce = await prisma.annonce.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(annonce);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update annonce' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await prisma.annonce.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Annonce deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete annonce' }, { status: 500 });
    }
}
