import BookOverview from '@/components/BookOverview'
import Book, { IBook } from '@/database/Models/book.modle'
import { notFound } from 'next/navigation'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const bookDetails = await Book.findById(id).lean<IBook>();
    if (!bookDetails) return notFound()
        
    return (
        <>
            <BookOverview {...bookDetails}  />

            <div className="book-details">
                <div className="flex-[1.5]">
                    <section className="flex flex-col gap-7">
                        <h3>Video</h3>

                        {/* <BookVideo videoUrl={bookDetails.videoUrl} /> */}
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

                {/*  SIMILAR*/}
            </div>
        </>
    );
};
export default Page;