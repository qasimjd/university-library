"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("query") || "";
    
    const [search, setSearch] = useState(initialQuery);
    const router = useRouter();

    // Update state when the URL query changes (in case of navigation)
    useEffect(() => {
        setSearch(initialQuery);
    }, [initialQuery]);

    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!search.trim()) return;
        router.push(`/search?query=${encodeURIComponent(search)}`);
    }, [search, router]);

    return (
        <form 
            onSubmit={handleSearch} 
            className="relative mt-10 flex min-h-14 w-full items-center rounded-xl bg-dark-300 px-4 shadow-lg"
        >
            {/* Search Button */}
            <button type="submit" className="text-primary px-2 focus:outline-none">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    className="size-7 text-primary"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                </svg>
            </button>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search for books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-none bg-dark-300 font-bold placeholder:font-normal text-white placeholder:text-light-100 focus:ring-0 focus:outline-none"
            />

            {/* Clear Button */}
            {search && (
                <button
                    type="button"
                    onClick={() => {
                        setSearch("");
                        router.push("/search");
                    }}
                    className="absolute right-4 cursor-pointer"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        className="size-7 text-primary"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </form>
    );
};

export default SearchBar;
