import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { IBorrowRecord } from "@/database/Models/borrowRecords";
import { IBook } from "@/database/Models/book.modle";
import { IUser } from "@/database/Models/user.model";
import BookCover from "../BookCover";
import BorrowReceipt from "../BorrowReceipt";

interface BorroRecordsTableProps {
  borrowRecords: IBorrowRecord[];
}

const BorrowRequests = ({ borrowRecords }: BorroRecordsTableProps) => {
  if (!borrowRecords || borrowRecords.length === 0) {
    return <Card className="bg-gray-900 text-gray-300 flex flex-col justify-center items-center border-none">
      <Image src="/images/no-data.png" className="invert opacity-15" alt="empty" width={120} height={120} />
      <div className="text-center">
        <h2>No Panding Book Request</h2>
        <p className="text-gray-400 mt-2">There are no pending book requests at the moment.</p>
      </div>
    </Card>;
  }

  return (
    <Card className="p-4 bg-gray-900 text-gray-100 border-none">
      <div className="space-y-4">
        {borrowRecords.map((record) => {

          const book = record.bookId as IBook;
          const user = record.userId as IUser;

          return (
            <div key={record._id as string} className="flex items-center gap-4 text-gray-100">
              <div className="w-11 h-16 relative">
                <BookCover coverColor={book.coverColor} coverUrl={book.coverUrl} className="h-16 w-11" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{book.title}</p>
                <p className="text-sm text-gray-500">By {book.author} • {book.genre}</p>
                <p className="text-xs text-gray-400">{user.fullName} • {user.email}</p>
              </div>
              <BorrowReceipt receipt={record} />
            </div>
          )
        })}

      </div>
    </Card>
  );
}

export default BorrowRequests;
