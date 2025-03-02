"use server";

import Book, { IBook } from "@/database/Models/book.modle";
import { connectToMongoDB } from "@/lib/mongodb";
import { z } from "zod";
import { bookSchema } from "@/lib/valiations";

type CreateBookParams = z.infer<typeof bookSchema>;

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

        const books = await Book.find().lean<IBook[]>();

        return {
            success: true,
            data: books,
        };
    } catch (error) {
        console.error("Error fetching books:", error);
        return { success: false, error: (error as Error).message };
    }
};