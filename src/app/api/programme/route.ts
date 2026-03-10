import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const programmes = await prisma.programme.findMany();
        return NextResponse.json(programmes);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch programmes' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const programme = await prisma.programme.create({
            data: {
                jour: data.jour,
                heure: data.heure,
                activite: data.activite,
                lieu: data.lieu,
            },
        });
        return NextResponse.json(programme);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create programme' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;
        const programme = await prisma.programme.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(programme);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update programme' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await prisma.programme.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Programme deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete programme' }, { status: 500 });
    }
}
