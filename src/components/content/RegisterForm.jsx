import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function RegisterForm() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:4000/register", {
        name,
        email,
        password,
      })

      alert("Registrasi berhasil! Silakan login.")
      navigate("/")
    } catch (err) {
      console.error("Register error:", err)
      alert("Registrasi gagal.")
    }
  }

  return (
    <div className="w-full min-h-full flex items-center justify-center">
      <form className="md:w-2/5 sm:w-2/3 w-4/5 h-auto p-4" onSubmit={handleRegister}>
        <h2 className="text-4xl outfit-medium">Welcome new member!</h2>
        <p className="text-neutral-700 mb-5">Sign in to Library Dashboard to continue.</p>
        <div className="w-full grid gap-y-2">
          <button className="w-full border rounded-md border-[#d7d7d7] hover:bg-[#fafafa] transition-all p-2 flex justify-center items-center gap-2">
            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-0.5 0 48 48" version="1.1"><g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Color-" transform="translate(-401.000000, -860.000000)"><g id="Google" transform="translate(401.000000, 860.000000)"><path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"></path><path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"></path><path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"></path><path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"></path></g></g></g></svg>
            <span>Sign In with Google</span>
          </button>
          <button className="w-full border rounded-md border-[#d7d7d7] hover:bg-[#fafafa] transition-all p-2 flex justify-center items-center gap-2">
            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
            <span>Sign In with Apple</span>
          </button>
        </div>
        <div className="my-4 w-full flex items-center gap-1">
          <div className="w-full h-[1px] bg-[#d7d7d7]"></div>
          <span className="text-sm text-[#afafaf]">OR</span>
          <div className="w-full h-[1px] bg-[#d7d7d7]"></div>
        </div>
        <div className="grid gap-y-3">

          <div className="w-full grid gap-y-1">
            <label className="text-md text-neutral-900 outfit-medium">Username</label>
            <input
              className="border border-[#d7d7d7] outline-2 outline-transparent hover:border-indigo-500 focus:border-transparent focus:outline-indigo-500 transition-all rounded-md text-md px-[10px] py-[6px]"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="w-full grid gap-y-1">
            <label className="text-md text-neutral-900 outfit-medium">Email</label>
            <input
              className="border border-[#d7d7d7] outline-2 outline-transparent hover:border-indigo-500 focus:border-transparent focus:outline-indigo-500 transition-all rounded-md text-md px-[10px] py-[6px]"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
          </div>
          <div className="w-full grid gap-y-1">
            <label className="text-md text-neutral-900 outfit-medium">Password</label>
            <input
              className="border border-[#d7d7d7] outline-2 outline-transparent hover:border-indigo-500 focus:border-transparent focus:outline-indigo-500 transition-all rounded-md text-md px-[10px] py-[6px]"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </div>
        </div>
        <div className="mt-8 w-full flex items-center justify-start gap-2">
          <button className="w-full px-4 py-2 border border-[#d7d7d7] bg-neutral-800 text-white rounded-md hover:bg-neutral-600 transition-all" type="submit">Sign in with Email</button>
          {/* <button onClick={handleProtectedRequest} className="px-4 py-1 border border-[#d7d7d7] rounded-md hover:bg-[#ebebeb]" type="button">Check protected route</button> */}
        </div>
      </form>
    </div>
  )
}
