import AccountTable from "@/components/admin/tables/RequestedTable";
import { getRequestedUsers } from "@/lib/admin/actions/user.action";


const page = async () => {

  const users = await getRequestedUsers();

  return (
    <section className="w-full rounded-md text-gray-100 bg-gray-900 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Account Registration Requests</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <AccountTable users={users} />
      </div>
    </section>
  )
}

export default page



