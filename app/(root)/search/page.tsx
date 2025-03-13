import SearchBar from '@/components/SearchBar'
import React from 'react'
import { searchBooks } from "@/lib/admin/actions/book.action";
import BookCard from '@/components/BookCard';
import Image from 'next/image';


const page = async ({ searchParams }: { searchParams: { query: string } }) => {
    const query = searchParams.query || "";
    const result = query ? await searchBooks(query) : { success: false, data: [] };

    return (
        <main className="library">
            <div className='max-w-xl mx-auto text-center'>
                <p className='library-subtitle'>Unlock a World of Knowledge</p>
                <h1 className='library-title'>Find Your Next Read Search by
                <span className='text-primary'> Title </span>or
                <span className='text-primary'> Author</span></h1>
                <SearchBar />
            </div>
            <div className='mt-10 flex flex-col items-start'>
                {query && (
                    <h2 className="text-2xl font-semibold text-white">
                        Search results for <span className="text-primary">"{query}"</span>
                    </h2>
                )}
                {result.success && result.data.length > 0 ? (
                    <ul className="book-list">
                        {result.data.map((book: any) => (
                            <BookCard key={book.title} {...book} />
                        ))}
                    </ul>
                ) : query && result.success === false ? (
                    <div className="text-white flex flex-col items-center justify-center mx-auto">
                        <Image
                            src="/images/no-books.png"
                            alt="auth illustration"
                            height={150}
                            width={150}
                            layout="intrinsic"
                        />
                        <p className="text-2xl font-semibold">No books found</p>
                        <p className="text-lg mt-4">Try searching for another book</p>

                    </div>
                ) :
                    ( <section className="flex items-center justify-center h-full mx-auto">
                        <p className="text-lg text-center mx-auto text-gray-400">Start searching for books above</p>
                    </section>
                    )
                }
            </div>
        </main>
    )
}

export default page
