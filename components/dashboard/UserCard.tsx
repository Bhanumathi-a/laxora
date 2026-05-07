import { Ellipsis } from "lucide-react"
import Image from "next/image"
import React from "react"

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className='rounded-2xl bg-blue-light2  p-4 flex-1 min-w-[130]'>
      <div className='flex justify-between items-center mb-2'>
        <span className='bg-white rounded-md px-2 py-1 text-[10px]'>
          2025/26
        </span>
        <Ellipsis />
      </div>
      <h2 className='text-2xl font-semibold mb-2'>1234</h2>
      <h4 className='capitalize font-medium text-gray-900'>{type}</h4>
    </div>
  )
}

export default UserCard
