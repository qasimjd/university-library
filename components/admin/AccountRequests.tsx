import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AccountRequests = () => {
  const users = [
    { id: 1, name: "Marc Atenson", email: "marcnine@gmail.com", avatar: "/avatars/user1.jpg" },
    { id: 2, name: "Susan Drake", email: "contact@susandrake.com", avatar: "/avatars/user2.jpg" },
    { id: 3, name: "Ronald Richards", email: "ronaldrichard@gmail.com", avatar: "/avatars/user3.jpg" },
    { id: 4, name: "Jane Cooper", email: "janecooper@protonmail.com", avatar: "/avatars/user4.jpg" },
    { id: 5, name: "Ian Warren", email: "wadewarren@mail.com", avatar: "/avatars/user5.jpg" },
    { id: 6, name: "Darrell Steward", email: "darrellsteward@gmail.com", avatar: "/avatars/user6.jpg" },
  ];

  return (
    <Card className="p-4 bg-gray-900 text-gray-100 border-none">
      <div className="grid grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-4 p-2 border rounded-md">
            <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full" />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            <Button variant="ghost">✔</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AccountRequests;
