"use server";

import { auth } from "@/auth";
import Book from "@/database/Models/book.modle";
import BorrowRecord, { BORROW_STATUS_ENUM } from "@/database/Models/borrowRecords";
import Stats, { IStats } from "@/database/Models/stats.modle";
import User, { IUser, UserRole, UserStatus } from "@/database/Models/user.model";
import { connectToMongoDB } from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

export const getAllUsers = async (searchQuery?: string) => {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized: No user session found" };
        }

        await connectToMongoDB();

        const filter: Record<string, any> = { _id: { $ne: session.user.id } };
        
        if (searchQuery) {
            filter["$or"] = [
                { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in name
                { email: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in email
            ];
        }

        const users = await User.find(filter).lean<IUser[]>();

        return { success: true, data: JSON.parse(JSON.stringify(users))  || [] };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, error: (error as Error).message };
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

export const toggleRole = async (userId: string) => {
    try {
        connectToMongoDB();
        const user = await User.findById(userId).select("role");
        if (!user) {
            return { success: false, message: "User not found" };
        }
        user.role = user.role === UserRole.USER ? UserRole.ADMIN : UserRole.USER;
        await user.save();
        // revalidatePath("/admin/users");
        return { success: true, message: "User role updated successfully", data: user.role };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to update user role" };
    }
}

export const toggleStatus = async (userId: string, currentUserStatus: UserStatus) => {
    try {
        connectToMongoDB();
        const user = await User.findById(userId).select("status");
        if (!user) {
            return { success: false, message: "User not found" };
        }

        user.status = currentUserStatus;
        await user.save();
        // revalidatePath("/admin/users");
        return { success: true, message: "User status updated successfully" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to update user status" };
    }
}

export const toggleRecord = async (recordId: string, currentUserStatus: BORROW_STATUS_ENUM) => {
    try {
        await connectToMongoDB();

        const record = await BorrowRecord.findById(recordId).select("bookId").select("userId");
        if (!record) {
            return { success: false, message: "Borrow record not found" };
        }

        const book = await Book.findById(record.bookId);
        if (!book) {
            return { success: false, message: "Book not found" };
        }

        const user = await User.findById(record.userId);
        if (!user) {
            return { success: false, message: "User not found" };
        }

        if (currentUserStatus === BORROW_STATUS_ENUM.RETURN) {
            book.availableCopies += 1;
            record.returnDate = new Date();
            // user.borrowBooksIds = user.borrowBooksIds.filter((id) => id.toString() !== book._id.toString());
            record.status = BORROW_STATUS_ENUM.RETURN;
        }

        if (currentUserStatus === BORROW_STATUS_ENUM.BORROW) {
            if (book.availableCopies <= 0) {
                return { success: false, message: "No available copies" };
            }
            book.availableCopies -= 1;
            record.borrowDate = new Date();
            record.status = BORROW_STATUS_ENUM.BORROW;
        }

        if (currentUserStatus === BORROW_STATUS_ENUM.OVERDUE) {
            record.status = BORROW_STATUS_ENUM.OVERDUE;
        }

        await Promise.all([book.save(), record.save(), user.save()]);
        // revalidatePath(`/books/${book1}`);
        return { success: true, message: "Record status updated successfully" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to update record status" };
    }
}

export const deleteBookModle = async (bookId: string) => {
    try {
        connectToMongoDB();
        const book = await Book.findByIdAndDelete(bookId);
        if (!book) {
            return { succes: false, message: "Book not found" };
        }
        revalidatePath("/admin/books");
        return { succes: true, message: "Book deleted successfully" };
    } catch (error) {
        console.log(error);
        return { succes: false, message: "faild to delete book" };
    }
};

export const getRequestedUsers = async (searchQuery?: string) => {
    try {
        await connectToMongoDB();

        const filter: Record<string, any> = {
            status: { $in: [UserStatus.PENDING, UserStatus.REJECT] },
        };

        if (searchQuery) {
            filter["$or"] = [
                { name: { $regex: searchQuery, $options: "i" } }, // Search by name
                { email: { $regex: searchQuery, $options: "i" } }, // Search by email
            ];
        }

        const requestedUsers = await User.find(filter)
            .sort({ createdAt: -1 })
            .lean();

        return { success: true, data: JSON.parse(JSON.stringify(requestedUsers)) || [] };
    } catch (error) {
        console.error("Error fetching requested users:", error);
        return { success: false, error: (error as Error).message };
    }
};

export const getBorrowRecords = async (searchQuery?: string) => {
    try {
        await connectToMongoDB();

        const filter: Record<string, any> = {};

        if (searchQuery) {
            const users = await User.find({ name: { $regex: searchQuery, $options: "i" } }).select("_id");
            const books = await Book.find({ title: { $regex: searchQuery, $options: "i" } }).select("_id");

            filter["$or"] = [
                { userId: { $in: users.map(user => user._id) } }, // Match by user name
                { bookId: { $in: books.map(book => book._id) } }, // Match by book title
            ];
        }

        const records = await BorrowRecord.find(filter)
            .sort({ borrowDate: -1 }) 
            .populate("userId", "name email")
            .populate("bookId", "title")
            .exec();

        return { success: true, data: JSON.parse(JSON.stringify(records)) || [] };
    } catch (error) {
        console.error("Error fetching borrow records:", error);
        return { success: false, error: (error as Error).message };
    }
};

export async function getPreviousStats(): Promise<IStats | null> {
    await connectToMongoDB();
    return Stats.findOne().sort({ date: -1 });
}

export async function saveCurrentStats(data: Omit<IStats, "date">): Promise<void> {
    await connectToMongoDB();
    await Stats.create({ ...data, date: new Date() });
}