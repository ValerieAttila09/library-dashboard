export default function MembersContent() {
  return (
    <div className="w-full h-full flex flex-col gap-[10rem] md:gap-0 md:flex-row bg-white overflow-y-auto">
      <div className="w-full md:w-3/4 h-full overflow-y-auto p-4">
        <div className="w-full h-full flex flex-col gap-4">
          <div className="w-full h-[16rem] rounded-xl bg-[#fcfcfc] shadow border border-[#ebebeb] p-4">
            <div className="w-full flex justify-between items-center mb-3">
              <h1 className="text-2xl outfit-medium text-neutral-800">Quick Access</h1>
              <button className="rounded-full p-2 border border-transparent hover:border-[#ebebeb] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </button>
            </div>
            <div className="w-full flex items-center gap-4">
              <div className="w-1/4 h-full bg-white shadow-sm hover:shadow-lg hover:-translate-y-[2px] border border-[#ebebeb] rounded-lg p-4 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                <h1 className="text-lg outfit-medium text-neutral-900 mt-3">Members</h1>
                <div className="w-full flex items-center gap-2">
                  <span className="text-md text-nowrap text-neutral-500">13</span>
                  <div className="size-1 rounded-full bg-neutral-400"></div>
                  <span className="text-md text-nowrap text-neutral-500">3 teams</span>
                </div>
              </div>
              <div className="w-1/4 h-full bg-white shadow-sm hover:shadow-lg hover:-translate-y-[2px] border border-[#ebebeb] rounded-lg p-4 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                <h1 className="text-lg outfit-medium text-neutral-900 mt-3">Messages</h1>
                <div className="w-full flex items-center gap-2">
                  <span className="text-md text-nowrap text-neutral-500">20 messages</span>
                  <div className="size-1 rounded-full bg-neutral-400"></div>
                  <span className="text-md text-nowrap text-neutral-500">12 users</span>
                </div>
              </div>
              <div className="w-1/4 h-full bg-white shadow-sm hover:shadow-lg hover:-translate-y-[2px] border border-[#ebebeb] rounded-lg p-4 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                </svg>
                <h1 className="text-lg outfit-medium text-neutral-900 mt-3">Documents</h1>
                <div className="w-full flex items-center gap-2">
                  <span className="text-md text-nowrap text-neutral-500">46.8 MB</span>
                  <div className="size-1 rounded-full bg-neutral-400"></div>
                  <span className="text-md text-nowrap text-neutral-500">17 items</span>
                </div>
              </div>
              <div className="w-1/4 h-full bg-white shadow-sm hover:shadow-lg hover:-translate-y-[2px] border border-[#ebebeb] rounded-lg p-4 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                <h1 className="text-lg outfit-medium text-neutral-900 mt-3">Library Archive</h1>
                <div className="w-full flex items-center gap-2">
                  <span className="text-md text-nowrap text-neutral-500">5 items</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pb-4">
            <div className="w-full h-full bg-[#fcfcfc] flex flex-col rounded-xl shadow border border-[#ebebeb]">
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
                  <button className="rounded-md flex items-center gap-2 border border-transparent bg-green-400 group hover:border-[#ebebeb] hover:bg-white transition-all px-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 text-white group-hover:text-green-400 transition-all">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="text-md text-white group-hover:text-green-400 transition-all">Add New</span>
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col divide-y-1 divide-neutral-200">
                <div className="px-4 w-full flex items-center">
                  <div className="w-4/12 py-2 flex items-center gap-1">
                    <span className="text-md text-neutral-500">Name</span>
                  </div>
                  <div className="w-2/12 py-2 flex items-center gap-1">
                    <span className="text-md text-neutral-500">Role</span>
                  </div>
                  <div className="w-3/12 py-2 flex items-center gap-1">
                    <span className="text-md text-neutral-500">Email</span>
                  </div>
                  <div className="w-2/12 py-2 flex items-center gap-1">
                    <span className="text-md text-neutral-500">Joined</span>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-1">
                  <div className="px-4 w-full flex items-center hover:bg-green-100/35 transition-all">
                    <div className="w-4/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">Valerie Attila Al-fath</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <div className="px-2 rounded bg-yellow-100">
                        <span className="text-sm text-yellow-400">Admin</span>
                      </div>
                    </div>
                    <div className="w-3/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">ggwp123@gmail.com</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">23 June, 2025</span>
                    </div>
                    <div className="w-1/12 py-2 flex items-center gap-1">
                      <button className="rounded-full p-1 border border-transparent hover:border-[#ebebeb] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="px-4 w-full flex items-center hover:bg-green-100/35 transition-all">
                    <div className="w-4/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">Valerie Attila Al-fath</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <div className="px-2 rounded bg-yellow-100">
                        <span className="text-sm text-yellow-400">Admin</span>
                      </div>
                    </div>
                    <div className="w-3/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">ggwp123@gmail.com</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">23 June, 2025</span>
                    </div>
                    <div className="w-1/12 py-2 flex items-center gap-1">
                      <button className="rounded-full p-1 border border-transparent hover:border-[#ebebeb] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="px-4 w-full flex items-center hover:bg-green-100/35 transition-all">
                    <div className="w-4/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">Valerie Attila Al-fath</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <div className="px-2 rounded bg-yellow-100">
                        <span className="text-sm text-yellow-400">Admin</span>
                      </div>
                    </div>
                    <div className="w-3/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">ggwp123@gmail.com</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">23 June, 2025</span>
                    </div>
                    <div className="w-1/12 py-2 flex items-center gap-1">
                      <button className="rounded-full p-1 border border-transparent hover:border-[#ebebeb] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="px-4 w-full flex items-center hover:bg-green-100/35 transition-all">
                    <div className="w-4/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">Valerie Attila Al-fath</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <div className="px-2 rounded bg-yellow-100">
                        <span className="text-sm text-yellow-400">Admin</span>
                      </div>
                    </div>
                    <div className="w-3/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">ggwp123@gmail.com</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">23 June, 2025</span>
                    </div>
                    <div className="w-1/12 py-2 flex items-center gap-1">
                      <button className="rounded-full p-1 border border-transparent hover:border-[#ebebeb] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="px-4 w-full flex items-center hover:bg-green-100/35 transition-all">
                    <div className="w-4/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">Valerie Attila Al-fath</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <div className="px-2 rounded bg-yellow-100">
                        <span className="text-sm text-yellow-400">Admin</span>
                      </div>
                    </div>
                    <div className="w-3/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">ggwp123@gmail.com</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">23 June, 2025</span>
                    </div>
                    <div className="w-1/12 py-2 flex items-center gap-1">
                      <button className="rounded-full p-1 border border-transparent hover:border-[#ebebeb] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="px-4 w-full flex items-center hover:bg-green-100/35 transition-all">
                    <div className="w-4/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">Valerie Attila Al-fath</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <div className="px-2 rounded bg-yellow-100">
                        <span className="text-sm text-yellow-400">Admin</span>
                      </div>
                    </div>
                    <div className="w-3/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">ggwp123@gmail.com</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">23 June, 2025</span>
                    </div>
                    <div className="w-1/12 py-2 flex items-center gap-1">
                      <button className="rounded-full p-1 border border-transparent hover:border-[#ebebeb] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="px-4 w-full flex items-center hover:bg-green-100/35 transition-all">
                    <div className="w-4/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">Valerie Attila Al-fath</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <div className="px-2 rounded bg-yellow-100">
                        <span className="text-sm text-yellow-400">Admin</span>
                      </div>
                    </div>
                    <div className="w-3/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">ggwp123@gmail.com</span>
                    </div>
                    <div className="w-2/12 py-2 flex items-center gap-1">
                      <span className="text-md text-neutral-700">23 June, 2025</span>
                    </div>
                    <div className="w-1/12 py-2 flex items-center gap-1">
                      <button className="rounded-full p-1 border border-transparent hover:border-[#ebebeb] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 h-full overflow-y-auto py-4 pe-2">
        <div className="w-full h-full">
          <div className="w-full h-full bg-[#fcfcfc] rounded-xl shadow border border-[#ebebeb]"></div>
        </div>
      </div>
    </div>
  )
}