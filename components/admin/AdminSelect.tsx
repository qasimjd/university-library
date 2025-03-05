"use client";

import { toggleStatus } from '@/lib/admin/actions/user.action';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Check } from 'lucide-react'
import { UserRole } from '@/database/Models/user.model';
import { toast } from 'sonner';

const AdminSelect = ({ selectOption, userId }: { selectOption: UserRole, userId: string }) => {

    const handleToggleStatus = async () => {
        const res = await toggleStatus(userId)
        if (res.success) {
            toast.success("User role updated successfully")
        } else {
            toast.error("faild to update user role")
        }
    }

    return (
        <Select defaultValue={selectOption} onValueChange={handleToggleStatus}>
            <SelectTrigger className="cursor-pointer border-none  text-white rounded-lg shadow-sm w-32 hover:bg-gray-800">
                <SelectValue placeholder={selectOption} />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border border-gray-700 hover:bg-gray-900 rounded-lg shadow-lg">
                <SelectItem value="user" className="confirm-approve">
                    <div  className="flex items-center cursor-pointer justify-between px-3 py-1 w-20 rounded-full bg-pink-100 text-pink-600 font-medium">
                        User
                    </div>
                </SelectItem>
                <SelectItem value="admin" className="confirm-approve">
                    <div className="flex items-center cursor-pointer justify-between px-3 py-1 w-20 rounded-full bg-green-100 text-green-600 font-medium">
                        Admin
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    )
}

export default AdminSelect
