import SearchBar from '@/components/SearchBar'
import React from 'react'
import { searchBooks } from "@/lib/admin/actions/book.action";
import BookCard from '@/components/BookCard';
import Image from 'next/image';
import { IBook } from '@/database/Models/book.modle';


const page = async ({ searchParams }: {searchParams: Promise<{ query?: string }> }) => {
    const query = (await searchParams).query;
    const result = await searchBooks(query || '');
    const Books = result?.data || [];

    return (
        <main className="library">
            <div className='max-w-xl mx-auto text-center'>
                <p className='library-subtitle'>Unlock a World of Knowledge</p>
                <h1 className='library-title'>Find Your Next Read Search by
                    <span className='text-primary'> Title </span>or
                    <span className='text-primary'> Author</span></h1>

                <SearchBar query={query} />

            </div>
            <div className='mt-10 flex flex-col items-start'>
                {query && (
                    <h2 className="text-2xl font-semibold text-white">
                        Search results for <span className="text-primary">{query}</span>
                    </h2>
                )}
                {result.success && Books.length > 0 ? (
                    <ul className="book-list">
                        {Books.map((book: IBook) => (
                            <BookCard key={book._id.toString() || book.title} {...book} />
                        ))}
                    </ul>
                ) : query ? (
                    <div className="text-white flex flex-col items-center justify-center mx-auto">
                        <Image
                            src="/images/no-books.png"
                            alt="No books found"
                            height={150}
                            width={150}
                            layout="intrinsic"
                        />
                        <p className="text-2xl font-semibold">No books found</p>
                        <p className="text-lg mt-4">Try searching for another book</p>
                    </div>
                ) : (
                    <section className="flex items-center justify-center h-full mx-auto">
                        <p className="text-lg text-center mx-auto text-gray-400">
                            Start searching for books above
                        </p>
                    </section>
                )}
            </div>
        </main>
    )
}

export default page;
