// import User from "@/models/User";
// import connect from "@/utils/db";
// import { NextResponse } from "next/server";

// export const POST = async (request: any) => {

//   const { email, student, father, mother, dob, course, certificate, marks, grade } = await request.json();

//   await connect();

//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     return new NextResponse("Enrollment ID is already in use", { status: 400 });
//   }

//   const newUser = new User({
//     email,
//     student,
//     father,
//     mother,
//     dob,
//     course,
//     certificate,
//     marks,
//     grade,
//   });

//   try {
//     await newUser.save();
//     return new NextResponse("User is registered!", { status: 200 });
//   } catch (err: any) {
//     return new NextResponse(err, {
//       status: 500,
//     });
//   }
// };

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
 const {
    name,
    username,
    fatherName,
    motherName,
    dob,
    course,
    certificateId,
    totalMarks,
    grade,
 } = await req.json();

 if (!username) {
    return new NextResponse('Username required', { status: 401 });
 }

 const existingUser = await prisma?.User?.findUnique({
    where: {
      username: username,
    },
 });

 if (existingUser) {
    return new NextResponse('User already exists with that username.', { status: 400 });
 }

 const newUser = await prisma.User.create({
    data: {
      name: name,
      username: username,
      fatherName: fatherName,
      motherName: motherName,
      dob: dob,
      course: course,
      certificateId: certificateId,
      totalMarks: totalMarks,
      grade: grade,
    },
 });

 console.log("User Created: ", newUser);

 return new NextResponse(newUser, { status: 201 });
}


export async function GET(req,{searchParams}) {
  const user = await prisma.User.findMany();
  console.log(user)
  return new NextResponse(user, {status: 200});
}
 