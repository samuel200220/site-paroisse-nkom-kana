import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const chorales = await prisma.chorale.findMany();
        return NextResponse.json(chorales);
    } catch (error) {
        console.error('Fetch chorales error:', error);
        return NextResponse.json({ error: 'Failed to fetch chorales', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const chorale = await prisma.chorale.create({
            data: {
                nom: data.nom,
                responsable: data.responsable,
                horaireRepetition: data.horaireRepetition,
                chants: data.chants || [],
            },
        });
        return NextResponse.json(chorale);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create chorale' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;
        const chorale = await prisma.chorale.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(chorale);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update chorale' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await prisma.chorale.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Chorale deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete chorale' }, { status: 500 });
    }
}
