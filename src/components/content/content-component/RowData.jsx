export default function RowData({
  borrower,
  borrowerEmail,
  bookTitle,
  bookAuthor,
  count,
  totalPrice,
  company,
  address,
  city,
  country,
  postal,
  deadline
}) {
  return (
    <tr className="hover:bg-[#fafafa] transition-all">
      <td className="text-[14px] text-nowrap ps-2 pe-5 py-4">{borrower}</td>
      <td className="text-[14px] text-nowrap ps-2 pe-5 py-4">{borrowerEmail}</td>
      <td className="text-[14px] text-nowrap ps-2 pe-5 py-4">{bookTitle}</td>
      <td className="text-[14px] text-nowrap ps-2 pe-5 py-4">{bookAuthor}</td>
      <td className="text-[14px] text-nowrap ps-2 pe-5 py-4">{count}</td>
      <td className="text-[14px] text-nowrap ps-2 pe-5 py-4 outfit-regular">{`$${totalPrice} USD`}</td>
      <td className="text-[14px] text-nowrap ps-2 pe-5 py-4">{company}</td>
      <td className="text-[14px] text-nowrap ps-2 pe-5 py-4">{address}</td>
      <td className="text-[14px] text-nowrap ps-2 pe-5 py-4">{city}</td>
      <td className="text-[14px] text-nowrap ps-2 pe-5 py-4">{country}</td>
      <td className="text-[14px] text-nowrap ps-2 pe-5 py-4">{postal}</td>
      <td className="text-[14px] text-nowrap ps-2 pe-5 py-4">{deadline}</td>
    </tr>
  )
}