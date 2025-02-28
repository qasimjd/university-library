"use server";

import { signIn } from "@/auth";
import User, { IUser } from "@/database/Models/user.model";
import { connectDB } from "../mongodb";


export const signInWithCeredentials = async (params: Pick<IUser, "email" | "password">) => {
    const { email, password } = params;

    await connectDB();

    try {
        const results = await signIn("ceredentials", {
            email,
            password,
            redirect: false,
        });

        if (results?.error) {
            return { success: false, error: results.error };
        }

        return { success: true };


    } catch (error) {
        console.log(error);
        return { success: false, error: "Something went wrong in signing in" };
    }
};

export async function signUp(params: Partial<IUser>) {

    const { fullName, email, password, universityId, universityCard } = params;

    if (!email || !password || !fullName || !universityId || !universityCard) {
        return { success: false, error: "All fields are required" };
    }
    
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return { success: false, error: "Email already exists" };
    }

    try {


        await User.create({
            fullName,
            email,
            password,
            universityId,
            universityCard,
        });

        signInWithCeredentials({ email, password });
        return { success: true };

    } catch (error) {
        return { success: false, error: "Something went wrong in creating User" };
    }
}