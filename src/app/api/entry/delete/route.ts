import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { EntryState } from '@/app/types';
import { nanoid } from 'nanoid';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const userId = data.userId;
    const entryId = data.entryId;

    console.log("Deleting entry: ", entryId);

    try {
        const entry = await prisma.entry.delete({
            where: {
                id: entryId
            }
        });

        console.log("deleted entry: ", entry);

        return NextResponse.json({"status": "200"});

    } catch (error) {
        return NextResponse.json({error: error, status: 200});
    }
}