import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req,res){
    const {username} = req.body;
    console.log(username)

    try {
        const user = await prisma.User.findUnique({
          where: { username: username || '' },
        });
    console.log(user)
        if (!user) {
          return new NextResponse({ message: 'User not found' });
        }
    
        return new NextResponse(user);
      } catch (error) {
        console.error('Error searching for user:', error);
        return new NextResponse({ message: 'Internal Server Error' });
      } finally {
        await prisma.$disconnect();
      }
}