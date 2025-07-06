import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import List from './pages/List'
import Borrowings from "./pages/Borrowings"

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/list" element={<List/>}></Route>
      <Route path="/borrowings" element={<Borrowings/>}></Route>
    </Routes>
  )
}