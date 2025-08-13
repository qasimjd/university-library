import React from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import { cn, formatDayMonth, hexToRgb } from "@/lib/utils";
import Image from "next/image";
import { IBook } from "@/database/Models/book.modle";
import { auth } from "@/auth";
import BorrowReceipt from "./BorrowReceipt";
import { BorrowedRecord } from "@/lib/admin/actions/book.action";
import { BORROW_STATUS_ENUM } from "@/database/Models/borrowRecords";
import { unstable_cache } from 'next/cache';
import { checkUserBorrowedBook } from '@/lib/actions/user.actions';

// Cache the borrow record fetching
const getCachedBorrowRecord = unstable_cache(
  async (userId: string, bookId: string) => {
    return await BorrowedRecord({ userId, bookId });
  },
  ['borrow-record'],
  { revalidate: 60 * 5 } // Cache for 5 minutes
);

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
  
  const bookId = _id.toString();
  
  const [hasBorrowed, record] = await Promise.all([
    checkUserBorrowedBook(userId, bookId),
    getCachedBorrowRecord(userId, bookId)
  ]);
  
  let daysLeft = 0;
  let borrowDate, status, returnDate;
  
  if (record) {
    borrowDate = record.borrowDate;
    status = record.status;
    returnDate = record.returnDate;
    
    const dueDate = new Date(record.dueDate);
    daysLeft = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  }

  const isLoanedBook = hasBorrowed;


  return (
    <li>
      <Link
        href={`/books/${_id}`}
        className={cn(isLoanedBook && "flex flex-col")}
      >
        {isLoanedBook ? (
          <div className="p-4 rounded-lg" style={{ backgroundColor: `rgba(${hexToRgb(coverColor)}, 0.3)` }}>
            <BookCover coverColor={coverColor} coverUrl={coverUrl} />
          </div>
        ) : (
          <BookCover coverColor={coverColor} coverUrl={coverUrl} />
        )}

        <div className="xs:max-w-40 max-w-28">
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
      </Link>

      {isLoanedBook && (
        <div className="flex items-start text-xs xs:text-sm flex-col mt-2 gap-1 w-full">
          <div className="book-loaned flx gap-1">
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
              <p className={status === BORROW_STATUS_ENUM.OVERDUE ? "text-red" : "text-gray-100"}>
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