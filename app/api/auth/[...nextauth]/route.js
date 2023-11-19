// import NextAuth from "next-auth";
// import { Account, User as AuthUser } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/models/User";
// import connect from "@/utils/db";

// const authOptions: any = {
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//       },
//       async authorize(credentials: any) {
//         await connect();
//         try {
//           const user = await User.findOne({ email: credentials.email });
//           if (user) {
//             return user;
//           }
//         } catch (err: any) {
//           throw new Error(err);
//         }
//       },
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID ?? "",
//       clientSecret: process.env.GITHUB_SECRET ?? "",
//     }),
//     // ...add more providers here
//   ],
//   callbacks: {
//     async signIn({ user, account }: { user: AuthUser; account: Account }) {
//       if (account?.provider == "credentials") {
//         return true;
//       }
//       if (account?.provider == "github") {
//         await connect();
//         try {
//           const existingUser = await User.findOne({ email: user.email });
//           if (!existingUser) {
//             const newUser = new User({
//               email: user.email,
//             });

//             await newUser.save();
//             return true;
//           }
//           return true;
//         } catch (err) {
//           console.log("Error saving user", err);
//           return false;
//         }
//       }
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST, handler as PUT };

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

// const authorize = async (credentials) => {
//     if (!credentials.username) {
//       console.error("Username is required");
//       throw new Error("Username is required");
//     }
  
//     try {
//       const student = await prisma?.User?.findUnique({
//         where: {
//           username: credentials.username,
//         },
//       });
  
//       if (!student) {
//         console.error("Invalid username");
//         throw new Error("Invalid username");
//       }
  
//       return student;
//     } catch (error) {
//       console.error("Error in authorize:", error);
//       throw new Error("Authentication failed");
//     }
//   };
  
// // handle session 
// const handleSession = async ({ session, user }) => {
//     try {
//       if (!session.user || !session.user.username) {
//         console.error("Invalid session user data");
//         throw new Error("Invalid session user data");
//       }
  
//       const userData = await prisma?.User?.findUnique({
//         where: { username: session.user.username },
//       });
  
//       if (!userData) {
//         console.error("User not found in handleSession");
//         throw new Error("User not found");
//       }
  
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           ...userData,
//         },
//       };
//     } catch (error) {
//       console.error("Error in handleSession:", error);
//       throw new Error("Session handling failed");
//     }
//   };
  
// // auth option
// export const authOptions = {
//     providers:[
//         CredentialsProvider({
//             name:"credentials",
//             credentials:{
//                 username:{label:"Email Address", type:'text'},
//             },
//             authorize:authorize,

//         }),
//     ],
//     adapter:PrismaAdapter({prisma}),
//     secret: process.env.JWT_SECRET,
//     debug:process.env.NODE_ENV !== 'production',
//     callbacks:{
//         session: handleSession,
//     },
// };
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
