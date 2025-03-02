import mongoose, { Schema, Document } from "mongoose";


const BORROW_STATUS_ENUM = ["BORROWED", "RETURNED", "OVERDUE"] as const;

export interface IBorrowRecord extends Document {
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: (typeof BORROW_STATUS_ENUM)[number];
  createdAt: Date;
}

const BorrowRecordSchema = new Schema<IBorrowRecord>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    borrowDate: { type: Date, default: Date.now, required: true },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: { type: String, enum: BORROW_STATUS_ENUM, default: "BORROWED", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const BorrowRecord = mongoose.models.BorrowRecord || mongoose.model<IBorrowRecord>("BorrowRecord", BorrowRecordSchema);

export default BorrowRecord;
