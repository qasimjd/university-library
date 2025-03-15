import AdminTable from "@/components/admin/tables/UsersTable"
import { getAllUsers } from "@/lib/admin/actions/user.action";


const Page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const query = searchParams.query || "";

  const result = await getAllUsers(query);
  const users = result.success ? result.data || [] : [];

  return (
    <section className="w-full rounded-md text-gray-100 bg-gray-900 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Users</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <AdminTable users={users} />
      </div>
    </section>
  )
}

export default Page



