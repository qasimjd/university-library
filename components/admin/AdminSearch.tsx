import React from 'react'
import Form from "next/form";
import { Search } from 'lucide-react';
import SearchFormReset from './SearchFormReset';

const AdminSearch = ({ query, pathname }: { query?: string, pathname:string }) => {
    return (
        <Form action={pathname} scroll={false} className="admin-search" >
            <input
                name="query"
                defaultValue={query}
                placeholder="Search..."
                className="admin-search_input"
            />

            <div className="flex gap-2">
                {query?.trim() && <SearchFormReset />}

                <button type="submit" className="search-btn text-white">
                    <Search color='gray' className="size-5" />
                </button>
            </div>
        </Form>)
}

export default AdminSearch
