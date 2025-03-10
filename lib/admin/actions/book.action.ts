"use server";

import Book, { IBook } from "@/database/Models/book.modle";
import { connectToMongoDB } from "@/lib/mongodb";
import dayjs from "dayjs";
import { z } from "zod";
import { bookSchema } from "@/lib/valiations";
import BorrowRecord, { BORROW_STATUS_ENUM, IBorrowRecord } from "@/database/Models/borrowRecords";
import User, { IUser } from "@/database/Models/user.model";
import { revalidatePath } from "next/cache";

type CreateBookParams = z.infer<typeof bookSchema>;
type BorrowParams = {
    userId: string;
    bookId: string;
};

export const createBook = async (params: CreateBookParams) => {
    try {
        await connectToMongoDB();

        const newBook = new Book({
            ...params,
        });

        await newBook.save();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newBook)),
        };
    } catch (error) {
        console.error("Error creating book:", error);
        return { success: false, error };
    }
};

export const getBooks = async () => {
    try {
        await connectToMongoDB();

        const books = await Book.find().sort({ createdAt: -1 }).lean<IBook[]>();

        return {
            success: true,
            data: books,
        };
    } catch (error) {
        console.error("Error fetching books:", error);
        return { success: false, error: (error as Error).message };
    }
};

export const borrowBook = async (params: BorrowParams) => {
    const { userId, bookId } = params;

    try {
        await connectToMongoDB();

        const book = await Book.findById(bookId).lean<IBook>();
        if (!book) return { success: false, error: "Book not found" };

        const user = await User.findById(userId).select("status borrowBooksIds");
        if (!user) return { success: false, error: "User not found in the database" };

        if (user.status !== "approve") {
            return { success: false, error: "You dont borrow this book until your account was approved" };
        }

        const isBookAlreadyBorrowed = Array.isArray(user.borrowBooksIds) &&
        user.borrowBooksIds.some(
            (borrowedBookId) => borrowedBookId.toString() === book._id.toString()
        );
            if (isBookAlreadyBorrowed) {
            return { success: false, error: "You have already borrowed this book" };
        }

        if (!book.availableCopies || book.availableCopies <= 0) {
            return { success: false, error: "No copies available" };
        }

        const dueDate = dayjs().add(7, "days").toDate();

        const borrowRecord = new BorrowRecord({
            ...params,
            bookId,
            userId,
            dueDate,
        });

        await User.findByIdAndUpdate(userId, {
            $addToSet: { borrowBooksIds: book._id },
        }, { new: true });

        await borrowRecord.save();
        await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: -1 } });
        revalidatePath(`/books/${bookId}`);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(borrowRecord)),
        };

    } catch (error) {
        console.error("Error borrowing book:", error);
        return { success: false, error: (error as Error).message };
    }
};

export const userBorrowedBooks = async (userId: string) => {
    try {
        await connectToMongoDB();

        const user = await User.findById(userId).lean<IUser>();
        if (!user) return { success: false, error: "User not found in the database" };

        const borrowedBooks = await Book.find({
            _id: { $in: user.borrowBooksIds },
        }).lean<IBook[]>();

        return {
            success: true,
            data: borrowedBooks,
        };
        
    } catch (error) {
        console.error("Error fetching user borrowed books:", error);
        return { success: false, error: (error as Error).message };        
    }
 };

export const BorrowedRecord = async (params: BorrowParams) => {
    const { userId, bookId } = params;
    try {
        await connectToMongoDB();

        const user = await User.findById(userId).lean<IUser>();
        if (!user) return { success: false, error: "User not found in the database" };

        const book = await Book.findById(bookId).lean<IBook>();
        if (!book) return { success: false, error: "Book not found in the database" };

        const borrowedRecord = await BorrowRecord.findOne({
            userId: user._id,
            bookId: book._id,
        }).populate("bookId")
        .populate("userId")

        if (!borrowedRecord) return { success: false, error: "Borrow record not found" };

        return JSON.parse(JSON.stringify(borrowedRecord));
        
    } catch (error) {
        console.error("Error fetching borrow record:", error);
        return { success: false, error: (error as Error).message };        
    }
};

export const getBorrowedRecord = async (userId: string, bookId: string) => {
    try {
        await connectToMongoDB();

        const borrowedRecord = await BorrowRecord.findOne({
            userId,
            bookId,
        }).select("status")

        if (!borrowedRecord) return { success: false, error: "Borrow record not found" };

        if (borrowedRecord.status === BORROW_STATUS_ENUM.RETURN) {
            return { success: true, data: borrowedRecord };
        }

        if (borrowedRecord.status === BORROW_STATUS_ENUM.OVERDUE || borrowedRecord.status === BORROW_STATUS_ENUM.BORROW) {
            return { success: false, error: "Book already returned" };
        }

        return  { success: true, data: borrowedRecord };
        
    } catch (error) {
        console.error("Error fetching borrowed record:", error);
        return { success: false, error: (error as Error).message };
    }
};