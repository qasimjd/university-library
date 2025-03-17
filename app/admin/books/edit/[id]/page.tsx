import { getBookById, updateBook } from "@/lib/admin/actions/book.action";
import BookForm from "@/components/admin/form/BookForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EditBookPage = async ({ params }: { params: { id: string } }) => {
    const book = await getBookById(params.id);

    if (!book) {
        return <p className="text-red-500">Book not found.</p>;
    }

    return (

        <>
            <Button asChild className="back-btn">
                <Link href="/admin/books">Go Back</Link>
            </Button>

            <section className="w-full max-w-2xl">
                <BookForm book={book} type="update" />;
                <BookForm />
            </section>
        </>
    )
};

export default EditBookPage;
