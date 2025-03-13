import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IBook } from "@/database/Models/book.modle";
import { formatCreatedAt } from "@/lib/utils";
import ClientImage from "../ClientImage";
import Link from "next/link";
import { DeleteBookDialog } from "../DeleteUserModal";
import BookCover from "@/components/BookCover";


const AdminTable = ({ allBooks }: { allBooks: IBook[] }) => {
    return (
        <div className="m-2 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg flex flex-col gap-4  overflow-y-auto max-h-[calc(100vh-290px)]">
            <Table className="border-collapse w-full">
                    <TableCaption className="text-gray-400">
                        A list of all registered users.
                    </TableCaption>

                    {/* Table Header */}
                    <TableHeader className="bg-primary-admin sticky top-0 z-40">
                        <TableRow className="hover:bg-gray-900 border-none">
                            <TableHead className="text-gray-300">Books Title</TableHead>
                            <TableHead className="text-gray-300 text-center">Total Books</TableHead>
                            <TableHead className="text-gray-300 text-center">Avalible Books</TableHead>
                            <TableHead className="text-gray-300">Date Created</TableHead>
                            <TableHead className="text-gray-300 text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="bg-gray-900">
                        {allBooks.map((book: IBook) => (
                            <TableRow key={book._id.toString()} className="hover:bg-gray-800 border-none">
                                {/* Name & Image */}
                                <TableCell className="border-none">
                                    <Link href={`/books/${book._id}`} passHref>
                                        <div className="flex items-center gap-3 my-1">

                                        <BookCover coverColor={book.coverColor} coverUrl={book.coverUrl} className="h-14 w-10" />

                                            <div>
                                                <p className="font-semibold text-white">{book.title}</p>
                                                <p className="text-gray-400 text-sm">{book.genre}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </TableCell>

                                {/* Total Book */}
                                <TableCell className="border-none text-center">
                                    <p className="text-gray-400">{book.totalCopies}</p>
                                </TableCell>

                                {/* Avalible Book */}
                                <TableCell className="border-none text-center">
                                    <p className="text-gray-400">{book.availableCopies}</p>
                                </TableCell>

                                {/* Book Date */}
                                <TableCell className="border-none text-gray-400">
                                    {formatCreatedAt(book.createdAt)}
                                </TableCell>

                                {/* Delete Book */}
                                <TableCell className="border-none text-center text-gray-400">
                                    <DeleteBookDialog bookId={(book._id.toString())} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
            </Table>
        </div>
    );
};

export default AdminTable;