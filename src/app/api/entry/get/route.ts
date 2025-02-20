import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { EntryState } from '@/app/types';
import { nanoid } from 'nanoid';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
//const prisma = new PrismaClient();

export async function POST(req: NextRequest) {

    const data = await req.json();

    const userId = data.userId;
    const entryId = data.entryId;
    
    let entries: EntryState[] = [];

    try {

    if (entryId === undefined) {
        const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            entries: true
        }
        })

        entries = user ? user.entries : [];
    } else {
        const entry = await prisma.entry.findUnique({
            where: {
                id: entryId
            }
        })

        entries = entry ? [entry] : [];
    }

    
    return NextResponse.json({entries: entries, status: 200});

    } catch (error) {
        return NextResponse.json({error: error, status: 200});
    }
}