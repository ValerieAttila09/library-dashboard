import { useState, useEffect } from "react"

function RowData({ data, onDelete }) {
  const color = () => {
    if (data.bookElement) {
      return (
        <span className={`rounded-full px-1 text-[12px] bg-green-500/10 text-green-600`}>{data.bookStatus}</span>
      )
    } else {
      return (
        <span className={`rounded-full px-1 text-[12px] bg-red-500/10 text-red-600`}>{data.bookStatus}</span>
      )
    }
  }

  return (
    <tr className="hover:bg-white/60 transition-all">
      <td className="text-[14px] text-nowrap text-center px-2 py-3">{data.number}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{data.bookId}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{data.bookTitle}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 text-center">
        {color()}
      </td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{data.bookAuthor}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{data.authorEmail}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{data.authorCity}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 flex justify-center items-center">
        <button onClick={() => onDelete(data.bookId)} className="p-1 rounded-full bg-transparent text-neutral-900 group hover:bg-red-400 transition-all">
          <svg className="size-5 text-red-500 group-hover:text-white transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default function ListContent() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch('http://localhost:3111/books')
        const booksData = await response.json()

        const bookWithWeather = await Promise.all(
          booksData.map(async (book) => {
            const weatherResponse = await fetch(`http://localhost:3111/weather/${book.city}`)
            const weatherData = await weatherResponse.json()
            return {
              ...book,
              weather: weatherResponse.ok ? weatherData : null,
            }
          })
        )

        setBooks(bookWithWeather)
      } catch (error) {
        console.log("gagal fetch data: ", error)
      }
    }

    fetchBook();
  }, []);

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE"
      })
      if (response.ok) {
        setBooks(books.filter(book => book.id !== id))
      }
    } catch (error) {
      console.log('gagal menghapus data buku : ', error)
    }
  }
  return (
    <div className='w-full h-full overflow-y-auto' >
      <div className="w-auto pt-2 px-2 border-b-1 border-[#dfdfdf]">
        <div className="w-full flex justify-start items-center px-4 py-2">
          <h1 className="text-4xl md:text-5xl text-neutral-900 sg-bold">Library</h1>
        </div>
        <div className="w-full overflow-x-auto flex justify-start items-center px-2 pt-1 pb-3 gap-2">
          <button
            className="flex items-center gap-1 border border-[#dbdbdb] rounded-full  bg-white/60 px-2 py-1 hover:bg-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="size-4 text-neutral-700">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <span>Books</span>
          </button>
          <button
            className="flex items-center gap-1 border border-[#dbdbdb] rounded-full  bg-white/60 px-2 py-1 hover:bg-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-nowrap">Add Books</span>
          </button>
          <button
            className="flex items-center gap-1 border border-[#dbdbdb] rounded-full  bg-white/60 px-2 py-1 hover:bg-white transition-all">
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
      <div className="flex justify-between items-center w-auto p-2">
        <label htmlFor="search" className="w-1/2 relative rounded-full border border-[#ebebeb] flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="size-4 text-neutral-500 absolute left-2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input type="text" placeholder="search..." name="search" id="search" className="w-full ps-8 py-1 outline-none" />
        </label>
        <div className="flex gap-2">
          <button id="menuWrapped"
            className="flex gap-1 border border-[#dbdbdb] rounded-full p-1 hover:bg-[#f6f6f6] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="size-5 text-neutral-500">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
            </svg>
          </button>
          <button id="menuWrapped"
            className="flex items-center gap-1 border border-[#dbdbdb] rounded-full p-1 hover:bg-[#f6f6f6] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="size-4 text-neutral-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            <span className="text-sm">
              Rows
            </span>
          </button>
          <button id="menuWrapped" className="border border-[#dbdbdb] rounded-full p-1 hover:bg-[#f6f6f6] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="size-5 text-neutral-500">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full overflow-x-scroll">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-white/60">
              <th className="px-2 py-1 text-center text-neutral-700">No</th>
              <th className="border-s border-[#ebebeb] px-2 py-1 text-center text-neutral-700">Book ID</th>
              <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Title</th>
              <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Status</th>
              <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Author</th>
              <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Auhtor Email</th>
              <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">City</th>
              <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Action</th>
            </tr>
          </thead>
          <tbody id="bookTable">
            {books.map((book) => {
              const status = book.status ? "available" : "unavailable"
              const statusColor = book.status ? "green" : "red"
              const statusBook = book.status

              return (
                <RowData
                  key={book.id}
                  data={{
                    number: books.indexOf(book) + 1,
                    bookId: book.id,
                    bookTitle: book.title,
                    bookAuthor: book.author,
                    bookStatus: status,
                    bookElement: statusBook,
                    statusColor: statusColor,
                    authorEmail: book.email,
                    authorCity: book.weather?.name || "N/A",
                  }}
                  onDelete={deleteBook}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </ div>
  )
}