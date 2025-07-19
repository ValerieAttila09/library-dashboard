import RowData from "./RowData";

export default function BorrowingsTable({ data, onSort, sortKey, sortOrder }) {
  return (
    <div className="w-full h-auto md:h-[26rem] p-5">
      <div className="shadow-md overflow-hidden rounded-lg border border-[#ebebeb]">
        <div className="w-full h-full overflow-y-auto overflow-x-auto pb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fcfcfc] text-left">
                <TableHeader label="Borrower" sortKeyValue="borrower" sortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
                <TableHeader label="Borrower Email" sortKeyValue="borrower_email" sortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
                <TableHeader label="Book Title" sortKeyValue="book_title" sortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
                <TableHeader label="Book Author" sortKeyValue="book_author" sortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
                <TableHeader label="Quantity" sortKeyValue="count" sortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
                <TableHeader label="Total Price" sortKeyValue="total_price" sortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
                <th className="px-2 py-3">Company</th>
                <th className="px-2 py-3">Address</th>
                <th className="px-2 py-3">City</th>
                <th className="px-2 py-3">Country</th>
                <th className="px-2 py-3">Postal</th>
                <th className="px-2 py-3">At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((borrow) => (
                <RowData
                  key={borrow.id}
                  borrower={borrow.borrower}
                  borrowerEmail={borrow.borrower_email}
                  bookTitle={borrow.book_title}
                  bookAuthor={borrow.book_author}
                  count={borrow.count}
                  totalPrice={borrow.total_price}
                  company={borrow.company}
                  address={borrow.address}
                  city={borrow.city}
                  country={borrow.country}
                  postal={borrow.postal}
                  deadline={borrow.deadline}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TableHeader({ label, sortKeyValue, sortKey, sortOrder, onSort }) {
  const isActive = sortKey === sortKeyValue;
  const arrow = isActive ? (sortOrder === "asc" ? "↑" : "↓") : "";

  return (
    <th
      onClick={() => onSort(sortKeyValue)}
      className="px-2 py-3 cursor-pointer select-none hover:underline text-neutral-700"
    >
      {label} {arrow}
    </th>
  );
}