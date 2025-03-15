"use client"

import { Session } from "next-auth";
import AdminSearch from "./AdminSearch";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";


const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-gray-100 mb-3">
          Welcome, {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">
          Monitor all of your users and books here
        </p>
      </div>

      <AdminSearch pathname={pathname} query={query} />
    </header>
  );
};
export default Header;