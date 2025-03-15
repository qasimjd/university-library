import BorroRecordsTable from "@/components/admin/tables/BorroRecordsTable";
import { getBorrowRecords } from "@/lib/admin/actions/user.action";


const page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

  const quer = searchParams.query || "";

  const borrowRecordsResponse = await getBorrowRecords(quer);
  const borrowRecords = borrowRecordsResponse.success && borrowRecordsResponse.data ? borrowRecordsResponse.data : [];
  
  return (
    <section className="w-full rounded-md text-gray-100 bg-gray-900 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Books Borrow Records</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <BorroRecordsTable borrowRecords={borrowRecords} />
      </div>
    </section>
  )
}

export default page



