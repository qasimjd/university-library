import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { getBooks } from "@/lib/admin/actions/book.action";

const Home = async () => {
  const result = await getBooks();

  if (!result.success) {
    return <p>Error loading books</p>;
  }

  const books = result.data;
  if (!books) return null;

  const index = Math.floor(Math.random() * books.length)

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