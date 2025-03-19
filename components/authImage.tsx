import { Marquee } from "@/components/magicui/marquee";
import { getBooks } from "@/lib/admin/actions/book.action";
import { IBook } from "@/database/Models/book.modle";
import BookCover from "./BookCover";
import React from "react";

const fetchBooks = async () => {
  const result = await getBooks();
  return result.success ? result.data : [];
};

const BookCard = ({coverColor, coverUrl }: IBook) => {
  return (
    <div className="xs:w-44 w-full">
        <BookCover coverColor={coverColor} coverUrl={coverUrl} />
    </div>
  );
};

export async function MarqueeDemoVertical() {
  const books = await fetchBooks();
  const firstRow = books ? books.slice(0, books.length / 2) : [];
  const secondRow = books ? books.slice(books.length / 2) : [];

  return (
    <div className="relative flex w-full max-h-40 sm:max-h-screen flex-row items-center justify-center overflow-hidden brightness-50">
      <Marquee pauseOnHover vertical className="[--duration:90s]">
        {firstRow.map((book) => (
          <BookCard key={book._id.toString()} {...book} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:90s]">
        {secondRow.map((book) => (
          <BookCard key={book._id.toString()} {...book} />
        ))}
      </Marquee>
      <Marquee pauseOnHover vertical className="[--duration:90s]">
        {secondRow.map((book) => (
          <BookCard key={book._id.toString()} {...book} />
        ))}
      </Marquee>

      {/* Dark Mode Gradients for Smooth Fade Effect */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-dark-100 to-transparent"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-dark-100 to-transparent"></div>
    </div>
  );
}
