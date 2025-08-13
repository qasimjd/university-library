import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { getBooksforRoot } from "@/lib/admin/actions/book.action";
import { Loader } from "lucide-react";
import { Suspense } from "react";
import { unstable_cache } from 'next/cache';

// Cache the book fetching function to improve performance
const getCachedBooks = unstable_cache(
  async (userId: string) => {
    return await getBooksforRoot(userId);
  },
  ['books-for-root'],
  { revalidate: 60 * 10 } // Cache for 10 minutes
);

const Home = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const result = await getCachedBooks(userId || "");
  const books = result.data;
  const index = books ? Math.floor(Math.random() * books.length) : 0;

  return (
    <>
      {/* Featured Book */}
      <Suspense fallback={<div className="w-full h-[40vh] flex items-center justify-center"><Loader className="animate-spin text-gray-400" size={40} /></div>}>
        {books && books.length > 0 && (
          <BookOverview {...books[index]} />
        )}
      </Suspense>

      {/* Latest Books - Load separately with its own suspense boundary */}
      <Suspense fallback={<div className="w-full h-[20vh] mt-28 flex items-center justify-center"><Loader className="animate-spin text-gray-400" size={30} /></div>}>
        {books && books.length > 2 && (
          <BookList
            title="Latest Books"
            books={books.slice(0, 8)} /* Limit displayed books for faster rendering */
            containerClassName="mt-28"
          />
        )}
      </Suspense>
    </>
  );
};


export default Home;