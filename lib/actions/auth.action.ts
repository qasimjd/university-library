"use server";

import { signIn } from "@/auth";
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

  if (!email || !password || !fullName || !universityId || !universityCard) {
    return { success: false, error: "All fields are required" };
  }

  await connectToMongoDB();

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