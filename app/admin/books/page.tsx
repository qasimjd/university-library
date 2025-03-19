import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getBooks } from "@/lib/admin/actions/book.action";
import AllBooksTable from "@/components/admin/tables/BooksTable";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const Page = async ({ searchParams }: {searchParams: Promise<{ query?: string }> }) => {
  const query = (await searchParams).query;

  const res = await getBooks(query);
  const allBooks = res?.data || [];

  return (
    <section className="w-full rounded-md text-gray-100 bg-gray-900 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin hover:bg-primary-admin/65" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        {allBooks.length > 0 ? (
          <AllBooksTable allBooks={allBooks} />
        ) : (
          <Card className="bg-gray-900 text-gray-300 flex flex-col justify-center items-center border-none min-h-[calc(100vh-290px)]">
            <Image src="/images/no-data.png" className="invert opacity-15" alt="empty" width={140} height={140} />
            <div className="text-center">
              <p className="text-gray-400 mt-2">No books found.</p>
            </div>
          </Card>
        )}
    </div>
    </section >
  );
};

export default Page;
