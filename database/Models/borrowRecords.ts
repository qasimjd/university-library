import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";
import { IBook } from "./book.modle";

export enum BORROW_STATUS_ENUM {
  BORROW = "borrow",
  RETURN = "return",
  OVERDUE = "overdue",
}

export interface IBorrowRecord extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  bookId: mongoose.Types.ObjectId | IBook;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: BORROW_STATUS_ENUM;
  createdAt: Date;
  updatedAt: Date;
}

const BorrowRecordSchema = new Schema<IBorrowRecord>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    borrowDate: { type: Date, default: Date.now, required: true },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: {
      type: String,
      enum: Object.values(BORROW_STATUS_ENUM),
      default: BORROW_STATUS_ENUM.BORROW,
    },
  },
  { timestamps: true }
);

const BorrowRecord = mongoose.models.BorrowRecord || mongoose.model<IBorrowRecord>("BorrowRecord", BorrowRecordSchema);

export default BorrowRecord;
