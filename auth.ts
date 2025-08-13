import NextAuth, { User as authUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "./database/Models/user.model";
import bcrypt from "bcryptjs";
import { connectToMongoDB } from "./lib/mongodb";


export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 90 * 24 * 60 * 60, // 90 days
    },
    secret: process.env.AUTH_SECRET,
    jwt: {
        maxAge: 90 * 24 * 60 * 60, // 90 days
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
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

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.fullName,
                    };
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            }
        })
    ],

    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (trigger === "signIn" && user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
            }
            return session;
        }
    },
    trustHost: true, // Add this for development
    debug: process.env.NODE_ENV === "development", // Enable debug in development
})