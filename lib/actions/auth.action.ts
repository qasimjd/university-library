"use server";

import { signIn } from "@/auth";
import User, { IUser } from "@/database/Models/user.model";
import { connectToMongoDB } from "../mongodb";


export const signInWithCeredentials = async (params: Pick<IUser, "email" | "password">) => {
    const { email, password } = params;

    await connectToMongoDB();

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
  
    await connectToMongoDB();
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, error: "Email already exists" };
    }
  
    try {
      const user = new User({
        fullName,
        email,
        password,
        universityId,
        universityCard,
      });
  
      await user.save();
      console.log("User created:", user);
  
      // Sign in the user after successful sign-up
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
  
      if (result?.error) {
        return { success: false, error: result.error };
      }
  
      return { success: true };
    } catch (error) {
      console.error("Error in signUp:", error);
      return { success: false, error: "Something went wrong in creating User" };
    }
  }