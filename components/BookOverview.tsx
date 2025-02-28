import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'

const BookOverview = async ({
    title,
    author,
    genre,
    rating,
    totalCopies,
    availableCopies,
    description,
    coverColor,
    coverImage,
    id,
    createdAt,
}: Book) => {
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

                    <Button className='book-overview_btn'>
                        <Image src="/icons/book.svg" alt="star" width={20} height={20} />
                        <p className='font-bebas-neue text-xl text-dark-100'>Borrow</p>
                    </Button>

                </div>

                <div className='relative flex flex-1 justify-center'>
                    <div className='relative'>
                        <BookCover
                            variant='wide'
                            className='z-10'
                            coverColor={coverColor}
                            coverImage={coverImage}
                        />

                        <div className='absolute left-16 top-12 rotate-12 opacity-40 max-sm:hidden'>
                            <BookCover
                                variant='wide'
                                coverColor={coverColor}
                                coverImage={coverImage}
                            />
                        </div>
                    </div>
                </div>

            </section>
        </main>
    )
}

export default BookOverview
