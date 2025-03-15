import Image from 'next/image'
import React from 'react'
import BookCover from './BookCover'
import { IBook } from '@/database/Models/book.modle'
import BorrowBook from './BorrowBook'
import { auth } from '@/auth'
import User from '@/database/Models/user.model'

const BookOverview = async ({
    title,
    author,
    genre,
    rating,
    totalCopies,
    availableCopies,
    description,
    coverColor,
    coverUrl,
    _id

}: IBook) => {

    const session = await auth()
    const userId = session?.user?.id
    if (!userId) return null
    
    const user = await User.findOne({ _id: userId });
    const bookId = _id.toString()

    const hasBorrowed = user?.borrowBooksIds?.some((id) => id.toString() === _id.toString());

    return (
        <main>
            <section className='book-overview'>
                <div className='flex flex-col flex-1 gap-5'>
                    <h1>{title}</h1>

                    <div className='book-info'>
                        <p>
                            By <span className="font-semibold text-light-200">{author}</span>
                        </p>

                        <p>
                            Category{" "}
                            <span className="font-semibold text-light-200">{genre}</span>
                        </p>

                        <div className="flex flex-row gap-1">
                            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
                            <p>{rating}</p>
                        </div>

                    </div>

                    <div className="book-copies">
                        <p>
                            Total Books <span>{totalCopies}</span>
                        </p>

                        <p>
                            Available Books <span>{availableCopies}</span>
                        </p>
                    </div>

                    <p className="book-description">{description}</p>

                    <BorrowBook userId={userId} bookId={bookId} hasBorrowed={!!hasBorrowed} />

                </div>

                <div className='relative flex flex-1 justify-center'>
                    <div className='relative'>
                        <BookCover
                            variant='wide'
                            className='z-10'
                            coverColor={coverColor}
                            coverUrl={coverUrl}
                        />

                        <div className='absolute left-11 top-9 xs:left-16 xs:top-12 rotate-12 opacity-40 max-sm:hidden'>
                            <BookCover
                                variant='wide'
                                coverColor={coverColor}
                                coverUrl={coverUrl}
                            />
                        </div>
                    </div>
                </div>

            </section>
        </main>
    )
}

export default BookOverview
