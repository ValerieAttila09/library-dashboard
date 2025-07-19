import { forwardRef } from "react";
import RowDataMenu from "./RowDataMenu";

const CartSidebar = forwardRef(function CartSidebar(
  {
    books,
    cart,
    onAddToCart,
    onRemoveFromCart,
    isBookInCart,
    toggleForm,
    toggleSidebar,
  },
  ref
) {
  return (
    <div ref={ref} className="fixed z-10 bg-white left-[51px] right-0 bottom-0 top-[51px] overflow-y-auto">
      <div className="w-full p-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-semibold">Shopping Experiment</h1>
        <button onClick={toggleSidebar} className="px-3 py-2 border rounded-md hover:bg-gray-100">
          Close
        </button>
      </div>
      <div className="flex gap-4 p-4">
        <div className="w-9/12 overflow-auto border border-[#ebebeb] rounded-md">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fcfcfc]">
                <th className="px-2 py-3 text-left">Book ID</th>
                <th className="px-2 py-3 text-left">Title</th>
                <th className="px-2 py-3 text-left">Price</th>
                <th className="px-2 py-3 text-left">Status</th>
                <th className="px-2 py-3 text-left">Author</th>
                <th className="px-2 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <RowDataMenu
                  key={book.id}
                  book={book}
                  bookId={book.book_id}
                  bookTitle={book.title}
                  bookPrice={book.price}
                  bookStatus={book.status}
                  bookAuthorFirstName={book.author_firstname}
                  bookAuthorLastName={book.author_lastname}
                  onAddToCart={onAddToCart}
                  isInCart={isBookInCart(cart, book.book_id)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-3/12 p-4 border border-[#ebebeb] rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-400">Cart is empty.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-1">Book</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.book_id}>
                    <td className="py-1">{item.title}</td>
                    <td className="py-1">
                      <button
                        onClick={() => onRemoveFromCart(item.book_id)}
                        className="text-red-500 hover:text-white hover:bg-red-400 rounded-md px-2 py-1 transition-all"
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="pt-3 text-right">
                    <button
                      onClick={toggleForm}
                      className="bg-indigo-500 text-white hover:bg-white hover:text-indigo-500 hover:border hover:border-indigo-500 px-4 py-1 rounded-md transition-all"
                    >
                      Next
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
});

export default CartSidebar;
