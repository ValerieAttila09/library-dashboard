export default function SearchBar({ search, setSearch, toggleSidebar }) {
  return (
    <div className="w-full flex justify-between bg-[#fafafa] px-4 py-2">
      <label htmlFor="search" className="bg-white w-1/2 relative rounded-full border border-[#ebebeb] flex items-center">
        <svg className="size-4 text-neutral-500 absolute left-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197M15.803 15.803A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search..."
          className="w-full ps-8 py-1 outline-none"
        />
      </label>
      <div className="flex items-center gap-2">
        <button onClick={toggleSidebar} className="rounded-md bg-white border border-[#dbdbdb] px-3 py-1 hover:bg-[#f6f6f6] transition-all">
          Add Book
        </button>
      </div>
    </div>
  );
}
