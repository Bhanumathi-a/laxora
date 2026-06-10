/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { useEffect, useState } from "react"
import { Search, MessageSquare, Bell, User } from "lucide-react"

import Sidebar from "@/components/layout/Sidebar"
import UserCard from "@/components/dashboard/UserCard"
import CountChart from "@/components/dashboard/CountChart"
import AttendanceChart from "@/components/dashboard/AttendanceChart"
import FinanceChart from "@/components/dashboard/FinanceChart"
import EventCalendar from "@/components/dashboard/EventCalendar"
import Announcements from "@/components/dashboard/Announcements"

type School = {
  id: string
  name: string
}

export default function Dashboard() {
  // searchbox
  const [searchTerm, setSearchTerm] = useState("")
  const searchData = [
    "Students",
    "Teachers",
    "Attendance",
    "Fees",
    "Exams",
    "Results",
    "Dashboard",
    "Profile",
    "Settings",
  ]
  const filterData = searchData.filter((i) =>
    i.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" })
    window.location.href = "/login"
  }
  const [name, setName] = useState("")
  const [schools, setSchools] = useState<School[]>([])

  // Fetch schools
  const fetchSchools = async () => {
    try {
      const res = await fetch("/api/schools")

      if (!res.ok) {
        console.log("API failed")
        return
      }

      const data = await res.json()

      if (data?.schools) {
        setSchools(data.schools)
        console.log(data)
      }
    } catch (error) {
      console.log("Fetch error:", error)
    }
  }

  // Run on load
  useEffect(() => {
    fetchSchools()
  }, [])

  // Add school
  const addSchool = async () => {
    if (!name) return

    await fetch("/api/schools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })

    setName("")
    fetchSchools()
  }

  // Delete school
  const deleteSchool = async (id: string) => {
    await fetch(`/api/schools/${id}`, {
      method: "DELETE",
    })

    fetchSchools()
  }

  // Edit school
  const editSchool = async (id: string) => {
    const newName = prompt("Enter new name")

    if (!newName) return

    await fetch(`/api/schools/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    })

    fetchSchools()
  }

  return (
    <>
      <div className='h-screen flex'>
        <Sidebar role='SUPER_ADMIN' />

        <div className='w-[86%] md:w-[92%] lg:w-[84%] xl-w-[86%] bg-[#f7f8fa] flex flex-col'>
          <div className='flex justify-between items-center p-4'>
            {/* Searchbar */}
            <div className='hidden md:flex items-center gap-2 text-xs  ring-[1.5px] ring-blue-main px-2'>
              <input
                type='text'
                name=''
                id=''
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search...'
                className='w-[200px] p-2 bg-transparent outline-none'
              />
              <Search className='text-blue-main  w-5 h-5' />
              {searchTerm && (
                <div className='absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-md z-50'>
                  {filterData.length > 0 ? (
                    filterData.map((item, index) => (
                      <div
                        key={index}
                        className='p-2 hover:bg-gray-100 cursor-pointer'>
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className='p-2 text-gray-400'>No results</div>
                  )}
                </div>
              )}
            </div>

            {/* icons and user */}
            <div className='flex items-center justify-end gap-3 w-full'>
              <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
                <MessageSquare className='text-brand  w-5 h-5' />
                <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-brand rounded-full text-white text-xs'>
                  1
                </div>
              </div>
              <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
                <Bell className='text-brand  w-5 h-5' />
                <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-brand rounded-full text-white text-xs'>
                  1
                </div>
              </div>
              <div className='flex flex-row p-2 gap-2'>
                <div className='flex flex-col justify-between'>
                  <span className='text-xs leading-3 font-medium'>
                    John Doe
                  </span>
                  <span className='text-[10px] text-right text-gray-500'>
                    admin
                  </span>
                </div>
                <div className='bg-white p-1 rounded-full block border'>
                  <User />
                </div>
              </div>

              <button
                onClick={logout}
                className='mt-5 w-auto p-4 rounded-lg font-semibold tracking-wide bg-brand text-white hover:bg-blue-main transition duration-300 cursor-pointer inline-block'>
                <span>Logout</span>
              </button>
            </div>
          </div>
          <div className='flex flex-col justify-between items-center gap-4 md:flex-row'>
            <div className='flex p-4 flex-col gap-4 md:flex-row w-full'>
              <div className='w-full lg:w-2/3 flex flex-col gap-8'>
                {/* user card */}
                {/* <div className='flex gap-4 justify-between items-center flex-wrap'>
                  <UserCard type='Students' count={studentsCount} />
                  <UserCard type='Staff' count={teachersCount} />
                  <UserCard type='Parents' count={parentsCount} />
                  <UserCard type='Departments' count={subjectsCount} />
                </div> */}
                {/* other actions */}
                <div className='w-full bg-white gap-4 p-4'>
                  <div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='School name'
                      className='border p-2'
                    />
                    <button
                      onClick={addSchool}
                      className='ml-2 bg-blue-500 text-white px-4 py-2'>
                      Add
                    </button>
                  </div>
                  {/* List Schools */}
                  <div className='mt-6'>
                    {schools.length === 0 ? (
                      <p>No schools found</p>
                    ) : (
                      schools.map((s) => (
                        <div
                          key={s.id}
                          className='flex justify-between border p-2 mt-2'>
                          <span>{s.name}</span>

                          <div className='flex gap-2'>
                            <button
                              onClick={() => editSchool(s.id)}
                              className='text-blue-500'>
                              Edit
                            </button>

                            <button
                              onClick={() => deleteSchool(s.id)}
                              className='text-red-500'>
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                {/* middle chart */}
                <div className='flex flex-col lg:flex-row gap-4'>
                  {/* count chart */}
                  <div className='w-full lg:w-1/3 h-[450px]'>
                    <CountChart />
                  </div>
                  {/* attendance chart */}
                  <div className='w-full lg:w-2/3 h-[450px]'>
                    <AttendanceChart />
                  </div>
                </div>

                {/* bottom chart */}
                <div className='w-full h-[500px]'>
                  <FinanceChart />
                </div>
              </div>
              <div className='w-full lg:w-1/3 flex flex-col gap-8'>
                <EventCalendar />
                <Announcements />
              </div>
            </div>
            {/* main - Total Schools Total Students (all schools) Total Revenue Active Schools
      New Schools this month */}
          </div>
        </div>
      </div>
    </>
  )
}
