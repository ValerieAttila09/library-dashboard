import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../routes/useAuth"

gsap.registerPlugin(useGSAP)


const DashboardIcon = ({ pathMatched }) => {
  const [isSelected, setIsSelected] = useState(false)
  const currentPath = window.location.pathname

  useEffect(() => {
    setIsSelected(currentPath === pathMatched);
  }, [currentPath, pathMatched]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
      stroke="currentColor" className={`size-5 ${isSelected ? "text-blue-400" : "text-neutral-700"} transition-all`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>
  )
}
const ListIcon = ({ pathMatched }) => {
  const [isSelected, setIsSelected] = useState(false)
  const currentPath = window.location.pathname

  useEffect(() => {
    setIsSelected(currentPath === pathMatched);
  }, [currentPath, pathMatched]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className={`size-5 ${isSelected ? "text-blue-400" : "text-neutral-700"} transition-all`}>
      <path fillRule="evenodd"
        d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z"
        clipRule="evenodd" />
    </svg>
  )
}
const LoanIcon = ({ pathMatched }) => {
  const [isSelected, setIsSelected] = useState(false)
  const currentPath = window.location.pathname

  useEffect(() => {
    setIsSelected(currentPath === pathMatched);
  }, [currentPath, pathMatched]);


  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
      stroke="currentColor" className={`size-5 ${isSelected ? "text-blue-400" : "text-neutral-700"} transition-all`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}
const MembersIcon = ({ pathMatched }) => {
  const [isSelected, setIsSelected] = useState(false)
  const currentPath = window.location.pathname

  useEffect(() => {
    setIsSelected(currentPath === pathMatched);
  }, [currentPath, pathMatched]);


  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
      stroke="currentColor" className={`size-5 ${isSelected ? "text-blue-400" : "text-neutral-700"} transition-all`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  )
}
const CalendarIcon = ({ pathMatched }) => {
  const [isSelected, setIsSelected] = useState(false)
  const currentPath = window.location.pathname

  useEffect(() => {
    setIsSelected(currentPath === pathMatched);
  }, [currentPath, pathMatched]);


  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${isSelected ? "text-blue-400" : "text-neutral-700"} transition-all`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
    </svg>
  )
}


function MenuButton({ pathName, page, icon }) {
  const [buttonColor, setButtonColor] = useState("")
  const [pageName, setPageName] = useState(page)

  useEffect(() => {
    if (pathName == "/home" && pageName == "Dashboard") {
      setPageName("Dashboard")
    } else if (pathName == "/list" && pageName == "List") {
      setPageName("List")
    } else if (pathName == "/borrowings" && pageName == "Borrowings") {
      setPageName("Borrowings")
    } else if (pathName == "/members" && pageName == "Members") {
      setPageName("Members")
    } else if (pathName == "/calendar" && pageName == "Calendar") {
      setPageName("Calendar")
    }

    const currentPageName = window.location.pathname
    if (currentPageName == pathName) {
      setButtonColor("bg-[#ebebeb]")
    }
  }, [pageName, pathName])

  return (
    <div className="flex justify-start items-center">
      <Link to={pathName} className={`w-full ${buttonColor} p-2 rounded-md group hover:bg-[#f7f7f7] transition-all`}>
        <button
          className="w-full flex items-center justify-start gap-2 ">
          <div className="w-auto">
            {icon}
          </div>
          <span className="hiddenGem text-sm text-left text-neutral-800 sg-medium">{pageName}</span>
        </button>
      </Link>
    </div>
  )
}

function MenuSidebar({ currentPath, svgIcon }) {
  const path = [...currentPath]
  const icon = [...svgIcon]

  return (
    <div className="w-full flex flex-col gap-1 px-[6px]">
      <div className="hiddenGem flex justify-start items-center px-3">
        <span className="text-sm text-neutral-600">General</span>
      </div>

      <MenuButton pathName={path[0]} icon={icon[0]} page="Dashboard" />
      <MenuButton pathName={path[1]} icon={icon[1]} page="List" />
      <MenuButton pathName={path[2]} icon={icon[2]} page="Borrowings" />
      <MenuButton pathName={path[3]} icon={icon[3]} page="Members" />
      <MenuButton pathName={path[4]} icon={icon[4]} page="Calendar" />

      <div className="mx-auto mt-4 w-full h-[1px] bg-neutral-300"></div>
    </div>
  )
}

export default function Sidebar({ isOpen, onToggleSidebar }) {
  const sidebarRef = useRef(null)

  useGSAP(() => {
    gsap.set(sidebarRef.current, {
      width: "48px",
    })
    gsap.set(".hiddenGem", {
      opacity: 0,
      height: 0,
      width: 0,
    })
  })

  function OpenSidebar() {
    gsap.to(sidebarRef.current, {
      width: "290px",
      duration: 0.25,
      ease: "power2.out",
    })
    gsap.to(".hiddenGem", {
      opacity: 1,
      height: "auto",
      width: "100%",
      duration: 0.25,
      ease: "power2.out",
      stagger: 0.05,
    })
  }

  function CloseSidebar() {
    gsap.to(sidebarRef.current, {
      width: "48px",
      duration: 0.25,
      ease: "power2.out",
    })
    gsap.to(".hiddenGem", {
      opacity: 0,
      height: 0,
      width: 0,
      duration: 0.25,
      ease: "power2.out",
    })
  }

  useEffect(() => {
    if (!sidebarRef.current) return

    if (isOpen) {
      OpenSidebar()
    } else {
      CloseSidebar()
    }
  }, [isOpen])

  const paths = ["/home", "/list", "/borrowings", "/members", "/calendar"]
  const svgIcon = [
    <DashboardIcon pathMatched={paths[0]} />, <ListIcon pathMatched={paths[1]} />, <LoanIcon pathMatched={paths[2]} />, <MembersIcon pathMatched={paths[3]} />, <CalendarIcon pathMatched={paths[4]} />
  ]

  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth()

  const handleLogout = () => {
    localStorage.removeItem('token')
    alert('Kamu sudah logout.')
    navigate('/login')
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, isLoading, navigate])


  return (
    <div ref={sidebarRef} className="bg-white fixed z-30 left-0 top-0 bottom-0 border-r-1 border-[#ebebeb] md:border-0 md:relative md:w-[48px] md:max-h-[100vh]">
      <div className="w-full h-full flex flex-col justify-between gap-4 overflow-x-hidden overflow-y-auto">
        <div className="w-full flex flex-col py-1 gap-4">
          <div className="w-full flex flex-col gap-1">
            <div
              className="w-full px-[11px] overflow-hidden flex justify-start items-center gap-2 rounded-md">
              <div className="py-[10px] w-auto rounded-full bg-white p-[2px] group hover:bg-white transition-all">
                <div className="-translate-x-[1px] w-0 h-0 border-l-[12px] border-r-[12px] border-b-[22px] border-l-transparent border-r-transparent border-b-neutral-900"></div>
              </div>
              <div className="hiddenGem w-full flex items-center justify-between">
                <div className="w-full flex items-center gap-2">
                  <h1 className="text-lg outfit-medium text-neutral-800">XLIB.co</h1>
                  <span className="text-[10px] text-neutral-600 text-nowrap">Library Company</span>
                </div>
                <button onClick={onToggleSidebar} className="md:hidden p-[8px] border border-transparent hover:border-[#ebebeb] active:bg-[#ebebeb] transition-all rounded-md">
                  <svg className="size-6 text-neutral-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M6 4C4.34315 4 3 5.34315 3 7V17C3 18.6569 4.34315 20 6 20H18C19.6569 20 21 18.6569 21 17V7C21 5.34315 19.6569 4 18 4H6ZM5 7C5 6.44772 5.44772 6 6 6H9V18H6C5.44772 18 5 17.5523 5 17V7ZM11 18H18C18.5523 18 19 17.5523 19 17V7C19 6.44772 18.5523 6 18 6H11V18Z"
                      fill="#3d3d3a" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mx-auto mb-1 w-full h-[1px] bg-neutral-300"></div>
          </div>
          <MenuSidebar currentPath={paths} svgIcon={svgIcon} />
          <div className="w-full flex flex-col gap-1 px-[6px]">
            <div className="hiddenGem flex justify-start items-center px-3">
              <span className="text-sm text-neutral-600">Status</span>
            </div>
            <div className="flex justify-start items-center">
              <div className={`w-full bg-white p-2 rounded-md group hover:bg-[#f7f7f7] transition-all`}>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-start gap-2 ">
                  <div className="w-auto flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-600 transition-all">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                  </div>
                  <span className="hiddenGem text-sm text-left text-neutral-800 sg-medium">Log out</span>
                </button>
              </div>
            </div>
            <div className="mx-auto mt-4 w-full h-[1px] bg-neutral-300"></div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1 px-[6px] pb-2">
          <div className="mx-auto mb-2 w-full h-[1px] bg-neutral-300"></div>
          <div className="hiddenGem flex justify-start items-center px-3">
            <span className="text-sm text-neutral-600">System</span>
          </div>
          <div className="flex justify-start items-center">
            <button
              className="w-full p-2 flex items-center justify-start gap-2 rounded-md group hover:bg-[#ebebeb] transition-all ">
              <div className="w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="size-5 text-neutral-600 transition-all">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <span className="hiddenGem text-sm text-left text-neutral-800 sg-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}