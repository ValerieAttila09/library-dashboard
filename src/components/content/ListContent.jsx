import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const Badge = ({ Status }) => {
  if (Status == 1) {
    return (
      <span className="px-2 text-sm bg-green-50 rounded text-green-400">active</span>
    )
  } else {
    return (
      <span className="px-2 text-sm bg-red-50 rounded text-red-400">non-active</span>
    )
  }
}

function RowData({ book, toggleAction, onDelete, onUpdate, bookId, bookTitle, bookPrice, bookStatus, bookAuthorFirstName, bookAuthorLastName, bookAuthorEmail }) {
  return (
    <tr className="hover:bg-[#fafafa] transition-all">
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{bookId}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{bookTitle}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{`$${bookPrice} USD`}</td>
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

export default function ListContent() {
  const [books, setBooks] = useState([])
  const [form, setForm] = useState({
    book_id: '', title: '', price: '', author_firstname: '', author_lastname: '', author_email: '', status: null
  })
  const [isEditing, setIsEditing] = useState(false)
  const [search, setSearch] = useState("")
  const addBook = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const idRandom = useRef(null)

  const fetchBook = async () => {
    try {
      const response = await axios.get('http://localhost:3001/books')
      setBooks(response.data)
    } catch (error) {
      console.log("gagal fetch data: ", error)
    }
  }

  useEffect(() => {
    fetchBook()
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing) {
      axios.put(`http://localhost:3001/books/${form.id}`, form)
        .then(() => {
          setForm({
            book_id: '', title: '', price: '', author_firstname: '', author_lastname: '', author_email: '', status: null
          })
          setIsEditing(false)
          fetchBook()
        })
    } else {
      axios.post(`http://localhost:3001/books`, form)
        .then(() => {
          setForm({
            book_id: '', title: '', price: '', author: '', author_email: '', status: null
          })
          fetchBook()
        })
    }
  }

  const handleUpdate = (user) => {
    setForm(user)
    setIsEditing(true)
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/books/${id}`)
      .then(() => {
        fetchBook()
      })
  }

  const handleCancel = () => {
    setForm({
      book_id: '', title: '', price: '', author_firstname: '', author_lastname: '', author_email: '', status: null
    })
    fetchBook()
    setIsEditing(false)
  }

  const generateNumber = () => {
    const randomValue = Math.floor(10000000 + Math.random() * 90000000);
    setForm(prev => ({ ...prev, book_id: randomValue.toString() }));
  };

  const filteredBook = books.filter(book =>
    book.book_id.toLowerCase().includes(search.toLowerCase()) ||
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author_firstname.toLowerCase().includes(search.toLowerCase()) ||
    book.author_lastname.toLowerCase().includes(search.toLowerCase())
  )

  useGSAP(() => {
    gsap.set(addBook.current, {
      xPercent: 100
    })
  })

  function toggleAction() {
    if (!isOpen) {
      gsap.to(addBook.current, {
        xPercent: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      setIsOpen(!isOpen)
    } else {
      gsap.to(addBook.current, {
        xPercent: 100,
        duration: 0.3,
        ease: "power2.out"
      })
      setIsOpen(!isOpen)
    }
  }


  return (
    <div className='relative w-full h-full overflow-y-auto' >
      <div className="w-auto pt-2 px-2">
        <div className="w-full flex justify-start items-center px-4 py-2">
          <h1 className="text-4xl md:text-5xl text-neutral-900 outfit-bold">Library</h1>
        </div>
        <div className="w-full overflow-x-auto flex justify-start items-center px-2 pt-1 pb-3 gap-2">
          <button
            className="flex items-center gap-1 border border-[#dbdbdb] rounded-md  bg-white/60 px-2 py-1 hover:bg-[#f7f7f7] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="size-4 text-neutral-700">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <span>Books</span>
          </button>
          <button
            onClick={() => toggleAction()}
            className="flex items-center gap-1 border border-[#dbdbdb] rounded-md  bg-white/60 px-2 py-1 hover:bg-[#f7f7f7] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-nowrap">Add Books</span>
          </button>
          <button
            className="flex items-center gap-1 border border-[#dbdbdb] rounded-md  bg-white/60 px-2 py-1 hover:bg-[#f7f7f7] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span>Operation</span>
          </button>
        </div>
      </div>
      <div className="w-full rounded-lg py-4 px-3">
        <div className="shadow-md overflow-hidden rounded-b-lg border-b-1 border-[#ebebeb]">
          <div className="bg-[#fafafa] border-x-1 border-t-1 border-[#ebebeb] rounded-t-lg flex justify-between items-center w-auto p-2">
            <label htmlFor="search" className="bg-white w-1/2 relative rounded-full border border-[#ebebeb] flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="size-4 text-neutral-500 absolute left-2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="search..." name="search" id="search" className="w-full ps-8 py-1 outline-none" />
            </label>
            <div className="flex gap-2">
              <button id="menuWrapped"
                className="bg-white flex gap-1 border border-[#dbdbdb] rounded-md p-1 hover:bg-[#f6f6f6] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="size-5 text-neutral-500">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
                </svg>
              </button>
              <button id="menuWrapped"
                className="bg-white flex items-center gap-1 border border-[#dbdbdb] rounded-md p-1 hover:bg-[#f6f6f6] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="size-4 text-neutral-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                <span className="text-sm">
                  Rows
                </span>
              </button>
              <button id="menuWrapped" className="bg-white border border-[#dbdbdb] rounded-md p-1 hover:bg-[#f6f6f6] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="size-5 text-neutral-500">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full overflow-x-scroll border-e-1 border-[#ebebeb]">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-[#fcfcfc]">
                  <th className="border-s border-[#ebebeb] ps-2 py-1 text-start text-neutral-700">Book ID</th>
                  <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Title</th>
                  <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Price</th>
                  <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Status</th>
                  <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Author</th>
                  <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Auhtor Email</th>
                  <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Action</th>
                </tr>
              </thead>
              <tbody id="bookTable">
                {filteredBook.map((book) => {
                  return (
                    <RowData
                      key={book.id}
                      book={book}
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

      <div ref={addBook} className="fixed z-4 bg-white left-[51px] right-0 bottom-0 top-[51px] overflow-y-auto p-4">
        <div className="w-full h-auto">
          <div className="w-full h-full p-2">
            <div className="w-full flex items-center justify-between">
              <div className="">
                <h1 className="text-2xl outfit-medium text-neutral-900">Form action</h1>
                <p className="text-md text-neutral-600">You can control and manage your members here.</p>
              </div>
              <button onClick={() => toggleAction()} className="my-3 rounded-lg bg-white px-3 py-[6px] border border-[#ebebeb] hover:bg-[#f7f7f7]">Return</button>
            </div>
            <br />
            <div className="w-full">
              <form onSubmit={handleSubmit} className='w-full rounded-xl border border-[#ebebeb] p-4'>
                <div className="space-y-12">
                  <div className="mt-4 md:mt-10 flex flex-col md:flex-row gap-[3rem] border-b border-gray-900/10 pb-12">
                    <div className="w-full md:w-1/3">
                      <h2 className="text-base/7 font-semibold text-gray-900">Add New Book</h2>
                      <p className="mt-1 text-md/6 text-gray-600">
                        The information about this book will displayed in book table list.
                      </p>
                    </div>

                    <div className="w-full md:w-2/3 md:pe-[5rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="title" className="block text-md/6 font-medium text-gray-900">
                          Book Name
                        </label>
                        <div className="mt-2">
                          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <input
                              id="title"
                              name="title"
                              value={form.title}
                              onChange={handleChange}
                              type="text"
                              required
                              placeholder="The Smartest Scientist"
                              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-md/6"
                            />
                          </div>
                        </div>
                      </div>



                      <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-md/6 font-medium text-gray-900">
                          Cover photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                            <div className="mt-4 flex text-md/6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col md:flex-row gap-[3rem] border-b border-gray-900/10 pb-12">
                    <div className="w-full md:w-1/3">
                      <h2 className="text-base/7 font-semibold text-gray-900">Book Information</h2>
                      <p className="mt-1 text-md/6 text-gray-600">Use a permanent email address where you can receive mail.</p>
                    </div>

                    <div className="w-full md:w-2/3 md:pe-[5rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="author_firstname" className="block text-md/6 font-medium text-gray-900">
                          First name
                        </label>
                        <div className="mt-2">
                          <input
                            id="author_firstname"
                            name="author_firstname"
                            value={form.author_firstname}
                            onChange={handleChange}
                            required
                            type="text"
                            autoComplete="given-name"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="author_lastname" className="block text-md/6 font-medium text-gray-900">
                          Last name
                        </label>
                        <div className="mt-2">
                          <input
                            id="author_lastname"
                            name="author_lastname"
                            value={form.author_lastname}
                            onChange={handleChange}
                            type="text"
                            required
                            autoComplete="family-name"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="author_email" className="block text-md/6 font-medium text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="author_email"
                            name="author_email"
                            type="author_email"
                            value={form.author_email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <div className="mt-2 grid grid-cols-1">
                          <label htmlFor="book_id" className="block text-md/6 font-medium text-gray-900">
                            Book Id
                          </label>
                          <div className="flex items-center justify-start gap-2 mt-2">
                            <button type="button" onClick={generateNumber} className="rounded-md bg-white px-3 py-[6px] border border-[#ebebeb] hover:bg-[#f7f7f7]">Generate</button>
                            <input
                              id="book_id"
                              name="book_id"
                              ref={idRandom}
                              value={form.book_id}
                              onChange={handleChange}
                              type="text"
                              required
                              autoComplete="book_id"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="mt-2 grid grid-cols-1">
                          <label htmlFor="price" className="block text-md/6 font-medium text-gray-900">
                            Price
                          </label>
                          <div className="mt-2">
                            <div className="relative rounded-md flex items-center">
                              <span className="absolute translate-x-2 text-neutral-400">$</span>
                              <input
                                id="price"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                type="text"
                                required
                                autoComplete="price"
                                className="ps-5 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button onClick={() => {
                      handleCancel()
                      toggleAction()
                    }} type="button" className="text-md/6 font-semibold text-gray-900">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </button>
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
