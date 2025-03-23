import React from "react";
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { notFound } from "next/navigation";
import { userBorrowedBooks } from "@/lib/admin/actions/book.action";
import StudentIDCard from "@/components/StudentIDCard";
import { getUserProfile } from "@/lib/actions/auth.action";
import { IBook } from "@/database/Models/book.modle";
import { Card } from "@/components/ui/card";
import Image from "next/image";

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
    <main className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

      <section className="md:col-span-1 flex justify-center">
        <StudentIDCard userProfile={userProfile} />
      </section>

      <section className="md:col-span-1">
        {books && books.length > 0 ? (
          <BookList title="Borrowed Books" books={books} containerClassName="mx-auto" />
        ) : (
          <Card className="bg-gray-900 text-gray-300 flex flex-col justify-center items-center border-none p-4">
            <Image src="/images/no-data.png" className="invert opacity-15" alt="empty" width={100} height={100} />
            <div className="text-center">
                <h2 className="text-lg font-semibold">No Borrowed Books Yet</h2>
                <p className="text-sm text-gray-400">Explore the library and borrow your first book today!</p>
            </div>
          </Card>
        )}
      </section>
    </main>

  );
};
export default Page;