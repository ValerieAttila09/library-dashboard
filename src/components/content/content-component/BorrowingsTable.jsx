import RowData from "./RowData";

export default function BorrowingsTable({ data }) {
  return (
    <div className="w-full h-auto md:h-[26rem] p-5">
      <div className="shadow-md overflow-hidden rounded-lg border border-[#ebebeb]">
        <div className="w-full h-full overflow-y-auto overflow-x-auto pb-4">
          <table className="w-full">
            <thead>
              <tr className="bg-[#fcfcfc]">
                <TableHeader title="Borrower" />
                <TableHeader title="Borrower Email" />
                <TableHeader title="Book Title" />
                <TableHeader title="Book Author" />
                <TableHeader title="Quantity" />
                <TableHeader title="Total Price" />
                <TableHeader title="Company" />
                <TableHeader title="Address" />
                <TableHeader title="City" />
                <TableHeader title="Country" />
                <TableHeader title="Postal" />
                <TableHeader title="At" />
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

function TableHeader({ title }) {
  return (
    <th className="outfit-medium px-2 py-3 text-start text-neutral-700">
      {title}
    </th>
  );
}
