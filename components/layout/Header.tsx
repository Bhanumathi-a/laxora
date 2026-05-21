import { Bell, MessageSquare, Search, User } from "lucide-react"
import React from "react"
import { SearchBox } from "../ui/SearchBox"

export const Header = () => {
  return (
    <>
      <div className='flex justify-between items-center p-4'>
        {/* Searchbar */}
        <SearchBox />

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
              <span className='text-xs leading-3 font-medium'>John Doe</span>
              <span className='text-[10px] text-right text-gray-500'>
                admin
              </span>
            </div>
          </div>
        </div>
        {/* <button
              onClick={logout}
              className='mt-5 w-auto py-4 rounded-lg font-semibold tracking-wide bg-brand text-white hover:bg-blue-main transition duration-300 cursor-pointer inline-block'>
              <span className='ml-3'>Logout</span>
            </button> */}
      </div>
    </>
  )
}
