import NextAuth, { User as authUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/database/Models/user.model";  
import bcrypt from "bcryptjs";
import { connectDB } from "./lib/mongodb";


export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                
                await connectDB();

                if (!credentials.email || !credentials.password) {
                    return null;
                }

                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    return null;
                }

                const isValid = await bcrypt.compare(credentials.password.toString(), user.password);
                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,
                } as authUser;

            },
        })
    ],

    pages: {
        signIn: "sign-in",
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
            if (session) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
            }
            return session;
        }
    },
})