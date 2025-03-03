import Image from "next/image";

type BorrowReceiptProps = {
    receiptId: string;
    dateIssued: string;
    title: string;
    author: string;
    genre: string;
    borrowDate: string;
    dueDate: string;
    duration: string;
};

const BorrowReceipt = ({
    receiptId,
    dateIssued,
    title,
    author,
    genre,
    borrowDate,
    dueDate,
    duration, }: BorrowReceiptProps) => {
    return (
        <div className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-center gap-2 text-xl font-semibold">
                <Image src="/icons/logo.svg" alt="logo" width={25} height={25} />
                <span>BookWise</span>
            </div>

            <h2 className="mt-4 text-lg font-bold">Borrow Receipt</h2>
            <p className="text-sm mt-2">Receipt ID: <span className="text-yellow-400">#{receiptId}</span></p>
            <p className="text-sm">Date Issued: <span className="text-yellow-400">{dateIssued}</span></p>

            <hr className="my-4 border-gray-700" />

            <h3 className="font-semibold">Book Details:</h3>
            <ul className="mt-2 text-sm space-y-1">
                <li><strong>Title:</strong> {title}</li>
                <li><strong>Author:</strong> {author}</li>
                <li><strong>Genre:</strong> {genre}</li>
                <li><strong>Borrowed On:</strong> {borrowDate}</li>
                <li><strong>Due Date:</strong> {dueDate}</li>
                <li><strong>Duration:</strong> {duration} Days</li>
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
            <p className="text-sm">Email: <span className="font-bold">support@bookwise.example.com</span></p>
        </div>);
};

export default BorrowReceipt;
