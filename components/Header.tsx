"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { LogoutDialog } from "./LogoutCard";
import { Home, Menu, Search, User } from "lucide-react";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 mt-6 bg-gray-900 px-6 py-3 shadow-md rounded-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
          <h1 className="text-2xl font-semibold text-gray-200 max-md:hidden">BooWise</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-row gap-6 items-center">
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
          <Link href="/my-profile" className={`hover:text-primary ${pathname.startsWith("/my-profile") ? "text-primary" : "text-white"}`}>
              Profile
            </Link>
          </li>
        </ul>
        <ul className="hidden md:block">
          <LogoutDialog />
        </ul>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden">
            <Menu size={28} color="white" />
          </SheetTrigger>
          <SheetContent className="bg-gray-900 text-white border-none">
            <SheetHeader>
              <SheetTitle className="text-gray-100">
                <div className="flex items-center gap-2">
                  <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
                  <h1 className="text-xl font-semibold text-gray-200">BooWise</h1>
                </div>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Library Management System Boowise.
              </SheetDescription>
            </SheetHeader>

            <nav className="mt-10 flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${pathname === "/" ? "bg-primary text-black" : "hover:bg-gray-800"}`}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>

              <Link
                href="/search"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${pathname.startsWith("/search") ? "bg-primary text-black" : "hover:bg-gray-800"}`}
              >
                <Search size={20} />
                <span>Search</span>
              </Link>

              <Link 
                href="/my-profile"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${pathname.startsWith("/my-profile") ? "bg-primary text-black" : "hover:bg-gray-800"}`}
              >
                <User size={20} />
                <span>My Profile</span>
              </Link>

              <div className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg"
              >
                <LogoutDialog />
                <span>Logout</span>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;