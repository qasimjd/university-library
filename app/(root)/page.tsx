import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { getBooksforRoot } from "@/lib/admin/actions/book.action";

const Home = async () => {

  const session = await auth();
  const userId = session?.user?.id;

  const result = await getBooksforRoot(userId || "");
  const books = result.data;
  const index = books ? Math.floor(Math.random() * books.length) : 0;

  return (
    <>
      {books && books.length > 0 && (
        <BookOverview {...books[index]} />
      )}

      {books && books.length > 2 && (
        <BookList
          title="Latest Books"
          books={books}
          containerClassName="mt-28"
        />
      )}
    </>
  );
};

export default Home;