import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const BorrowRequests = () => {
  const requests = [
    {
      id: 1,
      title: "Inside Evil: Inside Evil Series, Book 1",
      author: "Rachel Heng",
      genre: "Strategic, Fantasy",
      user: "Darrell Stewards",
      date: "12/01/24",
      cover: "/covers/book1.jpg",
    },
    {
      id: 2,
      title: "Jayne Castle - People in Glass Houses",
      author: "Rachel Heng",
      genre: "Strategic, Fantasy",
      user: "Darrell Stewards",
      date: "12/01/24",
      cover: "/covers/book2.jpg",
    },
  ];

  return (
    <Card className="p-4 bg-gray-900 text-gray-100 border-none">
      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="flex items-center gap-4">
            <Image src={req.cover} alt={req.title} width={50} height={75} className="rounded-md" />
            <div className="flex-1">
              <p className="font-medium text-white">{req.title}</p>
              <p className="text-sm text-gray-500">By {req.author} • {req.genre}</p>
              <p className="text-xs text-gray-400">{req.user} • {req.date}</p>
            </div>
            <Button variant="ghost">👁</Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BorrowRequests;
