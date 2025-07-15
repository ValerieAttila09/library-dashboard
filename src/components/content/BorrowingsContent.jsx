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

function RowData({ book, id, toggleAction, onDelete, onUpdate, bookId, bookTitle, bookPrice, bookStatus, bookAuthorFirstName, bookAuthorLastName, bookAuthorEmail }) {
  return (
    <tr className="hover:bg-[#fafafa] transition-all">
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{bookId}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{bookTitle}</td>
      <td className="text-[14px] text-nowrap outfit-regular tableValue border-s border-[#ebebeb] px-2 py-3">{`$${bookPrice} USD`}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 text-center">
        <Badge Status={bookStatus} />
      </td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{`${bookAuthorFirstName} ${bookAuthorLastName}`}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{bookAuthorEmail}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 flex justify-start items-center gap-2">
        <button onClick={() => {
          onUpdate(book)
          toggleAction()
        }} className="p-1 rounded-full bg-transparent text-neutral-900 group hover:bg-yellow-400 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-yellow-500 group-hover:text-white transition-all">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>
        <button onClick={() => onDelete(id)} className="p-1 rounded-full bg-transparent text-neutral-900 group hover:bg-red-400 transition-all">
          <svg className="size-5 text-red-500 group-hover:text-white transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </td>
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
          className={`px-2 py-1 flex items-center gap-2 rounded-md ${isInCart ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-400 text-neutral-900'} group border-1 border-transparent hover:border-[#ebebeb] hover:bg-white transition-all`}
          onClick={() => !isInCart && onAddToCart(book)}
          disabled={isInCart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${isInCart ? 'text-gray-400' : 'text-white group-hover:text-blue-400'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          <span className={isInCart ? 'text-gray-400' : 'text-white group-hover:text-blue-400'}>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
        </button>
      </td>
    </tr>
  )
}


export default function BorrowingsContent() {
  const [books, setbooks] = useState([])
  const [search, setSearch] = useState("")
  const [form, setForm] = useState({
    borrower: '', borrower_email: '', book_title: '', book_author: '', count: null, total_price: null, deadline: '', status: null
  })
  const [cart, setCart] = useState([])
  const addLoan = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const fetchBook = async () => {
    try {
      const response = await axios.get('http://localhost:3001/books')
      setbooks(response.data)
    } catch (error) {
      console.log("gagal fetch data: ", error)
    }
  }

  useEffect(() => {
    fetchBook()
  }, []);

  const handleChange = (e) => {
    setbooks({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleAddToCart = (book) => {
    setCart(prev => {
      if (isBookInCart(prev, book.book_id)) return prev;
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.book_id !== bookId));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing) {
      axios.put(`http://localhost:3001/books/${form.id}`, form)
        .then(() => {
          setForm({
            borrower: '', borrower_email: '', book_title: '', book_author: '', count: null, total_price: null, deadline: '', status: null
          })
          fetchBook()
        })
    } else {
      axios.post(`http://localhost:3001/books`, form)
        .then(() => {
          setForm({
            borrower: '', borrower_email: '', book_title: '', book_author: '', count: null, total_price: null, deadline: '', status: null
          })
          fetchBook()
        })
    }
  }

  const handleUpdate = (user) => {
    setForm(user)
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/books/${id}`)
      .then(() => {
        fetchBook()
      })
  }

  const handleCancel = () => {
    setForm({
      borrower: '', borrower_email: '', book_title: '', book_author: '', count: null, total_price: null, deadline: '', status: null
    })
    fetchBook()
  }

  const filteredBook = books.filter(get =>
    get.book_id.toLowerCase().includes(search.toLowerCase()) ||
    get.title.toLowerCase().includes(search.toLowerCase()) ||
    get.author_firstname.toLowerCase().includes(search.toLowerCase()) ||
    get.author_lastname.toLowerCase().includes(search.toLowerCase())
  )

  useGSAP(() => {
    gsap.set(addLoan.current, {
      xPercent: 0
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
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Book ID</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Title</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Amount</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Total Price</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Status</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Author</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Borrower</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Date</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Deadline</th>
                    <th className="outfit-medium border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Action</th>
                  </tr>
                </thead>
                <tbody id="bookTable">
                  {filteredBook.map((book) => {
                    return (
                      <RowData
                        key={book.id}
                        book={book}
                        id={book.id}
                        toggleAction={toggleAction}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        bookId={book.book_id}
                        bookTitle={book.title}
                        bookPrice={book.price}
                        bookStatus={book.status}
                        bookAuthorFirstName={book.author_firstname}
                        bookAuthorLastName={book.author_lastname}
                        bookAuthorEmail={book.author_email}
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
        <div className="w-full h-full p-4">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-xl outfit-medium text-neutral-900">Shopping Experiment</h1>
            <button onClick={() => toggleAction()} className="rounded-md border border-[#ebebeb] px-3 py-2 hover:bg-[#fafafa]">Close</button>
          </div>
          <div className="w-full flex gap-3 py-4">
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
                      {/* <th className="p-2 text-start">Price</th> */}
                      {/* <th className="p-2 text-start">Quantity</th> */}
                      {/* <th className="p-2 text-start">Total</th> */}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item.book_id}>
                        <td className="p-2">{item.title}</td>
                        {/* <td className="p-2">${item.price}</td> */}
                        {/* <td className="p-2">{item.quantity}</td> */}
                        {/* <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td> */}
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
                        <button className="px-3 py-1 outfit-regular bg-blue-400 text-white rounded-md border border-transparent hover:bg-white hover:border-[#d7d7d7] hover:text-blue-500 transition-all">Next</button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}