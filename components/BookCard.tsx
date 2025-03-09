import React from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { IBook } from "@/database/Models/book.modle";
import { auth } from "@/auth";
import User from "@/database/Models/user.model";
import BorrowReceipt from "./BorrowReceipt";
import { BorrowedRecord } from "@/lib/admin/actions/book.action";

const BookCard = async ({
  _id,
  title,
  genre,
  coverColor,
  coverUrl,
}: IBook) => {

  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return null
  const user = await User.findOne({ _id: userId });

  const bookId = _id.toString();

  const hasBorrowed = user?.borrowBooksIds?.some((id) => id.toString() === _id.toString());
  const isLoanedBook = hasBorrowed;

  const record = await BorrowedRecord({ userId, bookId });
  const dueDate = new Date(record.dueDate); // Ensure dueDate is a Date object
  const daysLeft = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  
  
  return (
    <li className={cn(isLoanedBook && "xs:w-44 w-full")}>
      <Link
        href={`/books/${_id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        <BookCover coverColor={coverColor} coverUrl={coverUrl} />

        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
      </Link>

      {isLoanedBook && (
        <div className="flex mt-2 gap-1 w-full">
          <div className="book-loaned text-sm w-full ">
            {daysLeft > 0 ? (
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
            ) : (
              <Image
                src="/icons/warning.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
            )}

            <p className={cn(daysLeft > 0 ? "text-gray-100" : "text-red")}>
              {daysLeft > 0 ? `${daysLeft} day${daysLeft > 1 ? 's' : ''} left to due` : 'Over Due'}
            </p>
          </div>
          <div>
            <BorrowReceipt receipt={record} />
          </div>

        </div>
      )}
    </li>
  );
}

export default BookCard;