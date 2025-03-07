import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IUser } from "@/database/Models/user.model";
import { formatCreatedAt } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import DeleteUserModal from "../DeleteUserModal";
import AdminSelect from "./AdminSelect";
import UniversityIdCard from "../UniversityIdCard";
import StudentIDCard from "@/components/StudentIDCard";

const AccountTable = ({ users }: { users: IUser[] }) => {
    return (
        <div className="m-2 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg flex flex-col gap-4">
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]"> {/* Scrollable container */}
                <Table className="border-collapse w-full">
                    <TableCaption className="text-gray-400">
                        A list of requested users.
                    </TableCaption>

                    {/* Table Header */}
                    <TableHeader className="bg-primary-admin sticky top-0 z-10">
                        <TableRow className="hover:bg-gray-900 border-none">
                            <TableHead className="w-[340px] text-gray-300">Name</TableHead>
                            <TableHead className="w-[150px] text-gray-300">Request Date</TableHead>
                            <TableHead className="w-[120px] text-center text-gray-300">Current Status</TableHead>
                            <TableHead className="text-gray-300 text-center">University ID</TableHead>
                            <TableHead className="text-gray-300 text-center">University Card</TableHead>
                            <TableHead className="text-gray-300">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="bg-gray-900">
                        {users.map((user: IUser) => (
                            <TableRow key={user._id as string} className="hover:bg-gray-800 border-none">
                                {/* Name & Avatar */}
                                <TableCell className="border-none">
                                    <div className="flex items-center gap-3 my-2">
                                        <Avatar>
                                            <AvatarFallback className="bg-fuchsia-700 text-white">
                                                {user.fullName.split(" ").map((n) => n.charAt(0)).join("").substring(0, 2) || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-white">{user.fullName}</p>
                                            <p className="text-gray-400 text-sm">{user.email}</p>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Date Joined */}
                                <TableCell className="border-none text-gray-400">
                                    {formatCreatedAt(user.createdAt)}
                                </TableCell>

                                {/* Role Dropdown */}
                                <TableCell className="border-none text-center">
                                    <AdminSelect type="userStatus" selectOption={user.status} userId={user._id as string} />
                                </TableCell>

                                {/* University ID */}
                                <TableCell className="border-none text-center text-gray-400">{user.universityId}</TableCell>

                                {/* University Card */}
                                <TableCell className="text-center border-none">
                                    <UniversityIdCard universityCard={user.universityCard} />
                                </TableCell>

                                {/* Delete Action */}
                                <TableCell className="border-none text-center">
                                    <DeleteUserModal userId={user._id as string} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AccountTable;