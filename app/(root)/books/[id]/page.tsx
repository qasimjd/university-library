import BookList from '@/components/BookList';
import BookOverview from '@/components/BookOverview'
import BookVideo from '@/components/bookVideo';
import Book, { IBook } from '@/database/Models/book.modle'
import { getSimmilarBooks } from '@/lib/admin/actions/book.action';
import { notFound } from 'next/navigation'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params
    const bookDetails = await Book.findById(id).lean<IBook>();
    if (!bookDetails) return notFound()

    const res = await getSimmilarBooks(id)
    const books = res.data as IBook[];

    return (
        <>
            <BookOverview {...bookDetails} />

            <div className="book-details">
                <div className="flex-[1.5]">
                    <section className="flex flex-col gap-7">
                        <h3>Video</h3>

                        <BookVideo videoUrl={bookDetails.videoUrl || ""} />
                    </section>
                    <section className="mt-10 flex flex-col gap-7">
                        <h3>Summary</h3>

                        <div className="space-y-5 text-xl text-light-100">
                            {bookDetails.summary.split("\n").map((line: string, i: number) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </section>
                </div>

                {books.length > 0 && (
                    <section className="w-1/3 flex ">
                        <BookList title="Similer Books" books={books} />
                    </section>
                )}
            </div>
        </>
    );
};
export default Page;