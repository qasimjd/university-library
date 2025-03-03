import React from "react";
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { notFound } from "next/navigation";
import { userBorrowedBooks } from "@/lib/admin/actions/book.action";
import StudentIDCard from "@/components/StudentIDCard";

const Page = async () => {

  const session = await auth();
  if (!session) {
    notFound();
  }
  const userId = session?.user?.id;
  if (!userId) return null;

  const result = await userBorrowedBooks(userId)
  const books = result.data;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <StudentIDCard
          profile={{
            name: "Adrian",
            email: "contact@jsmastery.pro",
            university: "JS Mastery Pro",
            studentId: "234567856",
            avatarUrl: "/path/to/avatar.png",
            idCard: {
              studentId: "98765432",
              fullName: "John Smith",
              department: "Web Development",
              dob: "02/14/1998",
              contact: "+1 (555) 987-6543",
              universityLogo: "/path/to/university-logo.png",
              qrCode: "/path/to/qr-code.png",
            },
          }}
        />
      </div>

      <div>
        {books && (<BookList title="Borrowed Books" books={books} containerClassName="mx-auto"/>)}
      </div>
    </div>
  );
};
export default Page;