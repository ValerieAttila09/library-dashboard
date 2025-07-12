import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState, useEffect, useRef } from 'react'
import axios from "axios"
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const Badge = ({ Status }) => {
  if (Status == "1") {
    return (
      <span className="px-2 text-sm bg-green-50 rounded text-green-400">active</span>
    )
  } else {
    return (
      <span className="px-2 text-sm bg-red-50 rounded text-red-400">non-active</span>
    )
  }
}

const Role = ({ Role }) => {
  if (Role == "Admin") {
    return (
      <span className="px-2 text-sm bg-yellow-100 rounded text-yellow-500">Admin</span>
    )
  } else {
    return (
      <span className="px-2 text-sm bg-purple-100 rounded text-purple-600">Member</span>
    )
  }
}


export default function MembersContent() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: '',
    country: '',
    street: '',
    city: '',
    state: '',
    postal: '',
    status: '',
    id: null
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const memberAction = useRef(null)

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/users')
      setUsers(res.data)
    } catch (error) {
      console.error('gagal terhubung ke database! \n', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing) {
      axios.put(`http://localhost:3001/users/${form.id}`, form)
        .then(() => {
          setForm({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            role: '',
            country: '',
            street: '',
            city: '',
            state: '',
            postal: '',
            status: '',
            id: null
          })
          setIsEditing(false)
          fetchUsers()
        })
    } else {
      axios.post(`http://localhost:3001/users`, form)
        .then(() => {
          setForm({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            role: '',
            country: '',
            street: '',
            city: '',
            state: '',
            postal: '',
            status: '',
            id: null
          })
          fetchUsers()
        })
    }
  }

  const handleUpdate = (user) => {
    setForm(user)
    setIsEditing(true)
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        fetchUsers()
      })
  }

  const handleCancel = () => {
    setForm({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      role: '',
      country: '',
      street: '',
      city: '',
      state: '',
      postal: '',
      status: '',
      id: null
    })
    fetchUsers()
    setIsEditing(false)
  }

  useGSAP(() => {
    gsap.set(memberAction.current, {
      xPercent: 100
    })
  })

  function toggleAction() {
    if (!isOpen) {
      gsap.to(memberAction.current, {
        xPercent: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      setIsOpen(!isOpen)
    } else {
      gsap.to(memberAction.current, {
        xPercent: 100,
        duration: 0.3,
        ease: "power2.out"
      })
      setIsOpen(!isOpen)
    }
  }


  return (
    <div className="w-full h-full flex flex-col bg-white overflow-y-auto">
      <div className="relative w-full h-full p-4">
        <div className="w-full h-auto flex flex-col gap-4">
          <div className="w-full h-auto rounded-xl bg-[#fcfcfc] shadow border border-[#ebebeb] p-2">
            <div className="w-full flex justify-between items-center mb-3">
              <h1 className="text-2xl outfit-medium text-neutral-800">Quick Access</h1>
              <button className="rounded-full p-2 border border-transparent hover:border-[#ebebeb] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </button>
            </div>
            <div className="w-full flex flex-col sm:flex-row sm:flex-wrap items-center gap-2">
              <div className="w-full md:w-[24%] lg:w-[24.5%] h-full bg-white shadow-sm hover:shadow-lg hover:-translate-y-[2px] border border-[#ebebeb] rounded-lg p-4 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                <h1 className="text-lg outfit-medium text-neutral-900 mt-3">Members</h1>
                <div className="w-full flex items-center gap-2">
                  <span className="text-sm text-nowrap text-neutral-500">13</span>
                  <div className="size-1 rounded-full bg-neutral-400"></div>
                  <span className="text-sm text-nowrap text-neutral-500">3 teams</span>
                </div>
              </div>
              <div className="w-full md:w-[24%] lg:w-[24.5%] h-full bg-white shadow-sm hover:shadow-lg hover:-translate-y-[2px] border border-[#ebebeb] rounded-lg p-4 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                <h1 className="text-lg outfit-medium text-neutral-900 mt-3">Messages</h1>
                <div className="w-full flex items-center gap-2">
                  <span className="text-sm text-nowrap text-neutral-500">20 messages</span>
                  <div className="size-1 rounded-full bg-neutral-400"></div>
                  <span className="text-sm text-nowrap text-neutral-500">12 users</span>
                </div>
              </div>
              <div className="w-full md:w-[24%] lg:w-[24.5%] h-full bg-white shadow-sm hover:shadow-lg hover:-translate-y-[2px] border border-[#ebebeb] rounded-lg p-4 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                </svg>
                <h1 className="text-lg outfit-medium text-neutral-900 mt-3">Documents</h1>
                <div className="w-full flex items-center gap-2">
                  <span className="text-sm text-nowrap text-neutral-500">46.8 MB</span>
                  <div className="size-1 rounded-full bg-neutral-400"></div>
                  <span className="text-sm text-nowrap text-neutral-500">17 items</span>
                </div>
              </div>
              <div className="w-full md:w-[24%] lg:w-[24.5%] h-full bg-white shadow-sm hover:shadow-lg hover:-translate-y-[2px] border border-[#ebebeb] rounded-lg p-4 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                <h1 className="text-lg text-nowrap outfit-medium text-neutral-900 mt-3">Library Archive</h1>
                <div className="w-full flex items-center gap-2">
                  <span className="text-sm text-nowrap text-neutral-500">5 items</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pb-4">
            <div className="w-full h-auto bg-[#fcfcfc] flex flex-col rounded-xl shadow border border-[#ebebeb]">
              <div className="w-full flex justify-between items-center p-4">
                <div className="w-full flex items-center">
                  <h1 className="text-xl text-neutral-800 outfit-medium">Members Overview</h1>
                </div>
                <div className="w-full flex items-center justify-end gap-2">
                  <button className="rounded-full p-2 border border-transparent hover:border-[#ebebeb]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-neutral-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </button>
                  <button onClick={() => toggleAction()} className="rounded-md flex items-center gap-2 border border-transparent bg-blue-400 group hover:border-[#ebebeb] hover:bg-white transition-all px-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 text-white group-hover:text-blue-400 transition-all">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="text-md text-white group-hover:text-blue-400 transition-all">Add New</span>
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col overflow-auto py-4 divide-neutral-200">
                <table className="w-full border-t-1 border-[#ebebeb]">
                  <thead className="bg-[#fafafa] border-b-1 border-[#ebebeb]">
                    <tr>
                      <th className="p-3 outfit-regular text-start text-neutral-900">Name</th>
                      <th className="p-3 outfit-regular text-start text-neutral-900">Username</th>
                      <th className="p-3 outfit-regular text-start text-neutral-900">Email</th>
                      <th className="p-3 outfit-regular text-start text-neutral-900">Role</th>
                      <th className="p-3 outfit-regular text-start text-neutral-900">Country</th>
                      <th className="p-3 outfit-regular text-start text-neutral-900">Street</th>
                      <th className="p-3 outfit-regular text-start text-neutral-900">City</th>
                      <th className="p-3 outfit-regular text-start text-neutral-900">State</th>
                      <th className="p-3 outfit-regular text-nowrap text-start text-neutral-900">Postal Code</th>
                      <th className="p-3 outfit-regular text-start text-neutral-900">Status</th>
                      <th className="p-3 outfit-regular text-start text-neutral-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {users.map((user) => (
                      <tr key={user.id} className="bg-white border-b-1 border-[#ebebeb]">
                        <td className="p-3 min-w-[16rem] outfit-regular text-nowrap text-start text-neutral-900">{user.firstName + " " + user.lastName}</td>
                        <td className="p-3 text-nowrap text-start text-neutral-900"><span className="text-neutral-600">workcation.com/</span><span className="outfit-regular">{user.username}</span></td>
                        <td className="p-3 min-w-[15rem] text-nowrap text-start text-neutral-600">{user.email}</td>
                        <td className="p-3 text-nowrap text-start text-neutral-600"><Role Role={user.role} /></td>
                        <td className="p-3 text-nowrap text-start text-neutral-600">{user.country}</td>
                        <td className="p-3 text-nowrap text-start text-neutral-600">{user.street}</td>
                        <td className="p-3 text-nowrap text-start text-neutral-600">{user.city}</td>
                        <td className="p-3 text-nowrap text-start text-neutral-600">{user.state}</td>
                        <td className="p-3 text-nowrap text-start text-neutral-600">{user.postal}</td>
                        <td className="p-3 text-nowrap text-start text-neutral-600">
                          <Badge Status={user.status} />
                        </td>
                        <td className="p-3 min-w-[12rem] text-nowrap flex items-center justify-start gap-1">
                          <button onClick={() => {
                            handleUpdate(user)
                            toggleAction()
                          }} className="px-2 py-1 rounded-md border-1 border-transparent hover:bg-white hover:border-[#ebebeb] bg-yellow-100 text-yellow-400 text-sm transition-all">Update</button>
                          <button onClick={() => handleDelete(user.id)} className="px-2 py-1 rounded-md border-1 border-transparent hover:bg-white hover:border-[#ebebeb] bg-red-100 text-red-400 text-sm transition-all">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div ref={memberAction} className="bg-white fixed left-[49px] right-0 bottom-0 top-[51px] overflow-y-auto py-[1.6rem] px-[4rem]">
          <div className="w-full h-auto">
            <div className="w-full h-full p-2">
              <div className="w-full flex items-center justify-between">
                <div className="">
                  <h1 className="text-2xl outfit-medium text-neutral-900">Form action</h1>
                  <p className="text-md text-neutral-600">You can control and manage your members here.</p>
                </div>
                <button onClick={() => toggleAction()} className="my-3 rounded-lg bg-white px-3 py-[6px] border border-[#ebebeb] hover:bg-[#f7f7f7]">Return</button>
              </div>
              <br />
              <div className="w-full">
                <form onSubmit={handleSubmit} className='w-full rounded-xl border border-[#ebebeb] p-4'>
                  <div className="space-y-12">
                    <div className="mt-4 md:mt-10 flex flex-col md:flex-row gap-[3rem] border-b border-gray-900/10 pb-12">
                      <div className="w-full md:w-1/3">
                        <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
                        <p className="mt-1 text-md/6 text-gray-600">
                          This information will be displayed publicly so be careful what you share.
                        </p>
                      </div>

                      <div className="w-full md:w-2/3 md:pe-[5rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label htmlFor="username" className="block text-md/6 font-medium text-gray-900">
                            Username
                          </label>
                          <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                              <div className="shrink-0 text-base text-gray-500 select-none sm:text-md/6">workcation.com/</div>
                              <input
                                id="username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                type="text"
                                required
                                placeholder="janesmith"
                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-md/6"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="role" className="block text-md/6 font-medium text-gray-900">
                            Role
                          </label>
                          <div className="mt-2 grid grid-cols-1">
                            <select
                              id="role"
                              name="role"
                              value={form.role}
                              onChange={handleChange}
                              autoComplete="role"
                              required
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            >
                              <option value="">Select your role</option>
                              <option defaultValue={"Admin"}>Admin</option>
                              <option value="Member">Member</option>
                            </select>
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="cover-photo" className="block text-md/6 font-medium text-gray-900">
                            Cover photo
                          </label>
                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                              <div className="mt-4 flex text-md/6 text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 flex flex-col md:flex-row gap-[3rem] border-b border-gray-900/10 pb-12">
                      <div className="w-full md:w-1/3">
                        <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-md/6 text-gray-600">Use a permanent address where you can receive mail.</p>
                      </div>

                      <div className="w-full md:w-2/3 md:pe-[5rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="firstName" className="block text-md/6 font-medium text-gray-900">
                            First name
                          </label>
                          <div className="mt-2">
                            <input
                              id="firstName"
                              name="firstName"
                              value={form.firstName}
                              onChange={handleChange}
                              required
                              type="text"
                              autoComplete="given-name"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="lastName" className="block text-md/6 font-medium text-gray-900">
                            Last name
                          </label>
                          <div className="mt-2">
                            <input
                              id="lastName"
                              name="lastName"
                              value={form.lastName}
                              onChange={handleChange}
                              type="text"
                              required
                              autoComplete="family-name"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label htmlFor="email" className="block text-md/6 font-medium text-gray-900">
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={form.email}
                              onChange={handleChange}
                              required
                              autoComplete="email"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="country" className="block text-md/6 font-medium text-gray-900">
                            Country
                          </label>
                          <div className="mt-2 grid grid-cols-1">
                            <select
                              id="country"
                              name="country"
                              value={form.country}
                              onChange={handleChange}
                              autoComplete="country-name"
                              required
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            >
                              <option value="">Select country</option>
                              <option value="United States">United States</option>
                              <option value="Canada">Canada</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="England">England</option>
                              <option value="German">German</option>
                              <option value="Vietnam">Vietnam</option>
                              <option value="France">France</option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Japan">Japan</option>
                              <option value="Korea">Korea</option>
                            </select>
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="street" className="block text-md/6 font-medium text-gray-900">
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              id="street"
                              name="street"
                              type="text"
                              value={form.street}
                              required
                              onChange={handleChange}
                              autoComplete="street"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label htmlFor="city" className="block text-md/6 font-medium text-gray-900">
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              id="city"
                              name="city"
                              value={form.city}
                              onChange={handleChange}
                              type="text"
                              required
                              autoComplete="address-level2"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="state" className="block text-md/6 font-medium text-gray-900">
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              id="state"
                              name="state"
                              value={form.state}
                              onChange={handleChange}
                              type="text"
                              required
                              autoComplete="address-level1"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="postal" className="block text-md/6 font-medium text-gray-900">
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              id="postal"
                              name="postal"
                              value={form.postal}
                              onChange={handleChange}
                              type="text"
                              required
                              autoComplete="postal"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button onClick={() => {
                      handleCancel()
                      toggleAction()
                    }} type="button" className="text-md/6 font-semibold text-gray-900">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}