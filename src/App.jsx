import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import List from './pages/List'
import Borrowings from "./pages/Borrowings"
import Members from "./pages/Members"
import Calendar from "./pages/Calendar"
import ProtectedRoute from "./routes/ProtectedRoute"
import RegisterForm from "./components/content/RegisterForm"
import LoginPage from "./pages/LoginPage"

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path='/register' element={<RegisterForm />} />
      <ProtectedRoute>
        <Route path='/home' element={<Dashboard />} />
        <Route path="/list" element={<List />}></Route>
        <Route path="/borrowings" element={<Borrowings />}></Route>
        <Route path="/members" element={<Members />}></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
      </ProtectedRoute>
    </Routes>
  )
}