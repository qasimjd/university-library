import BookList from '@/components/BookList';
import BookOverview from '@/components/BookOverview'
import BookVideo from '@/components/bookVideo';
import { IBook } from '@/database/Models/book.modle'
import { getBookByIds, getSimmilarBooks } from '@/lib/admin/actions/book.action';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params
    const bookDetails = await getBookByIds(id);

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
                    <section className="w-full lg:w-1/3">
                        <BookList title="Similer Books" books={books} />
                    </section>
                )}
            </div>
        </>
    );
};
export default Page;