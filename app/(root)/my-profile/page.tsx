import React from "react";
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { notFound } from "next/navigation";
import { userBorrowedBooks } from "@/lib/admin/actions/book.action";
import StudentIDCard from "@/components/StudentIDCard";
import { getUserProfile } from "@/lib/actions/auth.action";
import { IBook } from "@/database/Models/book.modle";

const Page = async () => {

  const session = await auth();
  if (!session) {
    notFound();
  }
  const userId = session?.user?.id;
  if (!userId) return null;

  const result = await userBorrowedBooks(userId)
  const books = result.data as IBook[];

  const res = await getUserProfile(userId);
  const userProfile = res.data;
  if (!userProfile) return null;

  return (
    <main className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">

      <section className="md:col-span-1 flex justify-center">
        <StudentIDCard userProfile={userProfile} />
      </section>

      <section className="md:col-span-2 px-7">
        {books && books.length > 0 ? (
          <BookList title="Borrowed Books" books={books} containerClassName="mx-auto" />
        ) : (
          <h1 className="text-center text-gray-100">No borrowed books</h1>
        )}
      </section>
    </main>

  );
};
export default Page;