import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const organisations = await prisma.organisation.findMany();
        return NextResponse.json(organisations);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch organisations' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const organisation = await prisma.organisation.create({
            data: {
                nom: data.nom,
                description: data.description,
                responsable: data.responsable,
                activites: data.activites,
            },
        });
        return NextResponse.json(organisation);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create organisation' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;
        const organisation = await prisma.organisation.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(organisation);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update organisation' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await prisma.organisation.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Organisation deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete organisation' }, { status: 500 });
    }
}
