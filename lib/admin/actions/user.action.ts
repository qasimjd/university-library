"use server";

import { auth } from "@/auth";
import User, { IUser, UserRole } from "@/database/Models/user.model";
import { connectToMongoDB } from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

export const getAllUsers = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    try {
        await connectToMongoDB();
        const users = await User.find({ _id: { $ne: userId } }).lean<IUser>();
        if (!users) {
            return null;
        }
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteUserModle = async (userId: string) => {
    try {
        connectToMongoDB();
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return { succes: false, message: "User not found" };
        }
        revalidatePath("/admin/users");
        return { succes: true, message: "User deleted successfully" };
    } catch (error) {
        console.log(error);
        return { succes: false, message: "faild to delete user" };
    }
};

export const toggleStatus = async (userId: string) => {
    try {
        connectToMongoDB();
        const user = await User.findById(userId).select("role");
        if (!user) {
            return { success: false, message: "User not found" };
        }
        
        user.role = user.role === UserRole.USER ? UserRole.ADMIN : UserRole.USER;
        await user.save();
        // revalidatePath("/admin/users");
        return { success: true, message: "User role updated successfully" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to update user role" };
    }
}