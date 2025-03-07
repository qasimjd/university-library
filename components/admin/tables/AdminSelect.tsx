"use client";

import { toggleRole, toggleStatus } from '@/lib/admin/actions/user.action';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { toast } from 'sonner';
import { UserRole, UserStatus } from '@/database/Models/user.model';
import { useState } from 'react';

interface Props {
    selectOption:UserRole | UserStatus,
    userId: string,
    type: "userRole" | "userStatus"
}

const AdminSelect = ({ selectOption, userId, type }: Props) => {

    const [userStatus, setUserStatus] = useState(selectOption)

    const handleToggleRole = async () => {
        const res = await toggleRole(userId)
        if (res.success) {
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }

    const handleToggleStatus = async (value: UserStatus) => {
        const res = await toggleStatus(userId, value as UserStatus)
        if (res.success) {
            toast.success(res.message)
        } else {
            toast.error(res.success)
        }
    }


    return (
        <Select
            defaultValue={userStatus}
            onValueChange={(value) => {
                setUserStatus(value as UserStatus); 
                type === "userRole" ? handleToggleRole() : handleToggleStatus(value as UserStatus);
            }}
        >            <SelectTrigger className="cursor-pointer border-none  text-white rounded-lg shadow-sm w-32 hover:bg-gray-800">
                <SelectValue placeholder={userStatus} />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border border-gray-700 hover:bg-gray-900 rounded-lg shadow-lg">
                <SelectItem value={type === "userRole" ? "user" : "reject"} className="confirm-approve">
                    <div className="flex items-center cursor-pointer justify-between px-3 py-1 w-20 rounded-full bg-pink-100 text-pink-600 font-medium">
                        {type === "userRole" ? "User" : "Reject"}
                    </div>
                </SelectItem>
                <SelectItem value={type === "userRole" ? "admin" : "approve"} className="confirm-approve">
                    <div className="flex items-center cursor-pointer justify-between px-3 py-1 w-20 rounded-full bg-green-100 text-green-600 font-medium">
                        {type === "userRole" ? "Admin" : "Approved"}
                    </div>
                </SelectItem>
                {type === "userStatus" && (
                    <SelectItem value="pending" className="confirm-approve">
                        <div className="flex items-center cursor-pointer justify-between px-3 py-1 w-20 rounded-full bg-orange-100 text-orange-600 font-medium">
                            Pending
                        </div>
                    </SelectItem>
                )}
            </SelectContent>
        </Select>
    )

}

export default AdminSelect
