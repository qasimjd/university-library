import NextAuth, { User as authUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "./database/Models/user.model";
import bcrypt from "bcryptjs";
import { connectToMongoDB } from "./lib/mongodb";


export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await connectToMongoDB();
              
                if (!credentials?.email || !credentials?.password) {
                  console.log("Email or password missing");
                  return null;
                }
              
                const user = await User.findOne({ email: credentials.email }) as { _id: string, email: string, fullName: string, password: string };
                if (!user) {
                  console.log("User not found");
                  return null;
                }
              
                const isValid = await bcrypt.compare(credentials.password.toString(), user.password);
                if (!isValid) {
                  console.log("Invalid password");
                  return null;
                }
              
                console.log("User authorized:", user);
                return {
                  id: user._id.toString(),
                  email: user.email,
                  name: user.fullName,
                };
              }
        })
    ],

    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
            }
            return session;
        }
    },
})