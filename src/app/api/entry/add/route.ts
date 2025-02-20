import { Prisma, PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { EntryState } from '@/app/types';
import { nanoid } from 'nanoid';
import prisma from '@/lib/prisma';
import { defaultEntry } from '@/app/types';
import { NextRequest, NextResponse } from 'next/server';
import { connect } from 'http2';

export async function POST(req: NextRequest) {

    console.log("API/ENTRY/ADD endpoint hit");

    const data = await req.json();
    const userId = data.userId;

    const fetchUser : Prisma.EntryCreateInput = {
      id: nanoid(),
      title: defaultEntry.title,
      content: defaultEntry.content,
      author:  { 
        connect: { id: userId }
      }
    }

    try {
      const entry = await prisma.entry.create({
          data: fetchUser
        });

        console.log("entry: ", entry);

        return NextResponse.json({entry: entry, status: 200});
    } catch (error) {
        return NextResponse.json({error: error, status: 200});
    }
  }