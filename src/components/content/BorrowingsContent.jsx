import { useEffect, useState, useRef } from "react"
import axios from 'axios'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

function isBookInCart(cart, bookId) {
  return cart.some(item => item.book_id === bookId);
}

const Badge = ({ Status }) => {
  if (Status == 1) {
    return (
      <span className="px-2 text-sm bg-green-50 rounded text-green-400">available</span>
    )
  } else {
    return (
      <span className="px-2 text-sm bg-red-50 rounded text-red-400">unavailable</span>
    )
  }
}

function RowData({
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
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3">{borrower}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3">{borrowerEmail}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3">{bookTitle}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3">{bookAuthor}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3">{count}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 outfit-regular ">{`$${totalPrice} USD`}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 text-center">{company}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 text-center">{address}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 text-center">{city}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 text-center">{country}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 text-center">{postal}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 text-center">{deadline}</td>
    </tr>
  )
}
function RowDataMenu({ book, bookId, bookTitle, bookPrice, bookStatus, bookAuthorFirstName, bookAuthorLastName, onAddToCart, isInCart }) {
  return (
    <tr className="hover:bg-[#fafafa] transition-all">
      <td className="text-[14px] text-nowrap tableValue px-2 py-3">{bookId}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{bookTitle}</td>
      <td className="text-[14px] text-nowrap outfit-regular tableValue border-s border-[#ebebeb] px-2 py-3">{`$${bookPrice} USD`}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 text-center">
        <Badge Status={bookStatus} />
      </td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{`${bookAuthorFirstName} ${bookAuthorLastName}`}</td>
      <td className="text-[14px] border-s border-[#ebebeb] text-nowrap px-2 py-3 flex justify-start items-center gap-2">
        <button
          className={`px-2 py-1 flex items-center gap-2 rounded-md ${isInCart ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-500 text-neutral-900'} group border-1 border-transparent hover:border-[#ebebeb] hover:bg-white transition-all`}
          onClick={() => !isInCart && onAddToCart(book)}
          disabled={isInCart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${isInCart ? 'text-gray-400' : 'text-white group-hover:text-indigo-500'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          <span className={isInCart ? 'text-gray-400' : 'text-white group-hover:text-indigo-500'}>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
        </button>
      </td>
    </tr>
  )
}


export default function BorrowingsContent() {
  const [books, setbooks] = useState([])
  const [borrowings, setBorrowings] = useState([])
  const [search, setSearch] = useState("")
  const [cart, setCart] = useState([])
  const addLoan = useRef(null)
  const loanProcess = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenTwo, setIsOpenTwo] = useState(false)
  const [method, setMethod] = useState(0)

  const fetchBook = async () => {
    try {
      const response = await axios.get('http://localhost:3001/books')
      setbooks(response.data)
    } catch (error) {
      console.log("gagal fetch data: ", error)
    }
  }

  const fetchBorrower = async () => {
    try {
      const response = await axios.get('http://localhost:3001/borrower')
      setBorrowings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log("gagal fetch data: ", error)
    }
  }

  useEffect(() => {
    fetchBook()
    fetchBorrower()
  }, []);

  const handleAddToCart = (book) => {
    setCart(prev => {
      if (isBookInCart(prev, book.book_id)) return prev;
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.book_id !== bookId));
  };

  const filteredBookBorrower = borrowings.filter(get =>
    get.borrower.toLowerCase().includes(search.toLowerCase()) ||
    get.borrower_email.toLowerCase().includes(search.toLowerCase()) ||
    get.book_title.toLowerCase().includes(search.toLowerCase()) ||
    get.book_author.toLowerCase().includes(search.toLowerCase())
  )

  useGSAP(() => {
    gsap.set(addLoan.current, {
      xPercent: 100
    })
    gsap.set(loanProcess.current, {
      xPercent: 100
    })
  })

  function toggleAction() {
    if (!isOpen) {
      gsap.to(addLoan.current, {
        xPercent: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      setIsOpen(!isOpen)
    } else {
      gsap.to(addLoan.current, {
        xPercent: 100,
        duration: 0.3,
        ease: "power2.out"
      })
      setIsOpen(!isOpen)
    }

  }
  function toggleActionTwo() {
    if (!isOpenTwo) {
      gsap.to(loanProcess.current, {
        xPercent: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      setIsOpenTwo(!isOpenTwo)
    } else {
      gsap.to(loanProcess.current, {
        xPercent: 100,
        duration: 0.3,
        ease: "power2.out"
      })
      setIsOpenTwo(!isOpenTwo)
    }
  }

  function setDelivery() {
    if (method == 0) {
      return <span>4</span>
    } else {
      return <span>15</span>
    }
  }

  function countPrice() {
    let ogPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    return ogPrice
  }

  function priceTotal() {
    let countAdditional = method == 0 ? 4 + 5.89 : 15 + 5.89
    let ogPrice = (cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + countAdditional).toFixed(2)
    return ogPrice
  }

  return (
    <div className="relative w-full h-full overflow-y-auto bg-transparent">
      <div className="w-full h-auto flex flex-col gap-4">
        <div className="w-full grid md:flex items-center flex-wrap gap-4 px-4 py-2">
          <div className="w-full md:w-[32%] h-[8rem] rounded-lg border border-[#ebebeb] shadow px-6 py-4 hover:bg-[#fafafa] hover:shadow-lg transition-all">
            <div className="w-full h-full flex flex-col justify-start">
              <div className="w-full flex flex-col justify-between gap-4">
                <div className="w-full flex items-center justify-between gap-[3rem]">
                  <div className="w-full flex  items-center justify-start gap-2">
                    <div className="p-1 rounded-md bg-slate-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <span className="text-md text-neutral-900 outfit-medium text-nowrap">This month loan</span>
                  </div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                  </div>
                </div>
                <div className="w-full flex items-center justify-start gap-4">
                  <span className="text-5xl text-neutral-900 outfit-semibold">
                    257
                  </span>
                  <div className="px-[5px] py-[2px] rounded-md bg-green-100 flex gap-1 items-center">
                    <span className="text-xs text-green-500 outfit-thin">13.65%</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3 text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[32%] h-[8rem] rounded-lg border border-[#ebebeb] shadow px-6 py-4 hover:bg-[#fafafa] hover:shadow-lg transition-all">
            <div className="w-full h-full flex flex-col justify-start">
              <div className="w-full flex flex-col justify-between gap-4">
                <div className="w-full flex items-center justify-between gap-[3rem]">
                  <div className="w-full flex  items-center justify-start gap-2">
                    <div className="p-1 rounded-md bg-slate-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                      </svg>
                    </div>
                    <span className="text-md text-neutral-900 outfit-medium text-nowrap">Total loans this week</span>
                  </div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                  </div>
                </div>
                <div className="w-full flex items-center justify-start gap-4">
                  <span className="text-5xl text-neutral-900 outfit-semibold">
                    43
                  </span>
                  <div className="px-[5px] py-[2px] rounded-md bg-green-100 flex gap-1 items-center">
                    <span className="text-xs text-green-500 outfit-thin">26.47%</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3 text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[32%] h-[8rem] rounded-lg border border-[#ebebeb] shadow px-6 py-4 hover:bg-[#fafafa] hover:shadow-lg transition-all">
            <div className="w-full h-full flex flex-col justify-start">
              <div className="w-full flex flex-col justify-between gap-4">
                <div className="w-full flex items-center justify-between gap-[3rem]">
                  <div className="w-full flex  items-center justify-start gap-2">
                    <div className="p-1 rounded-md bg-yellow-300/80">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                      </svg>
                    </div>
                    <span className="text-md text-neutral-900 outfit-medium">Warnings</span>
                  </div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                  </div>
                </div>
                <div className="w-full flex items-center justify-start gap-4">
                  <span className="text-5xl text-neutral-900 outfit-semibold">
                    7
                  </span>
                  <div className="px-[5px] py-[2px] rounded-md bg-red-100 flex gap-1 items-center">
                    <span className="text-xs text-red-500 outfit-thin">+2</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3 text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto md:h-[26rem] p-5">
          <div className="shadow-md overflow-hidden rounded-b-lg border-b-1 border-[#ebebeb]">
            <div className="w-full flex justify-between bg-[#fafafa] rounded-t-lg p-2 border-1 border-b-0 border-[#ebebeb]">
              <div className="w-full">
                <label htmlFor="search" className="bg-white w-1/2 relative rounded-full border border-[#ebebeb] flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="size-4 text-neutral-500 absolute left-2">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="search..." name="search" id="search" className="w-full ps-8 py-1 outline-none" />
                </label>
              </div>
              <div className="w-auto flex justify-end gap-1">
                <button onClick={() => toggleAction()} className="rounded-md bg-white border border-[#dbdbdb] px-2 py-1 hover:bg-[#f6f6f6] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </button>
                <button id="menuWrapped" className="bg-white border border-[#dbdbdb] rounded-md px-2 py-1 hover:bg-[#f6f6f6] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="size-5 text-neutral-500">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full h-full overflow-y-auto overflow-x-auto border-r-1 border-[#ebebeb]">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#fcfcfc]">
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Borrower</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Borrower Email</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Book Title</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Book Author</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Quantity</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Total Price</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Company</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Address</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">City</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Country</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Postal</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Deadline</th>
                  </tr>
                </thead>
                <tbody id="bookTable">
                  {filteredBookBorrower.map((book) => {
                    return (
                      <RowData
                        key={book.id}
                        borrower={book.borrower}
                        borrowerEmail={book.borrower_email}
                        bookTitle={book.book_title}
                        bookAuthor={book.book_author}
                        count={book.count}
                        totalPrice={book.total_price}
                        company={book.company}
                        address={book.address}
                        city={book.city}
                        country={book.country}
                        postal={book.postal}
                        deadline={book.deadline}
                      />
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div ref={addLoan} className="fixed z-4 bg-white left-[51px] right-0 bottom-0 top-[51px] overflow-y-auto">
        <div className="relative w-full h-full">
          <div className="w-full p-4 flex justify-between items-center">
            <h1 className="text-xl outfit-medium text-neutral-900">Shopping Experiment</h1>
            <button onClick={() => toggleAction()} className="rounded-md border border-[#ebebeb] px-3 py-2 hover:bg-[#fafafa]">Close</button>
          </div>
          <div className="w-full flex gap-3 p-4">
            <div className="w-9/12 py-2 rounded-md overflow-hidden border border-[#ebebeb] shadow">
              <div className="flex w-full h-full overflow-y-auto overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#fcfcfc]">
                      <th className="outfit-medium px-2 py-1 text-start text-neutral-700">Book ID</th>
                      <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Title</th>
                      <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Price</th>
                      <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Status</th>
                      <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Author</th>
                      <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Action</th>
                    </tr>
                  </thead>
                  <tbody id="bookTable">
                    {books.map((book) => {
                      return (
                        <RowDataMenu
                          key={book.id}
                          book={book}
                          id={book.id}
                          bookId={book.book_id}
                          bookTitle={book.title}
                          bookPrice={book.price}
                          bookStatus={book.status}
                          bookAuthorFirstName={book.author_firstname}
                          bookAuthorLastName={book.author_lastname}
                          bookAuthorEmail={book.author_email}
                          onAddToCart={handleAddToCart}
                          isInCart={isBookInCart(cart, book.book_id)}
                        />
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-3/12 rounded-md border border-[#ebebeb] shadow p-4">
              <h2 className="text-lg font-semibold mb-2">Cart</h2>
              {cart.length === 0 ? (
                <div className="text-gray-400">Cart is empty.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="p-2 text-start">Book</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item.book_id}>
                        <td className="p-2">{item.title}</td>
                        <td className="p-2">
                          <button onClick={() => handleRemoveFromCart(item.book_id)} className="flex items-center gap-2 text-red-500 hover:bg-red-400 hover:text-white rounded-md transition-all px-2 py-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2" className="p-2 text-end">
                        <button onClick={() => toggleActionTwo()} className="px-3 py-1 outfit-regular bg-indigo-500 text-white rounded-md border border-transparent hover:bg-white hover:border-[#d7d7d7] hover:text-indigo-500 transition-all">Next</button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
          <div ref={loanProcess} className="fixed z-8 bg-white inset-0 overflow-y-auto">
            <div className="w-full h-full p-4">
              <div className="w-full flex justify-between items-center">
                <h1 className="text-xl outfit-medium text-neutral-900">Shopping Form</h1>
                <button onClick={() => toggleActionTwo()} className="rounded-md border border-[#ebebeb] px-3 py-2 hover:bg-[#fafafa]">Close</button>
              </div>
              <br />
              <form id="formBorrow" className="rounded-lg bg-[#fafafa] border border-[#d7d7d7] px-6 py-[3rem]">
                <div className="w-full h-full flex">
                  <div className="w-full md:w-1/2 space-y-12 pe-5">
                    <div className="w-full flex flex-col gap-5 border-b-1 border-[#ebebeb] pb-12">
                      <div className="">
                        <h1 className="text-xl outfit-regular text-neutral-900">Contact information</h1>
                      </div>
                      <div className="">
                        <label htmlFor="email" className="block text-md/6 outfit-regular text-gray-600">
                          Email Address
                        </label>
                        <div className="mt-2">
                          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <input
                              id="email"
                              name="email"
                              type="text"
                              required
                              placeholder="example123@gmail.com"
                              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-md/6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-5 border-b-1 border-[#ebebeb] pb-12">
                      <div className="">
                        <h1 className="text-xl outfit-regular text-neutral-900">Shipping information</h1>
                      </div>
                      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="firstname" className="block text-md/6 outfit-regular text-gray-600">
                            First name
                          </label>
                          <div className="mt-2">
                            <input
                              id="firstname"
                              name="firstname"
                              required
                              type="text"
                              autoComplete="given-name"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label htmlFor="lastname" className="block text-md/6 outfit-regular text-gray-600">
                            Last name
                          </label>
                          <div className="mt-2">
                            <input
                              id="lastname"
                              name="lastname"
                              type="text"
                              required
                              autoComplete="family-name"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-6">
                          <label htmlFor="company" className="block text-md/6 outfit-regular text-gray-600">
                            Company
                          </label>
                          <div className="mt-2">
                            <input
                              id="company"
                              name="company"
                              type="text"
                              required
                              autoComplete="company"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-6">
                          <label htmlFor="address" className="block text-md/6 outfit-regular text-gray-600">
                            Address
                          </label>
                          <div className="mt-2">
                            <input
                              id="address"
                              name="address"
                              type="text"
                              required
                              autoComplete="address"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-6">
                          <label htmlFor="country" className="block text-md/6 outfit-regular text-gray-600">
                            Country
                          </label>
                          <div className="mt-2">
                            <input
                              id="country"
                              name="country"
                              type="text"
                              required
                              autoComplete="country"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label htmlFor="city" className="block text-md/6 outfit-regular text-gray-600">
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              id="city"
                              name="city"
                              type="text"
                              required
                              autoComplete="city"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label htmlFor="postal" className="block text-md/6 outfit-regular text-gray-600">
                            Postal
                          </label>
                          <div className="mt-2">
                            <input
                              id="postal"
                              name="postal"
                              type="text"
                              required
                              autoComplete="postal"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-5 border-b-1 border-[#ebebeb] pb-12">
                      <div className="">
                        <h1 className="text-xl outfit-regular text-neutral-900">Delivery Method</h1>
                      </div>
                      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">
                        <button type="button" onClick={() => {
                          setMethod(0)
                        }} className={`relative flex justify-between col-span-3 rounded-md border ${method == 0 ? "border-indigo-500" : "border-[#d7d7d7]"} p-4 bg-white group hover:bg-[#fafafa] transition-all`}>
                          <div className="">
                            <h1 className="text-md text-start text-neutral-800 outfit-regular">Standard</h1>
                            <p className="text-sm text-start text-neutral-600 outfit-thin mb-4">6-10 Business day</p>
                            <p className="text-md text-start text-neutral-800 outfit-regular">$4.00</p>
                          </div>
                          <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${method == 0 ? "text-indigo-500" : "text-transparent"} transition-all`}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                          </div>
                        </button>
                        <button type="button" onClick={() => {
                          setMethod(1)
                        }} className={`relative flex justify-between col-span-3 rounded-md border ${method == 1 ? "border-indigo-500" : "border-[#d7d7d7]"} p-4 bg-white group hover:bg-[#fafafa] transition-all`}>
                          <div className="">
                            <h1 className="text-md text-start text-neutral-800 outfit-regular">Express</h1>
                            <p className="text-sm text-start text-neutral-600 outfit-thin mb-4">3-5 Business day</p>
                            <p className="text-md text-start text-neutral-800 outfit-regular">$15.00</p>
                          </div>
                          <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${method == 1 ? "text-indigo-500" : "text-transparent"} transition-all`}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-5 pb-12">
                      <div className="">
                        <h1 className="text-xl outfit-regular text-neutral-900">Payment</h1>
                      </div>
                      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6 flex items-center gap-[1.8rem]">
                          <div className="mt-2 flex items-center gap-2">
                            <input type="radio" name="payment" id="paypal" className="appearance-none rounded-full border-5 border-white outline-1 outline-[#d7d7d7] p-[2px] checked:border-indigo-500" value="paypal" />
                            <label htmlFor="paypal" className="block text-md/6 outfit-regular text-gray-600">
                              PayPal
                            </label>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <input type="radio" name="payment" id="credit" className="appearance-none rounded-full border-5 border-white outline-1 outline-[#d7d7d7] p-[2px] checked:border-indigo-500" value="credit" />
                            <label htmlFor="credit" className="block text-md/6 outfit-regular text-gray-600">
                              Credit Card
                            </label>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <input type="radio" name="payment" id="eTransfer" className="appearance-none rounded-full border-5 border-white outline-1 outline-[#d7d7d7] p-[2px] checked:border-indigo-500" value="etransfer" />
                            <label htmlFor="eTransfer" className="block text-md/6 outfit-regular text-gray-600">
                              E-Transfer
                            </label>
                          </div>
                        </div>
                        <div className="sm:col-span-6">
                          <label htmlFor="card-number" className="block text-md/6 outfit-regular text-gray-600">
                            Card Number
                          </label>
                          <div className="mt-2">
                            <input
                              id="card-number"
                              name="card-number"
                              type="number"
                              required
                              autoComplete="card-number"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <h1 className="text-xl outfit-regular text-neutral-900">Order summary</h1>
                    <br />
                    <div className="w-full h-auto bg-white rounded-md border border-[#d7d7d7]">
                      <div className="w-full grid">
                        {cart.map((book) => {
                          return (
                            <div className="w-full px-4 py-6 border-b-1 border-[#d7d7d7]">
                              <div className="w-full flex">
                                <div className="w-full">
                                  <h1 className="text-2xl outfit-regular">{book.title}</h1>
                                  <h3 className="text-md outfit-regular text-neutral-600 mb-8">{`${book.author_firstname} ${book.author_lastname}`}</h3>
                                  <span className="text-neutral-800 outfit-regular text-lg">{`$${book.price}`}</span>
                                </div>
                                <div className="w-auto px-2">
                                  <button type="button" onClick={() => handleRemoveFromCart(book.book_id)} className="p-1 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-neutral-500 size-6 group-hover:text-red-500 transition-all">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className="w-full grid">
                        <div className="w-full grid gap-y-4 border-b-1 border-[#ebebeb] px-4 py-6">
                          <div className="w-full flex items-center justify-between">
                            <h3 className="text-lg text-neutral-800 outfit-regular">Subtotal</h3>
                            <span className="text-lg text-neutral-900 outfit-medium">${countPrice()}</span>
                          </div>
                          <div className="w-full flex items-center justify-between">
                            <h3 className="text-lg text-neutral-800 outfit-regular">Shipping</h3>
                            <span className="text-lg text-neutral-900 outfit-medium">${setDelivery()}</span>
                          </div>
                          <div className="w-full flex items-center justify-between">
                            <h3 className="text-lg text-neutral-800 outfit-regular">Taxes</h3>
                            <span className="text-lg text-neutral-900 outfit-medium">$5.89</span>
                          </div>
                        </div>
                        <div className="w-full border-b-1 border-[#d7d7d7] px-4 py-6">
                          <div className="w-full flex items-center justify-between">
                            <h3 className="text-lg text-neutral-800 outfit-medium">Total</h3>
                            <span className="text-lg text-neutral-900 outfit-medium">${priceTotal()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full grid">
                        <div className="w-full flex items-center justify-start px-4 py-6">
                          <button type="submit" className="w-full rounded-md border border-transparent text-center text-white py-2 px-5 bg-indigo-500 hover:bg-white hover:text-indigo-500 hover:border-indigo-500 transition-all">Confirm Order</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}