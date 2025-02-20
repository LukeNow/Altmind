import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { EntryState } from '@/app/types';
import { nanoid } from 'nanoid';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

    const data = await req.json();

    const userId = data.userId;
    const entry = data.entry;

    console.log("entry: ", entry);


    const updatedEntry = await prisma.entry.update({
        where: {
            id: entry.id
        },
        data: {
            content: entry.content,
            title: entry.title,
        },
    });

    console.log("updatedEntry: ", updatedEntry);
    return NextResponse.json({entry: updatedEntry, status: 200});
}