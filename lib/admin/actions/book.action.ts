"use server";

import Book, { IBook } from "@/database/Models/book.modle";
import { connectToMongoDB } from "@/lib/mongodb";
import dayjs from "dayjs";
import { z } from "zod";
import { bookSchema } from "@/lib/valiations";
import BorrowRecord, { BORROW_STATUS_ENUM } from "@/database/Models/borrowRecords";
import User, { IUser } from "@/database/Models/user.model";
import { auth } from "@/auth";

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

export const getBooks = async (query?: string) => {
    try {
        await connectToMongoDB();

        const filter = query
            ? {
                $or: [
                    { title: { $regex: query, $options: "i" } }, // Case-insensitive title search
                    { genre: { $regex: query, $options: "i" } }, // Case-insensitive genre search
                ],
            }
            : {};

        const books = await Book.find(filter).sort({ createdAt: -1 }).lean<IBook[]>();

        return {
            success: true,
            data: books,
        };
    } catch (error) {
        console.error("Error fetching books:", error);
        return { success: false, error: (error as Error).message };
    }
};

export const getBooksforRoot = async (userId: string) => {
    try {
        await connectToMongoDB();

        const user = await User.findById(userId).select("borrowBooksIds").lean<IUser>();
        if (!user) throw new Error("User not found");

        const books = await Book.find({
            _id: { $nin: user.borrowBooksIds },
        }).sort({ createdAt: -1 }).lean<IBook[]>();

        if (!books) return { success: false, error: "Books not found" };

        return { success: true, data: books };
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
        if (!book) throw new Error("Book not found");

        const user = await User.findById(userId).select("status borrowBooksIds");
        if (!user) throw new Error("User not found in the database");

        if (user.status !== "approve") {
            return { success: false, error: "Your account is not approved to borrow books" };
        }

        const isBookAlreadyBorrowed = user.borrowBooksIds?.length > 0 &&
            user.borrowBooksIds.some(
                (borrowedBookId) => borrowedBookId.toString() === book._id.toString()
            );
        if (isBookAlreadyBorrowed) {
            return { success: false, error: "You have already borrowed this book and cannot borrow it again until it is returned" };
        }

        if (!book.availableCopies || book.availableCopies <= 0) {
            return { success: false, error: "No copies available" };
        }

        const dueDate = dayjs().add(7, "days").toDate();

        const borrowRecord = new BorrowRecord({
            bookId,
            userId,
            dueDate,
        });

        await User.findByIdAndUpdate(userId, {
            $addToSet: { borrowBooksIds: book._id },
        }, { new: true });

        await borrowRecord.save();
        await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: -1 } });

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

        const borrowRecords = await BorrowRecord.find({ userId }).populate("bookId");
        if (!borrowRecords) return { success: false, error: "Borrow records not found" };

        const borrowedBooks = borrowRecords.map(record => record.bookId);

        return {
            success: true,
            data: JSON.parse(JSON.stringify(borrowedBooks)),
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
            .select("borrowDate dueDate returnDate status");

        if (!borrowedRecord) return { success: false, error: "Borrow record not found" };

        if (borrowedRecord.status === BORROW_STATUS_ENUM.BORROW &&
            borrowedRecord.dueDate < new Date()) {
            borrowedRecord.status = BORROW_STATUS_ENUM.OVERDUE;
            await borrowedRecord.save();
        }

        return JSON.parse(JSON.stringify(borrowedRecord))

    } catch (error) {
        console.error("Error fetching borrow record:", error);
        return { success: false, error: (error as Error).message };
    }
};

export const getSimmilarBooks = async (bookId: string) => {
    try {
        await connectToMongoDB();

        const book = await Book.findById(bookId).lean<IBook>();
        if (!book) return { success: false, error: "Book not found" };

        const session = await auth();
        const userId = session?.user?.id;
        if (!userId) return { success: false, error: "User not found" };

        const user = await User.findById(userId).select("borrowBooksIds").lean<IUser>();
        const borrowedBookIds = user?.borrowBooksIds || [];

        const books = await Book.find({
            $or: [
                { genre: book.genre },
                { author: book.author },
            ],
            _id: { $ne: book._id, $nin: borrowedBookIds },
        }).limit(5).lean<IBook[]>();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(books)),
        };
    } catch (error) {
        console.error("Error fetching similar books:", error);
        return { success: false, error: (error as Error).message };
    }
};

export const searchBooks = async (query: string) => {
    await connectToMongoDB();

    if (!query) return { success: false, data: [] };

    try {
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: "i" } }, // Case-insensitive search
                { author: { $regex: query, $options: "i" } } // Case-insensitive search by author
            ]
        }).limit(10);

        return { success: true, data: JSON.parse(JSON.stringify(books)) };
    } catch {
        return { success: false, data: [] };
    }
};

export async function updateBook(id: string, data: Partial<IBook>) {
    await connectToMongoDB();
    try {
        await Book.findByIdAndUpdate(id, data, { new: true });
        return { success: true };
    } catch (error) {
        console.error("Error updating book:", error);
        return { success: false, error: (error as Error).message };
    }
}

export async function getBookById(id: string) {
    await connectToMongoDB();
    try {
        const book = await
            Book.findById(id).lean<IBook>();
        return JSON.parse(JSON.stringify(book));
    } catch (error) {
        console.error("Error updating book:", error);
        return { success: false, error: (error as Error).message };
    }
}

export async function getBookByIds(id: string) {
    await connectToMongoDB();
    try {
        const book = await Book.findById(id).lean<IBook>();
        if (!book) return { success: false, error: "Book not found" };
        return JSON.parse(JSON.stringify(book));

    } catch (error) {
        console.error("Error updating book:", error);
        return { success: false, error: (error as Error).message };
    }
}