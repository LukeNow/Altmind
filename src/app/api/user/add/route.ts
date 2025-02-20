import { Prisma, PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { EntryState , UserState } from '@/app/types';
import { nanoid } from 'nanoid';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { stat } from 'fs';

export async function POST(req: NextRequest) {

       console.log("API/USER/ADD endpoint hit");
        
        const data = await req.json();
        const name = data.name;

        const nullUser = {id: 'NULL', name: 'NULL'};
        let user: Prisma.UserCreateInput = {
            id: nanoid(),
            name: name ? name : "Anonymous",
        };

        try {
            const fetchedUser = await prisma.user.create({
                data: user
            });
            
            console.log("fetchedUser: ", fetchedUser);

            user = fetchedUser ? {id: fetchedUser.id, name: fetchedUser.name} : nullUser;
        
            return NextResponse.json({user: user}, {status: 200});
        } catch(error) {
            console.log("Error: ", error);
            return NextResponse.json({user: nullUser, error: error}, {status: 500});
        }
        
}