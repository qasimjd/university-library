import React from "react";
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { notFound } from "next/navigation";
import { userBorrowedBooks } from "@/lib/admin/actions/book.action";
import StudentIDCard from "@/components/StudentIDCard";
import { getUserProfile } from "@/lib/actions/auth.action";

const Page = async () => {

  const session = await auth();
  if (!session) {
    notFound();
  }
  const userId = session?.user?.id;
  if (!userId) return null;

  const result = await userBorrowedBooks(userId)
  const books = result.data;

  const res = await getUserProfile(userId);
  const profile = res.data;
  if (!profile) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StudentIDCard {...profile} />

        {books && (<BookList title="Borrowed Books" books={books} containerClassName="mx-auto"/>)}
    </div>
  );
};
export default Page;