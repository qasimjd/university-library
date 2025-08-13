"use server";

import { signIn, signOut } from "@/auth";
import User, { IUser } from "@/database/Models/user.model";
import { connectToMongoDB } from "../mongodb";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";


export const signInWithCredentials = async (params: Pick<IUser, "email" | "password">) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

    const result = await ratelimit.limit(ip);
    const isAllowed = result.success;
  
  if (!isAllowed) {
    redirect("/too-fast");
    // return { success: false, error: "Too many requests. Please wait and try again." };
  }

  await connectToMongoDB();

  try {
    const results = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (results?.error) {
      return { success: false, error: results.error };
    }

    return { success: true };
  } catch (error) {
    console.error("Error in signInWithCredentials:", error);
    return { success: false, error: "Invalid credentials" };
  }
};

export async function signUp(params: Partial<IUser>) {
  const { fullName, email, password, universityId, universityCard } = params;

  if (!email || !password || !fullName || !universityId) {
    return { success: false, error: "Please provide all required fields: full name, email, password, and university ID." };
  }

  await connectToMongoDB();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, error: "Email already exists. Please use a different email address or sign in." };
    }
    
    // Create new user if email doesn't exist
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
    
    // Handle specific MongoDB duplicate key error
    if (error instanceof Error && 'code' in error && (error as Error & { code: number }).code === 11000) {
      return { success: false, error: "Email already exists. Please use a different email address or sign in." };
    }
    
    return { success: false, error: "Something went wrong in creating User. Please try again." };
  }
}

export const handleSignOut = async () => {
  await signOut();
};

export async function getUserProfile(userId: string) {
  await connectToMongoDB();

  try {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  }
  catch (error) {
    console.error("Error in getUserProfile:", error);
    return { success: false, error: "Error in fetching user profile" };
  }
};