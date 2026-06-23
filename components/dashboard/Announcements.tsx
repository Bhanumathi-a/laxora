"use client"

import React from "react"

const Announcements = () => {
  return (
    <div className='bg-white dark:bg-brand p-4 rounded-md'>
      <div className='flex items-center justify-between'>
        <div className='text-lg font-semibold my-4'>Announcements</div>
        <span className='text-gray-400 text-sm'>View All</span>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        <div className='rounded-md bg-blue-light2 p-4'>
          <div className='bg-lamaSkyLight rounded-md p-4'>
            <div className='flex items-center justify-between'>
              <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
              <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>
                2025-01-01
              </span>
            </div>
            <p className='text-sm text-gray-400 mt-1'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, expedita. Rerum, quidem facilis?
            </p>
          </div>
        </div>
        <div className='bg-blue-light2 rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
            <span className='text-xs text-gray-400 bg-white  rounded-md px-1 py-1'>
              2025-01-01
            </span>
          </div>
          <p className='text-sm text-gray-400 mt-1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
            expedita. Rerum, quidem facilis?
          </p>
        </div>
        <div className='bg-blue-light2 rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
            <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>
              2025-01-01
            </span>
          </div>
          <p className='text-sm text-gray-400 mt-1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
            expedita. Rerum, quidem facilis?
          </p>
        </div>
      </div>
    </div>
  )
}

export default Announcements
