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
import AdminSelect from "./TableSelect";
import UniversityIdCard from "../UniversityIdCard";

const AdminTable = ({ users }: { users: IUser[] }) => {
    return (
        <div className="m-2 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg flex flex-col gap-4  overflow-y-auto max-h-[calc(100vh-290px)]">
            <Table className="border-collapse w-full">
                <TableCaption className="text-gray-400">
                    A list of all registered users.
                </TableCaption>

                {/* Table Header */}
                <TableHeader className="bg-primary-admin sticky top-0 z-10">
                    <TableRow className="hover:bg-gray-900 border-none">
                        <TableHead className="w-[300px] text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Date Joined</TableHead>
                        <TableHead className="text-gray-300">Last Active</TableHead>
                        <TableHead className="text-center text-gray-300">User Role</TableHead>
                        <TableHead className="text-gray-300 text-center">Books Borrowed</TableHead>
                        <TableHead className="text-gray-300">University ID</TableHead>
                        <TableHead className="text-gray-300">University Card</TableHead>
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

                            {/* last Active */}
                            <TableCell className="border-none text-gray-400">
                                {formatCreatedAt(user.lastActive)}
                            </TableCell>

                            {/* Role Dropdown */}
                            <TableCell className="border-none text-center">
                                <AdminSelect type="userRole" selectOption={user.role} userId={user._id as string} />
                            </TableCell>

                            {/* Books Borrowed */}
                            <TableCell className="border-none text-center text-gray-400">
                                {user.borrowBooksIds.length}
                            </TableCell>

                            {/* University ID */}
                            <TableCell className="border-none text-gray-400">{user.universityId}</TableCell>

                            {/* University Card */}
                            <TableCell className="border-none">
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
    );
};

export default AdminTable;