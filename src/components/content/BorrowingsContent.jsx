import { useEffect, useState } from "react"

function RowData({ data }) {
  const color = () => {
    if (data.bookElement) {
      return (
        <span className={`rounded-md px-1 text-[12px] bg-green-500/10 text-green-600`}>{data.status}</span>
      )
    } else {
      return (
        <span className={`rounded-md px-1 text-[12px] bg-red-500/10 text-red-600`}>{data.bookStatus}</span>
      )
    }
  }

  return (
    <tr className="hover:bg-green-100/30 transition-all">
      <td className="text-[14px] text-nowrap text-center px-2 py-3">{data.number}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{data.id}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{data.book}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 text-center">
        {color()}
      </td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{data.author}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{data.borrower}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{data.loanDate}</td>
      <td className="text-[14px] text-nowrap tableValue border-s border-[#ebebeb] px-2 py-3">{data.deadline}</td>
      <td className="text-[14px] text-nowrap border-s border-[#ebebeb] px-2 py-3 flex justify-center items-center">
        <button className="px-2 py-1 rounded-md bg-transparent text-neutral-900 group hover:bg-red-400 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-500 group-hover:text-white transition-all">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default function BorrowingsContent() {
  const [loanData, setLoanData] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const getBookLoanData = async () => {
      try {
        const response = await fetch("http://localhost:3000/books/loans")
        const dataLoan = await response.json()

        if (response.ok) {
          setLoanData(dataLoan)
        } else {
          console.error("ERROR! Cannot get Loans Data!")
        }
      } catch (error) {
        console.error("ERROR! Cannot get Loans Data : ", error)
      }

    }

    getBookLoanData()
  }, [])

  if (loanData) {
    console.log(loanData)
  }

  const getSearch = loanData.filter(get => 
    get.id.toLowerCase().includes(search.toLowerCase()) ||
    get.book.toLowerCase().includes(search.toLowerCase()) ||
    get.borrower.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full h-full overflow-y-auto bg-transparent">
      <div className="w-full h-auto flex flex-col gap-4">

        <div className="w-full grid md:flex items-center flex-wrap gap-4 px-4 py-2">

          <div className="w-full md:w-[32%] h-[8rem] rounded-lg border border-[#ebebeb] shadow px-6 py-4 hover:bg-green-50/30 hover:shadow-lg transition-all">
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

          <div className="w-full md:w-[32%] h-[8rem] rounded-lg border border-[#ebebeb] shadow px-6 py-4 hover:bg-green-50/30 hover:shadow-lg transition-all">
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

          <div className="w-full md:w-[32%] h-[8rem] rounded-lg border border-[#ebebeb] shadow px-6 py-4 hover:bg-green-50/30 hover:shadow-lg transition-all">
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

        <div className="w-full h-auto md:h-[26rem]  flex flex-col md:flex-row">
          <div className="w-full md:w-3/5 border-r-1 overflow-hidden border-b-1 border-t-1 border-[#ebebeb]">
            <div className="w-full p-1">
              <label htmlFor="search" className="w-1/2 relative rounded-full border border-[#ebebeb] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="size-4 text-neutral-500 absolute left-2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="search..." name="search" id="search" className="w-full ps-8 py-1 outline-none" />
              </label>
            </div>
            <div className="w-full h-full overflow-y-scroll overflow-x-scroll">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/60">
                    <th className="px-2 py-1 text-center text-neutral-700">No</th>
                    <th className="border-s border-[#ebebeb] px-2 py-1 text-center text-neutral-700">Book ID</th>
                    <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Title</th>
                    <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Status</th>
                    <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Author</th>
                    <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Borrower</th>
                    <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Date</th>
                    <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Deadline</th>
                    <th className="border-s border-[#ebebeb] px-2 py-1 text-start text-neutral-700">Action</th>
                  </tr>
                </thead>
                <tbody id="bookTable">
                  {getSearch.map((data) => {
                    const status = data.status ? "active" : "non-active"
                    const statusColor = data.status ? "green" : "red"
                    const statusBook = data.status

                    return (
                      <RowData
                        key={data.id}
                        data={{
                          number: loanData.indexOf(data) + 1,
                          id: data.id,
                          book: data.book,
                          author: data.author,
                          borrower: data.borrower,
                          loanDate: data.loanDate,
                          deadline: data.deadline,
                          status: status,
                          bookElement: statusBook,
                          statusColor: statusColor,
                        }}
                      />
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full h-full md:h-full md:w-2/5 border-b-1 border-t-1 border-[#ebebeb]">
            <div className="w-full h-full p-2">
              <div className="w-full h-full rounded-md border border-[#ebebeb] shadow p-4">
                <div className="w-full flex justify-start items-center">
                  <h1 className="text-4xl text-neutral-900">Some title</h1>
                </div>
                <div className="w-full my-1">
                  <p className="text-md text-neutral-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae laudantium cupiditate aliquid possimus aliquam saepe totam numquam. Harum natus eos aspernatur velit beatae necessitatibus, odit distinctio voluptas temporibus atque autem accusamus omnis rem laboriosam saepe voluptatum nostrum?</p>
                </div>
                <div className="w-full">
                  <button className="text-md text-neutral-800 border border-[#ebebeb] bg-white px-3 py-2 rounded-full shadow hover:shadow-lg hover:bg-[#ebebeb] transition-all">Some button</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}