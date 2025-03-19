import SearchFormReset from "./admin/SearchFormReset";

const SearchBar = ({ query }: { query?: string }) => {
    return (
        <form 
            action="/search"
            className="relative mt-10 flex justify-between min-h-14 w-full items-center rounded-xl bg-dark-300 px-4 shadow-lg search-form"
        >
            <div className="flex gap-2">
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

                <input
                    name="query"
                    defaultValue={query ?? ""}
                    placeholder="Search..."
                    className="w-full border-none bg-dark-300 font-bold placeholder:font-normal text-white placeholder:text-light-100 focus:ring-0 focus:outline-none"
                />
            </div>

            {query?.trim() && <SearchFormReset />}
        </form>
    );
};

export default SearchBar;
