import React from "react"
//import PercentageValue, { IncomeTotal, LoanTotal, MembersTotal } from "./CountPercentage"
//import { LineChartIncome, LineChartLoan, LineChartMembers } from "./LineChart"
import PersonImage from "../../assets/image/user.jpg"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Role = ({ role }) => {
  if (role === "Admin") {
    return (
      <span className="px-2 text-sm bg-yellow-100 rounded text-yellow-500">Admin</span>
    )
  } else {
    return (
      <span className="px-2 text-sm bg-purple-100 rounded text-purple-600">Member</span>
    )
  }
}

export default function DashboardContent() {
  const [dataUser, setDataUser] = useState([])

  async function getDataUser() {
    try {
      const response = await axios.get('http://localhost:3001/users')
      setDataUser(response.data)
    } catch {
      console.error("Cannot get user data!")
    }
  }

  useEffect(() => {
    getDataUser()
  }, [])

  const date = new Date()
  const day = date.getDate()
  const year = 2025
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const monthName = monthNames[date.getMonth()]

  return (
    <div className="w-full h-full flex flex-col gap-[10rem] md:gap-0 md:flex-row bg-white overflow-y-auto">
      <div className="md:w-5/7 w-full h-auto md:overflow-y-auto">
        <div className="w-full flex flex-col items-start justify-between gap-[1rem] p-8">
          <div className="w-full flex flex-col gap-1 py-1">
            <h1 className="text-5xl outfit-bold text-neutral-900">Hello, Valerie Attila Al-fath</h1>
            <span className="text-lg text-neutral-500">Set up and manage your library here and don't forget to keep the spirit up!</span>
          </div>
          <div className="w-auto flex justify-start items-start gap-2 py-1">
            <span className="text-neutral-700 outfit-medium text-lg text-nowrap">
              {`${day} ${monthName}, ${year}`}
            </span>
            <div className="p-1 rounded-full bg-neutral-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full h-full grid">
          <div className="w-full p-4 flex items-center border-b-1 border-[#ebebeb]">
            
          </div>
          <div className="w-full p-4">
            <div className="w-full h-auto grid bg-[#fbfbfb] p-2 border border-[#ebebeb] shadow rounded-2xl">
              <div className="w-full h-auto flex items-center justify-between mb-2">
                <div className="w-full flex items-center gap-2 px-1">
                  <h1 className="text-md text-neutral-700">Additional statistical information</h1>
                </div>
                <div className="w-auto flex items-center gap-1">
                  <button className="border border-[#d7d7d7] bg-white rounded-full p-1 hover:shadow hover:bg-[#fafafa] transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                      stroke="currentColor" className="size-5 text-neutral-800">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                  </button>
                  <button className="border border-[#d7d7d7] bg-white rounded-full p-[6px] hover:shadow hover:bg-[#fafafa] transition-all">
                    <svg className='size-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
                      <g clipPath="url(#clip0_901_1299)">
                        <path d="M21.4327 25.6768L26.2927 30.5348C26.6837 30.9258 27.3167 30.9258 27.7067 30.5348L30.5357 27.7068C30.9257 27.3168 30.9257 26.6838 30.5357 26.2928L23.3337 19.0918C23.3337 19.0918 24.9997 15.6558 24.9997 12.9998C24.9997 6.37276 19.6267 0.999756 12.9997 0.999756C6.37269 0.999756 0.999687 6.37276 0.999687 12.9998C0.999687 19.6268 6.37269 24.9998 12.9997 24.9998C16.3067 24.9998 19.2997 23.6628 21.4697 21.4998M7.00009 11.0001H19.0001M7.00009 15.0001H12.0001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_901_1299">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mx-auto w-full h-[18rem] bg-white shadow-md p-4 border border-[#ebebeb] rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/7 h-auto flex flex-col gap-4 p-4 md:border-l-1 border-[#ebebeb] md:overflow-y-auto">
        <div className="w-full h-auto p-4 border border-[#ebebeb] rounded-2xl shadow bg-white">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-lg text-neutral-800 outfit-medium">Team members</h1>
            <button className="rounded-lg flex items-center gap-1 px-2 py-1 border border-[#ebebeb] bg-white hover:bg-[#f7f7f7] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5 text-neutral-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="text-sm text-nowrap text-neutral-600">Invite</span>
            </button>
          </div>
          <div className="h-auto mt-4 w-full flex gap-2">
            <div className="w-[1px] min-h-full rounded-full bg-[#ebebeb] mx-1 relative">
              <div className="size-2 absolute -left-[3px] top-[8%] bg-[#ebebeb] border border-[#cecece] rounded-full"></div>
              <div className="size-2 absolute -left-[3px] top-[35%] bg-[#ebebeb] border border-[#cecece] rounded-full"></div>
              <div className="size-2 absolute -left-[3px] top-[62%] bg-[#ebebeb] border border-[#cecece] rounded-full"></div>
              <div className="size-2 absolute -left-[3px] top-[89%] bg-[#ebebeb] border border-[#cecece] rounded-full"></div>
              <div className="w-[28px] h-[1px] absolute top-[9.5%] bg-[#ebebeb] rounded-full"></div>
              <div className="w-[28px] h-[1px] absolute top-[36%] bg-[#ebebeb] rounded-full"></div>
              <div className="w-[28px] h-[1px] absolute top-[63.5%] bg-[#ebebeb] rounded-full"></div>
              <div className="w-[28px] h-[1px] absolute top-[90%] bg-[#ebebeb] rounded-full"></div>
            </div>
            <div className="w-full grid gap-4">
              {dataUser.slice(0, 4).map((data) => {
                return (
                  <div key={data.id} className="w-full flex items-center gap-3">
                    <div className="w-12 h-10 relative rounded-full border border-[#ebebeb] bg-[#ebebeb] overflow-hidden">
                      <img src={PersonImage} className="absolute z-5 object-cover w-full h-auto" alt="" />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                      <span className="text-sm outfit-regular">{`${data.firstName} ${data.lastName}`}</span>
                      <div className="text-sm outfit-regular">
                        <Role role={data.role} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
          <div className="w-full flex items-center justify-start pt-4">
            <Link to="/members">
              <button className="w-auto px-3 py-1 border-1 border-[#ebebeb] rounded-lg hover:bg-[#f7f7f7] transition-all">
                Show more
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full h-[6rem] border border-[#ebebeb] rounded-2xl shadow bg-white"></div>
        <div className="w-full h-[6rem] border border-[#ebebeb] rounded-2xl shadow bg-white"></div>
        <div className="w-full h-[6rem] border border-[#ebebeb] rounded-2xl shadow bg-white"></div>
        <div className="w-full h-[6rem] border border-[#ebebeb] rounded-2xl shadow bg-white"></div>
      </div>
    </div>
  )
}