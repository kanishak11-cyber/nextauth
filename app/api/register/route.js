

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

export async function POST(req) {
    const {
        name,
        email,
        fatherName,
        motherName,
        dob,
        password,
        course,
        certificateId,
        totalMarks,
        grade,
      } = await req.json();
    
      if (!email || !password) {
        return new NextResponse("Please fill all the required fields", {
          status: 400,
        });
      }
    
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
    
        if (existingUser) {
          return new NextResponse("User already exists with that email.", {
            status: 400,
          });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = await prisma.user.create({
          data: {
            name: name,
            email: email,
            fatherName: fatherName,
            motherName: motherName,
            dob: dob,
            course: course,
            certificateId: certificateId,
            totalMarks: totalMarks,
            grade: grade,
            password: hashedPassword,
          },
        });
    
        console.log("User Created:", newUser);
    
        return new NextResponse(JSON.stringify(newUser), {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
      } finally {
        await prisma.$disconnect();
      }
}
