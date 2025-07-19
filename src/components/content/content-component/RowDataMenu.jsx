import Badge from "./Badge";

export default function RowDataMenu({
  book,
  bookId,
  bookTitle,
  bookPrice,
  bookStatus,
  bookAuthorFirstName,
  bookAuthorLastName,
  onAddToCart,
  isInCart,
}) {
  return (
    <tr className="hover:bg-[#fafafa] transition-all">
      <td className="text-[14px] tableValue px-2 py-3">{bookId}</td>
      <td className="text-[14px] tableValue px-2 py-3">{bookTitle}</td>
      <td className="text-[14px] outfit-regular tableValue px-2 py-3">{`$${bookPrice} USD`}</td>
      <td className="text-[14px] px-2 py-3 text-center">
        <Badge Status={bookStatus} />
      </td>
      <td className="text-[14px] tableValue px-2 py-3">
        {`${bookAuthorFirstName} ${bookAuthorLastName}`}
      </td>
      <td className="text-[14px] px-2 py-3 flex justify-start items-center gap-2">
        <button
          className={`px-2 py-1 flex items-center gap-2 rounded-md ${
            isInCart
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white"
          } group border border-transparent hover:border-[#ebebeb] hover:bg-white transition-all`}
          onClick={() => !isInCart && onAddToCart(book)}
          disabled={isInCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`size-5 ${
              isInCart
                ? "text-gray-400"
                : "text-white group-hover:text-indigo-500"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <span
            className={`${
              isInCart
                ? "text-gray-400"
                : "text-white group-hover:text-indigo-500"
            }`}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </span>
        </button>
      </td>
    </tr>
  );
}
