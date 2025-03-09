import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { getBooks } from "@/lib/admin/actions/book.action";

const Home = async () => {
  const result = await getBooks();

  if (!result.success) {
    return <p>Error loading books</p>;
  }

  const books = result.data;

  return (
    <>
      {books && books.length > 0 && (
        <BookOverview {...books[Math.floor(Math.random() * books.length)]} />
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