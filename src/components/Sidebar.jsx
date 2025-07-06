import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { Link } from "react-router-dom"

gsap.registerPlugin(useGSAP)

export default function Sidebar({ isOpen }) {
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


  useEffect(() => {
    function OpenSidebar() {
      gsap.to(sidebarRef.current, {
        width: "320px",
        duration: 0.25,
        ease: "power2.out",
      })
      gsap.to(".hiddenGem", {
        opacity: 1,
        height: "auto",
        width: "auto",
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

    if (!sidebarRef.current) return

    if (isOpen) {
      OpenSidebar()
    } else {
      CloseSidebar()
    }
  }, [isOpen])

  return (
    <div ref={sidebarRef} className="bg-transparent relative w-[48px] max-h-[100vh]">
      <div className="w-full h-full flex flex-col justify-between gap-4 overflow-x-hidden overflow-y-auto">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-1 pt-[10px]">
            <button
              className="px-[11px] overflow-hidden py-[2px] flex justify-start items-center gap-4 rounded-md">
              <div className="w-auto rounded-full bg-white p-[2px] group hover:bg-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  className="size-6 text-green-400 group-hover:text-green-700 transition-all">
                  <path
                    d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
                </svg>
              </div>
              <div className="hiddenGem w-auto flex flex-col items-start justify-center">
                <h1 className="text-lg/2 sg-semibold text-neutral-800">XLIB.co</h1>
                <span className="text-[10px] text-neutral-600 text-nowrap">Library Company</span>
              </div>
            </button>
            <div className="mx-auto my-1 w-full h-[1px] bg-neutral-300"></div>
          </div>
          <div className="w-full flex flex-col gap-1 px-[6px]">
            <div className="hiddenGem flex justify-start items-center px-3">
              <span className="text-sm text-neutral-600">General</span>
            </div>
            <div className="flex justify-start items-center">
              <Link to="/" className='w-full p-2 rounded-md group hover:bg-green-100 transition-all'>
                <button
                  className="w-full flex items-center justify-start gap-2 ">
                  <div className="w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                      stroke="currentColor" className="size-5 text-neutral-800 transition-all">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                    </svg>
                  </div>
                  <span className="hiddenGem text-sm text-neutral-800 sg-medium">Dashboard</span>
                </button>
              </Link>
            </div>
            <div className="flex justify-start items-center">
              <Link to="/list" className='w-full p-2 rounded-md group hover:bg-green-100 transition-all'>
                <button
                  className="w-full flex items-center justify-start gap-2 ">
                  <div className="w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                      className="size-5 text-neutral-800 transition-all">
                      <path fillRule="evenodd"
                        d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z"
                        clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="hiddenGem text-sm text-neutral-800 sg-medium text-nowrap">Book List</span>
                </button>
              </Link>
            </div>
            <div className="flex justify-start items-center">
              <Link to="/borrowings" className='w-full p-2 rounded-md group hover:bg-green-100 transition-all'>
                <button
                  className="w-full flex items-center justify-start gap-2">
                  <div className="w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                      stroke="currentColor" className="size-5 text-neutral-800 transition-all">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <span className="hiddenGem text-sm text-neutral-800 sg-medium">Borrowings</span>
                </button>
              </Link>
            </div>
            <div className="flex justify-start items-center">
              <button
                className="w-full p-2 flex items-center justify-start gap-2 rounded-md group hover:bg-green-100 transition-all">
                <div className="w-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="size-5 text-neutral-800 transition-all">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                </div>
                <span className="hiddenGem text-sm text-neutral-800 sg-medium">Members</span>
              </button>
            </div>
            <div className="mx-auto mt-4 w-full h-[1px] bg-neutral-300"></div>
          </div>
          <div className="w-full flex flex-col gap-1 px-[6px]">
            <div className="hiddenGem flex justify-start items-center px-3">
              <span className="text-sm text-neutral-600">Info</span>
            </div>
            <div className="flex justify-start items-center">
              <button className="w-full p-2 flex items-center justify-start gap-2 rounded-md group hover:bg-green-100 transition-all">
                <div className="w-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="size-5 text-neutral-800 transition-all">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                  </svg>
                </div>
                <span className="hiddenGem text-sm text-neutral-800 sg-medium text-nowrap">About Us</span>
              </button>
            </div>
            <div className="flex justify-start items-center">
              <button
                className="w-full p-2 flex items-center justify-start gap-2 rounded-md group hover:bg-green-100 transition-all">
                <div className="w-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="size-5 text-neutral-800 transition-all">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                  </svg>
                </div>
                <span className="hiddenGem text-sm text-neutral-800 sg-medium">Blog</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1 px-[6px] pb-2">
          <div className="mx-auto mb-2 w-full h-[1px] bg-neutral-300"></div>
          <div className="hiddenGem flex justify-start items-center px-3">
            <span className="text-sm text-neutral-600">System</span>
          </div>
          <div className="flex justify-start items-center">
            <button
              className="w-full p-2 flex items-center justify-start gap-2 rounded-md group hover:bg-green-100 transition-all ">
              <div className="w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="size-5 text-neutral-800 transition-all">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <span className="hiddenGem text-sm text-neutral-800 sg-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}