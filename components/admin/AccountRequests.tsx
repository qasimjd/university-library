import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IUser } from "@/database/Models/user.model";
import { Avatar, AvatarFallback } from "../ui/avatar";

const AccountRequests = ({ users }: { users: IUser[] }) => {

  return (
    <Card className="bg-gray-900 text-gray-100 border-none">
      <div className="grid grid-cols-3 gap-3">
        {users.map((user) => (
          <div key={user._id as string} className="flex flex-col items-center gap-2 p-2 border-none bg-gray-800 rounded-md">
            <Avatar>
              <AvatarFallback className="bg-fuchsia-700 text-white">
                {user.fullName.split(" ").map((n) => n.charAt(0)).join("").substring(0, 2) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex justify-center items-center flex-col">
              <p className="font-medium text-white">{user.fullName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AccountRequests;
