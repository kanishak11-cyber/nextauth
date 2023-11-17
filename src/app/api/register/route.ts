import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {

  const { email, student, father, mother, dob, course, certificate, marks, grade } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Enrollment ID is already in use", { status: 400 });
  }

  const newUser = new User({
    email,
    student,
    father,
    mother,
    dob,
    course,
    certificate,
    marks,
    grade,
  });

  try {
    await newUser.save();
    return new NextResponse("User is registered!", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
