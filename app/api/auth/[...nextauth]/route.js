import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const authorize = async (credentials) => {
  console.log("Credentials:", credentials);
  // const { email, password } = credentials;

  if (!credentials.email || !credentials.password) {
    throw new Error("Please fill in all fields.");
  }

  const user = await prisma.User.findUnique({
    where: {
      email: String(credentials.email),
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const isValid = await bcrypt.compare(credentials.password, user.password);

  if (!isValid) {
    throw new Error("Invalid password.");
  }

  // Ensure to include the email in the user object
  return user;

  // Include other user properties if needed
};

const handleSession = async ({ session }) => {
  try {
    console.log("Session:", session);

    // Check if session.user exists and has a email property
    const email = session?.user?.email;

    if (!email) {
      console.error("email not found in session:", session);
      throw new Error("email not found.");
    }

    const userData = await prisma.User.findUnique({
      where: {
        email: email,
      },
      select: {
        fatherName: true,
        motherName: true,
        name: true,
        dob: true,
        course: true,
        grade: true,
        totalMarks: true,
        certificateId: true,
      },
    });

    if (!userData) {
      throw new Error("User not found.");
    }

    const {
      name,
      fatherName,
      motherName,
      dob,
      course,
      grade,
      totalMarks,
      certificateId,
    } = userData;

    return {
      ...session,
      user: {
        ...session.user,

        name,
        fatherName,
        motherName,
        dob,
        course,
        grade,
        totalMarks,
        certificateId,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const credentialsPlaceholder = "email";
const passwordPlaceholder = "DD-MM-YYYY";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: credentialsPlaceholder,
        },
        password: {
          label: "Password",
          type: "date",
          placeholder: passwordPlaceholder,
        },
      },
      authorize: authorize,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV !== "production",
  callbacks: {
    session: handleSession,
    jwt: async ({ token, user }) => ({
      ...token,
      email: user?.email,
      name: user?.name,
      fatherName: user?.fatherName,
      motherName: user?.motherName,
      dob: user?.dob,
      course: user?.course,
      grade: user?.grade,
      totalMarks: user?.totalMarks,
      certificateId: user?.certificateId,
    }),
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
