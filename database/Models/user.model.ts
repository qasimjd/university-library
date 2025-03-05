import mongoose, { Schema, Document, Model, Types } from "mongoose";
import bcrypt from "bcryptjs";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum UserStatus {
  PENDING = "pending",
  APPROVE = "approve",
  REJECT = "reject",
}

export enum UserBorrowStatus {
  BORROW = "borrow",
  RETURN = "return",
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
  borrowBooksIds: Types.ObjectId[];
  status: UserStatus;
  borrowStatus: UserBorrowStatus;
  role: UserRole;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    universityId: { type: Number, required: true },
    universityCard: { type: String, required: true },
    borrowBooksIds: [{ type: Schema.Types.ObjectId, ref: "Book" }],
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

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password as string, salt);
  this.password = hashedPassword;

  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password as string);
};

const User: Model<IUser> = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
