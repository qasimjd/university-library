import AdminTable from "@/components/admin/Admintable"
import { getAllUsers } from "@/lib/admin/actions/user.action";


const page = async () => {

  const users = await getAllUsers();

  return (
    <>
      <AdminTable users={users} />
    </>
  )
}

export default page



