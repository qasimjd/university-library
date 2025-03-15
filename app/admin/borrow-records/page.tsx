import BorroRecordsTable from "@/components/admin/tables/BorroRecordsTable";
import { Card } from "@/components/ui/card";
import { getBorrowRecords } from "@/lib/admin/actions/user.action";
import Image from "next/image";


const page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

  const query = searchParams.query || "";

  const borrowRecordsResponse = await getBorrowRecords(query);
  const borrowRecords = borrowRecordsResponse.success && borrowRecordsResponse.data ? borrowRecordsResponse.data : [];

  return (
    <section className="w-full rounded-md text-gray-100 bg-gray-900 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Books Borrow Records</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        {borrowRecords.length > 0 ? (
          <BorroRecordsTable borrowRecords={borrowRecords} />

        ) :
          <Card className="bg-gray-900 text-gray-300 flex flex-col justify-center items-center border-none min-h-[calc(100vh-290px)]">
            <Image src="/images/no-data.png" className="invert opacity-15" alt="empty" width={140} height={140} />
            <div className="text-center">
              <p className="text-gray-400 mt-2">No books found.</p>
            </div>
          </Card>
        }
      </div>
    </section>
  )
}

export default page



