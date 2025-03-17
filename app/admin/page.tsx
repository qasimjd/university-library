import React from "react";
import { Card } from "@/components/ui/card";
import StatsCard from "@/components/admin/StatsCard";
import BorrowRequests from "@/components/admin/BorrowRequests";
import RecentlyAddedBooks from "@/components/admin/RecentlyAddedBooks";
import AccountRequests from "@/components/admin/AccountRequests";
import { getBorrowRecords, getPreviousStats, getRequestedUsers, saveCurrentStats } from "@/lib/admin/actions/user.action";
import { getBooks } from "@/lib/admin/actions/book.action";
import { IStats } from "@/database/Models/stats.modle";
import Link from "next/link";
import Book from "@/database/Models/book.modle";
import User from "@/database/Models/user.model";
import BorrowRecord from "@/database/Models/borrowRecords";

const AdminDashboard = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const query = searchParams.query || "";

    const borrowResponse = await getBorrowRecords(query);
    const usersResponse = await getRequestedUsers(query);
    const booksResponse = await getBooks(query);

    const borrowRecords = borrowResponse.success && borrowResponse.data ? borrowResponse.data : [];
    const users = usersResponse.success && usersResponse.data ? usersResponse.data : [];
    const allBooks = booksResponse.success && booksResponse.data ? booksResponse.data : [];

    const [prevStats, totalDBBooks, totalDBUsers, totalDBBorrowRecords] = await Promise.all([
        getPreviousStats(),
        Book.countDocuments(),
        User.countDocuments(),
        BorrowRecord.countDocuments(),
    ]);
    
    const borrowedChange = prevStats ? totalDBBorrowRecords - prevStats.borrowedBooks : 0;
    const usersChange = prevStats ? totalDBUsers - prevStats.totalUsers : 0;
    const booksChange = prevStats ? totalDBBooks - prevStats.totalBooks : 0;
    
    await saveCurrentStats({
        borrowedBooks: totalDBBorrowRecords,
        totalUsers: totalDBUsers,
        totalBooks: totalDBBooks,
    } as Omit<IStats, "date">);
    
    return (
        <div className="flex w-full">
            <div className="flex-1 space-y-3 bg-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <StatsCard title="Borrowed Books" value={totalDBBorrowRecords} change={borrowedChange} />
                    <StatsCard title="Total Users" value={totalDBUsers} change={usersChange} />
                    <StatsCard title="Total Books" value={totalDBBooks} change={booksChange} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="lg:col-span-1">
                        <Card className="p-4 bg-gray-900 text-gray-100 border-none relative">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Borrow Records</h2>
                                <button className="bg-gray-800 px-3 py-2 rounded-full text-xs">
                                    <Link href="/admin/borrow-records">View All</Link>
                                </button>
                            </div>
                            <div className="h-[260px] overflow-y-auto relative">
                                <BorrowRequests borrowRecords={borrowRecords} />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-800 to-transparent"></div>
                        </Card>

                        <Card className="mt-3 p-4 bg-gray-900 text-gray-100 border-none relative">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Account Requests</h2>
                                <button className="bg-gray-800 px-3 py-2 rounded-full text-xs">
                                    <Link href="/admin/account-requests">View All</Link>
                                </button>
                            </div>
                            <div className="h-60 overflow-y-auto relative">
                                <AccountRequests users={users} />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-800 to-transparent"></div>
                        </Card>
                    </div>
                    <div className="lg:col-span-1">
                        <Card className="p-4 bg-gray-900 text-gray-100 border-none relative">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Recently Added Books</h2>
                                <button className="bg-gray-800 px-3 py-2 rounded-full text-xs">
                                    <Link href="/admin/books">View All</Link>
                                </button>
                            </div>
                            <div className="h-[590px] overflow-y-auto relative">
                                <RecentlyAddedBooks allBooks={allBooks} />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-800 to-transparent"></div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;