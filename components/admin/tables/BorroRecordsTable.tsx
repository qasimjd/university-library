import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCreatedAt } from "@/lib/utils";
import { IBorrowRecord } from "@/database/Models/borrowRecords";
import Link from "next/link";
import { IUser } from "@/database/Models/user.model";
import { IBook } from "@/database/Models/book.modle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AdminSelect from "./TableSelect";
import BorrowReceipt from "@/components/BorrowReceipt";
import BookCover from "@/components/BookCover";

interface BorroRecordsTableProps {
    borrowRecords: IBorrowRecord[];
}

const BorroRecordsTable = ({ borrowRecords }: BorroRecordsTableProps) => {
    if (!borrowRecords || borrowRecords.length === 0) {
        return <p className="text-gray-400">No borrow records found.</p>;
    }

    return (
        <div className="m-2 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg flex flex-col gap-4">
            <div className="overflow-y-auto max-h-[calc(100vh-325px)]">
                <Table className="border-collapse w-full">
                    <TableCaption className="text-gray-400">
                        A list of requested users.
                    </TableCaption>

                    {/* Table Header */}
                    <TableHeader className="bg-primary-admin sticky top-0 z-10">
                        <TableRow className="hover:bg-gray-900 border-none">
                            <TableHead className="text-gray-300">Book</TableHead>
                            <TableHead className="text-gray-300">User Requested</TableHead>
                            <TableHead className="text-gray-300">Borrow Data</TableHead>
                            <TableHead className="text-gray-300 text-center">Borrowed Date</TableHead>
                            {/* <TableHead className="text-gray-300 text-center">Return Date</TableHead> */}
                            <TableHead className="text-gray-300 text-center">Due Date</TableHead>
                            <TableHead className="text-gray-300 text-center">Receipt</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="bg-gray-900">
                        {borrowRecords.map((record: IBorrowRecord) => {

                            const book = record.bookId as IBook;
                            const user = record.userId as IUser;

                            return (
                                <TableRow key={record._id as string} className="hover:bg-gray-800 border-none">

                                    {/* Book Info */}
                                    <TableCell className="border-none">
                                        <Link href={`/books/${book?._id}`} passHref>
                                            <div className="flex items-center gap-3 my-1">
                                                
                                                <BookCover coverColor={book.coverColor} coverUrl={book.coverUrl} className="h-11 w-8" />

                                                <div className="max-w-[200px]">
                                                    <p className="font-semibold text-white">{book?.title}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </TableCell>

                                    {/* User Requested */}
                                    <TableCell className="border-none">
                                        {user ? (
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarFallback className="bg-fuchsia-700 text-white">
                                                        {user?.fullName.split(" ").map((n) => n.charAt(0)).join("").substring(0, 2) || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-white">{user?.fullName || "Unknown User"}</p>
                                                    <p className="text-gray-400 text-xs">{user?.email || "No email"}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-400">No user data</p>
                                        )}
                                    </TableCell>

                                    {/* Borrowed Data */}
                                    <TableCell className="border-none">
                                        <AdminSelect type="borrowStatus" selectOption={record.status} userId={record._id as string} />
                                    </TableCell>

                                    {/* Borrowed Date */}
                                    <TableCell className="border-none text-cente">
                                        {formatCreatedAt(record.borrowDate)}
                                    </TableCell>

                                    {/* Return Date */}
                                    {/* <TableCell className="border-none text-center text-xs">
                                        {formatCreatedAt(record.dueDate)}
                                    </TableCell> */}

                                    {/* Due Date */}
                                    <TableCell className="border-none text-center">
                                        {formatCreatedAt(record.dueDate)}
                                    </TableCell>

                                    {/* Receipt */}
                                    <TableCell className="border-none text-center text-xs">
                                        <BorrowReceipt receipt={record} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BorroRecordsTable;