import React from "react";
import { Card } from "@/components/ui/card";
import StatsCard from "@/components/admin/StatsCard";
import BorrowRequests from "@/components/admin/BorrowRequests";
import RecentlyAddedBooks from "@/components/admin/RecentlyAddedBooks";
import AccountRequests from "@/components/admin/AccountRequests";

const AdminDashboard = () => {
    return (
        <div className="flex w-full">
            <div className="flex-1 p-6 space-y-6 bg-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard title="Borrowed Books" value={145} change={-2} />
                    <StatsCard title="Total Users" value={317} change={4} />
                    <StatsCard title="Total Books" value={163} change={2} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-1">
                        <Card className="p-4 bg-gray-900 text-gray-100 border-none">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Borrow Requests</h2>
                                <button className="bg-gray-800 px-3 py-2 rounded-full text-xs">View All</button>
                            </div>
                            <BorrowRequests />
                        </Card>

                        <Card className="mt-6 p-4 bg-gray-900 text-gray-100 border-none">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Account Requests</h2>
                                <button className="bg-gray-800 px-3 py-2 rounded-full text-xs">View All</button>
                            </div>
                            <AccountRequests />
                        </Card>
                    </div>
                    <div className="lg:col-span-1">
                        <Card className="p-4 bg-gray-900 text-gray-100 border-none">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Recently Added Books</h2>
                                <button className="bg-gray-800 px-3 py-2 rounded-full text-xs">View All</button>
                            </div>
                            <RecentlyAddedBooks />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
