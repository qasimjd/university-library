import mongoose, { Schema, Types } from "mongoose";

export interface IBook {
    _id: Types.ObjectId; // Use ObjectId instead of string
    __v: number; // Include the version key
    title: string;
    description: string;
    author: string;
    genre: string;
    rating: number;
    totalCopies: number;
    availableCopies: number;
    coverUrl: string;
    coverColor: string;
    videoUrl?: string;
    summary: string;
}

const BookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    totalCopies: { type: Number, required: true },
    availableCopies: { type: Number, required: true, default: 1 },
    coverUrl: { type: String, required: true },
    coverColor: { type: String, required: true },
    videoUrl: { type: String, },
    summary: { type: String, required: true },
}, { timestamps: true });

const Book = mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);

export default Book;