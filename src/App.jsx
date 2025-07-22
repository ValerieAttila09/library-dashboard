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
      <Route path='/home' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path='/list' element={
        <ProtectedRoute>
          <List />
        </ProtectedRoute>
      } />
      <Route path='/borrowings' element={
        <ProtectedRoute>
          <Borrowings />
        </ProtectedRoute>
      } />
      <Route path='/members' element={
        <ProtectedRoute>
          <Members />
        </ProtectedRoute>
      } />
      <Route path='/calendar' element={
        <ProtectedRoute>
          <Calendar />
        </ProtectedRoute>
      } />
      <Route path='/register' element={<RegisterForm />} />
    </Routes>
  )
}