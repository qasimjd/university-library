import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const RecentlyAddedBooks = () => {
  const books = [
    {
      id: 1,
      title: "The Great Reclamation: A Novel",
      author: "Rachel Heng",
      genre: "Strategic, Fantasy",
      date: "12/01/24",
      cover: "/covers/book3.jpg",
    },
    {
      id: 2,
      title: "Inside Evil: Inside Evil Series, Book 1",
      author: "Rachel Heng",
      genre: "Strategic, Fantasy",
      date: "12/01/24",
      cover: "/covers/book1.jpg",
    },
    {
      id: 3,
      title: "Jayne Castle - People in Glass Houses",
      author: "Rachel Heng",
      genre: "Strategic, Fantasy",
      date: "12/01/24",
      cover: "/covers/book2.jpg",
    },
  ];

  return (
    <Card className="p-4 bg-gray-900 text-gray-100 border-none">
      <div className="space-y-4">
        {books.map((book) => (
          <div key={book.id} className="flex items-center gap-4">
            <Image src={book.cover} alt={book.title} width={50} height={75} className="rounded-md" />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">{book.title}</p>
              <p className="text-sm text-gray-500">By {book.author} • {book.genre}</p>
              <p className="text-xs text-gray-400">{book.date}</p>
            </div>
            <Button variant="ghost">👁</Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentlyAddedBooks;