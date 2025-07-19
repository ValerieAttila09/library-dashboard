import ListContent from "./content/ListContent"
import DashboardContent from "./content/DashboardContent"
import BorrowingsContent from "./content/BorrowingsContent"
import SecondBorrowingsContent from "./content/SecondBorrowingsContent"
import MembersContent from "./content/MembersContent"
import CalendarContent from "./content/CalendarContent"
import UserPic from "../assets/image/user.jpg"

function SetContent() {
  const pathName = window.location.pathname

  const linkDashboard = "/"
  const linkList = "/list"
  const linkBorrowings = "/borrowings"
  const linkMembers = "/members"
  const linkCalendar = "/calendar"

  if (pathName == linkDashboard) {
    return <DashboardContent />
  } else if (pathName == linkList) {
    return <ListContent />
  } else if (pathName == linkBorrowings) {
    return <SecondBorrowingsContent />
  } else if (pathName == linkMembers) {
    return <MembersContent />
  } else if (pathName == linkCalendar) {
    return <CalendarContent />
  }
}

function SetContentLabel() {
  const pathName = window.location.pathname

  const linkDashboard = "/"
  const linkList = "/list"
  const linkBorrowings = "/borrowings"
  const linkMembers = "/members"
  const linkCalendar = "/calendar"

  if (pathName == linkDashboard) {
    return (
      <span className="flex items-center justify-start gap-3">
        <span className="text-md text-neutral-500 hover:text-neutral-700">General</span>
        <span className="text-md text-neutral-500 hover:text-neutral-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        <span className="text-md text-neutral-500 hover:text-neutral-700">Dashboard</span>
      </span>
    )
  } else if (pathName == linkList) {
    return (
      <span className="flex items-center justify-start gap-3">
        <span className="text-md text-neutral-500 hover:text-neutral-700">General</span>
        <span className="text-md text-neutral-500 hover:text-neutral-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        <span className="text-md text-neutral-500 hover:text-neutral-700 text-nowrap">Book List</span>
      </span>
    )
  } else if (pathName == linkBorrowings) {
    return (
      <span className="flex items-center justify-start gap-3">
        <span className="text-md text-neutral-500 hover:text-neutral-700">General</span>
        <span className="text-md text-neutral-500 hover:text-neutral-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        <span className="text-md text-neutral-500 hover:text-neutral-700">Borrowings</span>
      </span>
    )
  } else if (pathName == linkMembers) {
    return (
      <span className="flex items-center justify-start gap-3">
        <span className="text-md text-neutral-500 hover:text-neutral-700">General</span>
        <span className="text-md text-neutral-500 hover:text-neutral-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        <span className="text-md text-neutral-500 hover:text-neutral-700">Members</span>
      </span>
    )
  } else if (pathName == linkCalendar) {
    return (
      <span className="flex items-center justify-start gap-3">
        <span className="text-md text-neutral-500 hover:text-neutral-700">General</span>
        <span className="text-md text-neutral-500 hover:text-neutral-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        <span className="text-md text-neutral-500 hover:text-neutral-700">Calendar</span>
      </span>
    )
  }
}

export default function Header({ onToggleSidebar }) {
  return (
    <div id="content" className="ms-[47px] md:ms-0 bg-transparent w-full overflow-auto max-h-[100vh]">
      <div className="w-auto h-full flex flex-col relative border-l-1 border-[#dfdfdf]">
        {/* Content Header */}
        <div className="w-full flex justify-start md:justify-between border-b-1 border-[#dfdfdf]">
          <div className="w-full flex justify-between items-center p-1">
            <div className="w-full flex justify-start items-center">
              <button onClick={onToggleSidebar} className="p-2 border border-transparent rounded-md hover:bg-white hover:border hover:border-[#efefef] transition-all">
                <svg className="size-6 text-neutral-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M6 4C4.34315 4 3 5.34315 3 7V17C3 18.6569 4.34315 20 6 20H18C19.6569 20 21 18.6569 21 17V7C21 5.34315 19.6569 4 18 4H6ZM5 7C5 6.44772 5.44772 6 6 6H9V18H6C5.44772 18 5 17.5523 5 17V7ZM11 18H18C18.5523 18 19 17.5523 19 17V7C19 6.44772 18.5523 6 18 6H11V18Z"
                    fill="#3d3d3a" />
                </svg>
              </button>
              <div className="mx-1 w-[1px] h-5/7 bg-[#ebebeb]"></div>
              <div className="w-auto mx-1 p-1">
                <SetContentLabel />
              </div>
              <div className="hidden md:block mx-1 w-[1px] h-5/7 bg-[#ebebeb]"></div>
            </div>
            <div className="hidden md:flex items-center gap-3 px-4">
              <div className="text-neutral-900 flex gap-2 items-center">
                <div className="px-2 rounded bg-yellow-100">
                  <span className="text-sm text-yellow-400">Admin</span>
                </div>
                <span className="text-nowrap text-neutral-800 outfit-medium">Valerie Attila Al-fath</span>
              </div>
              <div className="size-8 border border-[#ebebeb] bg-transparent overflow-hidden rounded-full">
                <img src={UserPic} className="object-cover" alt="User Picture" />
              </div>
            </div>

            <button className="md:hidden mx-2 w-10 h-auto border border-[#ebebeb] bg-transparent overflow-hidden rounded-full">
              <img src={UserPic} className="w-full h-full object-cover" alt="User Picture" />
            </button>
          </div>
        </div>
        {/* Main Content */}
        <SetContent />
      </div>
    </div>
  )
}