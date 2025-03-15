"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

const SearchFormReset = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const reset = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("query");
        router.replace(`?${params.toString()}`, { scroll: false }); 
    };

    return (
        <button type="button" onClick={reset} className="search-btn text-white">
            <X className="size-5" />
        </button>
    );
};

export default SearchFormReset;
