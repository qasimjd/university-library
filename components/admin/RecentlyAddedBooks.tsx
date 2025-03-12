import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IBook } from "@/database/Models/book.modle";
import BookCover from "../BookCover";
import { formatCreatedAt } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

const RecentlyAddedBooks = ({ allBooks }: { allBooks: IBook[] }) => {

  return (
    <Card className="p-4 bg-gray-900 text-gray-100 border-none">
      <div className="space-y-4">
        {allBooks.map((book) => (
          <div key={book._id.toString()} className="flex items-center gap-4">
            <div className="w-11 h-16 relative">
              <BookCover coverColor={book.coverColor} coverUrl={book.coverUrl} className="h-16 w-11" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">{book.title}</p>
              <p className="text-sm text-gray-500">By {book.author} • {book.genre}</p>
              <div className="flex items-center gap-1">
                <CalendarDays size={14} color="#636363" />
                <p className="text-xs text-gray-400">{formatCreatedAt(book.createdAt)}</p>
              </div>
            </div>
            <Link href={`/books/${book._id}`} passHref>
              <Button variant="link">
                <Image src="/icons/admin/eye.svg" alt="Accept" width={17} height={17} />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentlyAddedBooks;