"use client";

import { toggleRecord, toggleRole, toggleStatus } from '@/lib/admin/actions/user.action';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { toast } from 'sonner';
import { UserRole, UserStatus } from '@/database/Models/user.model';
import { useState } from 'react';
import { BORROW_STATUS_ENUM } from '@/database/Models/borrowRecords';

interface Props {
    selectOption: UserRole | UserStatus | BORROW_STATUS_ENUM,
    userId: string,
    type: "userRole" | "userStatus" | "borrowStatus"
}

const AdminSelect = ({ selectOption, userId, type }: Props) => {

    const [userStatus, setUserStatus] = useState(selectOption)

    const handleToggleUserRole = async () => {
        const res = await toggleRole(userId)
        if (res.success) {
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }

    const handleToggleUserStatus = async (value: UserStatus) => {
        const res = await toggleStatus(userId, value as UserStatus)
        if (res.success) {
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }

    const handleToggleBorrowedStatus = async (value: BORROW_STATUS_ENUM) => {
        const res = await toggleRecord(userId, value as BORROW_STATUS_ENUM)
        if (res.success) {
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }


    return (
        <Select
            defaultValue={userStatus}
            onValueChange={(value) => {
                setUserStatus(value as UserStatus);

                if (type === "userRole") {
                    handleToggleUserRole();
                } else if (type === "userStatus") {
                    handleToggleUserStatus(value as UserStatus);
                } else {
                    handleToggleBorrowedStatus(value as BORROW_STATUS_ENUM);
                }
            }}
        >
            <SelectTrigger className="cursor-pointer border-none  text-white rounded-lg shadow-sm w-32 hover:bg-gray-800">
                <SelectValue placeholder={userStatus} />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border border-gray-700 hover:bg-gray-900 rounded-lg shadow-lg">
                <SelectItem value={type === "userRole" ? "user" : type === "userStatus" ? "reject" : "borrow"} className="confirm-approve">
                    <div className={`flex items-center cursor-pointer justify-between px-3 py-1 w-20 rounded-full ${type === "borrowStatus" ? "bg-purple-100 text-purple-700 font-medium" : "bg-pink-100 text-pink-700 font-medium"}`}>
                        {type === "userRole" ? "User" : type === "userStatus" ? "Reject" : "Borrow"}
                    </div>
                </SelectItem>
                <SelectItem value={type === "userRole" ? "admin" : type === "userStatus" ? "approve" : "return"} className="confirm-approve">
                    <div className="flex items-center cursor-pointer justify-between px-3 py-1 w-20 rounded-full bg-green-100 text-green-700 font-medium">
                        {type === "userRole" ? "Admin" : type === "userStatus" ? "Approve" : "Returned"}                    </div>
                </SelectItem>
                {(type === "userStatus" || type === "borrowStatus") && (
                    <SelectItem value={type === "userStatus" ? "pending" : "overdue"} className="confirm-approve">
                        <div className={`flex items-center cursor-pointer justify-between px-3 py-1 w-20 rounded-full ${type === "userStatus" ? "bg-orange-100 text-orange-600" : "bg-red-600 text-white"} font-medium`}>
                            {type === "userStatus" ? "Pending" : "Overdue"}
                        </div>
                    </SelectItem>
                )}
            </SelectContent>
        </Select>
    )

}

export default AdminSelect
