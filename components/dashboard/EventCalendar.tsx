"use client"
import React, { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

import { Ellipsis } from "lucide-react"

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
]

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date())

  return (
    <div className='bg-white p-4 rounded-md'>
      <Calendar onChange={onChange} value={value} />
      <div className='flex items-center justify-between'>
        <div className='text-lg font-semibold my-4'>Events</div>
        <Ellipsis />
      </div>
      <div className='flex flex-col gap-4'>
        {events.map((event) => (
          <div
            key={event.id}
            className='p-5 rounded-md border-2 border-gray-100 odd:border-t-vsSky even:border-t-vsPurple'>
            <div className='flex items-center justify-between'>
              <h3 className='font-semibold text-gray-800'>{event.title}</h3>
              <span className='text-gray-400 text-xs'>{event.time}</span>
            </div>
            <p className='mt-2 text-sm text-gray-500'>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventCalendar
