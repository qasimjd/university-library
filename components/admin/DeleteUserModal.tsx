"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { deleteBookModle, deleteUserModle } from '@/lib/admin/actions/user.action';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const DeleteUserDialog = ({ userId }: { userId: string }) => {

    const handleDeleteUser = async () => {
        const res = await deleteUserModle(userId);
        if (res.succes) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                    <Trash2 color="#ee2b2b" size={16} />
            </DialogTrigger>

            <DialogContent className="bg-gray-900 border text-white border-gray-700 shadow-xl rounded-lg p-6 w-[400px]">
                <DialogHeader className="text-white flex flex-col items-center">
                    <AlertTriangle className="text-yellow-500 mb-2" size={40} />
                    <DialogTitle className="text-xl font-semibold">Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="text-gray-400 text-center mt-2">
                        This action cannot be undone. This will <span className="text-red-400 font-medium">permanently delete</span>
                        the user account and remove all associated data.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 mt-6">
                    {/* Delete User Button (Not inside DialogTrigger to prevent modal auto-close) */}
                    <DialogTrigger asChild>
                        <div
                            onClick={async () => {
                                await handleDeleteUser(); // Ensure delete happens first
                            }}
                            className="w-full py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all font-medium text-center cursor-pointer"
                        >
                            Delete User
                        </div>
                    </DialogTrigger>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteUserDialog;


export const DeleteBookDialog = ({ bookId }: { bookId: string }) => {

    const handleDeleteUser = async () => {
        const res = await deleteBookModle(bookId);
        if (res.succes) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                    <Trash2 color="#ee2b2b" size={16} />
            </DialogTrigger>

            <DialogContent className="bg-gray-900 border text-white border-gray-700 shadow-xl rounded-lg p-6 w-[400px]">
                <DialogHeader className="text-white flex flex-col items-center">
                    <AlertTriangle className="text-yellow-500 mb-2" size={40} />
                    <DialogTitle className="text-xl font-semibold">Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="text-gray-400 text-center mt-2">
                        This action cannot be undone. This will <span className="text-red-400 font-medium">permanently delete</span>
                        the book and remove all associated data.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 mt-6">
                    {/* Delete User Button (Not inside DialogTrigger to prevent modal auto-close) */}
                    <DialogTrigger asChild>
                        <div
                            onClick={async () => {
                                await handleDeleteUser(); // Ensure delete happens first
                            }}
                            className="w-full py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all font-medium text-center cursor-pointer"
                        >
                            Delete Book
                        </div>
                    </DialogTrigger>

                </div>
            </DialogContent>
        </Dialog>
    );
};
