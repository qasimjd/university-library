"use client";

import Image from 'next/image'
import { Button } from './ui/button'
import { borrowBook } from '@/lib/admin/actions/book.action'
import { toast } from 'sonner'
import { useState } from 'react';

const BorrowBook = ({ userId, bookId, hasBorrowed }: { userId: string, bookId: string , hasBorrowed: boolean}) => {
    const [borrowing, setBorrowing] = useState(false)

    const handleBorroBook = async () => {
        try {
            setBorrowing(true)
            const result = await borrowBook({ userId, bookId });
            if (result.success) {
                toast.success('Book borrowed successfully')
            } else {
                toast.error(result.error)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setBorrowing(false)
        }
    }


    return (
        <Button className='book-overview_btn ' onClick={handleBorroBook} disabled={borrowing || hasBorrowed}>
            <Image src="/icons/book.svg" alt="star" width={20} height={20} />
            <p className='font-bebas-neue text-xl text-dark-100'>
            {hasBorrowed ? "Already Borrowed" : borrowing ? "Borrowing..." : "Borrow"}
            </p>
        </Button>
    )
}

export default BorrowBook
