import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Session } from "next-auth";
import { LogOut } from "lucide-react";
import { signOut } from "@/auth";

const Header = ({ session }: { session: Session }) => {

  return (
    <header className="mt-6 flex justify-between items-center gap-6">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
        <h1 className="text-2xl font-semibold text-gray-200 max-md:hidden">BooWise</h1>
      </Link>

      <ul className="flex flex-row gap-4 items-center">
        <li className="text-white">
          <Link href="/">
            Home
          </Link>
        </li>

        <li className="text-white">
          <Link href="/admin">
            search
          </Link>
        </li>

        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-blue-400 font-bold">
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>

        <li>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className=" cursor-pointer"
          >
            <button type="submit">
              <LogOut size={24} className="text-red-600" />
            </button>
          </form>
        </li>

      </ul>
    </header>
  );
};

export default Header;