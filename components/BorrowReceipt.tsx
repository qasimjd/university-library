"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { IBook } from "@/database/Models/book.modle";
import { IBorrowRecord } from "@/database/Models/borrowRecords";
import { formatCreatedAt } from "@/lib/utils";
import { ReceiptText, Download } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const BorrowReceipt = ({ receipt }: { receipt: IBorrowRecord }) => {
    const { bookId, borrowDate, dueDate, _id, status, returnDate } = receipt;
    const id = _id as string;
    const book = bookId as IBook;

    const receiptRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!receiptRef.current) return;

        const canvas = await html2canvas(receiptRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save(`Borrow_Receipt_${id}.pdf`);
    };

    const dueDate1 = new Date(dueDate); // Ensure dueDate is a Date object
    const daysLeft = Math.ceil((dueDate1.getTime() - Date.now()) / (1000 * 60 * 60 * 24));


    return (
        <Dialog>
            <DialogTrigger>
                {
                    status === "overdue" ? <ReceiptText color="#d60000" size={16} /> : <ReceiptText color="#669df5" size={16} />
                }
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-gray-700">
                <DialogTitle className="sr-only"></DialogTitle>
                <DialogDescription className="sr-only"></DialogDescription>

                {/* Receipt Content */}
                <div ref={receiptRef} className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
                    <div className="flex items-center gap-2 text-xl font-semibold">
                        <Image src="/icons/logo.svg" alt="logo" width={25} height={25} />
                        <span>BookWise</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <h2 className="mt-4 text-lg font-bold">Borrow Receipt</h2>
                        <button
                            onClick={handleDownload}
                            className="w-fit bg-blue-800 hover:bg-primary-admin text-white font-bold py-1 p-3 rounded-full transition"
                        >
                            <Download size={16} />
                        </button>
                    </div>

                    <p className="text-sm mt-2">Receipt ID: <span className="text-yellow-400">#{id}</span></p>
                    <p className="text-sm">Date Issued: <span className="text-yellow-400">{formatCreatedAt(borrowDate)}</span></p>

                    <hr className="my-4 border-gray-700" />

                    <h3 className="font-semibold">Book Details:</h3>
                    <ul className="mt-2 text-sm space-y-1">
                        <li><strong>Title:</strong> {book?.title} </li>
                        <li><strong>Author:</strong> {book?.author} </li>
                        <li><strong>Genre:</strong> {book?.genre} </li>
                        <li><strong>Borrowed On:</strong> {formatCreatedAt(borrowDate)}</li>
                        <li><strong>Due Date:</strong> {formatCreatedAt(dueDate)}</li>
                        {returnDate && <li><strong>Returned On:</strong> {formatCreatedAt(returnDate)}</li>}
                        <li><strong>Duration:</strong> {daysLeft > 0 ? `${daysLeft} day${daysLeft > 1 ? 's' : ''} left to due` : ' Over Due'}</li>
                    </ul>

                    <hr className="my-4 border-gray-700" />

                    <h3 className="font-semibold">Terms</h3>
                    <ul className="mt-2 text-sm list-disc list-inside">
                        <li>Please return the book by the due date.</li>
                        <li>Lost or damaged books may incur replacement costs.</li>
                    </ul>

                    <hr className="my-4 border-gray-700" />

                    <p className="text-sm">Thank you for using <strong>BookWise!</strong></p>
                    <p className="text-sm">Website: <span className="font-bold">bookwise.example.com</span></p>
                    <p className="text-sm">Email: <span className="font-bold">qasimalijaved65@gmail.com</span></p>
                </div>

                {/* Download Button */}
            </DialogContent>
        </Dialog>
    );
};

export default BorrowReceipt;
