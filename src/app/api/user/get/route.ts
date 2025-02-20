import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { EntryState } from '@/app/types';
import { nanoid } from 'nanoid';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    console.log("API/USER/GET endpoint hit");
    const data = await req.json();
    console.log("data found: ", data);
    const userId = data.userId;
    
    console.log("userId found: ", userId);

    const nullUser = {id: 'NULL', name: 'NULL'};

    try {
        let user = await prisma.user.findUnique({
        where: {
            id: userId
        }});

        console.log("user found: ", user);

        user = user ? {id: user.id, name: user.name} : nullUser;

        return NextResponse.json({user: user, status: 200});
    } catch (error) {
        return NextResponse.json({user: nullUser, error: error, status: 200});
    }
 

}