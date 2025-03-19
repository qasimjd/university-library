import React from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import { cn, formatDayMonth, hexToRgb } from "@/lib/utils";
import Image from "next/image";
import { IBook } from "@/database/Models/book.modle";
import { auth } from "@/auth";
import User from "@/database/Models/user.model";
import BorrowReceipt from "./BorrowReceipt";
import { BorrowedRecord } from "@/lib/admin/actions/book.action";
import { BORROW_STATUS_ENUM, IBorrowRecord } from "@/database/Models/borrowRecords";

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

  const record = await BorrowedRecord({ userId, bookId });
  const { borrowDate, status, returnDate } = record as IBorrowRecord;

  const dueDate = new Date(record.dueDate);
  const daysLeft = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const hasBorrowed = user?.borrowBooksIds?.some((id) => id.toString() === _id.toString());
  const isLoanedBook = hasBorrowed;


  return (
    <li className="w-44">
      <Link
        href={`/books/${_id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        {isLoanedBook ? (
          <div className={isLoanedBook ? "p-4 rounded-lg" : ""} style={{ backgroundColor: `rgba(${hexToRgb(coverColor)}, 0.3)` }}>
            <BookCover variant={isLoanedBook ? "medium" : undefined} coverColor={coverColor} coverUrl={coverUrl} />
          </div>
        ) : (
          <BookCover coverColor={coverColor} coverUrl={coverUrl} />
        )}

        <div className="mt-4 xs:max-w-40 max-w-24">
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
      </Link>

      {isLoanedBook && (
        <div className="flex text-xs xs:text-sm flex-col mt-2 gap-1 w-full">
          <div className="book-loaned flx gap-1 items-center">
            <Image
              src="/icons/book-2.svg"
              alt="user"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-gray-400">Borrowed on {formatDayMonth(borrowDate)}</p>
          </div>
          <div className="book-loaned flx gap-1 items-center">
            <div className="flex gap-1 items-center">
              {status === BORROW_STATUS_ENUM.BORROW ? (
                <Image
                  src="/icons/calendar.svg"
                  alt="calendar"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              ) : status === BORROW_STATUS_ENUM.OVERDUE ? (
                <Image
                  src="/icons/warning.svg"
                  alt="calendar"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              ) :
                <Image
                  src="/icons/tick.svg"
                  alt="calendar"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              }
              <p className={cn(daysLeft > 0 ? "text-gray-100" : "text-red")}>
                {status === BORROW_STATUS_ENUM.BORROW && daysLeft > 0 ? `${daysLeft} day${daysLeft > 1 ? 's' : ''} left to due` : status === BORROW_STATUS_ENUM.OVERDUE ? 'Over Due' : returnDate ? `Returned on ${formatDayMonth(returnDate)}` : ''}
              </p>
            </div>
            {(status === BORROW_STATUS_ENUM.OVERDUE || status === BORROW_STATUS_ENUM.BORROW) && (
              <BorrowReceipt receipt={record} />
            )}
          </div>

        </div>
      )}
    </li>
  );
}

export default BookCard;