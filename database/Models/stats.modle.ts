import mongoose, { Schema, Document } from "mongoose";

export interface IStats extends Document {
  date: Date;
  borrowedBooks: number;
  totalUsers: number;
  totalBooks: number;
}

const StatsSchema = new Schema<IStats>({
  date: { type: Date, default: Date.now },
  borrowedBooks: { type: Number, required: true },
  totalUsers: { type: Number, required: true },
  totalBooks: { type: Number, required: true },
});

const Stats = mongoose.models.Stats || mongoose.model<IStats>("Stats", StatsSchema);

export default Stats;
