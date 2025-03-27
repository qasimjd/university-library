import SearchBar from '@/components/SearchBar'
import React, { Suspense } from 'react'
import { searchBooks } from "@/lib/admin/actions/book.action";
import BookCard from '@/components/BookCard';
import Image from 'next/image';
import { IBook } from '@/database/Models/book.modle';
import { Loader } from 'lucide-react';
import BookList from '@/components/BookList';


const page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    const query = (await searchParams).query;
    const result = await searchBooks(query || '');
    const Books = result?.data || [];

    return (
        <main className="">
            <Suspense fallback={<div className="w-full h-[40vh] flex items-center justify-center"><Loader className="animate-spin text-gray-400" size={40} /></div>}>

                <div className='max-w-xl mx-auto text-center'>
                    <p className='library-subtitle'>Unlock a World of Knowledge</p>
                    <h1 className='library-title'>Find Your Next Read Search by
                        <span className='text-primary'> Title </span>or
                        <span className='text-primary'> Author</span></h1>

                    <SearchBar query={query} />

                </div>
                <div className='mt-10'>
                    {result.success && Books.length > 0 ? (
                        <BookList
                            title={`Search results for "${query}"`}
                            books={Books}
                        />
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
            </Suspense>
        </main>
    )
}

export default page;
