"use server";

import Book, { IBook } from "@/database/Models/book.modle";
import { connectToMongoDB } from "@/lib/mongodb";
import dayjs from "dayjs";
import { z } from "zod";
import { bookSchema } from "@/lib/valiations";
import BorrowRecord, { IBorrowRecord } from "@/database/Models/borrowRecords";
import User from "@/database/Models/user.model";

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

export const borroBook = async (params: BorrowParams) => {
    const { userId, bookId } = params;
    try {
        await connectToMongoDB();

        const book = await Book.findById(bookId);
        const user = await User.findById(userId);

        if (!book) return { success: false, error: "Book not found" };
        if (!user) return { success: false, error: "User not found in the database" };
        if (book.availableCopies === 0) return { success: false, error: "No copies available" };

        const dueDate = dayjs().add(7, "days").toDate().toDateString();

        const borroRecord = new BorrowRecord({
            bookId,
            userId,
            dueDate,
            status: "BORROWED",
        });
        user.borrowBooksRecord.push(borroRecord);
        book.availableCopies -= 1;

        await user.save();
        await borroRecord.save();
        await book.save();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(borroRecord)),
        };

    } catch (error) {
        console.error("Error borroBook book:", error);
        return { success: false, error: (error as Error).message };

    }
};