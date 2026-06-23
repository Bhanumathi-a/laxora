"use client"
import { Bell, MessageSquare, Search, User } from "lucide-react"
import React from "react"
import { SearchBox } from "../ui/SearchBox"
import { useEffect, useState } from "react"

type UserInfo = {
  userName: string
  role: string
}

export const Header = () => {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/me")
      const data = await res.json()
      setUser(data)
    }

    loadUser()
  }, [])
  const logout = async () => {
    await fetch("/api/logout", { method: "POST" })
    window.location.href = "/login"
  }
  return (
    <>
      <div className='flex flex-col md:flex-row justify-between items-center p-4'>
        {/* Searchbar */}
        <div className='hidden md:table-cell'>
          <SearchBox />
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
          <div className='flex flex-row'>
            <User />
            <div className='flex flex-col'>
              <span className='text-xs leading-3 font-medium'>
                {user?.userName || "Guest"}
              </span>

              <span className='text-[10px] text-right text-gray-500'>
                {user?.role || ""}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className='p-3 pt-2 py-2 rounded-lg font-semibold tracking-wide bg-brand text-white hover:bg-blue-main transition duration-300 cursor-pointer inline-block'>
            Logout
          </button>
        </div>
      </div>
    </>
  )
}
