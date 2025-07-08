import { useState } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

export default function Calendar() {
  const [isSidebarOpen, setOpenSidebar] = useState(false)
  
  const toggleSidebar = () => {
    setOpenSidebar(prev => !prev)
  }

  console.log(isSidebarOpen)

  return (
    <div className="w-full h-full flex">
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar}/>
      <Header onToggleSidebar={toggleSidebar} />
    </div>
  )
} 