"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Session } from "next-auth";
import { LogoutDialog } from "./LogoutCard";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <header className="mt-6 flex justify-between items-center gap-6 min-w-7xl px-6">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
        <h1 className="text-2xl font-semibold text-gray-200 max-md:hidden">BooWise</h1>
      </Link>

      <ul className="flex flex-row gap-4 items-center">
        <li>
          <Link href="/" className={`hover:text-primary ${pathname === "/" ? "text-primary" : "text-white"}`}>
            Home
          </Link>
        </li>

        <li>
          <Link href="/search" className={`hover:text-primary ${pathname.startsWith("/search") ? "text-primary" : "text-white"}`}>
            Search
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
          <LogoutDialog />
        </li>
      </ul>
    </header>
  );
};

export default Header;
