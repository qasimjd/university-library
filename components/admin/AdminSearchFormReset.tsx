"use client"

import Link from "next/link";
import { X } from "lucide-react";

const AdminSearchFormReset = ({pathname}: {pathname: string}) => {
    const reset = () => {
        const form = document.querySelector('.admin-search') as HTMLFormElement;

        if (form) form.reset();
    }

    return (
        <button type="reset" onClick={reset}>
            <Link href={pathname} className="search-btn text-white">
                <X className="size-5" />
            </Link>
        </button>
    )
}
export default AdminSearchFormReset