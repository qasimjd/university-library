import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getBooks } from "@/lib/admin/actions/book.action";
import AllBooksTable from "@/components/admin/AllBooksTable";

const Page = async () => {

  const res = await getBooks();
  const allBooks = res.data;
  console.log(allBooks);
  if (!allBooks) return [];

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
        {allBooks && <AllBooksTable allBooks={allBooks} />}
      </div>
    </section>
  );
};

export default Page;