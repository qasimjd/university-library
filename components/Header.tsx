"use client";

import { useState, useEffect } from "react";
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
import { LogoutDialog } from "./LogoutCard";
import { Home, Menu, Search, User } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 mt-6 bg-gray-900 px-6 py-3 shadow-md rounded-lg w-full">
      <div style={{ width: '100%', visibility: mounted ? 'visible' : 'hidden' }} className="flex items-center justify-between w-full mx-auto">
        {/* Logo */}
        <div className="min-w-[180px] md:min-w-[200px]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] md:w-[37px] md:h-[37px] flex-shrink-0">
              <Image src="/icons/logo.svg" alt="logo" width={30} height={30} className="w-full h-full" priority />
            </div>
            <h1 className="text-xl font-semibold text-gray-200 md:text-2xl whitespace-nowrap">BookWise</h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-row gap-6 items-center flex-grow justify-center min-w-[300px]">
          <li className="min-w-[60px] text-center">
            <Link href="/" className={`hover:text-primary ${pathname === "/" ? "text-primary" : "text-white"} block`}>
              Home
            </Link>
          </li>
          <li className="min-w-[60px] text-center">
            <Link href="/search" className={`hover:text-primary ${pathname.startsWith("/search") ? "text-primary" : "text-white"} block`}>
              Search
            </Link>
          </li>
          <li className="min-w-[60px] text-center">
          <Link href="/my-profile" className={`hover:text-primary ${pathname.startsWith("/my-profile") ? "text-primary" : "text-white"} block`}>
              Profile
            </Link>
          </li>
        </ul>
        <div className="hidden md:block min-w-[100px]">
          <LogoutDialog />
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden">
            <Menu size={28} color="white" />
          </SheetTrigger>
          <SheetContent className="bg-gray-900 text-white border-none w-full">
            <SheetHeader className="w-full">
              <SheetTitle className="text-gray-100 w-full">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-[30px] h-[30px] flex-shrink-0">
                    <Image src="/icons/logo.svg" alt="logo" width={30} height={30} className="w-full h-full" priority />
                  </div>
                  <h1 className="text-xl font-semibold text-gray-200 whitespace-nowrap">BookWise</h1>
                </div>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Library Management System Boowise.
              </SheetDescription>
            </SheetHeader>

            <nav className="mt-10 flex flex-col gap-4 w-full">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg transition w-full ${pathname === "/" ? "bg-primary text-black" : "hover:bg-gray-800"}`}
                style={{ minWidth: '100%' }}
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