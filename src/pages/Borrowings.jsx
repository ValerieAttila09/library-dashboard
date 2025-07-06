import { useState } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

export default function Borrowings() {
  const [isSidebarOpen, setOpenSidebar] = useState(false)
  
  const toggleSidebar = () => {
    setOpenSidebar(prev => !prev)
  }

  return (
    <div className="w-full h-full flex">
      <Sidebar isOpen={isSidebarOpen} />
      <Header onToggleSidebar={toggleSidebar} />
    </div>
  )
} 