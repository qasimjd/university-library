import mongoose, { Schema, Document, Model } from "mongoose";

// Define Role Enum
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

// Define Status Enum
export enum UserStatus {
  PENDING = "pending",
  APPROVE = "approve",
  REJECT = "reject",
}

// Define Borrow Status Enum
export enum UserBorrowStatus {
  BORROW = "borrow",
  RETURN = "return",
}

// Define User Interface
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
  status: UserStatus;
  borrowStatus: UserBorrowStatus;
  role: UserRole;
  lastActive: Date;
}

// Define Schema
const UserSchema: Schema<IUser> = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    universityId: { type: Number, required: true },
    universityCard: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.PENDING,
    },
    borrowStatus: {
      type: String,
      enum: Object.values(UserBorrowStatus),
      default: UserBorrowStatus.BORROW,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
