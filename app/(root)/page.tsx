import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { getBooks } from "@/lib/admin/actions/book.action";

const Home = async () => {
  const result = await getBooks();

  if (!result.success) {
    return <p>Error loading books</p>;
  }

  const books = result.data;

  return (
    <>
      {books && books.length > 0 && <BookOverview {...books[1]} />}

      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;